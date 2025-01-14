import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNotEmpty()
    password: string;

    @IsNotEmpty()
    @IsString()
    name?: string;
}

