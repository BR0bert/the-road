//ACCESS THE FORM (INPUT+BUTTON)

const theForm = document.querySelector("#add-card--form");
const inputForm = document.querySelector("#add-card--input");
const cardContainer = document.querySelector(".card-container");
const taskTemplate = document.querySelector("#task-template")

let selectedTaskId;
let currentTodoCardId

const LOCAL_STORAGE_CARD_KEY = "todo.cards";

let cards = JSON.parse(localStorage.getItem(LOCAL_STORAGE_CARD_KEY)) || [];

//EVENT LISTENER TO CREATE A TO-DO CARD BASED ON THE NAME INPUTTED

theForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const inputName = inputForm.value;
  if (inputName == null || inputName === "") return;
  const card = createCard(inputName);
  inputForm.value = null;
  cards.push(card);
  saveAndRender();

});

//Delete a todo-card
cardContainer.addEventListener("click", (e) => {
  if (e.target.className === "btn-delete-red") {
    const selectedCardId = e.target.parentElement.parentElement.parentElement.id;
    cards = cards.filter((card) => card.id !== selectedCardId);
    saveAndRender();
  }
});

//delete completed tasks
cardContainer.addEventListener("click", e=>{
  if(e.target.className === "btn-delete-green"){
    const selectedCardId =e.target.parentElement.parentElement.parentElement.id;
    cards.forEach(card=>{
      if(card.id === selectedCardId){
        card.tasks = card.tasks.filter(task => task.complete === false)
        saveToLocalStorage();
        render();
      }

    })
  }
})

//select task

cardContainer.addEventListener("click", e=>{
  e.preventDefault();
  //console.log(e.target.tagName.toLowerCase());

  if(e.target.className === "task"){
      selectedTaskId = e.target.children[0].id;
      currentTodoCardId = e.target.parentElement.parentElement.parentElement.id
    
      cards.forEach(card=>{
        if (card.id === currentTodoCardId){
          card.tasks.forEach(task=>{
            if(task.id === selectedTaskId){
              if(task.complete === false){
                task.complete = true
                saveToLocalStorage();
                render();
                
              } else{
                task.complete = false
                saveToLocalStorage();
                render();
              }
            
            
          }
        })
      }
    })
    
  } 
  
  if (e.target.tagName.toLowerCase() === "label"){
    
      selectedTaskId = e.target.parentElement.children[0].id;
      currentTodoCardId = e.target.parentElement.parentElement.parentElement.parentElement.id
    
      cards.forEach(card=>{
        if (card.id === currentTodoCardId){
          card.tasks.forEach(task=>{
            if(task.id === selectedTaskId){
              if(task.complete === false){
                task.complete = true
                saveToLocalStorage();
                render();
              } else{
                task.complete = false
                saveToLocalStorage();
                render();
              }
            
            
          }
        })
      }
    })
  }

  if (e.target.tagName.toLowerCase() === "span"){
    
    selectedTaskId = e.target.parentElement.parentElement.children[0].id;
    currentTodoCardId = e.target.parentElement.parentElement.parentElement.parentElement.parentElement.id
  
    cards.forEach(card=>{
      if (card.id === currentTodoCardId){
        card.tasks.forEach(task=>{
          if(task.id === selectedTaskId){
            if(task.complete === false){
              task.complete = true
              saveToLocalStorage();
              render();
            } else{
              task.complete = false
              saveToLocalStorage();
              render();
            }
          
          
        }
      })
    }
  })
}
  

    
  
})

//Select current card
cardContainer.addEventListener("click", (e) => {
  e.preventDefault();
  if (e.target.tagName.toLowerCase() === "input") {
    selectedCardId = e.target.id;

    if (
      e.target.parentElement.parentElement.parentElement.parentElement.id ===
      selectedCardId.slice(5)
    ) {
      cards.forEach((card) => {
        if (card.id != selectedCardId.slice(5)) {
          const currentInput = document.getElementById(`input${card.id}`);
          currentInput.classList.remove("active-input");
        }
      });
      e.target.classList.add("active-input");

      // localStorage.setItem(
      //   LOCAL_STORAGE_SELECTED_CARD_ID_KEY,
      //   JSON.stringify(selectedCardId)
      // );
    }
  }
});

