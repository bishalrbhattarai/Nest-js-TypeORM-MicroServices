import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {

    getUser() {
        return {
            id: Math.floor(Math.random() * 100),
            name: 'John Doe',
            email: `${Math.floor(Math.random() * 100)}@example.com`,
        }
    }


    createUser(body: CreateUserDto) {

        console.log(body)
        return {
            id: Math.floor(Math.random() * 100),
            ...body
        }

    }


}

