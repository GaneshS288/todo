import { getUserInputForProject, getUserInputForTask } from "./dataParser.js";

export class DomMethods {

    static #ProjectsParent = document.querySelector('.todo-project-container')
    static FormDialog = document.querySelector('.form-dialog');

    static #HighPriorityTaskContainer = document.querySelector('.high-priority-tasks');
    static #MediumPriorityTaskContainer = document.querySelector('.medium-priority-tasks');
    static #LowPriorityTaskContainer = document.querySelector('.low-priority-tasks');


    static createProject(project) {
        let projectWrapper = document.createElement('div');
        projectWrapper.classList.add('project');

        let projectTitle = document.createElement('button');
        projectTitle.classList.add('project-title');
        projectTitle.textContent = project.title;
        projectWrapper.append(projectTitle);

        let projectButtonWrapper = document.createElement('div');
        projectButtonWrapper.classList.add('project-button-container');
        projectWrapper.append(projectButtonWrapper)

        let projectEditButton = document.createElement('button');
        projectEditButton.textContent = 'Edit';
        projectEditButton.classList.add('project-edit-button');
        projectEditButton.addEventListener('click', () => {
            this.FormDialog.showModal();
            this.newProjectForm();
        })
        projectButtonWrapper.append(projectEditButton);

        let projectDeleteButton = document.createElement('button');
        projectDeleteButton.textContent = 'Delete';
        projectDeleteButton.classList.add('project-delete-button');
        projectDeleteButton.addEventListener('click', () => projectWrapper.remove());
        projectButtonWrapper.append(projectDeleteButton);

        this.#appendProject(projectWrapper);
    }

