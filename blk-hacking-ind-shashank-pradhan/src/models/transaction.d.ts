export interface ExpenseInput {
    date: string;
    amount: number;
}
export interface Transaction extends ExpenseInput {
    ceiling: number;
    remanent: number;
}
//# sourceMappingURL=transaction.d.ts.map