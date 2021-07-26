import express from "express";
import { validationHandler } from "../middleware/validationHandler";
import { createTaskSchema, updateTaskSchema} from "../utils/schemas/tasks";
import * as Tasks from '../controllers/task.controller';

export const taskRouter = express.Router();

/**
 * @swagger
 * components:
 *  parameters:
 *      taskId:
 *          in: path
 *          name: taskId
 *          required: true
 *          schema:
 *              type: string
 *          description: The task Id
 *  schemas:
 *      Task:
 *          type: object
 *          properties:
 *              taskId:
 *                  type: integer
 *                  description: The auto-generated id of task
 *              title:
 *                  type: string
 *                  description: The title from the task
 *              description:
 *                  type: string
 *                  description: The description from the task
 *              categories:
 *                  type: array
 *                  description: The categories Id
 *          example:
 *              title: Task 1
 *              description: Description of the task 1
 *              categories: [ idCategory ]
 */

/**
 * @swagger
 * /tasks:
 *  post:
 *      summary: Create Task
 *      tags: 
 *          - Tasks
 *      description: "Create new task."
 *      operationId: createTask
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Task'
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The Task was created successfully
 *          500:
 *              description: Some server error
 */
// New Task
taskRouter.post("/", validationHandler(createTaskSchema), Tasks.createTask);

/** 
 * @swagger
 * /tasks:
 *  get:
 *      summary: List of tasks
 *      tags: 
 *          - Tasks
 *      description: "Get list of tasks"
 *      operationId: getTasks
 *      parameters: []
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The tasks list is appear
 *          500:
 *              description: Some server error
*/
// Get All Tasks
taskRouter.get("/", Tasks.getTasks);

/** 
 * @swagger
 * /tasks/{taskId}:
 *  get:
 *      summary: Get task by Id
 *      tags: 
 *          - Tasks
 *      description: ""
 *      operationId: getTask
 *      parameters:
 *          - $ref: "#/components/parameters/taskId"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The task information is appear
 *          500:
 *              description: Some server error
 *          400:
 *              description: The task was not found
*/
// Get one Task
taskRouter.get("/:idTask", Tasks.getTask);

/** 
 * @swagger
 * /tasks/{taskId}:
 *  put:
 *      summary: Update the task by id
 *      tags: 
 *          - Tasks
 *      description: ""
 *      operationId: updateTask
 *      parameters:
 *          - $ref: "#/components/parameters/taskId"
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: "#/components/schemas/Task"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The task was updated
 *          500:
 *              description: Some server error
 *          404:
 *              description: The task was not found
 *  
*/
// Update Task
taskRouter.put("/:idTask", validationHandler(updateTaskSchema) , Tasks.updateTask);

/**
 * @swagger
 * /tasks/{taskId}:
 *  delete:
 *      summary: Delete task
 *      tags: 
 *          - Tasks
 *      description: ""
 *      operationId: deleteTask
 *      parameters:
 *          - $ref: "#/components/parameters/taskId"
 *      security:
 *          - token: []
 *      responses:
 *          200:
 *              description: The task was deleted
 *          404:
 *              description: The task was not found
 */
// Delete Task
taskRouter.delete("/:idTask", Tasks.deleteTask);
