"use strict"
const set_all_values_roll = (list_names, the_select) => {
    list_names.forEach((one_name) => {
        let new_option = document.createElement("option")
        new_option.style.color = values_colors[one_name]
        new_option.textContent = one_name

        the_select.appendChild(new_option)
    })
    set_select_color_change()
}

document.querySelector("select").addEventListener("change", () => set_select_color_change())

const set_select_color_change = () => {
    const selected_opt = document.querySelector("select").options[document.querySelector("select").selectedIndex]
    document.querySelector("select").style.color = values_colors[selected_opt.textContent]
}

const set_value_color = (event) => typeof(event) !== "string" ? document.querySelector("#taskNameId").style.color = values_colors[event.target.options[event.target.selectedIndex].value] : document.querySelector("#taskNameId").style.color = values_colors[event]

const getFromLocalStorage = (where_name) => JSON.parse(localStorage.getItem(where_name))
const saveToLocalStorage = (where_name, content) => localStorage.setItem(where_name, JSON.stringify(content))

const createHTMLStructure = (oneToDo) => {
    let divTogether = document.createElement("div")
    let textName = document.createElement("p")
    let checkBox = document.createElement("input")
    let dateUpdate = document.createElement("p")
    let deleteButton = document.createElement("a")

    textName.textContent = oneToDo.toDoName
    deleteButton.textContent = "Delete"

    let updateDate = new Date(oneToDo.updateTime)
    dateUpdate.innerHTML = `<span class="timeUpdateVisual" name="timeUpdateVisualName">${updateDate.toTimeString().split(" ")[0]}</span>  ${updateDate.getDate().toString().padStart(2, "0")}.${(updateDate.getMonth()+1).toString().padStart(2, "0")}.${updateDate.getFullYear()}`
    deleteButton.href = "#"

    checkBox.type = "checkbox"
    textName.style.color = values_colors[oneToDo.value]

    textName.classList.add("taskNameVisual")
    divTogether.classList.add("divTogetherVisual")
    checkBox.classList.add("checkBoxVisual")
    dateUpdate.classList.add("dateUpdateVisual")
    deleteButton.classList.add("deleteButtonVisual")

    divTogether.appendChild(checkBox)
    divTogether.appendChild(textName)
    divTogether.appendChild(dateUpdate)
    divTogether.appendChild(deleteButton)

    divTogether.addEventListener("mouseenter", (event) => event.target.querySelector("span").style.display = "inline-block")

    divTogether.addEventListener("mouseleave", (event) => event.target.querySelector("span").style.display = "none")

    checkBox.addEventListener("change", (event) => {
        markAsComplete(oneToDo)
        writeToContent("tasks_content", allToDos)
        writeToCompletedContent("complete_content", allCompletedToDos)
    })

    deleteButton.addEventListener("click", () => {
        deleteToDOTask(oneToDo)
        writeToContent("tasks_content", allToDos)
    })

    return divTogether
}

const createHTMLCompletedStructure = (oneToDo) => {
    let divTogether = document.createElement("div")
    let taskName = document.createElement("p")
    let checkBox = document.createElement("input")
    let deleteButton = document.createElement("a")
    let completedDate = document.createElement("p")

    checkBox.type = "checkbox"

    taskName.textContent = oneToDo.toDoName
    deleteButton.textContent = "Delete"
    deleteButton.href = "#"
    checkBox.checked = true
    completedDate.textContent = oneToDo.completed
    let comp_date = new Date(oneToDo.completed)
    completedDate.textContent = `completed: ${comp_date.getDate().toString().padStart(2, "0")}.${(comp_date.getMonth()+1).toString().padStart(2, "0")}.${comp_date.getFullYear()}`
    console.log(new Date(oneToDo.completed).getDate())

    divTogether.classList.add("divCompleteTogether")
    taskName.classList.add("taskNameVisualCompleted")
    deleteButton.classList.add("deleteButtonVisual")
    completedDate.classList.add("completedDateStyle")

    divTogether.appendChild(checkBox)
    divTogether.appendChild(taskName)
    divTogether.append(completedDate)
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

    divTogether.addEventListener("mouseenter", () => {
        completedDate.style.display = "inline-block"
        taskName.style.maxWidth = "calc(100% - 140px)"
    })

    divTogether.addEventListener("mouseleave", () => {
        completedDate.style.display = "none"
        taskName.style.maxWidth = "calc(100% - 80px)"
    })

    return divTogether
}

const markAsComplete = (oneToDo) => {
    oneToDo.completed = new Date().toISOString()
    allCompletedToDos.push(allToDos[allToDos.indexOf(oneToDo)])
    allToDos.splice(allToDos.indexOf(oneToDo), 1)
    saveToLocalStorage("toDos", allToDos)
    saveToLocalStorage("completedToDo", allCompletedToDos)
    CompletedToDosPoints += Number(oneToDo.value)
    saveToLocalStorage("PointsCompleted", CompletedToDosPoints)
    setScore()
}

const markAsToDo = (oneToDo) => {
    delete oneToDo.completed
    allToDos.push(oneToDo)
    allCompletedToDos.splice(allCompletedToDos.indexOf(oneToDo), 1)
    saveToLocalStorage("toDos", allToDos)
    saveToLocalStorage("completedToDo", allCompletedToDos)
    CompletedToDosPoints -= Number(oneToDo.value)
    saveToLocalStorage("PointsCompleted", CompletedToDosPoints)
    setScore()
}

const deleteToDOTask = (oneToDo) => {
    allToDos.splice(allToDos.indexOf(oneToDo), 1)
    saveToLocalStorage("toDos", allToDos)
}

const deleteCompletedTask = (oneCompleted) => {
    allCompletedToDos.splice(allCompletedToDos.indexOf(oneCompleted), 1)
    saveToLocalStorage("completedToDo", allCompletedToDos)
}

const sortInfToDos = (for_sort, chose_value) => {
    let new_value = [...for_sort]
    if (chose_value == 1){
        new_value.sort((a, b) => a.value.localeCompare(b.value))
    } else if (chose_value == 2){
        new_value.sort((a, b) => a.updateTime.localeCompare(b.updateTime))
    } else if (chose_value == 3){
        new_value.sort((a, b) => a.toDoName.localeCompare(b.toDoName))
    } else if (chose_value == 4){
        new_value.sort((a, b) => v.value.localeCompare(a.value))
    } else if (chose_value == 5){
        new_value.sort((a, b) => b.updateTime.localeCompare(a.updateTime))
    } else if (chose_value == 6){
        new_value.sort((a, b) => b.toDoName.localeCompare(a.toDoName))
    } else {
        console.log("neexistuje")
    }

    return new_value
}
let timeoutFieldError = null
const showFieldError = (text) => {
    document.querySelector("#error_input").textContent = text
    if (timeoutFieldError !== null){
        clearTimeout(timeoutFieldError)
        timeoutFieldError = null
    }
    timeoutFieldError = setTimeout(() => {
        document.querySelector("#error_input").textContent = ""
    }, 3000)
}

const setScore = () => {
    document.querySelector("#score_num").textContent = CompletedToDosPoints
}