import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Users } from './users';

@Entity()
export class Tasks {

    @PrimaryGeneratedColumn()
    taskId: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    userUserId: number;

    @Column("simple-array")
    categories: number[];

    @ManyToOne(() => Users, user => user.tasks)
    user: Users;
}