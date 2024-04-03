import { IUseCase } from 'src/domain/iusecase.interface';
import GetShelterDetailsUseCaseOutput from './dtos/get.shelter.details.usecase.output';

export default class getShelterDetailsUseCase
  implements IUseCase<null, GetShelterDetailsUseCaseOutput>
{
  run(input: null): Promise<GetShelterDetailsUseCaseOutput> {
    return Promise.resolve(
      new GetShelterDetailsUseCaseOutput({
        shelterName: 'Casa do Cachorro',
        shelterEmail: 'casadocachorro@gmail.com',
        shelertWhatsApp: '7593711392',
        shelterPhone: '7593711392',
        createdAt: new Date(),
        updatedAt: new Date(),
      }),
    );
  }
}
