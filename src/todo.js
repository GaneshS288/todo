import { PubSub } from "./pubsub";

export class ToDo {

    static AllProjects = [];

    static SelectedProject;

    static #getProjectIndex(projectTitle) {
        let projectIndex = this.AllProjects.findIndex((project) => project.title === projectTitle);
        return projectIndex;
    }

    static addProject(projectTitle) {
        let project = new ToDoProject(projectTitle);
        this.AllProjects.push(project);

        this.selectProject(project)
        return project;
    }

    static deleteProject(project) {
        this.AllProjects.splice(this.#getProjectIndex(project.title), 1);
        if(this.SelectedProject === project)
            this.selectProject(this.AllProjects[0]);
        else
            this.selectProject(this.SelectedProject)
    }

    static getProject(projectTitle) {
        return this.AllProjects[this.#getProjectIndex(projectTitle)];
    }

    static selectProject(project) {
        this.AllProjects.forEach(project => project.isSelected = false);
        project.isSelected = true;
        this.SelectedProject = project;

        PubSub.publish('project selected', {allProjects : this.AllProjects, currentProject : this.SelectedProject});
    }

    static editProjectTitle(newTitle, currentTitle) {
        let project = this.getProject(currentTitle);
        project.title = newTitle;
        PubSub.publish('project edited', {allProjects : this.AllProjects, currentProject : this.SelectedProject});
        return project;
    }

    static #getTaskIndexInProject(project, taskTitle) {
        let taskIndex = project.taskArray.findIndex((task) => task.title === taskTitle);
        return taskIndex;
    }

    static addTaskToProject(projectTitle, array) {
        let project = this.getProject(projectTitle);
        let task = new ToDoTask(...array);
        project._taskArray.push(task);
        
        PubSub.publish('task added' , {currentProject : this.SelectedProject});
    }

    static deleteTaskFromProject(task) {
        let project = this.SelectedProject;
        project.taskArray.splice(this.#getTaskIndexInProject(project, task.title), 1);
        this.selectProject(this.SelectedProject);
    }

    static getTaskFromProject(projectTitle, taskTitle) {
        let project = this.getProject(projectTitle);
        return project.taskArray[this.#getTaskIndexInProject(project, taskTitle)];
    }

    static editTask(projectTitle, oldTaskTitle, newTitle, description, priority, status, dueDate) {
        let task = this.getTaskFromProject(projectTitle, oldTaskTitle);
        task.title = newTitle;
        task.description = description;
        task.priority = priority;
        task.status = status;
        task.dueDate = dueDate;

        PubSub.publish('task edited', {currentProject : this.SelectedProject});

        return task;
    }
}

class ToDoProject {

    constructor(title, taskArray = []) {
        this._title = title;
        this._isSelected = false;
        this._taskArray = taskArray;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get isSelected() {
        return this._isSelected;
    }

    set isSelected(value) {
        this._isSelected = value;
    }

    get taskArray() {
        return this._taskArray;
    }

    set taskArray(value) {
        this._taskArray = value;
    }

}

class ToDoTask {
    constructor(title, description, priority, status, dueDate) {
        this._title = title;
        this._description = description;
        this._priority = priority;
        this._status = status;
        this._creationDate = new Date();
        this._dueDate = dueDate
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get description() {
        return this._description;
    }

    set description(value) {
        this._description = value;
    }

    get priority() {
        return this._priority;
    }

    set priority(value) {
        this._priority = value;
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get creationDate() {
        return this._creationDate;
    }

    get dueDate() {
        return this._dueDate;
    }

    set dueDate(value) {
        this._dueDate = value;
    }
}