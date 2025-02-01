import { PipeTransform, BadRequestException } from '@nestjs/common';

export class ParseAgePipe implements PipeTransform {
    transform(value: any) {
        if (isNaN(value.age)) {
            throw new BadRequestException(`Age must be a valid number`);
        }
        value.age = Number(value.age);
        return value;
    }
}