export class Job {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public skills: string,
    public datePosted: number,
    public startDate: number,
    public endDate: number,
    public validUntil: number,
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
    public featured: boolean,
  ) {}
}
