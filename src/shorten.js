// Shorten a UUID into a compact, URL-safe base36 token.
export function shortenUUID(uuid) {
  const hex = String(uuid).replace(/-/g, "").slice(0, 8);
  return parseInt(hex, 16).toString(36);
}