//get value from current card input
cardContainer.addEventListener("click", (e) => {
  e.preventDefault();
  
  if (e.target.className === "btn task") {
    let selectedCardInputId = e.target.parentElement.children[0].id;
  
    const currentCardInput = document.getElementById(selectedCardInputId);
    const taskName =currentCardInput.value;

    if (taskName ==null || taskName === "") return;

    

    const task = createTask(taskName)
    currentCardInput.value =null;
    
    const selectedCard = cards.find(card =>card.id === selectedCardInputId.slice(5))
    
    selectedCard.tasks.push(task)
    const currentCardTasks = e.target.parentElement.parentElement.parentElement.children[0];
    
    const taskElement = document.importNode(taskTemplate.content, true)
    createNewTask(task, currentCardTasks, taskElement, taskName)
    saveToLocalStorage();
    setHeight(cardContainer)
    
  }
});

function createCard(name) {
  return {
    id: Date.now().toString(),
    name: name,
    tasks: [],
    color: generateRandomColor()
  };
}

function createTask(name){
  return {
    id: Date.now().toString(),
    name: name,
    complete: false
  };
}

function createNewCard(cardId, cardName, cardColor) {
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

  if(cardColor ==="default"){
    todoHeader.style.backgroundColor = "rgb(56, 62, 81)";
  } else{
    todoHeader.style.backgroundColor = cardColor;
  }
 
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
  newTaskInput.setAttribute("id", `input${cardId}`);
  newTaskInput.setAttribute("type", "text");
  newTaskInput.setAttribute("maxlength", "25");
  newTaskInput.classList.add("new-list");
  newTaskInput.setAttribute("placeholder", "new task name");
  newTaskInput.setAttribute("aria-label", "new task name");
  newTaskForm.appendChild(newTaskInput);
  //console.log(cardId);
  //console.log(selectedCardId);
  // if (cardId === selectedCardId) {
  //   newTaskInput.classList.add("active-input");
  // }
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
  deleteCompletedTasks.setAttribute("class", "btn-delete-green");
  deleteCompletedTasks.textContent = "Clear completed tasks";
  const deleteCard = document.createElement("button");
  deleteCard.setAttribute("class", "btn-delete-red");

  deleteCard.textContent = "Delete card";

  deleteTasks.appendChild(deleteCompletedTasks);
  deleteTasks.appendChild(deleteCard);
  todoBody.appendChild(deleteTasks);
  //   }
  //    else {
  //     alert("Please give a name to your card");
  //   }
}

function createNewTask(task, currentCardTasks, taskElement, taskName) {
  
    const checkbox = taskElement.querySelector("input");
    checkbox.setAttribute("id", task.id) 
    checkbox.checked = task.complete;
    const label = taskElement.querySelector('label');
    label.htmlFor = task.id;
    label.append(taskName);
    currentCardTasks.appendChild(taskElement);
  

  // const task = document.createElement("div");
  // task.classList.add("task");
  // const newTaskInput = document.createElement("input");
  // newTaskInput.setAttribute("type", "checkbox");
  // newTaskInput.setAttribute("id", `label${selectedCardId.slice(5)}`);
  // task.appendChild(newTaskInput);
  // const newTaskLabel = document.createElement("label");
  // newTaskLabel.htmlFor = `label${selectedCardId.slice(5)}`;
  // const spanElement = document.createElement("span");
  // // spanElement.classList.add("custom-checkbox");
  // newTaskLabel.appendChild(spanElement);
  // newTaskLabel.textContent = taskName;
  // task.appendChild(newTaskLabel);
  // currentCardTaskElement.appendChild(task);
}

function saveAndRender() {
  saveToLocalStorage();
  render();
}

function saveToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_CARD_KEY, JSON.stringify(cards));
}

function render() {
  clearContainer(cardContainer);
  cards.forEach((card) => {
    createNewCard(card.id, card.name, card.color);
  });

  //render the tasks to each card
  
  cards.forEach(card =>{
    
    card.tasks.forEach(task=>{
    const tasks = document.getElementById(card.id).children[1].children[0]
    const todo = document.importNode(taskTemplate.content, true) //todo === taskElement
    createNewTask(task,tasks, todo, task.name)
    
    })
    

  })

  setHeight(cardContainer)
}

function clearContainer(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

//set the height of the todo cards

function setHeight (container){
  if(container.firstChild){

    //get the number of tasks
    //height = task x 50px
    const todoCards = Array.from(container.children);
    
    todoCards.forEach(card =>{
      

        const taskCount = card.children[1].children[0].childElementCount;
        const cardHeight = 150 + 40*taskCount;
        

        card.style.height = `${cardHeight}px`;
      
    })

  }
}

//generate random color for the header background of the todo card

function generateRandomColor (){

const colors = ["red", "blue", "gray", "black", "default","green", "purple", "darkorange"];

return colors[Math.floor(Math.random() * 8)]

}

//display the to-do cards
render();



