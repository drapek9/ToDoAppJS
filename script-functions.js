"use strict"
const set_all_values_roll = (list_names, the_select) => {
    list_names.forEach((one_name) => {
        let new_option = document.createElement("option")
        new_option.textContent = one_name

        the_select.appendChild(new_option)
    })
}

const set_value_color = (event) => typeof(event) !== "string" ? document.querySelector("#taskNameId").style.color = values_colors[event.target.options[event.target.selectedIndex].value] : document.querySelector("#taskNameId").style.color = values_colors[event]

const saveToLocalStorage = (where_name, content) => localStorage.setItem(where_name, JSON.stringify(content))

const createHTMLStructure = (oneToDo) => {
    let divTogether = document.createElement("div")
    let textName = document.createElement("p")
    let checkBox = document.createElement("input")
    let dateUpdate = document.createElement("p")

    textName.textContent = oneToDo.toDoName

    let updateDate = new Date(oneToDo.updateTime)
    dateUpdate.innerHTML = `<span class="timeUpdateVisual" name="timeUpdateVisualName">${updateDate.toTimeString().split(" ")[0]}</span>  ${updateDate.getDate().toString().padStart(2, "0")}.${(updateDate.getMonth()+1).toString().padStart(2, "0")}.${updateDate.getFullYear()}`

    checkBox.type = "checkbox"
    textName.style.color = values_colors[oneToDo.value]

    textName.classList.add("taskNameVisual")
    divTogether.classList.add("divTogetherVisual")
    checkBox.classList.add("checkBoxVisual")
    dateUpdate.classList.add("dateUpdateVisual")

    divTogether.appendChild(checkBox)
    divTogether.appendChild(textName)
    divTogether.appendChild(dateUpdate)

    divTogether.addEventListener("mouseenter", (event) => event.target.querySelector("span").style.display = "inline-block")

    divTogether.addEventListener("mouseleave", (event) => event.target.querySelector("span").style.display = "none")

    checkBox.addEventListener("change", (event) => {
        markAsComplete(oneToDo)
        writeToContent("tasks_content", allToDos)
        writeToCompletedContent("complete_content", allCompletedToDos)
    })

    return divTogether
}

const createHTMLCompletedStructure = (oneToDo) => {
    let divTogether = document.createElement("div")
    let taskName = document.createElement("p")
    let checkBox = document.createElement("input")
    let deleteButton = document.createElement("a")

    checkBox.type = "checkbox"

    taskName.textContent = oneToDo.toDoName
    deleteButton.textContent = "Delete"
    deleteButton.href = "#"
    checkBox.checked = true

    divTogether.classList.add("divCompleteTogether")
    taskName.classList.add("taskNameVisualCompleted")
    deleteButton.classList.add("deleteButtonVisual")

    divTogether.appendChild(checkBox)
    divTogether.appendChild(taskName)
    divTogether.appendChild(deleteButton)

    checkBox.addEventListener("change", () => {
        markAsToDo(oneToDo)
        writeToContent("tasks_content", allToDos)
        writeToCompletedContent("complete_content", allCompletedToDos)

    })

    deleteButton.addEventListener("click", (event) => {
        deleteCompletedTask(oneToDo)
        writeToCompletedContent("complete_content", allCompletedToDos)
    })

    return divTogether
}

const markAsComplete = (oneToDo) => {
    allCompletedToDos.push(allToDos[allToDos.indexOf(oneToDo)])
    allToDos.splice(allToDos.indexOf(oneToDo), 1)
    saveToLocalStorage("toDos", allToDos)
    saveToLocalStorage("completedToDo", allCompletedToDos)
}

const markAsToDo = (oneToDo) => {
    allToDos.push(oneToDo)
    allCompletedToDos.splice(allCompletedToDos.indexOf(oneToDo), 1)
    saveToLocalStorage("toDos", allToDos)
    saveToLocalStorage("completedToDo", allCompletedToDos)
}


const deleteCompletedTask = (oneCompleted) => {
    allCompletedToDos.splice(allCompletedToDos.indexOf(oneCompleted), 1)
    saveToLocalStorage("completedToDo", allCompletedToDos)
}