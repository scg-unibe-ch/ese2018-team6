export class JobItem {

  constructor(
    public id: number,
    public jobListId: number,
    public title: string,
    public description: string,
    public skills: string
  ) { }
}
