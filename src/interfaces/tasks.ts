import { BasicCategory } from "./categories";
import { BasicUser } from "./users";

export interface BasicTask{
    taskId: number
}

export interface Task extends BasicTask{
    title: string,
    description?: string,
    categoryId: BasicCategory,
    userId: BasicUser
}