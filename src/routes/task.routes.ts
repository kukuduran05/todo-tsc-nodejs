import express from "express";
import { validationHandler } from "../middleware/validationHandler";
import { createTaskSchema, updateTaskSchema} from "../utils/schemas/tasks";
import * as Tasks from '../controllers/task.controller';

export const taskRouter = express.Router();

// New Task
taskRouter.post("/", validationHandler(createTaskSchema), Tasks.createTask);
// Get All Tasks
taskRouter.get("/", Tasks.getTasks);
// Get one Task
taskRouter.get("/:idTask", Tasks.getTask);
// Update Task
taskRouter.put("/:idTask", validationHandler(updateTaskSchema) , Tasks.updateTask);
// Delete Task
taskRouter.delete("/:idTask", Tasks.deleteTask);
