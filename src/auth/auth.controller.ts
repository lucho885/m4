import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./auth.dto";
import { CreateUserDto } from "src/dto/createUser.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("Auth")
@Controller("auth")
export class AuthController{
    constructor(private readonly authService : AuthService) {}
        
    @Get()
    getAuth(){
        return this.authService.getAuth()
    }

    @Post("signup")
    signinAuthController(@Body() userDto : CreateUserDto){
        return this.authService.signUp(userDto)
    }

    @Post("signin")
    signInAuthController(@Body() authDto: AuthDto){
       return this.authService.signIn(authDto)
    }
}