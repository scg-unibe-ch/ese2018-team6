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

  toSimplification(): any {
    return {
      'id': this.id,
      'email': this.email,
      'password': this.password,
      'token' : this.token
    };
  }

  fromSimplification(simplification: any): void {
    this.email = simplification['email'];
    this.password = simplification['password'];
    this.token = simplification['token'];
  }
}
