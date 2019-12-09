import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../shared/base.entity';

@Entity()
export class User extends BaseEntity {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  role: string;

  @Column()
  password: string;
}
