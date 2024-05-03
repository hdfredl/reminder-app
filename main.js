// Fetch db
fetch("http://localhost:3000/todos")
  .then((res) => res.json())
  .then((data) => displayTasks(data));

// SELECTORS ---
const createTask = document.querySelector(".create-modal");
const taskName = document.querySelector("#name-box");
const taskPriority = document.querySelector("#priority-box");
const taskDescription = document.querySelector("#desc-box");
const addNewTask = document.querySelector(".add-task");

const modal = document.getElementById("myModal");
const span = document.querySelector(".close");

// EVENTLISTENERS ---
createTask.addEventListener("click", openNewModal);
addNewTask.addEventListener("click", createNewTask);
span.addEventListener("click", closeModal);
window.addEventListener("click", handleOutsideClick);

// FUNCTIONS
function displayTasks(todos) {
  const containerToDisplay = document.querySelector(".todos-wrapper");

  todos.forEach((todo) => {
    const html = `
    <div class="todo">
      <h1 class="new-task">${todo.task}</h1>
      <p class="priority-task">${todo.urgency}</p>
      <p class="description-task">${todo.description}</p>
      <div>
        <button class="complete-task">Complete</button>
        <button class="delete-task" onclick="deleteTask(${todo.id})">Delete</button>
        <button class="edit-task">Edit</button>
      </div>
    </div>
  `;
    containerToDisplay.innerHTML += html;
  }); // TODO: GÖR DESCRIPTION HIDDEN
}

function createNewTask() {
  const newlyCreatedTask = {
    task: taskName.value,
    priority: taskPriority.value,
    description: taskDescription.value,
  };

  if (taskName === "" && taskPriority === "" && taskDescription === "") {
    window.alert("Please enter a name, priority and description");
  }

  const postTask = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newlyCreatedTask),
  };
  fetch("http://localhost:3000/todos", postTask);
}

function deleteTask(taskId) {
  const deleteSelectedTask = {
    method: "DELETE",
  };
}

// MODAL -
function openNewModal() {
  modal.style.display = "block";
}

function closeModal() {
  modal.style.display = "none";
}
span.onclick = closeModal;

function handleOutsideClick(event) {
  if (event.target === modal) {
    closeModal();
  }
}
window.onclick = handleOutsideClick;
