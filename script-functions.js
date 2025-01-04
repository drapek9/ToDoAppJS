const set_all_values_roll = (list_names, the_select) => {
    list_names.forEach((one_name) => {
        let new_option = document.createElement("option")
        new_option.textContent = one_name

        the_select.appendChild(new_option)
    })
}

const set_value_color = (event) => typeof(event) !== "string" ? document.querySelector("#taskNameId").style.color = values_colors[event.target.options[event.target.selectedIndex].value] : document.querySelector("#taskNameId").style.color = values_colors[event]