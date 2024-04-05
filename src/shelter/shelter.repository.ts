import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Shelter } from './schemas/shelter.schema';
import IShelterRepository from './interfaces/shelter.repository.interface';

export class ShelterRepository implements IShelterRepository {
  constructor(
    @InjectModel(Shelter.name)
    private readonly shelterModule: Model<Shelter>,
  ) {}

  async get(): Promise<Shelter> {
    return await this.shelterModule.findOne();
  }
}
