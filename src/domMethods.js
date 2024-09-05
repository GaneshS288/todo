
export class DomMethods {

    static #ProjectsParent = document.querySelector('.todo-project-container')
    static ProjectDialog = document.querySelector('.project-dialog');

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
        projectEditButton.addEventListener('click', (event) => {
            this.ProjectDialog.showModal();
            this.createAndEditProjectForm(event);
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
        taskButtonWrapper.append(taskEditButton);

        let taskDeleteButton = document.createElement('button');
        taskDeleteButton.textContent = 'Delete';
        taskDeleteButton.classList.add('task-delete-button');
        taskDeleteButton.addEventListener('click', () => taskWrapper.remove())
        taskButtonWrapper.append(taskDeleteButton);

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
    
    static createAndEditProjectForm(event) {
        const form = document.createElement('form');
        const fieldset = document.createElement('fieldset');
        const legend = document.createElement('legend');

        event.target.textContent === 'Edit' ? legend.textContent = 'Edit Project' : legend.textContent = 'Create New Project';

        let projectTitleInput = document.createElement('input');
        projectTitleInput.classList.add('project-title-input');
        projectTitleInput.id = 'project-title';
        projectTitleInput.type = 'text';

        let projectTitleLable = document.createElement('label');
        projectTitleLable.htmlFor = 'project-title';
        projectTitleLable.textContent = 'Project title:';

        let formSubmitButton = document.createElement('button');
        formSubmitButton.classList.add('submit');
        formSubmitButton.textContent = 'Submit';

        let formCancelButton = document.createElement('button');
        formCancelButton.classList.add('cancel');
        formCancelButton.textContent = 'Cancel';

        let formButtonContainer = document.createElement('div');
        formButtonContainer.append(formSubmitButton);
        formButtonContainer.append(formCancelButton);

        form.append(fieldset);
        fieldset.append(legend);
        fieldset.append(projectTitleLable);
        fieldset.append(projectTitleInput);
        fieldset.append(formButtonContainer);

        this.ProjectDialog.append(form);
    }
}

const addProjectButton = document.querySelector('.add-project-button');
addProjectButton.addEventListener('click', (event) => {
    DomMethods.ProjectDialog.showModal();
    DomMethods.createAndEditProjectForm(event);
})
