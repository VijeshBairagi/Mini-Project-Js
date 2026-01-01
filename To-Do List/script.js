const button = document.getElementById("add-task-btn")
let taskList = document.querySelector(".task-list")

button.addEventListener("click", addTask)

function addTask() {
  const input = document.getElementById("task-input")
  const text = input.value

  if (text.trim().length === 0) {
    alert("Please add new task")
    return
  }

  let li = document.createElement("li")
  li.innerHTML = `
    ${text}
    <button class="delete-btn">
      <i class="fa-solid fa-delete-left"></i>
    </button>
  `
  // delete functionality
  li.querySelector(".delete-btn").addEventListener("click", function () {
    li.remove()
  })

  taskList.appendChild(li)
  input.value = "" 
}

document.addEventListener("keypress", (value) => {
 if (value.key === "Enter") {
  addTask()
}

})