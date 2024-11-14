import { SetMetadata } from "@nestjs/common";
import { Role } from "./auth.role";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);