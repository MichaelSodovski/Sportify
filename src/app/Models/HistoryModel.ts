export class HistoryModel {

    constructor (
        public id?: Date,
        public productId?: number,
        public productName?: string,
        public amount?: number,
        public calories?: number,
        public protein?: number,
        public carbohydrate?: number,
        public fat?: number,
        ) {}
}