
export class TokenDTO {
    constructor(
        public readonly id: string,
        public readonly creationDate: Date,
        public readonly expirationDate: Date
    ) { }
}