import { getRepository, In } from 'typeorm';
import { Tasks } from '../entity/tasks';
import { Categories } from '../entity/categories';

export async function findAll(userId: number) {
    const taskRepository = getRepository(Tasks);
    const tasks = await taskRepository.find({
        select: ['taskId', 'title', 'description'],
        relations: ['categories'],
        where: { 'userUserId': userId }
    });
    return tasks;
}

export async function find(userId: number, idTask: string) {
    const task = await findOneTask(userId, idTask);
    if (task === undefined) {
        return { msg: "Task is not found!" };
    }
    return task;
}

export async function create(title: string, description: string, categories: any, userId: number) {
    const taskRepository = getRepository(Tasks);
    const categoryRepository = getRepository(Categories);
    const task = await taskRepository.findOne({
        where: { 'userUserId': userId, 'title': title }
    });
    if (task === undefined) {
        let newTask = new Tasks();
        newTask.title = title;
        newTask.description = description;
        newTask.userUserId = userId;
        const categs = await categoryRepository.find({
            categoryId: In(categories as number[])
        });
        newTask.categories = categs;
        const taskData = await taskRepository.save(newTask);
        return taskData;

    }
    return {msg: 'Task already exists!'};
}

export async function update(idTask: string, data: any, userId: number) {
    // Check if the task is on the DB
    const taskRepository = getRepository(Tasks);
    const categoryRepository = getRepository(Categories);
    
    const existTask = await findOneTask(userId, idTask);
    if (existTask) {
        const taskData = taskRepository.merge(existTask, data);
        const categs = await categoryRepository.find({
            categoryId: In(data.categories as number[])
        });
        taskData.categories = categs;
        const results = await taskRepository.save(taskData);
        return results;
    }
    return {msg: 'Task not found!'};
}

export async function deleteTask(idTask: string, userId: number) {
    // Check if the task is on the DB
    const taskRepository = getRepository(Tasks);
    const existTask = await findOneTask(userId, idTask);
    if (existTask) {
        await taskRepository.delete(idTask);
        return {msg: `Task with ID: ${idTask} was deleted!`};
    }
    return {msg: 'Task not found!'};
}

const findOneTask = async(userId: number, idTask: string) => {
    const taskRepository = getRepository(Tasks);
    const task = await taskRepository.findOne({
        select: ['taskId', 'title', 'description'],
        relations: ['categories'],
        where: { 'userUserId': userId, 'taskId': idTask }
    });
    return task;
}