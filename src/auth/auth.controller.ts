
import { Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post('sign-up')
    signUp() {
        return this.authService.signUp();
    }

    @Post('sign-in')
    signIn() {
        return this.authService.signIn();
    }


}