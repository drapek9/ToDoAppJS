"use strict"
let values_colors = {
    1: "#FF0000",
    2: "#00FF00",
    3: "#0000FF",
    4: "#9368DF", // purple
    5: "#ff9100" // orange
}

set_all_values_roll(Object.keys(values_colors),document.querySelector("#value_todo_id"))


document.querySelector("#add_layout").addEventListener("submit", function(event){
    event.preventDefault()
    let task_name = event.target.elements.taskName.value
    if (task_name){
        let task_color = values_colors[event.target.elements.value_todo.value]
        console.log(task_color)
    }
})