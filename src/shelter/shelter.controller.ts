import { Body, Controller, Get, Inject, Put } from '@nestjs/common';
import GetShelterDetailsUseCaseOutput from './usecases/dtos/get.shelter.details.usecase.output';
import ShelterTokens from './shelter.token';
import { IUseCase } from 'src/domain/iusecase.interface';
import UpdateShelterControllerInput from './usecases/dtos/update.shelter.datails.usecase.input';
import UpdateShelterDetailsUsCaseOutput from './usecases/dtos/update.shelter.datails.usecase.outup';

@Controller('shelter')
export class ShelterController {
  @Inject(ShelterTokens.getShelterDetailsUseCase)
  private readonly getShelterDetailsUseCase: IUseCase<
    null,
    GetShelterDetailsUseCaseOutput
  >;

  @Inject(ShelterTokens.updateShelterDetailsUseCase)
  private readonly updateShelterDetailsUseCase: IUseCase<
    UpdateShelterControllerInput,
    UpdateShelterDetailsUsCaseOutput
  >;

  @Get()
  async getShelterDetails(): Promise<GetShelterDetailsUseCaseOutput> {
    return await this.getShelterDetailsUseCase.run(null);
  }

  @Put()
  async updateShelterDetails(
    @Body() input: UpdateShelterControllerInput,
  ): Promise<UpdateShelterDetailsUsCaseOutput> {
    const useCaseInput = new UpdateShelterDetailsUsCaseOutput({ ...input });
    return await this.updateShelterDetailsUseCase.run(useCaseInput);
  }
}
