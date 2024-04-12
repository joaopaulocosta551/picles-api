import { IUseCase } from "src/domain/iusecase.interface";
import GetPetsUseCaseInput from "./dtos/get.pets.usecase.input";
import GetPetsUseCaseOutput from "./dtos/get.pets.usecase.output";
import { Inject, Injectable } from "@nestjs/common";
import PetTokens from "../pet.tokens";
import IPetRepository from "../interfaces/pet.repository.interface";
import AppTokens from "src/app.tokens";
import IFileService from "src/interfaces/file.service.interface";
import PetResponse from "../dtos/pet.response";

@Injectable()
export default class GetPetsUseCase implements IUseCase<GetPetsUseCaseInput, GetPetsUseCaseOutput> {

    constructor(
        @Inject(PetTokens.petRepository)
        private readonly petRepository: IPetRepository,

        @Inject(AppTokens.fileService)
        private readonly fileService: IFileService
    ) { }

    async run(input: GetPetsUseCaseInput): Promise<GetPetsUseCaseOutput> {
        const queryResponse = await this.petRepository.findByFilter(input);

        const petResponseList: PetResponse[] = [];

        for (const currentPet of queryResponse.items) {
            if (currentPet.photo) {
                const photoInBase64 = await this.fileService.readFile(currentPet.photo);
                currentPet.photo = photoInBase64.toString('base64');
            }

            petResponseList.push(PetResponse.fromPet(currentPet));
        }

        const totalPages = Math.ceil(queryResponse.total / input.itemsPerPage);

        return new GetPetsUseCaseOutput({
            currentPage: input.page,
            totalPages,
            items: petResponseList,
        });
    }

}