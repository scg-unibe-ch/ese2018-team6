import {Table, Column, Model, HasMany, BelongsTo, ForeignKey, PrimaryKey, Unique, HasOne} from 'sequelize-typescript';
import {unique} from 'sequelize-typescript/lib/utils/array';

@Table
export class User extends Model<User> {

  @Unique
  @Column
  email!: string;

  @Column
  password!: string;

  @Column
  token!: string;

  @Column
  tokenExpirationDate!: number; // in miliseconds since 1970

  toSimplification(): any {
    return {
      'id': this.id,
      'email': this.email,
    };
  }

  fromSimplification(simplification: any): void {
    this.email = simplification['email'];
  }
}
