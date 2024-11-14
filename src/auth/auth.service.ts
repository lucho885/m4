import { BadRequestException, Injectable } from "@nestjs/common";
import { AuthDto } from "./auth.dto";
import { UsersService } from "../users/users.service";
import * as bcrypt from 'bcrypt';
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class AuthService{
    constructor(private readonly usersService : UsersService,
         private readonly jwtService: JwtService
    ) {}

    signinAuthService(email: string, password: string)  {
        return "auth"
    }

    getAuth() {
        return "auth"
    }

    async signUp(userDto) { //: CreateUserDto
       const user =  await this.usersService.getUserByEmail(userDto.email)
         if(user){
              return "User already exists"
         }
         const hashedPassword = await bcrypt.hash(userDto.password, 10);
         if(!hashedPassword){
             throw new BadRequestException("Error hashing password")
         }
       
       return await this.usersService.createUser({...userDto, password: hashedPassword})
        
    }

  

    async signIn(authDto: AuthDto) {
        const user = await this.usersService.getUserByEmail(authDto.email);
        console.log(user)
        if(!user){
           throw new BadRequestException("User not found")
        }
          const validPassword = await bcrypt.compare(authDto.password, user.password);
             if(!validPassword){
                 throw new BadRequestException("Invalid password")
             }
             const userPayload = {sub: user.id, id: user.id, email: user.email, roles: user.role}
 
             const token = this.jwtService.sign(userPayload)
 
         return {success: "User logged in", token}    
     }
}