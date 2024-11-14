import { Test } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import * as jwt from "jsonwebtoken"
import { UsersService } from "../users/users.service";
import { User } from "../users/User.entity";
import * as bcrypc from "bcrypt"

describe("authService", ()=> {
    let authService : AuthService;  

    const mockJwtService = {
        sign: (payload) => jwt.sign(payload, "unaclavesecreta")
    }

    const mockUser : Omit<User, "id" | "orders"> = {
        name: "luciano",
        email: "lucianoloidi334@gmail.com",
        password: "123456",
        address: "fussingvej 5",
        phone: "4571402670",
        country: "dinamarca",
        city: "copemhagen",
        role: "Admin"
    }

    const mockUserService : Partial<UsersService> = {
        getUserByEmail: () => Promise.resolve(undefined),
        saveUseR: (user) : Promise<any> => Promise.resolve({
            ...user,
            id: "1234fs-234sd-234sdf-234sdf",
        })
    };


    beforeEach(async () => {
        const module = await Test.createTestingModule({
            providers: [AuthService, {provide:JwtService, useValue: mockJwtService},
                {
                    provide: UsersService,
                    useValue: mockUserService
                }
            ]
        }).compile();
        authService = module.get<AuthService>(AuthService);
    })

    it("signUp arroja un errror si el email esta en use", async () => {
        mockUserService.getUserByEmail = (email:string) => Promise.resolve(mockUser as User);
        try {
            await authService.signUp(mockUser as User);
        } catch (error) {
            expect(error.message).toEqual("User already exists");
        }
    })

    it("signin arroja un error si el password es incorrecto", async () => {
        mockUserService.getUserByEmail = (email:string) => Promise.resolve(mockUser as User);
        try {
            await authService.signIn({ email: mockUser.email, password: "Invalid password" });
    }catch(error){
    expect(error.message).toEqual("Invalid password");
    }
    })

    it("signin return error si el usuario no existe", async () => {
        mockUserService.getUserByEmail = (email:string) => Promise.resolve(undefined);
        try{
            await authService.signIn({ email: mockUser.email, password: mockUser.password });
        } catch(error) {
            expect(error.message).toEqual("User not found");
        }
    })

    it("sigin() retornar un objeto con con el mensaje y el token si el usuario es encontrado y la password isValid ", async () => {
        const  mockUserPasword =  {
            ...mockUser,
            password: await bcrypc.hash(mockUser.password, 10),
          }
    
      mockUserService.getUserByEmail = (email:string) => Promise.resolve(mockUserPasword as User);

      const response = await authService.signIn({ email: mockUser.email, password: "123456"})
     
      expect(response).toBeDefined();
      expect(response.token).toBeDefined();
      expect(response.success).toEqual("User logged in");
    })
})

