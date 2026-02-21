export function compoundInterest(
  principal: number,
  rate: number,
  years: number
): number {
  return principal * Math.pow(1 + rate, years);
}

export function adjustForInflation(
  amount: number,
  inflation: number,
  years: number
): number {
  return amount / Math.pow(1 + inflation, years);
}

export function calculateTax(income: number): number {
  if (income <= 700000) return 0;
  if (income <= 1000000)
    return (income - 700000) * 0.1;
  if (income <= 1200000)
    return 30000 + (income - 1000000) * 0.15;
  if (income <= 1500000)
    return 60000 + (income - 1200000) * 0.2;
  return 120000 + (income - 1500000) * 0.3;
}

export function calculateNpsTaxBenefit(
  invested: number,
  annualIncome: number
): number {
  const deduction = Math.min(
    invested,
    0.1 * annualIncome,
    200000
  );

  return (
    calculateTax(annualIncome) -
    calculateTax(annualIncome - deduction)
  );
}