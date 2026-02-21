// utils/time.ts

export function toMillis(dateStr: string): number {
  return new Date(dateStr).getTime();
}