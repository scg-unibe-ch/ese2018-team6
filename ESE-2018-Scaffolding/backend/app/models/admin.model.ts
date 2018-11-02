import {Table, Column, Model, HasMany, BelongsTo, ForeignKey, PrimaryKey} from 'sequelize-typescript';
import {User} from './user.model';

@Table
export class Admin extends Model<Admin> {

  @Column
  name!: string;

  @ForeignKey(() => User)
  @Column
  userId!: number;

  @BelongsTo(() => User,  { onDelete: 'cascade' })
  user!: User;

  toSimplification(): any {
    return {
      'userId': this.userId,
      'name': this.name,
    };
  }
  /*
  fromSimplification(simplification: any): void {
    this.name = simplification['name'];
    this.userId = simplification['userId'];
  }*/
}
