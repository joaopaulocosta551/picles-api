import { Module } from '@nestjs/common';
import { ShelterController } from './shelter.controller';
import ShelterTokens from './shelter.tokens';
import GetShelterDetailsUseCase from './usecases/get.shelter.details.usecase';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import { Shelter, ShelterSchema } from './schemas/shelter.schema';
import UpdateSheltherDetailsUseCase from './usecases/update.shelter.details.usecase';
import UpdateShelterDetailsUseCase from './usecases/update.shelter.details.usecase';
import ShelterRepository from './shelter.repository';

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
      useClass: UpdateShelterDetailsUseCase
    }
  ],
})
export class ShelterModule {}
