import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, MaxLength } from "class-validator";

export default class CreatePetControllerInput {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Nome do Pet' })
    name: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Tipo do Pet' })
    type: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Tamanho do Pet' })
    size: string;
  
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ description: 'Gênero do Pet' })
    gender: string;
  
    @IsString()
    @IsNotEmpty()
    @MaxLength(1024)
    @ApiProperty({ description: 'Biografia do Pet', maximum: 1024 })
    bio: string;
}