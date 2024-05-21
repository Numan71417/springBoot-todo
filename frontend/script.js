document.addEventListener('DOMContentLoaded', () => {
    const todoInput = document.getElementById('todo-input');
    const addButton = document.getElementById('add-button');
    const todoList = document.getElementById('todo-list');

    let todoCounter = 0;
    let todos = [];

    addButton.addEventListener('click', addTodo);

    function addTodo() {
        const todoText = todoInput.value.trim();
        if (todoText === '') {
            alert('Please enter a task.');
            return;
        }

        todoCounter++;
        const todoId = todoCounter;

        const listItem = document.createElement('li');
        listItem.textContent = todoText;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => {
            listItem.remove();
        });

        listItem.appendChild(removeButton);
        todoList.appendChild(listItem);

        // Clear the input field
        todoInput.value = '';

        // Simulate sending data to API
        const data = sendDataToApi(todoId, todoText);
        console.log(data);
    }

    const getTodos = async()=>{
        const response = await fetch('http://localhost:8080/todos');
        if(response.ok){
            const data = await response.json();
            todos = data;
            console.log(todos);
            showTodos(todos)
        }else{
            alert("Cant fetch todos ")
        }
    }


    function displayTodo(todo) {
        const listItem = document.createElement('li');
        listItem.textContent = todo.data;

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove';
        removeButton.classList.add('remove-button');
        removeButton.addEventListener('click', () => {
            listItem.remove();
            removeTodoFromList(todo.id);
        });

        listItem.appendChild(removeButton);
        todoList.appendChild(listItem);
    }

    function removeTodoFromList(id) {
        todos = todos.filter(todo => todo.id !== id);
    }

    function showTodos(todos) {
        todoList.innerHTML = '';
        todos.forEach(todo => displayTodo(todo));
    }




    getTodos();


    async function  sendDataToApi(id, todoData) {
        const data = {
            id: id,
            todoData: todoData
        };
        console.log('Sending data to API:', data);
        // Simulate an API call
        const response = await fetch('http://localhost:8080/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        if(response.ok){
            return await response.json()
        }else{
           alert("Something went wrong");
        }
        
    }
});
