export function calculateCeiling(amount: number): number {
  return Math.ceil(amount / 100) * 100;
}

export function calculateRemanent(amount: number): number {
  return calculateCeiling(amount) - amount;
}