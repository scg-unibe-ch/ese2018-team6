export class User {

  constructor(
    public id: number,
    public email: string,
    public password: string,
    public name: string,
    public userType: 'Company',
    public street: string,
    public zipCode: number,
    public place: string,
    public website: string,
    public description: string
  ) {}
}
