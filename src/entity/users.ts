import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate} from 'typeorm';
import { hash } from '../utils/hashing';
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

    @BeforeInsert()
    @BeforeUpdate()
    async generatePasswordHash(): Promise<void> {
        this.password = await hash(this.password);
    }
}