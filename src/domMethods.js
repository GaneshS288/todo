export class DomMethods {

    static HighPriorityContainer = document.querySelector('.high-priority-tasks');
    static MediumPriorityContainer = document.querySelector('.medium-priority-tasks');
    static LowPriorityContainer = document.querySelector('.low-priority-tasks');

    static createTask(title, description, priority, status, creationDate, dueDate) {

        let taskContainer = document.createElement('div');
        taskContainer.classList.add('task');

        let taskTitle = document.createElement('h3');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = title;
        taskContainer.append(taskTitle);

        let taskDescription = document.createElement('p');
        taskDescription.classList.add('task-description');
        taskDescription.textContent = description;
        taskContainer.append(taskDescription);

        let dateAndStatusContainer = document.createElement('div');
        dateAndStatusContainer.classList.add('task-dates-and-status');
        taskContainer.append(dateAndStatusContainer);

        let taskStatus = document.createElement('p');
        taskStatus.textContent = status;
        taskStatus.classList.add('task-status');
        dateAndStatusContainer.append(taskStatus);

        let taskCreationDate = document.createElement('p');
        taskCreationDate.textContent = creationDate;
        taskCreationDate.classList.add('task-creation-date');
        dateAndStatusContainer.append(taskCreationDate);

        let taskDueDate = document.createElement('p');
        taskDueDate.textContent = dueDate;
        taskDueDate.classList.add('task-due-date');
        dateAndStatusContainer.append(taskDueDate);

        let taskButtonContainer = document.createElement('div');
        taskButtonContainer.classList.add('task-button-container');
        taskContainer.append(taskButtonContainer);

        let taskEditButton = document.createElement('button');
        taskEditButton.textContent = 'Edit';
        taskEditButton.classList.add('task-edit-button');
        taskButtonContainer.append(taskEditButton);

        let taskDeleteButton = document.createElement('button');
        taskDeleteButton.textContent = 'Delete';
        taskDeleteButton.classList.add('task-delete-button');
        taskButtonContainer.append(taskDeleteButton);

        this.appendTask(taskContainer, priority);
    }

    static appendTask(task, priority) {
        let parentContainer;

        if (priority === 'high')
            parentContainer = this.HighPriorityContainer;
        else if (priority == 'medium')
            parentContainer = this.MediumPriorityContainer;
        else
            parentContainer = this.LowPriorityContainer;

        parentContainer.append(task);
    } 
}