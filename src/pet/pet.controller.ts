import { BadRequestException, Body, Controller, Delete, Get, Inject, Param, Patch, Post, Put, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import CreatePetControllerInput from './dtos/create.pet.controller.input';
import PetTokens from './pet.tokens';
import { IUseCase } from 'src/domain/iusecase.interface';
import CreatePetUseCaseInput from './usecases/dtos/create.pet.usecase.input';
import CreatePetUseCaseOutput from './usecases/dtos/create.pet.usecase.output';
import GetPetByIdUseCaseInput from './usecases/dtos/get.pet.by.id.usecase.input';
import GetPetByIdUseCaseOutput from './usecases/dtos/get.pet.by.id.usecase.output';
import UpdatePetControllerInput from './dtos/update.pet.controller.input';
import UpdatePetByIdUseCaseInput from './usecases/dtos/update.pet.by.id.usecase.input';
import UpdatePetByIdUseCaseOutput from './usecases/dtos/update.pet.by.id.usecase.output';
import DeletePetByIdUseCaseInput from './usecases/dtos/delete.pet.by.id.usecase.input';
import DeletePetByIdUseCaseOutput from './usecases/dtos/delete.pet.by.id.usecase.output';
import multerConfig from 'src/config/multer.config';
import { FileInterceptor } from '@nestjs/platform-express';
import UpdatePetPhotoByIdUseCaseInput from './usecases/dtos/update.pet.photo.by.id.usecase.input';
import UpdatePetPhotoByIdUseCaseOutput from './usecases/dtos/update.pet.photo.by.id.usecase.output';
import GetPetsUseCaseInput from './usecases/dtos/get.pets.usecase.input';
import GetPetsUseCaseOutput from './usecases/dtos/get.pets.usecase.output';
import { ApiBody, ApiResponse } from '@nestjs/swagger';

@Controller('pet')
export class PetController {

    @Inject(PetTokens.createPetUseCase)
    private readonly createPetUseCase: IUseCase<CreatePetUseCaseInput, CreatePetUseCaseOutput>

    @Inject(PetTokens.getPetByIdUseCase)
    private readonly getPetByIdUseCase: IUseCase<GetPetByIdUseCaseInput, GetPetByIdUseCaseOutput>

    @Inject(PetTokens.updatePetByIdUseCase)
    private readonly updatePetByIdUseCase: IUseCase<UpdatePetByIdUseCaseInput, UpdatePetByIdUseCaseOutput>

    @Inject(PetTokens.deletePetByIdUseCase)
    private readonly deletePetByIdUseCase: IUseCase<DeletePetByIdUseCaseInput, DeletePetByIdUseCaseOutput>

    @Inject(PetTokens.updatePetPhotoByIdUseCase)
    private readonly updatePetPhotoByIdUseCase: IUseCase<UpdatePetPhotoByIdUseCaseInput, UpdatePetPhotoByIdUseCaseOutput>

    @Inject(PetTokens.getPetsUseCase)
    private readonly getPetsUseCase: IUseCase<GetPetsUseCaseInput, GetPetsUseCaseOutput>

    @Post()
    @ApiBody({ type: [CreatePetControllerInput] })
    @ApiResponse({ type: [CreatePetUseCaseOutput] })
    async createPet(@Body() input: CreatePetControllerInput): Promise<CreatePetUseCaseOutput> {
        const useCaseInput = new CreatePetUseCaseInput({ ...input })
        return await this.createPetUseCase.run(useCaseInput)
    }

    @Get()
    async getPets(
        @Query('type') type?: string,
        @Query('size') size?: string,
        @Query('gender') gender?: string,
        @Query('page') page?: string,
        @Query('itemsPerPage') itemsPerPage?: string,
    ): Promise<GetPetsUseCaseOutput>{
        const FIRST_PAGE = 1
        const DEFAULT_ITENS_PER_PAGE = 10
        const useCaseInput = new GetPetsUseCaseInput({
            type: !!type ? type : null,
            size: !!size ? size : null,
            gender: !!gender ? gender : null,
            page: !!page ? parseInt(page) : FIRST_PAGE,
            itemsPerPage: !!itemsPerPage ? parseInt(itemsPerPage) : DEFAULT_ITENS_PER_PAGE
        })
        return await this.getPetsUseCase.run(useCaseInput)
    }

    @Get(':id')
    async getPetById(@Param('id') id: string): Promise<GetPetByIdUseCaseOutput> {
        try {
            const useCaseInput = new GetPetByIdUseCaseInput({ id })
            return await this.getPetByIdUseCase.run(useCaseInput)
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message))
        }
    }

    @Put(':id')
    async updatePet(@Body() input: UpdatePetControllerInput, @Param('id') id: string): Promise<UpdatePetByIdUseCaseOutput> {

        try {
            const useCaseInput = new UpdatePetByIdUseCaseInput({
                ...input,
                id
            })
            return await this.updatePetByIdUseCase.run(useCaseInput)
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message))
        }
    }

    @Delete(':id')
    async deletePet(@Param('id') id: string): Promise<DeletePetByIdUseCaseOutput> {
        try {
            const useCaseInput = new DeletePetByIdUseCaseInput({ id })
            return await this.deletePetByIdUseCase.run(useCaseInput)
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message))
        }
    }

    @Patch(':id/photo')
    @UseInterceptors(FileInterceptor('photo', multerConfig))
    async updatePhoto(
        @UploadedFile() photo: Express.Multer.File,
        @Param('id') id: string,
    ): Promise<UpdatePetPhotoByIdUseCaseOutput>{
        try {
            const useCaseInput = new UpdatePetPhotoByIdUseCaseInput({
                id,
                photoPath: photo.path
            })
            return await this.updatePetPhotoByIdUseCase.run(useCaseInput)
        } catch (error) {
            throw new BadRequestException(JSON.parse(error.message))
        }
    }



}
