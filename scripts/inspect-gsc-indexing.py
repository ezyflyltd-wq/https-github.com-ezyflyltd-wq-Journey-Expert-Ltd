#!/usr/bin/env python3
"""Check Google Search Console indexed status for a controlled URL list.

Required environment:
  GSC_SERVICE_ACCOUNT_JSON: service-account JSON as a GitHub/CI secret
Optional:
  GSC_SITE_URL: URL-prefix property; defaults to the Journey Expert apex
  GSC_URL_FILE: newline-delimited URL file
  GSC_OUTPUT: output JSON path
  GSC_STRICT=1: exit 1 when an expected indexable URL is not PASS

The URL Inspection API reads the latest Google-indexed status. It does not
request indexing and does not replace the live URL test in the Search Console UI.
"""

import json
import os
import sys
import time
from datetime import datetime, timezone
from pathlib import Path
from urllib.parse import urlparse

import requests
from google.auth.transport.requests import Request
from google.oauth2 import service_account

API_URL = "https://searchconsole.googleapis.com/v1/urlInspection/index:inspect"
SCOPE = "https://www.googleapis.com/auth/webmasters.readonly"
DEFAULT_SITE = "https://journeyexpertltd.com/"
DEFAULT_URLS = [
    "https://journeyexpertltd.com/",
    "https://journeyexpertltd.com/flights",
    "https://journeyexpertltd.com/visa",
    "https://journeyexpertltd.com/study-abroad",
]


def load_urls() -> list[str]:
    file_path = os.getenv("GSC_URL_FILE")
    if not file_path:
        return DEFAULT_URLS
    lines = Path(file_path).read_text(encoding="utf-8").splitlines()
    return [line.strip() for line in lines if line.strip() and not line.startswith("#")]


def validate_url(url: str, site_url: str) -> None:
    parsed = urlparse(url)
    if parsed.scheme != "https" or not parsed.netloc:
        raise ValueError(f"URL must be a fully-qualified HTTPS URL: {url}")
    if not url.startswith(site_url):
        raise ValueError(f"URL is outside the configured Search Console property: {url}")


def inspection(credentials, inspection_url: str, site_url: str) -> dict:
    credentials.refresh(Request())
    response = requests.post(
        API_URL,
        headers={
            "Authorization": f"Bearer {credentials.token}",
            "Content-Type": "application/json",
        },
        json={
            "inspectionUrl": inspection_url,
            "siteUrl": site_url,
            "languageCode": "en-US",
        },
        timeout=30,
    )
    if response.status_code >= 400:
        raise RuntimeError(f"HTTP {response.status_code}: {response.text[:1000]}")
    return response.json()


def flatten(url: str, payload: dict) -> dict:
    result = payload.get("inspectionResult", {})
    index = result.get("indexStatusResult", {})
    return {
        "url": url,
        "verdict": index.get("verdict"),
        "coverageState": index.get("coverageState"),
        "robotsTxtState": index.get("robotsTxtState"),
        "indexingState": index.get("indexingState"),
        "userCanonical": index.get("userCanonical"),
        "googleCanonical": index.get("googleCanonical"),
        "lastCrawlTime": index.get("lastCrawlTime"),
        "sitemap": index.get("sitemap"),
        "raw": payload,
    }


def main() -> int:
    service_json = os.getenv("GSC_SERVICE_ACCOUNT_JSON")
    if not service_json:
        print("GSC_SERVICE_ACCOUNT_JSON is required", file=sys.stderr)
        return 2

    site_url = os.getenv("GSC_SITE_URL", DEFAULT_SITE)
    if not site_url.endswith("/"):
        site_url += "/"

    try:
        service_info = json.loads(service_json)
        credentials = service_account.Credentials.from_service_account_info(
            service_info,
            scopes=[SCOPE],
        )
        urls = load_urls()
        for url in urls:
            validate_url(url, site_url)
    except Exception as exc:
        print(f"Configuration error: {exc}", file=sys.stderr)
        return 2

    results = []
    for index, url in enumerate(urls):
        try:
            payload = inspection(credentials, url, site_url)
            result = flatten(url, payload)
            result.pop("raw", None)
            results.append(result)
            print(json.dumps(result, ensure_ascii=False))
        except Exception as exc:
            results.append({"url": url, "error": str(exc)})
            print(json.dumps(results[-1], ensure_ascii=False), file=sys.stderr)
        if index < len(urls) - 1:
            time.sleep(1.0)

    output = {
        "checkedAt": datetime.now(timezone.utc).isoformat(),
        "siteUrl": site_url,
        "results": results,
    }
    output_path = Path(os.getenv("GSC_OUTPUT", "gsc-indexing-status.json"))
    output_path.write_text(json.dumps(output, indent=2, ensure_ascii=False) + "\n", encoding="utf-8")

    strict = os.getenv("GSC_STRICT") == "1"
    failures = [
        item for item in results
        if item.get("error") or (strict and item.get("verdict") not in ("PASS", "VERDICT_UNSPECIFIED"))
    ]
    if failures:
        print(f"{len(failures)} URL inspection checks failed strict validation", file=sys.stderr)
        return 1
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
