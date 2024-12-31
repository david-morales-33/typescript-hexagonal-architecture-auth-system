import { RoleDTO } from "../../Role/domain/RoleDTO";

export class UserDTO {
    constructor(
        public readonly id: string,
        public readonly name: string,
        public readonly nickName: string,
        public readonly email: string,
        public readonly roleList: RoleDTO[],
    ) { }
}