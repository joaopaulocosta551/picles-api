import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import ShelterTokens from './shelter.token';
import GetShelterDetailsUseCase from './usecases/get.shelther.details.usecase';
import { MongooseModule } from '@nestjs/mongoose';
import { ShelterSchema, Shelter } from './schemas/shelter.schema';
import { ShelterRepository } from './shelter.repository';
import UpdateShelterDetailsUsCase from './usecases/dtos/update.shelter.datails.usecase.input';

@Module({
  controllers: [ShelterController],
  imports: [
    MongooseModule.forFeature([{ name: Shelter.name, schema: ShelterSchema }]),
  ],
  providers: [
    {
      provide: ShelterTokens.getShelterDetailsUseCase,
      useClass: GetShelterDetailsUseCase,
    },
    {
      provide: ShelterTokens.shelterRepository,
      useClass: ShelterRepository,
    },
    {
      provide: ShelterTokens.updateShelterDetailsUseCase,
      useClass: UpdateShelterDetailsUsCase,
    },
  ],
})
export class ShelterModule {}
