const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
const taskInput = document.getElementById("task-input");
const taskList = document.getElementById("task-list");

// Load tasks from local storage
document.addEventListener("DOMContentLoaded", loadTasks);

addBtn.addEventListener("click", addTask);
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});
clearBtn.addEventListener("click", clearAllTasks);

// Add a new task
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const task = { text: taskText, completed: false };
    createTaskElement(task);
    saveTask(task);

    taskInput.value = "";
}

// Create DOM element for a task
function createTaskElement(task) {
    const li = document.createElement("li");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.classList.add("task-text");
    if (task.completed) span.classList.add("completed");

    span.addEventListener("click", () => {
        span.classList.toggle("completed");
        updateTaskStatus(task.text);
    });

    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.classList.add("delete-btn");
    delBtn.addEventListener("click", () => {
        li.remove();
        deleteTask(task.text);
    });

    li.appendChild(span);
    li.appendChild(delBtn);
    taskList.appendChild(li);
}

// Save task to local storage
function saveTask(task) {
    const tasks = getTasks();
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Load tasks from local storage
function loadTasks() {
    const tasks = getTasks();
    tasks.forEach((task) => createTaskElement(task));
}

// Get all tasks from local storage
function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Delete a single task
function deleteTask(text) {
    const tasks = getTasks().filter((t) => t.text !== text);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Update completion status
function updateTaskStatus(text) {
    const tasks = getTasks().map((t) =>
        t.text === text ? { ...t, completed: !t.completed } : t
    );
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Clear all tasks
function clearAllTasks() {
    if (confirm("Are you sure you want to delete all tasks?")) {
        localStorage.removeItem("tasks");
        taskList.innerHTML = "";
    }
}