export function handleCopy(csvExample, setCopied) {
  navigator.clipboard.writeText(csvExample);
  setCopied(true);
  setTimeout(() => setCopied(false), 1200);
}
