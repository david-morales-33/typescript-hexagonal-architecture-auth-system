import { StringValueObject } from "../../Shared/domain/value-objects/StringValueObject";

export class UserEmail extends StringValueObject {
    constructor(value: string) {
        super(value)
        this.ensureValidEmail(value)
    }
    private ensureValidEmail(value: string) {
        if (!value.includes('@')) throw new Error(`Email <${value}> is not valid`)
    }
}