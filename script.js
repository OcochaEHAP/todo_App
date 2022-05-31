let form = document.querySelector(".form");
let input = document.querySelector(".input");
let submit = document.querySelector(".add");
let TasksDiv = document.querySelector(".tasks");
let clear = document.querySelector(".btn");
let tasks = [];

// if (window.localStorage.getItem("tasks") === true) {
//   let tasks = JSON.parse(window.localStorage.getItem("tasks"));
//   addTaskElement(tasks);
// }
// getData();

// submit.addEventListener("click", () => {
//   if (input.value !== "") {
//     addTask(input.value);
//     input.value = "";
//   }
// });

// TasksDiv.addEventListener("click", (e) => {
//   if (e.target.classList.contains("delete")) {
//     deleteData(e.target.parentElement.getAttribute("data-id"));
//     e.target.parentElement.remove();
//   }
//   if (e.target.classList.contains("task")) {
//     e.target.classList.toggle("done");
//   }
// });
// clear.addEventListener("click", () => {
//   TasksDiv.innerHTML = "";
//   window.localStorage.clear();
// });
// function addTask(taskText) {
//   let task = {
//     id: Date.now(),
//     title: taskText,
//     copleted: false,
//   };
//   tasks.push(task);
//   addTaskElement(tasks);

//   StorageData(tasks);
// }

// function addTaskElement(task) {
//   TasksDiv.innerHTML = "";

//   tasks.forEach((task) => {
//     let div = document.createElement("div");
//     div.className = "task";
//     if (task.completed) {
//       div.className = "task done";
//     }
//     div.setAttribute("data-id", task.id);
//     div.appendChild(document.createTextNode(task.title));

//     let span = document.createElement("span");
//     span.className = "delete";
//     span.appendChild(document.createTextNode("delete"));
//     div.appendChild(span);

//     TasksDiv.appendChild(div);
//   });
// }

// function StorageData(task) {
//   window.localStorage.setItem("tasks", JSON.stringify(task));
// }

// function getData() {
//   let data = window.localStorage.getItem("tasks");
//   if (data) {
//     let tasks = JSON.parse(data);
//     addTaskElement(tasks);
//     // console.log(tasks);
//   }
// }

// function deleteData(taskId) {
//   tasks = tasks.filter((task) => task.id != taskId);
//   StorageData(tasks);
// }

submit.addEventListener("click", () => {
  addTask(input.value);
});

// Functions
function addTask(item) {
  if (item !== "") {
    let task = {
      id: Date.now(),
      name: item,
      completed: false,
    };
    tasks.push(task);
    storageData(tasks);
    input.value = "";
  }
}

function renderTask(todos) {
  TasksDiv.innerHTML = "";
  todos.forEach((item) => {
    let checked = item.completed ? "done" : null;
    let div = document.createElement("div");
    div.setAttribute("class", "task");
    div.setAttribute("data-id", item.id);
    if (item.completed === true) {
      div.classList.add("done");
    }
    div.innerHTML = `
      ${item.name}
      <span class="delete">delete</span>
    `;
    TasksDiv.appendChild(div);
    div.addEventListener("click", toggle());
  });
}

function storageData(todos) {
  localStorage.setItem("tasks", JSON.stringify(todos));
  renderTask(todos);
}

function getData() {
  let reference = localStorage.getItem("tasks");
  if (reference) {
    tasks = JSON.parse(reference);
    renderTask(tasks);
  }
}
getData();

function toggle(id) {
  tasks.forEach((task) => {
    if (task.id == id) {
      task.completed = !task.completed;
    }
  });
  getData();
}

function deleteTask(id) {
  tasks = tasks.filter((item) => item.id != id);
  getData();
}

form.addEventListener("click", function (event) {
  if (event.target.type === "checkbox") {
    toggle(event.target.parentElement.getAttribute("data-key"));
  }
  if (event.target.classList.contains("delete-button")) {
    deleteTask(event.target.parentElement.getAttribute("data-key"));
  }
});
