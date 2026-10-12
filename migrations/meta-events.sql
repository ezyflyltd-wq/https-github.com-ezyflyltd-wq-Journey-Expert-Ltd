-- Stores only hashed message identifiers and delivery state, never message text or sender IDs.
CREATE TABLE IF NOT EXISTS meta_events (
  event_key TEXT PRIMARY KEY,
  state TEXT NOT NULL CHECK (state IN ('processing','sending','sent','uncertain')),
  claim TEXT NOT NULL,
  updated_at INTEGER NOT NULL,
  http_status INTEGER,
  error_code INTEGER,
  error_subcode INTEGER
);
CREATE INDEX IF NOT EXISTS meta_events_updated_at ON meta_events(updated_at);
