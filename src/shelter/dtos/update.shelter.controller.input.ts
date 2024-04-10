import {
  IsEmail,
  IsNotEmpty,
  IsNumberString,
  IsString,
  Length,
} from 'class-validator';

export default class UpdateShelterControllerInput {
  @IsString()
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  @IsString()
  @Length(10, 11)
  whatsapp: string;
  @IsString()
  @IsNumberString()
  @Length(10, 11)
  @IsNotEmpty()
  phone: string;
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string;
}
