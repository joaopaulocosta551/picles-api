import { IUseCase } from 'src/domain/iusecase.interface';
import UpdatePetByIdUseCaseInput from './dtos/update.pet.usecase.input';
import UpdatePetByIdUseCaseOutput from './dtos/update.pet.usecase.output';

export default class UpdatePetByIdUseCase
  implements IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput>
{
  async run(
    input: UpdatePetByIdUseCaseInput,
  ): Promise<UpdatePetByIdUseCaseOutput> {
    throw new Error('deu ruim negão');
  }
}
