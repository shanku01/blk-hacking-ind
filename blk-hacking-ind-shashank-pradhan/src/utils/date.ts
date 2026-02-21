import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat.js";

dayjs.extend(customParseFormat);

export function isValidTimestamp(date: string): boolean {
  return dayjs(date, "YYYY-MM-DD HH:mm:ss", true).isValid();
}

export function toTimestamp(date: string): number {
  return dayjs(date, "YYYY-MM-DD HH:mm:ss").valueOf();
}



export function isWithinRange(
  date: string,
  start: string,
  end: string
): boolean {
  const d = toTimestamp(date);
  return d >= toTimestamp(start) && d <= toTimestamp(end);
}