export class Operation {
    _id: string;
    date: Date;
    income: boolean;
    amount: number;
    description: string;
    cyclic: boolean;

    constructor(id: string) {
        this._id = id;
        this.date = new Date();
        this.date.setUTCHours(12);
        this.income = true;
        this.amount = 1;
        this.description = '';
        this.cyclic = false;
    }
}
