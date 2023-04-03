const form = document.getElementById('form')
const pending_ul = document.getElementById('pending')
const completed_ul = document.getElementById('finished')
const URL = "https://crudcrud.com/api/681c4e89f2a243b78faf8ef4655b7b12/Register"

function add_item() {
    const todo_item = document.getElementById('item').value
    const todo_description = document.getElementById('description').value

    const config = {
        method: "POST",
        url: URL,
        data: {
            Item: todo_item,
            Description: todo_description,
            Status: "Pending"
        },
        headers: {
            'Content-Type': 'application/json'
        }
    }
    axios(config)
        .then((res) => {

            pending_ul.innerHTML += `<li id="${res.data._id}"><span>${todo_item}--${todo_description}</span> <button class="btn btn-warning green" id="green">Completed</button> <button class="red btn btn-danger" id="red">Cancel</button></li>`
        })
        .catch((error) => {
            console.log(error);
        })
}

form.addEventListener('submit', (e) => {
    e.preventDefault()
    add_item()
    form.reset()
})
pending_ul.addEventListener('click', (e) => {
    const todo_id = e.target.parentNode.getAttribute('id')
    if (e.target.classList.contains('green')) {

        const todo_id = e.target.parentNode.getAttribute('id')
        const todo_item = e.target.parentNode.querySelector('span').textContent.split('--')[0]
        const todo_description = e.target.parentNode.querySelector('span').textContent.split('--')[1]

        axios.put(`${URL}/${todo_id}`, {
            Status: "Completed",
            Item: todo_item,
            Description: todo_description
        }
            // headers : {
            //     'Content-Type': 'application/json'
            // }
        )
            .then((res) => {
                completed_ul.innerHTML += `<li id="${todo_id}"><span>${e.target.parentNode.querySelector('span').textContent}</span>  <button class="green btn btn-success" id="green">Completed</button> <button class="red btn btn-danger" id="red">Cancel</button></li>`
                e.target.parentNode.remove()

            })
            .catch((error) => {
                console.log(error);
            })
    }
    if (e.target.classList.contains('red')) {
        e.target.parentNode.remove()

        axios.delete(`${URL}/${todo_id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }
})

window.addEventListener("DOMContentLoaded", (e) => {
    axios.get(URL)
        .then((response) => {
            for (let i = 0; i < response.data.length; i++) {
                if (response.data[i].Status === "Pending") {
                    pending_ul.innerHTML += `<li id="${response.data[i]._id}"><span>${response.data[i].Item}-- ${response.data[i].Description}</span> <button class="green btn btn-warning" id="green ">Completed</button> <button class="red btn btn-danger" id="red ">Cancel</button></li>`
                } else {
                    completed_ul.innerHTML += `<li id="${response.data[i]._id}"><span>${response.data[i].Item}-- ${response.data[i].Description}</span>  <button class="green btn btn-success" id="green ">Completed</button> <button class="red btn btn-danger" id="red ">Cancel</button></li>`

                }
            }
        })
        .catch((error) => {
            console.log(error);
        })
})
completed_ul.addEventListener('click', (e) => {
    const todo_id = e.target.parentNode.getAttribute('id')

    if (e.target.classList.contains('red')) {
        e.target.parentNode.remove()
        axios.delete(`${URL}/${todo_id}`)
            .then((res) => {
                console.log(res);
            })
            .catch((error) => {
                console.log(error);
            })
    }
})