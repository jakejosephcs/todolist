const taskListSection = document.querySelector('.main-page');
const viewOrEditSection = document.querySelector('.view-or-edit-page');
const addNewTaskSection = document.querySelector('.add-new-task-page');

const tasksContainer = document.querySelector('.tasks-container');

const addTaskBtn = document.querySelector('.add-task-btn');
const addNewTaskBtn = document.querySelector('.add-new-task');

const updateTaskBtn = document.querySelector('.update-task');
const deleteTaskBtn = document.querySelector('.delete-task');

const categories = document.querySelector('#categorySelect');

const sortCategoriesBtn = document.querySelector('.sort-categories');

let currentIndex;

let taskList = [];

// Event: Add a new task to the list (add new task page)
addTaskBtn.addEventListener('click', () => {
    const name = document.querySelector('#name').value;
    const dueDate = document.querySelector('#dueDate').value;
    const category = document.querySelector('#category').value;
    const priority = document.querySelector('#priority').value;
    const notes = document.querySelector('#notes').value;

    let newTask = task(name, dueDate, category, priority, notes);

    taskList.push(newTask);

    UI.assignIds();

    UI.updateTaskList();

    UI.showTaskList();

    store.setStorage();
})

// EVENT: Completeing a task
tasksContainer.addEventListener('click', (e) => {
    if (e.target.type == "checkbox") {
        UI.deleteTask(e.target.id);
    }
})

// EVENT: Sort by categories
sortCategoriesBtn.addEventListener('click', () => {
    UI.sortByCategories(categories.value);
})

// EVENT: Delete Task
deleteTaskBtn.addEventListener('click', () => {
    UI.deleteTask(currentIndex);
})

// EVENT: Update task
updateTaskBtn.addEventListener('click', () => {
    UI.updateTask(currentIndex);
    
})

// EVENT: Add new task
addNewTaskBtn.addEventListener('click', () => {
    UI.showNewTaskForm();
})

// EVENT: View or edit task
taskListSection.addEventListener('click', (e) => {
    if (e.target.classList[1] == "view-or-edit-task") {
        UI.showViewOrEditList(e.target.classList[0]);
    }    
})


// FF: Storing the list in local storage
const store = (() => {
    const setStorage = () => {
        localStorage.setItem("taskList", JSON.stringify(taskList));
    }

    const getStorage = () => {
        taskList = JSON.parse(localStorage.getItem("taskList"));
        UI.updateTaskList()
    }

    return {
        setStorage,
        getStorage,
    }
})();

// FF: Creating a new task
const task = (name, dueDate, category, priority, notes) => {

    return {
        name,
        dueDate,
        category,
        priority,
        notes,        
    }
}


