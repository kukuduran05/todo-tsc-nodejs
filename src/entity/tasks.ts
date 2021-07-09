import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, AfterLoad, getRepository } from 'typeorm';
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

    @Column("simple-array")
    categories: any[];

    @ManyToOne(() => Users, user => user.tasks)
    user: Users;

    @AfterLoad()
    async getTasksWithCategories(): Promise<void> {
        for (let i = 0; i < this.categories.length; i++) {
            const cats = await getRepository(Categories).findOne({
                select: ['title'],
                where: {'categoryId': this.categories[i]}
            });
            this.categories[i] = cats?.title;
        }
    }
}