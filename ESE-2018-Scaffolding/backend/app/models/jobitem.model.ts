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
  skills!: string;

  @Column
  accepted!: boolean;

  /*@ForeignKey(() => JobList)
  @Column
  jobListId!: number;

  @BelongsTo(() => JobList)
  jobList!: JobList;
  */
  toSimplification(): any {
    return {
      'id': this.id,
      'title': this.title,
      'description': this.description,
      'skills': this.skills,
      'accepted': this.accepted,
      // 'jobListId': this.jobListId
    };
  }

  fromSimplification(simplification: any): void {
    this.title = simplification['title'];
    this.description = simplification['description'];
    // this.jobListId = simplification['jobListId'];
    this.skills = simplification['skills'];
    this.accepted = simplification['accepted'];
  }

}
