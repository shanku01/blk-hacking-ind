export interface ExpenseInput {
  date: string; // "YYYY-MM-DD HH:mm:ss"
  amount: number;
}

export interface Transaction extends ExpenseInput {
  ceiling: number;
  remanent: number;
}