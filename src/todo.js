export class ToDoProject {

    static AllProjects = [];

    constructor(title, taskArray = []) {
        this._title = title;
        this._taskArray = taskArray;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get taskArray() {
        return this._taskArray;
    }

    set taskArray(value) {
        this._taskArray = value;
    }

    static deleteProject(projectTitle) {

        let projectIndex = this.AllProjects.findIndex((item) => item.title === projectTitle);

        this.AllProjects.splice(projectIndex, 1);
    }

    static deleteTask(projectTitle, taskTitle) {
        let parentProject = this.AllProjects[this.AllProjects.findIndex((project) => project.title === projectTitle)];
        let taskIndex = parentProject.taskArray.findIndex((task) => task.title === taskTitle);

        parentProject.taskArray.splice(taskIndex, 1);
    }
}

export class ToDoTask {
    constructor(title, description, priority, status, creationDate, dueDate) {
        this._title = title;
        this._description = description;
        this._priority = priority;
        this._status = status;
        this._creationDate = creationDate;
        this._dueDate = dueDate
    }

    get title() {
        return this._title;
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