export class Job {

  constructor(
    public id: number,
    public title: string,
    public description: string,
    public skills: string,
    public startDate: Date,
    public endDate: Date,
    public validUntil: Date,
    public workloadMin: number,
    public workloadMax: number,
    public languages: string,
    public zipCode: number,
    public place: string,
    public salaryType: 'Monthly' | 'Hourly' | 'One Time',
    public salaryAmount: number
  ) {}
}
