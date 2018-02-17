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

    static createArray(res): Operation[] {

        let result: Operation[];
        result = res;

        result.forEach((value, index) => {
            Operation.normalize(value, res[index].income, res[index].id);
        });
        return result;
    }

    static normalize(operation: Operation, type, id: number) {
        operation.income = (type === '1') || (type === true);
        operation._id = id.toString();
    }
}
