import {Entity, Column, PrimaryGeneratedColumn, OneToMany, BeforeInsert, BeforeUpdate, Unique} from 'typeorm';
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
        console.log("entra");
    }

    // @BeforeInsert()
    // async checkIfUserExist() {
    //     const user = await getRepository(Users).findOne({
    //         'email': this.email
    //     });
    //     console.log("-----",user);
    //     if (!user) {
    //         this.userExist = false;
    //         // /return false;
    //     } else {
    //         console.log("devuelve mensaje de error");
    //         this.userExist = true;
    //         // next(Boom.badRequest('Username already exists!'))
    //         // return res.json({msg: 'Username already exists!'});
    //     }
    // }
}