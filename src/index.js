import { ToDoProject, ToDoTask } from "./todo";
import { DomMethods } from "./domMethods";
import { dataHandler } from "./dataHandler";
import './styles.css'

let todoProject = new ToDoProject('practice project');
console.log(todoProject.title);
console.table(todoProject.taskArray);

let todo = new ToDoTask('todo', 'take a lot of tasks', 'high' ,'pending', '10-6-2000', '11-6-2000');
let anotherTodo = new ToDoTask('another todo', 'more tasks', 'medium', 'complete', '20-10-2020', '15-2-2023' );

todoProject.taskArray.push(todo);
todoProject.taskArray.push(anotherTodo);

console.table(todoProject.taskArray[0])

ToDoProject.AllProjects.push(todoProject);


DomMethods.createTask(todo);
DomMethods.createTask(anotherTodo);

DomMethods.createProject(todoProject)

console.log(dataHandler.getProject('practice project'));

console.log(dataHandler.getTask('another todo', 'practice project'));









