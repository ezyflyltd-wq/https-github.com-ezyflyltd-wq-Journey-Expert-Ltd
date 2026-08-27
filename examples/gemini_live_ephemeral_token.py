"""Reference FastAPI endpoint for Gemini Live ephemeral tokens.

This file is an example only. In Journey Expert's Cloudflare Pages deployment,
use the companion TypeScript edge function because Cloudflare Functions do not
run this Python process. Never put GEMINI_API_KEY in browser code or commit it.
"""

from datetime import datetime, timedelta, timezone
import os

from fastapi import FastAPI, Header, HTTPException
from google import genai

app = FastAPI(title="Journey Expert Gemini Live token service")

ALLOWED_ORIGINS = {
    "https://journeyexpertltd.com",
    "https://www.journeyexpertltd.com",
}
MODEL = "gemini-3.1-flash-live-preview"


def _require_public_origin(origin: str | None) -> None:
    if origin not in ALLOWED_ORIGINS:
        raise HTTPException(status_code=403, detail="Origin is not allowed")


@app.post("/api/gemini/live-token")
def create_live_token(origin: str | None = Header(default=None)) -> dict[str, str]:
    """Issue a single-use token; do not proxy the live audio through this API."""
    _require_public_origin(origin)

    api_key = os.environ.get("GEMINI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=503, detail="Gemini Live is not configured")

    now = datetime.now(timezone.utc)
    client = genai.Client(
        api_key=api_key,
        http_options={"api_version": "v1beta"},
    )
    token = client.auth_tokens.create(
        config={
            "uses": 1,
            "new_session_expire_time": now + timedelta(minutes=1),
            "expire_time": now + timedelta(minutes=30),
            "live_connect_constraints": {
                "model": MODEL,
                "config": {
                    "session_resumption": {},
                    "response_modalities": ["AUDIO"],
                },
            },
        }
    )

    # The browser receives only the short-lived token name and model identifier.
    return {
        "token": token.name,
        "model": MODEL,
        "expiresAt": (now + timedelta(minutes=30)).isoformat(),
    }


# Example local command:
# GEMINI_API_KEY=... uvicorn examples.gemini_live_ephemeral_token:app --port 8787
