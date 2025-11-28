import { Transform } from "class-transformer";
import { IsEmail, IsString, IsUUID, MinLength } from "class-validator";

export class CreateDto {
    @IsUUID()
    userId!: string;
}

export class UpdateDto {
    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value ?? null)
    model!: string | null;

    @IsString()
    @MinLength(1)
    @Transform(({ value }) => value ?? null)
    make!: string | null;

    @Transform(({ value }) => value !== null ? Number(value) : null)
    year!: number | null;

    @IsString()
    @Transform(({ value }) => value ?? null)
    vin!: string | null;
}