import { ToDo } from "./todo";

export class dataParser {

    static getUserInputForProject(titleInput) {
        return titleInput.value;
    }

    static getUserInputForTask(titleInput, descriptionInput, priorityInput, statusInput, dueDateInput) {
        return {
            title : titleInput.value,
            description : descriptionInput.value,
            priority : priorityInput.value,
            status : statusInput.value,
            dueDate : dueDateInput.value
        };
    }

    static isValidNewProjectInput(titleInput) {
        let projectTitle = this.getUserInputForProject(titleInput);
    
        if (projectTitle.trim() === "") 
            return false;
    
        else if (ToDo.getProject(projectTitle) !== undefined)
            return 'This title already exists';
    
        ToDo.addProject(projectTitle)
        return true;
    }

    static isValidEditProjectInput(project, titleInput) {
        let projectTitle = this.getUserInputForProject(titleInput);
    
        if (projectTitle.trim() === "") 
            return false;
    
        else if(project.title === projectTitle) {
            ToDo.editProjectTitle(projectTitle, project.title)
            console.log(ToDo.AllProjects);
            return true;
        }
    
        else if(ToDo.getProject(projectTitle) !== undefined)
            return 'This title already exists';
    
        ToDo.editProjectTitle(projectTitle, project.title)
        return true;
    }

    static isValidNewTaskinput(inputArray) {
        let taskData = this.getUserInputForTask(...inputArray);
    
        for (let dataKey in taskData) {
            if ((taskData[dataKey]).trim() === "") {
                return false;
            }
        }
    
        if (ToDo.getTaskFromProject(ToDo.SelectedProject.title, taskData.title) !== undefined)
            return 'This title already exists';
        
        ToDo.addTaskToProject(ToDo.SelectedProject.title, [taskData.title, taskData.description, taskData.priority, taskData.status, taskData.dueDate]);
        return true;
    }

    static isValidEditTaskData(task, inputArray) {
        let taskData = this.getUserInputForTask(...inputArray);
    
        for (let dataKey in taskData) {
            if ((taskData[dataKey]).trim() === "") {
                return false;
            }
        }
           
        if (ToDo.getTaskFromProject(ToDo.SelectedProject.title, task.title).title === taskData.title) {
            ToDo.editTask(ToDo.SelectedProject.title, task.title, ...[taskData.title, taskData.description, taskData.priority, taskData.status, taskData.dueDate]);
            return true;
        }

        else if(ToDo.getTaskFromProject(ToDo.SelectedProject.title, taskData.title) !== undefined)
            return 'This title already exists';
            
        ToDo.editTask(ToDo.SelectedProject.title, task.title, ...[taskData.title, taskData.description, taskData.priority, taskData.status, taskData.dueDate]);
        console.log(task);
        return true;
    }
}
