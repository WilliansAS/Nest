import { Injectable } from '@nestjs/common';
import { User } from './users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CrearUserDto } from './Dto/create-user.dto';
import { UpdateUserDto } from './Dto/update-user.dto';
import { LoginUserDto } from './Dto/login-user.dto';


@Injectable()
export class UsersService {

    constructor(@InjectRepository(User) private userRepository: Repository<User>) { }

    createUser(user: CrearUserDto) {
        const NewUser = this.userRepository.create(user)
        return this.userRepository.save(NewUser)
    }

    getUsers() {
        return this.userRepository.find()
    }

    getUser(id: number){
        return this.userRepository.findOne({
            where: {
                id
            }
        })
    }

    deleteUser(id: number){
        return this.userRepository.delete({id})
    }

    updateUser(id: number, user: UpdateUserDto){
        return this.userRepository.update({id}, user)
    }

    loginUser(user: LoginUserDto){
        return this.userRepository.findOne({
            where:{
                UserName : user.UserName,
                Password : user.Password
            }
        })
    }

}