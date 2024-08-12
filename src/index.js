import { ToDoProject, ToDoTask } from "./todo";
let poopingProject = new ToDoProject('pooping reminder');
console.log(poopingProject.title);
console.table(poopingProject.toDoArray);
let poopTodo = new ToDoTask('poop', 'take a lot of poop', 'mega high' ,'10-6-2000', '11-6-2000');

console.log(`the task title is ---- ${poopTodo.title}`);
console.log(`the task description is --- ${poopTodo.description}`);
console.log(`the task priority is ---- ${poopTodo.priority}`);
console.log(`the task creation date is ---- ${poopTodo.creationDate}`);
console.log(`the task due date is ---- ${poopTodo.dueDate}`);

poopingProject.toDoArray.push(poopTodo);
console.table(poopingProject.toDoArray);