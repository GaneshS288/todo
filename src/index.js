import { ToDo } from "./todo";
import { DomMethods, renderAllProjects, renderAllProjectTasks } from "./domMethods";
import { PubSub } from "./pubsub";
import './styles.css'

PubSub.subscribe('task added', renderAllProjectTasks);
PubSub.subscribe('task edited', renderAllProjectTasks);
PubSub.subscribe('delete task clicked', ToDo.deleteTaskFromProject.bind(ToDo));

PubSub.subscribe('project edited', renderAllProjectTasks);
PubSub.subscribe('project edited', renderAllProjects);
PubSub.subscribe('project selected', renderAllProjects);
PubSub.subscribe('project selected', renderAllProjectTasks);
PubSub.subscribe('project clicked', ToDo.selectProject.bind(ToDo))
PubSub.subscribe('delete project clicked', ToDo.deleteProject.bind(ToDo));

let todoProject = ToDo.addProject('practice Project');
let todoProject2 = ToDo.addProject('practice Project2');

const mySchedule = ToDo.addProject("my schedule");
ToDo.selectProject(mySchedule);

ToDo.addTaskToProject('my schedule', ['new task1', 'this is a task description', 'high', 'complete', '10-2-2929']);
ToDo.addTaskToProject('my schedule', ['new task2', 'this is a another task description', 'low', 'completed', '2024-10-15']);
ToDo.selectProject(mySchedule);















