import { Module } from '@nestjs/common';
import { PetController } from './pet.controller';
import PetTokens from './pet.tokens';
import CreatPetUseCase from './usecases/create.pet.usecase';

@Module({
  controllers: [PetController],
  providers: [
    {
      provide: PetTokens.createPetUseCase,
      useClass: CreatPetUseCase,
    },
  ],
})
export class PetModule {}
