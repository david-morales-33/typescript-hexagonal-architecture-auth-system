import { RoleDTO } from "./RoleDTO";
import { RoleId } from "./RoleId";
import { RoleLabel } from "./RoleLabel";

export class Role {
    constructor(
        public readonly id: RoleId,
        public readonly label: RoleLabel
    ) { }

    public static fromPrimitives(data: RoleDTO): Role {
        return new Role(new RoleId(data.id), new RoleLabel(data.label))
    }

    toPrimitives(): RoleDTO {
        return new RoleDTO(this.id.value, this.label.value)
    }
}