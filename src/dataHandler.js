import { ToDoProject} from "./todo";

export class dataHandler {
    static getProject(projectTitle) {
        let projectIndex = ToDoProject.AllProjects.findIndex((project) => project.title === projectTitle);
        return ToDoProject.AllProjects[projectIndex];
    }

    static getTask(taskTitle, projectTitle) {
        let project = this.getProject(projectTitle);
        let taskIndex = project.taskArray.findIndex((task) => task.title === taskTitle);

        return project.taskArray[taskIndex];
    }
}