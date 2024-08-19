export class ToDoProject {
    constructor(title, toDoArray = []) {
        this._title = title;
        this._toDoArray = toDoArray;
    }

    get title() {
        return this._title;
    }

    set title(value) {
        this._title = value;
    }

    get toDoArray() {
        return this._toDoArray;
    }

    set toDoArray(value) {
        this._toDoArray = value;
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