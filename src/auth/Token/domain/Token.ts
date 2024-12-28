import { TokenCreationDate } from "./TokenCreationDate";
import { TokenDTO } from "./TokenDTO";
import { TokenExpirationDate } from "./TokenExpirationDate";
import { TokenId } from "./TokenId";

export class Token {
    constructor(
        public readonly id: TokenId,
        public readonly creationDate: TokenCreationDate,
        public readonly expirationDate: TokenExpirationDate
    ) { }

    public static fromPrimitives(data: TokenDTO): Token {
        return new Token(
            new TokenId(data.id),
            new TokenCreationDate(data.creationDate),
            new TokenExpirationDate(data.expirationDate)
        )
    }

    toPrimitives(): TokenDTO {
        return new TokenDTO(
            this.id.value,
            this.creationDate.value,
            this.expirationDate.value
        )
    }
}