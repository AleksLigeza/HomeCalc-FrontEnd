export class HistoryFilters {
    amountFrom: number;
    amountTo: number;
    description: string;
    dateSince: Date;
    dateTo: Date;
    type: number;

    constructor() {
        this.amountFrom = 0;
        this.amountTo = 999999;
        this.description = '';

        let tempDate = new Date();
        tempDate.setUTCFullYear(2000, null, null);
        tempDate.setUTCHours(0, 0, 0, 1);
        this.dateSince = tempDate;
        tempDate = new Date();
        tempDate.setUTCFullYear(2100, null, null);
        tempDate.setUTCHours(23, 59, 59, 999);
        this.dateTo = tempDate;

        this.type = 0;
    }

    nullAllParameters() {
        this.amountFrom = null;
        this.amountTo = null;
        this.description = '';
        this.dateSince = null;
        this.dateTo = null;
        this.type = 0;
    }

    removeNulls() {
        const cleanTemplate = new HistoryFilters();
        if (this.amountFrom === null) {
            this.amountFrom = cleanTemplate.amountFrom;
        }
        if (this.amountTo === null) {
            this.amountTo = cleanTemplate.amountTo;
        }
        if (this.dateTo === null) {
            this.dateTo = cleanTemplate.dateTo;
        }
        if (this.dateSince === null) {
            this.dateSince = cleanTemplate.dateSince;
        }
    }
}
