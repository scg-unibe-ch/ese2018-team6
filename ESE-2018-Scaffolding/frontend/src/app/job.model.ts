export class Job {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public skills: string,
    public datePosted: Date,
    public startDate: Date,
    public endDate: Date,
    public validUntil: Date,
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
    public accepted: boolean,
  ) {}
}
