import { Transaction } from "./transaction";
export interface ValidatorInput {
    wage: number;
    transactions: Transaction[];
}
export interface InvalidTransaction extends Transaction {
    message: string;
}
//# sourceMappingURL=validator.d.ts.map