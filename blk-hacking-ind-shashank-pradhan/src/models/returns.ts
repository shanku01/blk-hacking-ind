import { Transaction } from "./transaction.js";
import { Period } from "./period.js";

export interface ReturnsInput {
  age: number;
  wage: number;
  inflation: number;
  transactions: Transaction[];
  q: Period[];
  p: Period[];
  k: Period[];
}