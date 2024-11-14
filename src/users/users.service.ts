import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./User.entity";
import { Repository } from "typeorm";
import { CreateUserDto } from "src/dto/createUser.dto";

@Injectable()
export class UsersService {
    constructor( 
        @InjectRepository(User) private usersRepository: Repository<User>
     ) {}

     async deleteUser(id: string): Promise<{ message: string }> {
      const user = await this.usersRepository.findOne({ where: { id } });

      if (!user) {
          throw new NotFoundException(`User with ID ${id} not found`);
      }

      await this.usersRepository.delete(id);

      return { message: `User with ID ${id} has been deleted` };
  }

    async getUserByEmail(email: string) {
      return await this.usersRepository.findOne({ where: { email } });
}

   async createUser(data : CreateUserDto) {
    
    try {
      // Crea una nueva instancia del usuario con los datos proporcionados
      const user = this.usersRepository.create(data);
      
      // Guarda el usuario en la base de datos y espera a que se complete
      await this.usersRepository.save(user);

      const { password, ...userWithoutPassword } = user;
    return userWithoutPassword;
    
    } catch (error) {
      // Maneja posibles errores, puedes personalizar el mensaje o relanzar la excepción
      throw new Error('Error al crear el usuariooooo: ' + error.message);
    }
   }  

   async findAll() {
     return this.usersRepository.find({
      select: ['id', 'name', 'email', 'password','address','phone','country','city'] // Aquí debes incluir las propiedades que quieres devolver, excepto 'role'
    })
   }

   async  findOne(id: string) {
        return this.usersRepository.findOne({
          where: { id },
          relations: ['orders'], // Aquí especificas la relación que quieres cargar
        })
   }  

   async  saveUseR(user: User) {
        this.usersRepository.save(user)
}
}