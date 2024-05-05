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
const completeSelectedTask = document.querySelector(".complete-task");
//const editSelectedTask = document.querySelector(".edit-task");

const modal = document.getElementById("myModal");
const span = document.querySelector(".close");

// EVENTLISTENERS ---
createTask.addEventListener("click", openNewModal);
addNewTask.addEventListener("click", createNewTask);
// editSelectedTask.addEventListener("click", editThisTask);
span.addEventListener("click", closeModal);
window.addEventListener("click", handleOutsideClick);

const editSelectedTask = document.querySelector(".edit-task");
if (editSelectedTask) {
  editSelectedTask.addEventListener("click", editThisTask);
}

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
        <button class="delete-task" onclick="deleteTask('${todo.id}')">Delete</button>
        <button class="edit-task" onclick="editThisTask('${todo.id}')">Edit</button>
      </div>
    </div>
  `;
    containerToDisplay.innerHTML += html;
  }); // TODO: GÖR DESCRIPTION HIDDEN

  // Gå igenom alla .complete-task och poppa completeThisTask - grön / vit textfärg
  const completeButtons = document.querySelectorAll(".complete-task");
  completeButtons.forEach((button) => {
    button.addEventListener("click", () => completeThisTask(button));
  });
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

  fetch(`http://localhost:3000/todos/${taskId}`, deleteSelectedTask).then(
    () => {
      const taskElement = document.getElementById(`task-${taskId}`);
      if (taskElement) {
        taskElement.remove();
      }
    }
  );
}

function editThisTask(taskId) {
  // öppna modal
  openNewModal(true);

  const saveButton = document.querySelector(".save-button");
  saveButton.addEventListener("click", function () {
    const updatedTask = {
      task: taskName.value,
      priority: taskPriority.value,
      description: taskDescription.value,
    };

    const putTask = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedTask),
    };

    fetch(`http://localhost:3000/todos/${taskId}`, putTask)
      .then((res) => res.json())
      .then((data) => {
        console.log("Task updaterad:", data);
        closeModal();
      });
  });
}

function completeThisTask(button) {
  const currentColor = button.style.color;
  if (currentColor === "green") {
    button.style.color = "";
  } else {
    button.style.color = "green";
  }
}

// MODAL -
function openNewModal(editMode = false) {
  modal.style.display = "block";

  const saveButton = document.querySelector(".save-button");
  saveButton.disabled = !editMode;
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
