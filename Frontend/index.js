const URL = 'http://localhost:3000/lists'
const TASK = 'http://localhost:3000/tasks'
const selectDiv = document.querySelector(".custom-select")
const mainListName = document.getElementById("main-list-name")
const addFormDiv = document.getElementById("task-form-container")

// Render and fetch functions
function fetchData(){
  fetch(URL)
  .then(res => res.json())
  .then(renderLists)
}

function fetchList(id){
  fetch(URL+`/${id}`)
  .then(res => res.json())
  .then(renderList)
}

function renderLists(lists){
  lists.forEach(function(list){
    let optionDiv = document.createElement("option")
    optionDiv.value = list.id
    optionDiv.innerText = list.name
    selectDiv.appendChild(optionDiv)
  })
}

function renderList(list){
  mainListName.innerText = `${list.name} - ${list.priority}`
    list.tasks.forEach(function(task){
      if (task.done){
        mainListName.innerHTML += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${task.name}
            <input class="${task.id}" id=${task.done} type="checkbox" checked class="task-checkbox">
        </li>
        `
      }else{
        mainListName.innerHTML += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${task.name}
            <input class="${task.id}" id=${task.done} type="checkbox" class="task-checkbox">
          </li>
        `
      }
    })
}

function postTask(data = {}){
  fetch(TASK,{
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}

function patchTask(id, data = {}){
  fetch(TASK+`/${id}`,{
    method: 'PATCH',
    headers:
    {
      'Content-Type': 'application/json',
      'Accepts': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(res => res.json())
}


// adding and changing the document

addFormDiv.innerHTML+=`
  <form id="new-task-form">
    <label>Task Name:</label>
    <input type="text" id="task-name">
    <input type="submit" id="submit">
  </form>
`


// addEventListeners

mainListName.addEventListener("click", function(e){
  let taskId = parseInt(e.target.className)
  if (e.target.id === 'true'){
    let doneOrNot = {done: false}
    patchTask(taskId, doneOrNot)
    e.target.id = false
  } else if(e.target.id === 'false') {
    let doneOrNot = {done: true}
    patchTask(taskId, doneOrNot)
    e.target.id = true
  }
})

addFormDiv.addEventListener("submit",function(e){
  let task = addFormDiv.querySelector("#task-name").value
  let listId = selectDiv.value
  let newTask = {
    name: `${task}`,
    done: false,
    list_id: listId
  }
  postTask(newTask)
})

selectDiv.addEventListener("change", function(e){
  let id = parseInt(e.target.value)
  fetchList(id)
})


//loads at start up
fetchData()
