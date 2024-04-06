export default class UpdateShelterDetailsUsCaseInput {
  name: string;
  whatsApp: string;
  email: string;
  phone: string;

  constructor(data: Partial<UpdateShelterDetailsUsCaseInput>) {
    Object.assign(this, data);
  }
}
