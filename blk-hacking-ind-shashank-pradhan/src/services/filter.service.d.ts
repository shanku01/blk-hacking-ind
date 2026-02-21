import { Transaction } from "../models/transaction";
import { QPeriod, PPeriod, KPeriod } from "../models/period";
export declare function applyTemporalRules(transactions: Transaction[], q: QPeriod[], p: PPeriod[], k: KPeriod[]): {
    start: string;
    end: string;
    amount: number;
}[];
//# sourceMappingURL=filter.service.d.ts.map