"use strict"
let values_colors = {
    1: "#FF0000",
    2: "#00FF00",
    3: "#0000FF",
    4: "#9368DF", // purple
    5: "#ff9100" // orange
}

const getFromLocalStorage = (where_name) => {
    return JSON.parse(localStorage.getItem(where_name))
}

let allToDos = getFromLocalStorage("toDos")
if (!allToDos){
    allToDos = []
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
    }
})

let contentDiv = document.querySelector("#tasks_content")
allToDos.forEach((oneToDo) => {
    let structure = createHTMLStructure(oneToDo)
    contentDiv.appendChild(structure)
})

to_do_element_value.addEventListener("change", (event) => set_value_color(event))