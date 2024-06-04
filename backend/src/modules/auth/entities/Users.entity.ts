import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class Users {
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
  country: string;

  @Column()
  town: string;

  @Column({ default: "jobSeeker" })
  accounttype: string;

  @Column({ default: "active" })
  accountstatus: string;

  @Column({ default: "partial" })
  authstatus: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
