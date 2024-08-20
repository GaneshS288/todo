import { ToDoProject, ToDoTask } from "./todo";
import './styles.css'

let todoProject = new ToDoProject('pooping reminder');
console.log(todoProject.title);
console.table(todoProject.toDoArray);

let todo = new ToDoTask('todo', 'take a lot of tasks', 'mega high' ,'unfinished', '10-6-2000', '11-6-2000');
let anotherTodo = new ToDoTask('another todo', 'more tasks', 'very high', 'complete', '20-10-2020', '15-2-2023' );

console.log(`the task title is ---- ${todo.title}`);
console.log(`the task description is --- ${todo.description}`);
console.log(`the task priority is ---- ${todo.priority}`);
console.log(`the task creation date is ---- ${todo.creationDate}`);
console.log(`the task due date is ---- ${todo.dueDate}`);

ToDoProject.AllProjects.push(todoProject);

console.log(ToDoProject.AllProjects)

ToDoProject.deleteProject('pooping reminder');
console.log(ToDoProject.AllProjects);

