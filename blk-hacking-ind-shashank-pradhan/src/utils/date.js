import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
dayjs.extend(customParseFormat);
export function isValidTimestamp(date) {
    return dayjs(date, "YYYY-MM-DD HH:mm:ss", true).isValid();
}
export function toTimestamp(date) {
    return dayjs(date, "YYYY-MM-DD HH:mm:ss").valueOf();
}
export function toTimestamp(date) {
    return new Date(date).getTime();
}
export function isWithinRange(date, start, end) {
    const d = toTimestamp(date);
    return d >= toTimestamp(start) && d <= toTimestamp(end);
}
//# sourceMappingURL=date.js.map