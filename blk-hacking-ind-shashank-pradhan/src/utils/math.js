export function calculateCeiling(amount) {
    return Math.ceil(amount / 100) * 100;
}
export function calculateRemanent(amount) {
    return calculateCeiling(amount) - amount;
}
//# sourceMappingURL=math.js.map