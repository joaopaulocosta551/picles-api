export default class GetShelterDetailsUseCaseOutput {
  shelterName: string;
  sheltertWhatsApp: string;
  shelterEmail: string;
  shelterPhone: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: Partial<GetShelterDetailsUseCaseOutput>) {
    Object.assign(this, data);
  }
}
