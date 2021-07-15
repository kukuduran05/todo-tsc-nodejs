import Boom from '@hapi/boom';
import { Categories } from '../entity/categories';
import { NextFunction, Request, Response } from 'express';
import { getRepository, In } from 'typeorm';
import { Tasks } from '../entity/tasks';


export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const taskRepository = getRepository(Tasks);
        const tasks = await taskRepository.find({
            select: ['taskId', 'title', 'description'],
            relations: ['categories'],
            where: { 'userUserId': req.user.id }
        });
        return res.json(tasks);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
    
}

export const getTask = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { idTask } = req.params;
        const task = await findOneTask(req.user.id, idTask);
        return res.json(task);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const createTask = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { title, description, categories } = req.body;
        const taskRepository = getRepository(Tasks);
        const categoryRepository = getRepository(Categories);
        const task = await taskRepository.findOne({
            where: { 'userUserId': req.user.id, 'title': title }
        });
        if (task === undefined) {
            let newTask = new Tasks();
            newTask.title = title;
            newTask.description = description;
            newTask.userUserId = req.user.id;
            const categs = await categoryRepository.find({
                categoryId: In(categories as number[])
            });
            newTask.categories = categs;
            const taskData = await taskRepository.save(newTask);
            return res.json(taskData);

        }
        return res.json({msg: 'Task already exists!'});
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        // Check if the task is on the DB
        const taskRepository = getRepository(Tasks);
        const categoryRepository = getRepository(Categories);
        const { idTask } = req.params;
        const existTask = await findOneTask(req.user.id, idTask);
        if (existTask) {
            const taskData = taskRepository.merge(existTask, req.body);
            const categs = await categoryRepository.find({
                categoryId: In(req.body.categories as number[])
            });
            taskData.categories = categs;
            const results = await taskRepository.save(taskData);
            return res.json(results);
        }
        return res.json({msg: 'Task not found!'});
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        // Check if the task is on the DB
        const taskRepository = getRepository(Tasks);
        const { idTask } = req.params;
        const existTask = await findOneTask(req.user.id, idTask);
        if (existTask) {
            await taskRepository.delete(idTask);
            return res.json({msg: `Task with ID: ${idTask} was deleted!`});
        }
        return res.json({msg: 'Task not found!'});
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
};

const findOneTask = async(userId: number, idTask: string) => {
    const taskRepository = getRepository(Tasks);
    const task = await taskRepository.findOne({
        select: ['taskId', 'title', 'description'],
        relations: ['categories'],
        where: { 'userUserId': userId, 'taskId': idTask }
    });
    return task;
}