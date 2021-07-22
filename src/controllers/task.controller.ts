import { NextFunction, Request, Response } from 'express';
import Boom from '@hapi/boom';
import * as TasksService from '../services/tasks';

export const getTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await TasksService.findAll(req.user.id);
        return res.json(tasks);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
    
}

export const getTask = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { idTask } = req.params;
        const task = await TasksService.find(req.user.id, idTask);
        return res.json(task);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const createTask = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { title, description, categories } = req.body;
        const newTask = await TasksService.create(title, description, categories, req.user.id);
        return res.json(newTask);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const updateTask = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { idTask } = req.params;
        const data = req.body;
        const results = await TasksService.update(idTask, data, req.user.id);
        return res.json(results);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
}

export const deleteTask = async (req: Request, res: Response, next: NextFunction)=> {
    try {
        const { idTask } = req.params;
        const results = await TasksService.deleteTask(idTask, req.user.id);
        return res.json(results);
    } catch(err) {
        return next(Boom.badRequest(err.message));
    }
};