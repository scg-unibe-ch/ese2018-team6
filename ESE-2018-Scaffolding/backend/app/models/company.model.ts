import {Table, Column, Model, HasMany, BelongsTo, ForeignKey, PrimaryKey, Default} from 'sequelize-typescript';
import {User} from './user.model';

@Table
export class Company extends Model<Company> {

  @Column
  companyName!: string;

  @Column
  companyAddress!: string;

  @Column
  contactName!: string;

  @Column
  contactPhone!: string;

  @Column
  companyDescription!: string;

  @Column
  verified!: boolean;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User)
  user!: User;

  toSimplification(): any {
    return {
      'userId': this.userId,
      'companyName': this.companyName,
      'companyAddress': this.companyAddress,
      'contactName': this.contactName,
      'contactPhone': this.contactPhone,
      'companyDescription': this.companyDescription,
      'verified': this.verified
    };
  }

  fromSimplification(simplification: any): void {
    this.companyName = simplification['companyName'];
    this.companyAddress = simplification['companyAddress'];
    this.contactName = simplification['contactName'];
    this.contactPhone = simplification['contactPhone'];
    this.companyDescription = simplification['companyDescription'];
    this.userId = simplification['userId'];
    // this.verified = simplification['verified'];
  }
}
