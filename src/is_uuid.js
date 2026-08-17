// Validate a UUID (v1-v5) string.
const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isUUID(input) {
  return typeof input === "string" && UUID_RE.test(input);
}
