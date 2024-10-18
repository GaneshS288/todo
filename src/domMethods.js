import { dataParser } from "./dataParser.js";
import { PubSub } from "./pubsub.js";

export class DomMethods {

    static FormDialog = document.querySelector('.form-dialog');

    static createProject(project) {
        let projectWrapper = document.createElement('div');
        projectWrapper.classList.add('project');

        if(project.isSelected === true) {
            projectWrapper.classList.add('selected');
        }
        projectWrapper.addEventListener('click', () => {
            PubSub.publish('project clicked', project)
        })

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
            this.editProjectForm(project);
        })
        projectButtonWrapper.append(projectEditButton);

        let projectDeleteButton = document.createElement('button');
        projectDeleteButton.textContent = 'Delete';
        projectDeleteButton.classList.add('project-delete-button');
        projectDeleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            PubSub.publish('delete project clicked', project);
        });
        projectButtonWrapper.append(projectDeleteButton);

        const ProjectsContainer = document.querySelector('.todo-project-container');
        ProjectsContainer.prepend(projectWrapper);
    }

    static createTask(task) {
        const taskWrapper = document.createElement('div');
        taskWrapper.classList.add('task');

        const titleWrapper = document.createElement('div');

        const titleHeading = document.createElement('h4');
        titleHeading.textContent = 'Title -';
        const taskTitle = document.createElement('h4');
        taskTitle.classList.add('task-title');
        taskTitle.textContent = task.title;

        titleWrapper.append(titleHeading, taskTitle)

        const descriptionWrapper = document.createElement('div');

        const descriptionHeading = document.createElement('h4');
        descriptionHeading.textContent = 'Description - ';
        const taskDescription = document.createElement('p');
        taskDescription.classList.add('task-description');
        taskDescription.textContent = task.description;

        descriptionWrapper.append(descriptionHeading, taskDescription);
        
        let dateAndStatusContainer = document.createElement('div');
        dateAndStatusContainer.classList.add('task-dates-and-status');
        

        let taskStatus = document.createElement('p');
        taskStatus.textContent = task.status;
        taskStatus.classList.add('task-status');
        dateAndStatusContainer.append(taskStatus);

        const taskCreationDate = document.createElement('p');
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
        taskDeleteButton.addEventListener('click', () => {
            PubSub.publish('delete task clicked', task);
        })
        taskButtonWrapper.append(taskEditButton, taskDeleteButton);

        taskWrapper.append(titleWrapper, descriptionWrapper, dateAndStatusContainer, taskButtonWrapper)

        const tasksContainer = document.querySelector('.tasks-container');
        tasksContainer.append(taskWrapper);
    }

    

    static newProjectForm() {
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
        formSubmitButton.addEventListener('click', () => {
            const isValidInput = dataParser.isValidNewProjectInput(projectTitleInput);
            this.processFormResponse(isValidInput, projectTitleInput);
        });

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


    static editProjectForm(project) {
        const form = document.createElement('form');
        form.method = 'dialog';
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = 'Edit Project';

        //title
        let projectTitleInput = document.createElement('input');
        projectTitleInput.classList.add('project-title-input');
        projectTitleInput.id = 'project-title';
        projectTitleInput.type = 'text';
        projectTitleInput.value = project.title;

        let projectTitleLable = document.createElement('label');
        projectTitleLable.htmlFor = 'project-title';
        projectTitleLable.textContent = 'Project title:';

        //buttons
        let formSubmitButton = document.createElement('button');
        formSubmitButton.classList.add('submit');
        formSubmitButton.textContent = 'Submit';
        formSubmitButton.type = 'button';
        formSubmitButton.addEventListener('click', () => {
            const isValidInput = dataParser.isValidEditProjectInput(project, projectTitleInput);
            this.processFormResponse(isValidInput, projectTitleInput);
        });

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
        submitButton.addEventListener('click', () => {
            const isValidInput = dataParser.isValidNewTaskinput([titleInput, descriptionTextarea, taskPrioritySelect, taskStatusSelect, taskDueDateInput]);
            this.processFormResponse(isValidInput, titleInput)
        });

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
        descriptionTextarea.value = task.description;

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

        switch(task.priority) {
            case 'high':
                optionHigh.selected = true;
            case 'medium':
                optionMedium.selected = true;
            case 'low':
                optionLow.selected = true;        
        }

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

        switch(task.status) {
            case 'completed':
                optionCompleted.selected = true;
            case 'pending':
                optionPending.selected = true;
            case 'expired':
                optionExpired.selected = true;        
        }

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
        taskDueDateInput.value = task.dueDate;

        dueDateWrapper.append(taskDueDateLabel, taskDueDateInput);

        //buttons

        const buttonWrapper = document.createElement('div');
        buttonWrapper.classList.add('form-button-container');

        const submitButton = document.createElement('button');
        submitButton.textContent = 'Submit';
        submitButton.type = 'button';
        submitButton.addEventListener('click', () => {
            const isValidInput = dataParser.isValidEditTaskData(task, [titleInput, descriptionTextarea, taskPrioritySelect, taskStatusSelect, taskDueDateInput]);
            this.processFormResponse(isValidInput, titleInput);
        })

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

    static processFormResponse(isValidInput, titleInput) {
        if(isValidInput === true) {
            const dialogChildren = Array.from(this.FormDialog.children);
            dialogChildren.forEach(child => child.remove());
            this.FormDialog.close();
        }

        else if(isValidInput === false)
            return;

        else if(isValidInput === 'This title already exists') {
            console.log(isValidInput);
        }
    }
}

export function renderAllProjects(data) {
    const ProjectsContainer = document.querySelector('.todo-project-container');
    Array.from(ProjectsContainer.children).forEach(child => ProjectsContainer.removeChild(child));
    data.allProjects.forEach(project => DomMethods.createProject(project));
}

export function renderAllProjectTasks(data) {
    const tasksContainer = document.querySelector('.tasks-container');
    Array.from(tasksContainer.children).forEach(child => tasksContainer.removeChild(child));
    data.currentProject.taskArray.forEach(task => DomMethods.createTask(task));
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

