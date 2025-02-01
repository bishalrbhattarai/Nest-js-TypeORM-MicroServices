import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe, ParseIntPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ParseAgePipe } from './pipes/parse-age-pipe';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get()
  getUser() {
    return this.usersService.getUser();
  }

  @Post()
  @UsePipes(new ValidationPipe({
    transform: true, // transform the payload to the DTO object
    whitelist: true,
    forbidNonWhitelisted: true,
  }))
  createUser(@Body("age", ParseIntPipe) age: number, @Body() body: CreateUserDto) {
    return this.usersService.createUser(body);
  }
}
