import { Injectable } from '@nestjs/common';
import { Sign } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as argon from 'argon2';



@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) { }


    async signUp(body: SignUpDto) {

        const hashedPassword = await argon.hash(body.password);
        body.password = hashedPassword;

        const response = await (this.prisma.user.create({ data: body }));
        //    deleted the password key from the response
        delete response.password;
        return response
    }

    signIn() {
        return 'Sign in';
    }

}