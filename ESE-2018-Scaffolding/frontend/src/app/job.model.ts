export class Job {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public skills: string,
    public datePosted: string,
    public startDate: string,
    public endDate: string,
    public validUntil: string,
    public workloadMin: number,
    public workloadMax: number,
    public firstLanguage: string,
    public secondLanguage: string,
    public street: string,
    public houseNumber: string,
    public postcode: number,
    public city: string,
    public salaryType: 'Monthly' | 'Hourly' | 'One Time',
    public salaryAmount: number,
    public companyId: number,
    public messageFromAdmin: string,
  ) {}
}
