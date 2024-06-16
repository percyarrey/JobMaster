
import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class Job {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    userId:number;
    
    @Column()
    companyId:number;
    
    @Column()
    name:string;
    
    @Column()
    category:string;

    @Column()
    minsalary:number;

    @Column()
    maxsalary:number;

    @Column({ type: 'simple-array' })
    requirements: string[];

    @Column()
    description:string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }