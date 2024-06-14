import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
  } from "typeorm";
  
  @Entity()
  export class Company {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    userId: number;
    
    @Column()
    logo:string;

    @Column()
    name:string

    @Column()
    year:Date;

    @Column()
    phone:string;

    @Column()
    whatsapp:string;

    @Column()
    country:string;

    @Column()
    town:string;

    @Column({ type: 'simple-array' })
    services: string[];

    @Column()
    background:string;

    @Column({default:''})
    facebook:string;

    @Column({default:''})
    linkedin:string;

    @Column({default:''})
    website:string;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
  }