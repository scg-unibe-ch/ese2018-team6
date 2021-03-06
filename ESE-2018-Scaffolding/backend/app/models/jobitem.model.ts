import {Table, Column, Model, HasMany, BelongsTo, ForeignKey, PrimaryKey} from 'sequelize-typescript';
import {User} from './user.model';

@Table
export class JobItem extends Model<JobItem> {

  @Column
  title!: string;

  @Column
  description!: string;

  @Column
  datePosted!: number;

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
  firstLanguage!: string;

  @Column
  secondLanguage!: string;

  @Column
  street!: string;

  @Column
  houseNumber!: string;

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
  featured!: boolean;

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
      'datePosted' : this.datePosted,
      'startDate': this.startDate,
      'endDate': this.endDate,
      'validUntil': this.validUntil,
      'workloadMin': this.workloadMin,
      'workloadMax': this.workloadMax,
      'firstLanguage': this.firstLanguage,
      'secondLanguage': this.secondLanguage,
      'street': this.street,
      'houseNumber': this.houseNumber,
      'postcode': this.postcode,
      'city': this.city,
      'salaryType': this.salaryType,
      'salaryAmount': this.salaryAmount,
      'companyId': this.companyId,
      'featured' : this.featured,
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
    this.firstLanguage = simplification['firstLanguage'];
    this.secondLanguage = simplification['secondLanguage'];
    this.street = simplification['street'];
    this.houseNumber = simplification['houseNumber'];
    this.postcode = simplification['postcode'];
    this.city = simplification['city'];
    this.salaryType = simplification['salaryType'];
    this.salaryAmount = simplification['salaryAmount'];
  }

}
