import {Table, Column, Model, HasMany, BelongsTo, ForeignKey, PrimaryKey} from 'sequelize-typescript';
import {JobList} from './joblist.model';
import {Sequelize} from 'sequelize';

@Table
export class JobItem extends Model<JobItem> {

  @Column
  title!: string;

  @Column
  description!: string;

  @Column
  startDate!: Date;

  @Column
  endDate!: Date;

  @Column
  validUntil!: Date;

  @Column
  workloadMin!: number;

  @Column
  workloadMax!: number;

  @Column
  languages!: string;

  @Column
  location!: string;

  @Column
  salaryType!: number;

  @Column
  salaryAmount!: number;

  @Column
  skills!: string;

  @Column
  accepted!: boolean;

  @Column
  messageFromAdmin!: string;

  toSimplification(): any {
    return {
      'id': this.id,
      'title': this.title,
      'description': this.description,
      'skills': this.skills,
      'startDate': this.startDate,
      'endDate': this.endDate,
      'validUntil': this.validUntil,
      'workloadMin': this.workloadMin,
      'workloadMax': this.workloadMax,
      'languages': this.languages,
      'location': this.location,
      'salaryType': this.salaryType,
      'salaryAmount': this.salaryAmount,
      'accepted': this.accepted,
      'messageFromAdmin': this.messageFromAdmin,
    };
  }

  fromSimplification(simplification: any): void {
    this.title = simplification['title'];
    this.description = simplification['description'];
    this.skills = simplification['skills'];
    this.startDate = simplification['startDate'];
    this.endDate = simplification['endDate'];
    this.validUntil = simplification['validUntil'];
    this.workloadMin = simplification['workloadMin'];
    this.workloadMax = simplification['workloadMax'];
    this.languages = simplification['languages'];
    this.location = simplification['location'];
    this.salaryType = simplification['salaryType'];
    this.salaryAmount = simplification['salaryAmount'];
    this.accepted = simplification['accepted'];
    // this.messageFromAdmin = simplification['messageFromAdmin']; Companies must not change this column.
  }

}
