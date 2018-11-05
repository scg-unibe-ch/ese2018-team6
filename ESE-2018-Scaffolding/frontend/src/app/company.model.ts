export class Company {

  constructor(
    public id: number,
    public name: string,
    public logo: string,
    public street: string,
    public houseNumber: string,
    public zipCode: number,
    public place: string,
    public contactName: string,
    public contactEmail: string,
    public contactPhone: string,
    public website: string,
    public description: string
  ) {}
}
