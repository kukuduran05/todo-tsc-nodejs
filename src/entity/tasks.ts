import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, JoinTable, AfterLoad, AfterInsert } from 'typeorm';
import { Categories } from './categories';
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

    @ManyToOne(() => Users, user => user.tasks, {onDelete: 'SET NULL'})
    user: Users;

    @ManyToMany(() => Categories, category => category.tasks, {cascade: true})
    @JoinTable()
    categories: Categories[];
}