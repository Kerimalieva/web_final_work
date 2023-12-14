// Selecting DOM elements
const input = document.querySelector("input");
const addButton = document.querySelector(".add-button");
const todosHtml = document.querySelector(".todos");
const emptyImage = document.querySelector(".empty-image");
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
const deleteAllButton = document.querySelector(".delete-all");
const filters = document.querySelectorAll(".filter");
let filter = '';

// Initial rendering of todos
showTodos();

// Function to generate HTML for each todo item
function getTodoHtml(todo, index) {
    // Check if a filter is active and if the todo's status matches the filter

  if (filter && filter != todo.status) {
    return ''; // If it doesn't match, return an empty string (don't display the todo)
  }
  // Determine if the todo is checked (completed)
  let checked = todo.status == "completed" ? "checked" : "";

  // Return the HTML structure for each todo item
  return /* html */ `
    <li class="todo">
      <label for="${index}">
        <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
        <span class="${checked}">${todo.name}</span>
      </label>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `; 
}

// Function to display todos
function showTodos() {
  // Check if there are no todos
  if (todosJson.length == 0) {
    todosHtml.innerHTML = '';
    emptyImage.style.display = 'block';
  } else {
    // Render todos if there are any
    todosHtml.innerHTML = todosJson.map(getTodoHtml).join('');
    emptyImage.style.display = 'none';
  }
}

// Function to add a new todo
function addTodo(todo, deadline) {
  input.value = "";
  // Add a new todo to the beginning of the array
  todosJson.unshift({ name: todo, status: "pending", deadline: deadline });
  // Update local storage with the new todos
  localStorage.setItem("todos", JSON.stringify(todosJson));
  // Display the updated todos
  showTodos();
}


// Event listener for the "Add" button click
addButton.addEventListener("click", () => {
  let todo = input.value.trim();
  let deadline = document.querySelector(".deadline-input").value;
  if (!todo) {
    return; // If the input is empty, do nothing
  }
  // Add a new todo with the entered task and deadline
  addTodo(todo, deadline);
});

// Event listener for Enter key press in the input field
input.addEventListener("keyup", e => {
  let todo = input.value.trim();
  let deadline = document.querySelector(".deadline-input").value;
  if (!todo || e.key != "Enter") {
    return; // Event listener for Enter key press in the input field
  }
    // Add a new todo with the entered task and deadline
  addTodo(todo, deadline);
});

// Function to update the status of a todo (completed or pending)
function updateStatus(todo) {
  let todoName = todo.parentElement.lastElementChild;
   // Check if the todo is checked
  if (todo.checked) {
    todoName.classList.add("checked");
        // Update the status of the todo to "completed"
    todosJson[todo.id].status = "completed";
  } else {
    todoName.classList.remove("checked");
    // Update the status of the todo to "pending"
    todosJson[todo.id].status = "pending";
  }
  // Update local storage with the modified todos
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

// Function to remove a todo
function remove(todo) {
  const index = todo.dataset.index;
  // Remove the todo from the array
  todosJson.splice(index, 1);
  // Display the updated todos
  showTodos();
  // Update local storage with the modified todos
  localStorage.setItem("todos", JSON.stringify(todosJson));
}

// Function to handle editing a task (not currently used in the code)
function editTask(span) {
  const todo = span.parentElement.parentElement;
  const index = todo.dataset.index;
  // Prompt the user to edit the task name
  const taskName = prompt("Edit task:", todosJson[index].name);
  if (taskName !== null) {
    // Update the task name in the todos array
    todosJson[index].name = taskName;
    // Update local storage with the modified todos
    localStorage.setItem("todos", JSON.stringify(todosJson));
    // Display the updated todos
    showTodos();
  }
}

// Function to save changes made to a task (not currently used in the code)
function save(btn) {
  const todo = btn.parentElement;
  const index = todo.dataset.index;
  const editedTaskName = todo.querySelector("span").textContent;
  // Update the task name in the todos array
  todosJson[index].name = editedTaskName;
  // Update local storage with the modified todos
  localStorage.setItem("todos", JSON.stringify(todosJson));
  // Display the updated todos
  showTodos();
}

// Event listeners for filter buttons
filters.forEach(function (el) {
  el.addEventListener("click", (e) => {
    if (el.classList.contains('active')) {
      el.classList.remove('active');
      filter = '';
    } else {
       // Remove 'active' class from all filter buttons
      filters.forEach(tag => tag.classList.remove('active'));
      // Add 'active' class to the clicked filter button
      el.classList.add('active');
      // Set the filter to the selected filter type
      filter = e.target.dataset.filter;
    }
    // Display the updated todos based on the selected filter
    showTodos();
  });
});


// Event listener for "Delete All" button click
deleteAllButton.addEventListener("click", () => {
  // Clear the todos array
  todosJson = [];
  // Update local storage with the modified todos (empty array)
  localStorage.setItem("todos", JSON.stringify(todosJson));
  // Display the updated todos (empty array)
  showTodos();
});


// Function to handle user logout
function logout() {
  
  // Remove user_id and authenticated flags from local storage
  localStorage.removeItem('user_id');
  localStorage.removeItem('authenticated');
  // Redirect to the login page
  window.location.href = './login.html';
}


function getTodoHtml(todo, index) {
  if (filter && filter != todo.status) {
    return '';
  }

  let checked = todo.status == "completed" ? "checked" : "";

  return /* html */ `
    <li class="todo">
      <div class="todo-content">
        <label for="${index}">
          <input id="${index}" onclick="updateStatus(this)" type="checkbox" ${checked}>
          <span class="${checked}">${todo.name}</span>
        </label>
        <div class="deadline">${todo.deadline ? 'Deadline: ' + todo.deadline : ''}</div>
      </div>
      <button class="delete-btn" data-index="${index}" onclick="remove(this)"><i class="fa fa-times"></i></button>
    </li>
  `;
}

