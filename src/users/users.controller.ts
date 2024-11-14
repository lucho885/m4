import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/auth/auth.guard";
import { UsersService } from "./users.service";
import { ProductsController } from "src/products/products.controller";
import { ProductDto } from "src/products/product.dto";
import { UserDto } from "./User.dto";
import { CreateUserDto } from "src/dto/createUser.dto";
import { Roles } from "src/roles/roles.decorator";
import { Role } from "src/roles/auth.role";
import { RolesGuard } from "src/roles/roles.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService : UsersService) {}
    
    @Get()
    @Roles(Role.Admin)
    @UseGuards(AuthGuard,RolesGuard)
    getUsersController() {
        return this.usersService.findAll();
    }
    
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Delete(":id") 
    deleteUserByIdController(@Param("id") id : string) {
       return this.usersService.deleteUser(id);
    }

    
    @ApiBearerAuth()
    @UseGuards(AuthGuard)
    @Get(":id") //siempre dejarlo como ultimo enpoint para que no entre en endpoints incorrectos
    getUserByIdController(@Param("id") id : string) {
       return this.usersService.findOne(id);
    }
}