// MODULE PATTERN: Methods related to the UI
const UI = (() => {
    
    const updateTaskList = () => {
        tasksContainer.innerHTML = "";
        taskList.forEach(task => {
            tasksContainer.innerHTML  += `
            <div class="task d-flex justify-content-center align-items-center pt-3 border-bottom pb-2">
                <input type="checkbox" name="" id="${task.id} ">
                <div class="task-info d-flex flex-column ml-3 align-items-center justify-content-center">
                    <div class="task-name d-flex pr-2 pl-2 w-100 justify-self-center">${task.name}</div>
                    <div class="task-details d-flex align-items-center justify-content-between">
                        <div class="task-category pl-2 pr-2">${task.category}</div>
                        <div class="task-priortiy pl-2 pr-2">${task.priority}</div>
                        <div class="task-due-date pl-2 pr-2 text-black-50">${task.dueDate}</div>
                    </div>
                </div>
                <button class="${task.id} view-or-edit-task h-50 ml-2 btn btn-primary btn-sm">View or Edit</button>
            </div>
            `
        })
        store.setStorage();
        updateCategoryList();
    }

    const showTaskList = () => {
        taskListSection.classList.remove('d-none');
        taskListSection.classList.add('d-flex');

        viewOrEditSection.classList.remove('d-flex');
        viewOrEditSection.classList.add('d-none');

        addNewTaskSection.classList.remove('d-flex');
        addNewTaskSection.classList.add('d-none');
    }
    
    const showNewTaskForm = () => {
        addNewTaskSection.classList.remove('d-none');
        addNewTaskSection.classList.add('d-flex');

        viewOrEditSection.classList.remove('d-flex');
        viewOrEditSection.classList.add('d-none');

        taskListSection.classList.remove('d-flex');
        taskListSection.classList.add('d-none');
    }

    const assignIds = () => {
        let id = 0;
        taskList.forEach(task => {
            task.id = id++;
        })
    }

    const showViewOrEditList = (index) => {
        viewOrEditSection.classList.remove('d-none');
        viewOrEditSection.classList.add('d-flex');

        addNewTaskSection.classList.remove('d-flex');
        addNewTaskSection.classList.add('d-none');

        taskListSection.classList.remove('d-flex');
        taskListSection.classList.add('d-none');

        populateViewOrEditList(index);

    }

    const populateViewOrEditList = (index) => {
        document.querySelector('#nameEdit').value = taskList[index].name;
        document.querySelector('#dueDateEdit').value = taskList[index].dueDate;
        document.querySelector('#categoryEdit').value = taskList[index].category;
        document.querySelector('#priorityEdit').value = taskList[index].priority;
        document.querySelector('#notesEdit').value = taskList[index].notes;
        currentIndex = index;
    }

    const updateTask = (index) => {
        taskList[index].name = document.querySelector('#nameEdit').value;
        taskList[index].dueDate = document.querySelector('#dueDateEdit').value;
        taskList[index].category = document.querySelector('#categoryEdit').value;
        taskList[index].priority = document.querySelector('#priorityEdit').value;
        taskList[index].notes = document.querySelector('#notesEdit').value;

        updateTaskList();
        showTaskList();

    }

    const deleteTask = (index) => {
        taskList.forEach(task => {
            if (task.id == index) {
                taskList.splice(index, 1);
            }
        })

        assignIds();
        updateTaskList();
        showTaskList();
    }

    const updateCategoryList = () => {
        categories.innerHTML = `<option id="All" class="dropdown-item">All</option>`
        taskList.forEach(task => {
            if (!categories.innerHTML.includes(task.category)) {
                categories.innerHTML += `<option id="${task.category}" class="dropdown-item">${task.category}</option>`
            }
        })
    }

    const sortByCategories = (category) => {
        tasksContainer.innerHTML = "";
        taskList.forEach(task => {
            if (task.category == category) {
                tasksContainer.innerHTML  += `
                <div class="task d-flex justify-content-center align-items-center pt-3 border-bottom pb-2">
                    <input type="checkbox" name="" id="${task.id} ">
                    <div class="task-info d-flex flex-column ml-3 align-items-center justify-content-center">
                        <div class="task-name d-flex pr-2 pl-2 w-100 justify-self-center">${task.name}</div>
                        <div class="task-details d-flex align-items-center justify-content-between">
                            <div class="task-category pl-2 pr-2">${task.category}</div>
                            <div class="task-priortiy pl-2 pr-2">${task.priority}</div>
                            <div class="task-due-date pl-2 pr-2 text-black-50">${task.dueDate}</div>
                        </div>
                    </div>
                    <button class="${task.id} view-or-edit-task h-50 ml-2 btn btn-primary btn-sm">View or Edit</button>
                </div>
                `
            } else if (category == "All" || category == "all") {
                tasksContainer.innerHTML  += `
                <div class="task d-flex justify-content-center align-items-center pt-3 border-bottom pb-2">
                    <input type="checkbox" name="" id="${task.id} ">
                    <div class="task-info d-flex flex-column ml-3 align-items-center justify-content-center">
                        <div class="task-name d-flex pr-2 pl-2 w-100 justify-self-center">${task.name}</div>
                        <div class="task-details d-flex align-items-center justify-content-between">
                            <div class="task-category pl-2 pr-2">${task.category}</div>
                            <div class="task-priortiy pl-2 pr-2">${task.priority}</div>
                            <div class="task-due-date pl-2 pr-2 text-black-50">${task.dueDate}</div>
                        </div>
                    </div>
                    <button class="${task.id} view-or-edit-task h-50 ml-2 btn btn-primary btn-sm">View or Edit</button>
                </div>
                `
            }
        })
    }


    return {
        updateTaskList,
        showTaskList,
        showNewTaskForm,
        assignIds,
        showViewOrEditList,
        updateTask,
        deleteTask,
        sortByCategories,
    }
})();

store.getStorage();