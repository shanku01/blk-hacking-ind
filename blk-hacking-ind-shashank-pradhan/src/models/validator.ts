import { Transaction } from "./transaction.js";

export interface ValidatorInput {
  wage: number;
  transactions: Transaction[];
}

export interface InvalidTransaction extends Transaction {
  message: string;
}