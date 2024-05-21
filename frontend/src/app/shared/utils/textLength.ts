export function textLength(text: string, maxLength: number): string {
  if (text.length > maxLength) {
    text = text.slice(0, maxLength);
    text = text + '...';
  }
  text[0].toUpperCase();
  return text;
}
