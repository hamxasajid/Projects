// Get reference to the input box element
const inputBox = document.getElementById("input-box");

// Get reference to the unordered list container
const listContainer = document.getElementById("list-container");

// Function to add a new task
function addTask() {
  if (inputBox.value.trim() === "") {
    alert("You must write something!");
    return;
  }

  let li = document.createElement("li");
  li.textContent = inputBox.value;

  let span = document.createElement("span");
  span.textContent = "×";
  span.onclick = function () {
    li.classList.add("fade-out");
    setTimeout(() => {
      li.remove();
      adjustListHeight();
      saveData(); // Save after removing the task
    }, 500);
  };

  li.appendChild(span);
  listContainer.appendChild(li);
  inputBox.value = "";

  adjustListHeight();
  saveData(); // Save after adding a task
}

// Add a click event listener to mark/unmark tasks
listContainer.addEventListener("click", function (e) {
  if (e.target.tagName === "LI") {
    e.target.classList.toggle("checked");
    saveData();
  }
});

// Function to save tasks to local storage
function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show saved tasks from local storage
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data") || "";
  adjustListHeight();
}

// Function to adjust the height smoothly
function adjustListHeight() {
  listContainer.style.maxHeight = listContainer.scrollHeight + "px";
}

// Load tasks on page load
window.onload = showTask;

// Add event listener to detect "Enter" key for adding a task
inputBox.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});
