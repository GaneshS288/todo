import { ToDo } from "./todo";

function getUserInputForProject(titleInput) {
    return titleInput.value;
}

function getUserInputForTask(titleInput, descriptionInput, priorityInput, statusInput, dueDateInput) {
    return {
        title : titleInput.value,
        description : descriptionInput.value,
        priority : priorityInput.value,
        status : statusInput.value,
        dueDate : dueDateInput.value
    };
}

export function isValidProjectInput(currentProjectTitle, titleInput) {
    let projectTitle = getUserInputForProject(titleInput);

    if (projectTitle.trim() === "") 
        return false;

    else if (ToDo.getProject(currentProjectTitle) !== undefined)
        return false;

    console.log(ToDo.addProject(projectTitle))
    return true;
}

export function isValidTaskinput(currentTaskTitle, inputArray) {
    let taskData = getUserInputForTask(...inputArray);

    for (let dataKey in taskData) {
        if ((taskData[dataKey]).trim() === "") {
            return false;
        }
    }

    if (ToDo.getTaskFromProject('new practice project', currentTaskTitle) !== undefined)
        return false;
    
    console.log(ToDo.addTaskToProject('new practice project', [taskData.title, taskData.description, taskData.priority, taskData.status, taskData.dueDate]));

    return true;
}