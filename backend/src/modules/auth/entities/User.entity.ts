import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fname: string;

  @Column()
  lname: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  town: string;

  @Column()
  quarter: string;

  @Column({ default: 'client' })
  accounttype: string;

  @Column({ default: 'active' })
  accountstatus: string;

  @Column({ default: 'partial' })
  authstatus: string;

  @Column({ nullable: true })
  phone_number: string;

  @Column({ nullable: true })
  whatsapp_number: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
