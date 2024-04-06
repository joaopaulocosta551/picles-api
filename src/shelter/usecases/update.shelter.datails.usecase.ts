import { Injectable } from '@nestjs/common';
import { IUseCase } from 'src/domain/iusecase.interface';
import UpdateShelterDetailsUseCaseInput from './dtos/update.shelter.datails.usecase.input';
import UpdateShelterDetailsUseCaseOutput from './dtos/update.shelter.datails.usecase.outup';

@Injectable()
export default class UpdateShelterDetailsUseCase
  implements
    IUseCase<
      UpdateShelterDetailsUseCaseInput,
      UpdateShelterDetailsUseCaseOutput
    >
{
  run(
    input: UpdateShelterDetailsUseCaseInput,
  ): Promise<UpdateShelterDetailsUseCaseOutput> {
    throw new Error('M');
  }
}
