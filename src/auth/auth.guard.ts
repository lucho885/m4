import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import {config as dotenvConfig} from "dotenv";

dotenvConfig({path: ".env.development"});

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest();
      
        const token = request.headers['authorization'].split(' ')[1];
        
        if(!token){
            throw new UnauthorizedException("No token provided")
        }

        try {
            const secret = process.env.JWT_SECRET;
            const payload  = await this.jwtService.verify(token, {secret});
            payload.iat = new Date(payload.iat * 1000);
            payload.exp = new Date(payload.exp * 1000);
            request.user = payload;
            return true;
        } catch (error) {
            throw new UnauthorizedException("Invalid token")
        }
    
    }
}
