export class Job {

  constructor(
    public title: string,
    public description: string,
    public skills: string,
    public startDate: Date,
    public endDate: Date,
    public validUntil: Date,
    public workloadMin: number,
    public workloadMax: number,
    public languages: string,
    public location: string,
    public salaryType: 'monthly' | 'hourly' | 'oneTime',
    public salaryAmount: number
  ) {}
}
