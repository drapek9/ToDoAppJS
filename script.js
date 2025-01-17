"use strict"
let values_colors = {
    1: "#FF0000",
    2: "#00FF00",
    3: "#0000FF",
    4: "#9368DF", // purple
    5: "#ff9100" // orange
}

let allToDos = getFromLocalStorage("toDos")
let allCompletedToDos = getFromLocalStorage("completedToDo")

let CompletedToDosPoints = getFromLocalStorage("PointsCompleted")

if (!CompletedToDosPoints){
    CompletedToDosPoints = 0
}
setScore()

console.log(CompletedToDosPoints)
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
        allToDos.push(
            {
                toDoName: task_name,
                value: event.target.elements.value_todo.value,
                updateTime: new Date().toISOString()
            }
        )
        saveToLocalStorage("toDos", allToDos)

        event.target.elements.taskName.value = ""

        writeToContent("tasks_content", allToDos)
    }
})

const writeToContent = (where_name, content) => {
    let new_toDo = sortInfToDos(allToDos, document.querySelector("#sort_option").options[document.querySelector("#sort_option").selectedIndex].value)
    let contentDiv = document.querySelector(`#${where_name}`)
    contentDiv.innerHTML = ""
    new_toDo.forEach((oneContent) => contentDiv.appendChild(createHTMLStructure(oneContent)))
    controleCreateNoToDO(contentDiv, "No task to do yet!")
}

const controleCreateNoToDO = (myContentDiv, text) => {
    if (myContentDiv.innerHTML === ""){
        let noToDoP = document.createElement("p")

        noToDoP.textContent = text
        noToDoP.classList.add("noToDoPar")

        myContentDiv.appendChild(noToDoP)
        myContentDiv.style.display = "flex"
    } else {
        myContentDiv.style.display = "block"
    }
}

const writeToCompletedContent = (where_name, content) => {
    let contentCompleteDiv = document.querySelector(`#${where_name}`)
    contentCompleteDiv.innerHTML = ""
    content.forEach((oneContent) => contentCompleteDiv.appendChild(createHTMLCompletedStructure(oneContent)))

    controleCreateNoToDO(contentCompleteDiv, "No completed yet!")
}

writeToContent("tasks_content", allToDos)
writeToCompletedContent("complete_content", allCompletedToDos)

to_do_element_value.addEventListener("change", (event) => set_value_color(event))

document.querySelector("#sort_option").addEventListener("change", (event) => {
    writeToContent("tasks_content", allToDos)
})

document.querySelector("#taskNameId").addEventListener("input", (event) => {
    if (event.target.value.length > 40){
        event.target.value = event.target.value.slice(0, 40)
        showFieldError("Max 40 letters")
    } else if (timeoutFieldError !== null) {
        document.querySelector("#error_input").textContent = ""
        if (timeoutFieldError !== null){
            clearTimeout(timeoutFieldError)
            timeoutFieldError = null
        }
    }
})