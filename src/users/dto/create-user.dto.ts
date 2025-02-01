import { Type } from "class-transformer";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsNumber()
    // @Type(() => Number)
    age: number;
}
