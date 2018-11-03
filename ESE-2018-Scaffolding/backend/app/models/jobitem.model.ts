import {Table, Column, Model, HasMany, BelongsTo, ForeignKey, PrimaryKey} from 'sequelize-typescript';
import {JobList} from './joblist.model';
import {Sequelize} from 'sequelize';
import {User} from './user.model';
import {Company} from './company.model';

@Table
export class JobItem extends Model<JobItem> {

  @Column
  title!: string;

  @Column
  description!: string;

  @Column
  startDate!: number;

  @Column
  endDate!: number;

  @Column
  validUntil!: number;

  @Column
  workloadMin!: number;

  @Column
  workloadMax!: number;

  @Column
  languages!: string;

  @Column
  street!: string;

  @Column
  houseNumber!: number;

  @Column
  postcode!: string;

  @Column
  city!: string;

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

  @ForeignKey(() => User)
  @Column
  companyId!: number;

  @BelongsTo(() => User,  { onDelete: 'cascade' })
  company!: User;

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
      'street': this.street,
      'houseNumber': this.houseNumber,
      'postcode': this.postcode,
      'city': this.city,
      'salaryType': this.salaryType,
      'salaryAmount': this.salaryAmount,
      'accepted': this.accepted,
      'messageFromAdmin': this.messageFromAdmin, // no need to
      'companyId': this.companyId
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
    this.street = simplification['street'];
    this.houseNumber = simplification['houseNumber'];
    this.postcode = simplification['postcode'];
    this.city = simplification['city'];
    this.salaryType = simplification['salaryType'];
    this.salaryAmount = simplification['salaryAmount'];
    this.accepted = simplification['accepted'];
    // this.messageFromAdmin = simplification['messageFromAdmin']; Companies must not change this column.
  }

}
