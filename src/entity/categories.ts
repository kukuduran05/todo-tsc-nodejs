import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Tasks } from './tasks';
import { Users } from './users';

@Entity()
export class Categories {

    @PrimaryGeneratedColumn()
    categoryId: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    userUserId: number;
    
    @ManyToOne(() => Users, user => user.categories, {onDelete: 'SET NULL'})
    user: Users;

    @ManyToMany(() => Tasks, task => task.categories)
    tasks: Tasks[];
}