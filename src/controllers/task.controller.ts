import Boom from '@hapi/boom';
import { NextFunction, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import { Tasks } from '../entity/tasks';

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await getRepository(Tasks).find({
            select: ['taskId', 'title', 'description'],
            where: { 'userUserId': req.user.id }
        });
        return res.json(tasks);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
    
}

export const getTask = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const task = await getRepository(Tasks).findOne({
            select: ['taskId', 'title', 'description'],
            where: { 'userUserId': req.user.id, 'taskId': req.params.idTask }
        });
        return res.json(task);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
    
}

export const createTask = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        // Check if the task is on the DB
        const task = await getRepository(Tasks).findOne({
            where: { 'userUserId': req.user.id, 'title': req.body.title }
        });
    
        if (task === undefined) {
            let newTask = new Tasks();
            newTask.title = req.body.title,
            newTask.description = req.body.description,
            newTask.categories = req.body.categories,
            newTask.userUserId = req.user.id;
            const taskData = getRepository(Tasks).create(newTask);
            const results = await getRepository(Tasks).save(taskData);
            return res.json(results);
        }
        return res.json({msg: 'Task already exists!'});
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        // Check if the task is on the DB
        const task = await getRepository(Tasks).findOne({
            where: { 'userUserId': req.user.id, 'taskId': req.params.idTask }
        });
        if (task) {
            const taskData = getRepository(Tasks).merge(task, req.body);
            const results = await getRepository(Tasks).save(taskData);
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
        const task = await getRepository(Tasks).findOne({
            where: { 'userUserId': req.user.id, 'taskId': req.params.idTask }
        });
        if (task) {
            const results = await getRepository(Tasks).delete(req.params.idTask);
            return res.json(results);
        }
        return res.json({msg: 'Task not found!'});
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
};