import {Table, Column, Model, HasMany, BelongsTo, ForeignKey, PrimaryKey, Default} from 'sequelize-typescript';
import {User} from './user.model';

@Table
export class Company extends Model<Company> {

  @Column
  companyName!: string;

  @Column
  companyStreet!: string;

  @Column
  companyHouseNumber!: number;

  @Column
  companyPostcode!: string;

  @Column
  companyCity!: string;

  @Column
  contactName!: string;

  @Column
  contactPhone!: string;

  @Column
  companyDescription!: string;

  @Column
  verified!: boolean;

  @Column
  messageFromAdmin!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User,  { onDelete: 'cascade' })
  user!: User;

  toSimplification(): any {
    return {
      'userId': this.userId,
      'companyName': this.companyName,
      'companyStreet': this.companyStreet,
      'companyHouseNumber': this.companyHouseNumber,
      'companyPostcode': this.companyPostcode,
      'companyCity': this.companyCity,
      'contactName': this.contactName,
      'contactPhone': this.contactPhone,
      'companyDescription': this.companyDescription,
    };
  }

  fromSimplification(simplification: any): void {
    this.companyName = simplification['companyName'];
    this.companyStreet = simplification['companyStreet'];
    this.companyHouseNumber = simplification['companyHouseNumber'];
    this.companyPostcode = simplification['companyPostcode'];
    this.companyCity = simplification['companyCity'];
    this.contactName = simplification['contactName'];
    this.contactPhone = simplification['contactPhone'];
    this.companyDescription = simplification['companyDescription'];
    // this.userId = simplification['userId'];
    // this.verified = simplification['verified'];
  }
}
