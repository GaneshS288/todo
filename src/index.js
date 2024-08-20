import { ToDoProject, ToDoTask } from "./todo";
import './styles.css'

let todoProject = new ToDoProject('practice project');
console.log(todoProject.title);
console.table(todoProject.taskArray);

let todo = new ToDoTask('todo', 'take a lot of tasks', 'mega high' ,'unfinished', '10-6-2000', '11-6-2000');
let anotherTodo = new ToDoTask('another todo', 'more tasks', 'very high', 'complete', '20-10-2020', '15-2-2023' );

todoProject.taskArray.push(todo);
todoProject.taskArray.push(anotherTodo);

console.table(todoProject.taskArray[0])

ToDoProject.AllProjects.push(todoProject);

console.log(todoProject)





