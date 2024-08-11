
class ToDo {
    constructor(title, description, priority, creationDate, dueDate) {
        this._title = title;
        this._description = description;
        this._priority = priority;
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