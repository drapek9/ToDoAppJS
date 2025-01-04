const set_all_values_roll = (list_names, the_select) => {
    list_names.forEach((one_name) => {
        let new_option = document.createElement("option")
        new_option.textContent = one_name

        the_select.appendChild(new_option)
    })
}