    static #appendProject(project) {
        this.#ProjectsParent.append(project);
    }

    static createTask(task) {
        let taskWrapper = document.createElement('div');
        taskWrapper.classList.add('task');

        let taskTitle = document.createElement('h4');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = task.title;
        taskWrapper.append(taskTitle);

        let taskDescription = document.createElement('p');
        taskDescription.classList.add('task-description');
        taskDescription.textContent = task.description;
        taskWrapper.append(taskDescription);

        let dateAndStatusContainer = document.createElement('div');
        dateAndStatusContainer.classList.add('task-dates-and-status');
        taskWrapper.append(dateAndStatusContainer);

        let taskStatus = document.createElement('p');
        taskStatus.textContent = task.status;
        taskStatus.classList.add('task-status');
        dateAndStatusContainer.append(taskStatus);

        let taskCreationDate = document.createElement('p');
        taskCreationDate.textContent = task.creationDate;
        taskCreationDate.classList.add('task-creation-date');
        dateAndStatusContainer.append(taskCreationDate);

        let taskDueDate = document.createElement('p');
        taskDueDate.textContent = task.dueDate;
        taskDueDate.classList.add('task-due-date');
        dateAndStatusContainer.append(taskDueDate);

        let taskButtonWrapper = document.createElement('div');
        taskButtonWrapper.classList.add('task-button-container');
        taskWrapper.append(taskButtonWrapper);

        let taskEditButton = document.createElement('button');
        taskEditButton.textContent = 'Edit';
        taskEditButton.classList.add('task-edit-button');
        taskEditButton.addEventListener('click', () => {
            this.FormDialog.showModal();
            this.editTaskForm(task);
        })


        let taskDeleteButton = document.createElement('button');
        taskDeleteButton.textContent = 'Delete';
        taskDeleteButton.classList.add('task-delete-button');
        taskDeleteButton.addEventListener('click', () => taskWrapper.remove())
        taskButtonWrapper.append(taskEditButton, taskDeleteButton);

        this.#appendTask(taskWrapper, task.priority);
    }

    static #appendTask(task, priority) {
        let parentContainer;

        if (priority === 'high')
            parentContainer = this.#HighPriorityTaskContainer;

        else if (priority == 'medium')
            parentContainer = this.#MediumPriorityTaskContainer;

        else
            parentContainer = this.#LowPriorityTaskContainer;

        parentContainer.append(task);
    }

    static newProjectForm(event) {
        const form = document.createElement('form');
        form.method = 'dialog';
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = 'Create New Project';

        //title
        let projectTitleInput = document.createElement('input');
        projectTitleInput.classList.add('project-title-input');
        projectTitleInput.id = 'project-title';
        projectTitleInput.type = 'text';

        let projectTitleLable = document.createElement('label');
        projectTitleLable.htmlFor = 'project-title';
        projectTitleLable.textContent = 'Project title:';

        //buttons
        let formSubmitButton = document.createElement('button');
        formSubmitButton.classList.add('submit');
        formSubmitButton.textContent = 'Submit';
        formSubmitButton.type = 'button';
        formSubmitButton.addEventListener('click', () => console.log(getUserInputForProject(projectTitleInput)));

        let formCancelButton = document.createElement('button');
        formCancelButton.classList.add('cancel');
        formCancelButton.textContent = 'Cancel';
        formCancelButton.type = 'button';
        formCancelButton.addEventListener('click', () => {
            this.FormDialog.removeChild(form);
            this.FormDialog.close();
        })

        let formButtonWrapper = document.createElement('div');
        formButtonWrapper.append(formSubmitButton, formCancelButton);

        form.append(fieldset);
        fieldset.append(legend);
        fieldset.append(projectTitleLable);
        fieldset.append(projectTitleInput);
        fieldset.append(formButtonWrapper);

        this.FormDialog.append(form);
    }

    static newTaskForm() {
        const form = document.createElement('form');
        form.method = 'dialog';
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = 'Add New Task';

        //task title input
        const titleInputWrapper = document.createElement('div');

        const titleLabel = document.createElement('label');
        titleLabel.htmlFor = 'task-title';
        titleLabel.textContent = 'Title :'

        const titleInput = document.createElement('input');
        titleInput.id = 'task-title';
        titleInput.type = 'text';

        titleInputWrapper.append(titleLabel);
        titleInputWrapper.append(titleInput);

        //task description input
        const descriptionInputWrapper = document.createElement('div');
        const descriptionTextarea = document.createElement('textarea');
        descriptionTextarea.id = 'task-description';

        const descriptionLable = document.createElement('label');
        descriptionLable.htmlFor = 'task-description';
        descriptionLable.textContent = 'Description :'

        descriptionInputWrapper.append(descriptionLable);
        descriptionInputWrapper.append(descriptionTextarea);

        //task priority
        const priorityInputWrapper = document.createElement('div');

        const priorityLabel = document.createElement('label');
        priorityLabel.htmlFor = 'task-priority-select';
        priorityLabel.textContent = 'Priority :';

        const taskPrioritySelect = document.createElement('select');
        taskPrioritySelect.name = 'task-priority';
        taskPrioritySelect.id = 'task-priority-select'

        const optionHigh = document.createElement('option');
        optionHigh.value = 'high';
        optionHigh.textContent = 'High';

        const optionMedium = document.createElement('option');
        optionMedium.value = 'medium';
        optionMedium.textContent = 'Medium';

        const optionLow = document.createElement('option');
        optionLow.value = 'low';
        optionLow.textContent = 'Low';

        taskPrioritySelect.append(optionHigh, optionMedium, optionLow);
        priorityInputWrapper.append(priorityLabel, taskPrioritySelect);

        //task status input
        const statusInputWrapper = document.createElement('div');

        const taskStatusLabel = document.createElement('label');
        taskStatusLabel.htmlFor = 'task-status-select';
        taskStatusLabel.textContent = 'Task Status :';

        const taskStatusSelect = document.createElement('select');
        taskStatusSelect.id = 'task-status-select';
        taskStatusSelect.name = 'task-priority';

        const optionCompleted = document.createElement('option');
        optionCompleted.textContent = 'Completed';
        optionCompleted.value = 'completed';

        const optionPending = document.createElement('option');
        optionPending.textContent = 'Pending';
        optionPending.value = 'pending';

        const optionExpired = document.createElement('option');
        optionExpired.textContent = 'Expired';
        optionExpired.value = 'expired';

        taskStatusSelect.append(...[optionCompleted, optionPending, optionExpired]);
        statusInputWrapper.append(taskStatusLabel);
        statusInputWrapper.append(taskStatusSelect);

        //due date
        const dueDateWrapper = document.createElement('div');

        const taskDueDateLabel = document.createElement('label');
        taskDueDateLabel.htmlFor = 'task-duedate-input';
        taskDueDateLabel.textContent = 'Due Date :';

        const taskDueDateInput = document.createElement('input');
        taskDueDateInput.id = 'task-duedate-input';
        taskDueDateInput.type = 'date';

        dueDateWrapper.append(taskDueDateLabel, taskDueDateInput);


        taskPrioritySelect.append(optionHigh, optionMedium, optionLow);
        priorityInputWrapper.append(priorityLabel, taskPrioritySelect);

        //buttons
        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('form-button-container');

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.type = 'button';
        submitButton.addEventListener('click', () => console.log(getUserInputForTask(titleInput, descriptionTextarea, taskPrioritySelect, taskStatusSelect, taskDueDateInput)));

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.type = 'button';
        cancelButton.addEventListener('click', () => {
            this.FormDialog.removeChild(form);
            this.FormDialog.close();
        });

        buttonWrapper.append(submitButton, cancelButton);

        //append everything to form
        form.append(fieldset);
        fieldset.append(legend, titleInputWrapper, descriptionInputWrapper, priorityInputWrapper, statusInputWrapper, dueDateWrapper, buttonWrapper);
        this.FormDialog.append(form);
    }

    static editTaskForm(task) {
        const form = document.createElement('form');
        form.method = 'dialog';
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = 'Edit Task';

        //task title input
        const titleInputWrapper = document.createElement('div');

        const titleLabel = document.createElement('label');
        titleLabel.htmlFor = 'task-title';
        titleLabel.textContent = 'Title :'

        const titleInput = document.createElement('input');
        titleInput.id = 'task-title';
        titleInput.type = 'text';
        titleInput.value = task.title;

        titleInputWrapper.append(titleLabel);
        titleInputWrapper.append(titleInput);

        //task description input
        const descriptionInputWrapper = document.createElement('div');
        const descriptionTextarea = document.createElement('textarea');
        descriptionTextarea.id = 'task-description';

        const descriptionLable = document.createElement('label');
        descriptionLable.htmlFor = 'task-description';
        descriptionLable.textContent = 'Description :'

        descriptionInputWrapper.append(descriptionLable);
        descriptionInputWrapper.append(descriptionTextarea);

        //task priority
        const priorityInputWrapper = document.createElement('div');


        const priorityLabel = document.createElement('label');
        priorityLabel.htmlFor = 'task-priority-select';
        priorityLabel.textContent = 'Priority :';

        const taskPrioritySelect = document.createElement('select');
        taskPrioritySelect.name = 'task-priority';
        taskPrioritySelect.id = 'task-priority-select'

        const optionHigh = document.createElement('option');
        optionHigh.value = 'high';
        optionHigh.textContent = 'High';

        const optionMedium = document.createElement('option');
        optionMedium.value = 'medium';
        optionMedium.textContent = 'Medium';

        const optionLow = document.createElement('option');
        optionLow.value = 'low';
        optionLow.textContent = 'Low';

        taskPrioritySelect.append(optionHigh, optionMedium, optionLow);
        priorityInputWrapper.append(priorityLabel, taskPrioritySelect);

        //task status input
        const statusInputWrapper = document.createElement('div');

        const taskStatusLabel = document.createElement('label');
        taskStatusLabel.htmlFor = 'task-status-select';
        taskStatusLabel.textContent = 'Task Status :';

        const taskStatusSelect = document.createElement('select');
        taskStatusSelect.id = 'task-status-select';
        taskStatusSelect.name = 'task-priority';

        const optionCompleted = document.createElement('option');
        optionCompleted.textContent = 'Completed';
        optionCompleted.value = 'completed';

        const optionPending = document.createElement('option');
        optionPending.textContent = 'Pending';
        optionPending.value = 'pending';

        const optionExpired = document.createElement('option');
        optionExpired.textContent = 'Expired';
        optionExpired.value = 'expired';

        taskStatusSelect.append(...[optionCompleted, optionPending, optionExpired]);
        statusInputWrapper.append(taskStatusLabel);
        statusInputWrapper.append(taskStatusSelect);

        //due date
        const dueDateWrapper = document.createElement('div');

        const taskDueDateLabel = document.createElement('label');
        taskDueDateLabel.htmlFor = 'task-duedate-input';
        taskDueDateLabel.textContent = 'Due Date :';

        const taskDueDateInput = document.createElement('input');
        taskDueDateInput.id = 'task-duedate-input';
        taskDueDateInput.type = 'date';

        dueDateWrapper.append(taskDueDateLabel, taskDueDateInput);

        //buttons

        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('form-button-container');

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.type = 'button';

        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cancel';
        cancelButton.type = 'button';
        cancelButton.addEventListener('click', () => {
            this.FormDialog.removeChild(form);
            this.FormDialog.close();
        })

        buttonWrapper.append(submitButton, cancelButton);

        //append everything to form
        form.append(fieldset);
        fieldset.append(legend, titleInputWrapper, descriptionInputWrapper, priorityInputWrapper, statusInputWrapper, dueDateWrapper, buttonWrapper);
        this.FormDialog.append(form);
    }
}

const addProjectButton = document.querySelector('.add-project-button');
addProjectButton.addEventListener('click', (event) => {
    DomMethods.FormDialog.showModal();
    DomMethods.newProjectForm(event);
})

const addTaskButton = document.querySelector('.add-task-button');
addTaskButton.addEventListener('click', () => {
    DomMethods.FormDialog.showModal();
    DomMethods.newTaskForm();
})