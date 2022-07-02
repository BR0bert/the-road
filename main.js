//ACCESS THE FORM (INPUT+BUTTON)

const theForm = document.querySelector("#add-card--form");
const inputForm = document.querySelector("#add-card--input");
const cardContainer = document.querySelector(".card-container");

let cards = [
  {
    id: 1,
    name: "programming",
  },
  { id: 2, name: "teaching" },
];

function render() {
  clearContainer(cardContainer);
  cards.forEach((card) => {
    createNewCard(card.id, card.name);
  });
}

// theForm.addEventListener("submit", (e) => {
//   e.preventDefault();
//   clearCardContainer(cardContainer);
//   createNewCard();
// });

function createNewCard(cardId, cardName) {
  //   if (inputForm.value != "") {
  //CARD CONTAINER
  const cardContainer = document.querySelector(".card-container");

  //TODO CARD
  const todoCard = document.createElement("div");
  todoCard.classList.add("todo-card");
  todoCard.setAttribute("id", cardId);
  //HEADER
  const todoHeader = document.createElement("div");
  todoHeader.classList.add("todo-header");
  const h2Title = document.createElement("h2");
  h2Title.classList.add("title"); //here come the title added from input form
  h2Title.textContent = cardName;
  todoHeader.appendChild(h2Title);
  todoCard.appendChild(todoHeader);
  cardContainer.appendChild(todoCard);
  inputForm.value = "";
  //BODY
  const todoBody = document.createElement("div");
  todoBody.classList.add("todo-body");
  const tasks = document.createElement("div");
  tasks.classList.add("tasks");
  todoBody.appendChild(tasks);
  todoCard.appendChild(todoBody);
  //NEW TASK FORM
  const newTaskDiv = document.createElement("div");
  newTaskDiv.classList.add("new-task-creator");
  const newTaskForm = document.createElement("form");
  newTaskForm.setAttribute("action", "");
  //NEW TASK INPUT
  const newTaskInput = document.createElement("input");
  newTaskInput.setAttribute("type", "text");
  newTaskInput.classList.add("new-list");
  newTaskInput.setAttribute("placeholder", "new task name");
  newTaskInput.setAttribute("aria-label", "new task name");
  newTaskForm.appendChild(newTaskInput);
  //NEW TASK BUTTON
  const newTaskButton = document.createElement("button");
  newTaskButton.setAttribute("class", "btn task");
  newTaskButton.setAttribute("aria-label", "create new task");
  newTaskButton.textContent = "+";
  newTaskForm.appendChild(newTaskButton);

  newTaskDiv.appendChild(newTaskForm);
  todoBody.appendChild(newTaskDiv);
  //DELETE TASKS
  const deleteTasks = document.createElement("div");
  deleteTasks.classList.add("delete-tasks");
  const deleteCompletedTasks = document.createElement("button");
  deleteCompletedTasks.setAttribute("class", "btn delete green");
  deleteCompletedTasks.textContent = "Clear completed tasks";
  const deleteCard = document.createElement("button");
  deleteCard.setAttribute("class", "btn delete red");
  deleteCard.textContent = "Delete card";

  deleteTasks.appendChild(deleteCompletedTasks);
  deleteTasks.appendChild(deleteCard);
  todoBody.appendChild(deleteTasks);
  //   }
  //    else {
  //     alert("Please give a name to your card");
  //   }
}

function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

render();
