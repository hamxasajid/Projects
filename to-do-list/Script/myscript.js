// Get reference to the input box element
const inputBox = document.getElementById("input-box");

// Get reference to the unordered list container
const listContainer = document.getElementById("list-container");

// Function to add a new task
function addTask() {
    // Check if the input box is empty
    if (inputBox.value === '') {
        alert("You must write something...!");
    } else {
        // Create a new list item (li) element
        let li = document.createElement("li");
        
        // Set the innerHTML of the list item to the value of the input box
        li.innerHTML = inputBox.value;

        // Append the new list item to the list container
        listContainer.appendChild(li);

        // Create a new span element for the delete button
        let span = document.createElement("span");
        
        // Add the "×" symbol to the span (used as a delete button)
        span.innerHTML = "\u00d7";
        
        // Append the span to the list item
        li.appendChild(span);
    }
    
    // Clear the input box for the next task
    inputBox.value = "";
    
    // Save the updated task list to local storage
    saveData();
}

// Add a click event listener to the list container
listContainer.addEventListener("click", function(e) {
    // Check if the clicked element is a list item (LI)
    if (e.target.tagName === "LI") {
        // Toggle the "checked" class to mark/unmark the task
        e.target.classList.toggle("checked");
        
        // Save the updated task list to local storage
        saveData();
    }
    // Check if the clicked element is a span (delete button)
    else if (e.target.tagName === "SPAN") {
        // Remove the parent list item (task) of the clicked span
        e.target.parentElement.remove();
        
        // Save the updated task list to local storage
        saveData();
    }
}, false);

// Function to save the task list to local storage
function saveData() {
    // Save the innerHTML of the list container to local storage under the key "data"
    localStorage.setItem("data", listContainer.innerHTML);
}

// Function to show the saved tasks from local storage when the page loads
function showTask() {
    // Retrieve the task list from local storage and set it as the innerHTML of the list container
    listContainer.innerHTML = localStorage.getItem("data");
}

// Call the showTask function to display the saved tasks on page load
showTask();

// Add an event listener to the input box to detect when the "Enter" key is pressed
inputBox.addEventListener('keyup', (e) => {
    // Check if the key pressed is "Enter" (key code 13)
    if (e.keyCode === 13) {
        // Call the addTask function to add the task
        addTask();
    }
});
