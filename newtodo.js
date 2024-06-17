// Selecting elements from the DOM
const form = document.getElementById('todoForm');
const taskInput = document.getElementById('taskInput');
const dueDateInput = document.getElementById('dueDateInput');
const prioritySelect = document.getElementById('prioritySelect');
const categoryFilter = document.getElementById('categoryFilter');
const taskList = document.getElementById('taskList');

// Array to store tasks
let tasks = [];

// Function to render tasks
function renderTasks() {
    // Clear the existing list
    taskList.innerHTML = '';

    // Filter tasks based on category
    const category = categoryFilter.value;

    tasks.filter(task => category === 'all' || task.category === category)
         .forEach((task, index) => {
        const li = document.createElement('li');
        li.classList.add('priority-' + task.priority);
        li.innerHTML = `
            <span>${task.name}</span>
            <span>${task.dueDate}</span>
            <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
        `;
        if (task.completed) {
            li.classList.add('completed');
        }
        taskList.appendChild(li);
    });
}

// Function to add a new task
function addTask(taskName, dueDate, priority) {
    const newTask = {
        name: taskName,
        dueDate: dueDate,
        priority: priority,
        completed: false,
        category: categoryFilter.value
    };
    tasks.push(newTask);
    renderTasks();
}

// Function to delete a task
function deleteTask(index) {
    tasks.splice(index, 1);
    renderTasks();
}

// Event listener for form submission
form.addEventListener('submit', function(event) {
    event.preventDefault();
    const taskName = taskInput.value.trim();
    const dueDate = dueDateInput.value;
    const priority = prioritySelect.value;

    if (taskName !== '' && dueDate !== '') {
        addTask(taskName, dueDate, priority);
        taskInput.value = '';
        dueDateInput.value = '';
    } else {
        alert('Please enter both task name and due date.');
    }
});

// Event listener for category filter change
categoryFilter.addEventListener('change', function() {
    renderTasks();
});

// Initial rendering of tasks
renderTasks();
