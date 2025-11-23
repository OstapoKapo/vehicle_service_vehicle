import { Transform } from "class-transformer";
import { IsEmail, IsString, IsUUID, MinLength } from "class-validator";

export class CreateDto {
    @IsUUID()
    userId!: string;
}