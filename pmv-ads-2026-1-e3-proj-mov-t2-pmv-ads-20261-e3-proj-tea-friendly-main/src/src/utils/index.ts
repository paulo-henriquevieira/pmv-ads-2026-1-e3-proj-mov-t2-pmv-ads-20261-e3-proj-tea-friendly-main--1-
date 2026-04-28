/** Generate a simple UUID-like string */
export function generateId(): string {
  return (
    Math.random().toString(36).substring(2, 15) +
    Math.random().toString(36).substring(2, 15)
  );
}

/** Format a date string to Brazilian locale */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('pt-BR');
}

/** Get the first letter of a name, uppercase */
export function getInitial(name: string): string {
  return (name?.[0] ?? 'U').toUpperCase();
}

/** Truncate a string to max length */
export function truncate(str: string, max: number): string {
  if (str.length <= max) return str;
  return str.slice(0, max) + '…';
}
