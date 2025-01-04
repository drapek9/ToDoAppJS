"use strict"
let values_colors = {
    1: "#FF0000",
    2: "#00FF00",
    3: "#0000FF",
    4: "#9368DF", // purple
    5: "#ff9100" // orange
}

const getFromLocalStorage = (where_name) => JSON.parse(localStorage.getItem(where_name))

let allToDos = getFromLocalStorage("toDos")
let allCompletedToDos = getFromLocalStorage("completedToDo")
if (!allToDos){
    allToDos = []
}

if (!allCompletedToDos){
    allCompletedToDos = []
}

set_all_values_roll(Object.keys(values_colors),document.querySelector("#value_todo_id"))
const to_do_element_value = document.querySelector("#value_todo_id")
set_value_color(to_do_element_value.options[to_do_element_value.selectedIndex].value)


document.querySelector("#add_layout").addEventListener("submit", (event) => {
    event.preventDefault()
    let task_name = event.target.elements.taskName.value
    if (task_name){
        // let task_color = values_colors[event.target.elements.value_todo.value]
        console.log(window.getComputedStyle(event.target.elements.taskName).color)
        allToDos.push(
            {
                toDoName: task_name,
                value: event.target.elements.value_todo.value,
                updateTime: new Date().toISOString()
            }
        )
        saveToLocalStorage("toDos", allToDos)

        event.target.elements.taskName.value = ""

        writeToContent()
    }
})

let writeToContent = (where_name, content) => {
    let contentDiv = document.querySelector(`#${where_name}`)
    contentDiv.innerHTML = ""
    content.forEach((oneContent) => {
        let structure = createHTMLStructure(oneContent)
        contentDiv.appendChild(structure)
    })
}

writeToContent("tasks_content", allToDos)

to_do_element_value.addEventListener("change", (event) => set_value_color(event))