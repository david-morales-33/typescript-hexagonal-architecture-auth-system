import { RoleDTO } from "../../Role/domain/RoleDTO";

export class UserDTO {
    constructor(
        public readonly id: string,
        public readonly email: string,
        public readonly roleList: RoleDTO[],
    ) { }
}