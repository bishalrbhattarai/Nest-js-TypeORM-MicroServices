
import { Body, Controller, Post, UsePipes, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Sign } from 'crypto';
import { SignUpDto } from './dto/sign-up.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('sign-up')
    @UsePipes(new ValidationPipe({ transform: true, whitelist: true, forbidNonWhitelisted: true }))
    signUp(@Body() body: SignUpDto) {
        return this.authService.signUp(body);
    }

    @Post('sign-in')
    signIn() {
        return this.authService.signIn();
    }


}