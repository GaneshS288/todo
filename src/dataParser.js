export function getUserInputForProject(titleInput) {
    return titleInput.value;
}

export function getUserInputForTask(titleInput, descriptionInput, priorityInput, statusInput, dueDateInput) {
    return {
        title : titleInput.value,
        description : descriptionInput.value,
        priority : priorityInput.value,
        status : statusInput.value,
        dueDate : dueDateInput.value
    };
}