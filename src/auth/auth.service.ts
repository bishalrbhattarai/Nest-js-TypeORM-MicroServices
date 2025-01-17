import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Sign } from 'crypto';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignUpDto } from './dto/sign-up.dto';
import * as argon from 'argon2';
import { SignInDto } from './dto/sign-in.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';



@Injectable()
export class AuthService {

    constructor(private prisma: PrismaService) { }


    async signUp(body: SignUpDto) {

        try {
            const hashedPassword = await argon.hash(body.password);
            body.password = hashedPassword;

            const response = await (this.prisma.user.create({ data: body }));
            //    deleted the password key from the response
            delete response.password;
            return response
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new HttpException('Email already exists', HttpStatus.BAD_REQUEST);
                }
                else {
                    throw new HttpException('Something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
            else {
                if (error instanceof Error) {
                    throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
                }
            }
        }
    }

    async signIn(body: SignInDto) {

        try {
            const user = await this.prisma.user.findUnique({ where: { email: body.email } });

            if (!user) {
                throw new HttpException('User not found', HttpStatus.NOT_FOUND);
            }

            const isPasswordValid = await argon.verify(user.password, body.password);

            if (!isPasswordValid) {
                throw new HttpException('Invalid credentials', HttpStatus.UNAUTHORIZED);
            }




            return ""
        } catch (error) {

        }
    }

}