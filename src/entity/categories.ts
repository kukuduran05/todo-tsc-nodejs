import { Entity, PrimaryGeneratedColumn, Column, ManyToOne} from 'typeorm';
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
    
    @ManyToOne(() => Users, user => user.categories)
    user: Users;
}