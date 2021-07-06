import {Entity, Column, PrimaryGeneratedColumn, OneToMany} from 'typeorm';
import { Categories } from './categories';
import { Tasks } from './tasks';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column()
    name: string;

    @Column()
    lastname: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @OneToMany(() => Categories, category => category.user)
    categories: Categories[];

    @OneToMany(() => Tasks, task => task.user)
    tasks: Tasks[];
}