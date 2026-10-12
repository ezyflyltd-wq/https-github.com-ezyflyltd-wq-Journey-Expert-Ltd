-- Numeric provider outcome only; never retain raw errors, messages or credentials.
ALTER TABLE meta_events ADD COLUMN http_status INTEGER;
ALTER TABLE meta_events ADD COLUMN error_code INTEGER;
ALTER TABLE meta_events ADD COLUMN error_subcode INTEGER;
