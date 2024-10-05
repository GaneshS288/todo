import { ToDo } from "./todo";
import { DomMethods } from "./domMethods";
import './styles.css'

let todoProject = ToDo.addProject('practice Project');
let todoProject2 = ToDo.addProject('practice Project2');

console.log("add a new project");
console.table(ToDo.AllProjects);

console.log("delete a project");
ToDo.deleteProject('practice Project');

console.table(ToDo.AllProjects);

console.log('edit project title');
console.table(ToDo.editProjectTitle('new practice project', 'practice Project2'));

console.log("get a task from project");

console.log(ToDo.addTaskToProject('new practice project', ['first task', 'this is first task', 'high', 'pending', new Date(), '12-05-2003']));

console.log(ToDo.addTaskToProject('new practice project', ['second task', 'this is second task', 'high', 'pending', new Date(), '12-05-2005']));

console.table(ToDo.getProject('new practice project'));

console.log('edit a task');

console.table(ToDo.editTask('new practice project', 'first task', 'changed task title', 'this is changed description', 'low','complete', '12-3-04'));

console.table(ToDo.getProject('new practice project').taskArray);

console.log('delete a task');

ToDo.deleteTaskFromProject('new practice project', 'second task');

console.table(ToDo.getProject('new practice project').taskArray);

DomMethods.createProject(todoProject)
DomMethods.createTask(todoProject2.taskArray[0]);

console.log(ToDo.getProject('heelo project'));














