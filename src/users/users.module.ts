import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "src/users/User.entity";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "src/roles/roles.guard";

@Module({
    imports: [
        TypeOrmModule.forFeature([User])
      ],
    providers: [UsersService],
    controllers: [UsersController],
    exports: [TypeOrmModule, UsersService]
})
export class UsersModule{}