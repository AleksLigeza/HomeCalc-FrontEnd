export class AccountSummary {
    amount: number;
    bills: number;
    income: number;
    lastMonthBills: number;
    lastMonthIncome: number;
}

export class AccountSummaryDiffrence {
    overall: number;
    overallLast: number;
    incomePercent: number;
    billsPercent: number;

    constructor(summary: AccountSummary) {
        this.overall = summary.income - summary.bills;
        this.overallLast = summary.lastMonthIncome - summary.lastMonthBills;

        if (summary.lastMonthIncome === 0) {
            if (summary.income > 0) {
                this.incomePercent = 100;
            } else {
                this.incomePercent = 0;
            }
        } else {
            this.incomePercent = (summary.income - summary.lastMonthIncome) / summary.lastMonthIncome * 100;
        }

        if (summary.lastMonthBills === 0) {
            if (summary.bills > 0) {
                this.billsPercent = 100;
            } else {
                this.billsPercent = 0;
            }
        } else {
            this.billsPercent = (summary.bills - summary.lastMonthBills) / summary.lastMonthBills * 100;
        }
    }
}
