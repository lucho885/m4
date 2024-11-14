import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { User } from "src/users/User.entity";
import { UsersService } from "src/users/users.service";
import { TypeOrmModule } from "@nestjs/typeorm";

@Module({
    imports: [TypeOrmModule.forFeature([User])],
    providers: [AuthService, UsersService],
    controllers: [AuthController]
})
export class AuthModule{}