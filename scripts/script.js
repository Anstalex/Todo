'use strict';

const todoControl = document.querySelector('.todo-control');
const headerInput = document.querySelector('.header-input');
const todoList = document.querySelector('.todo-list');
const todoComplete = document.querySelector('.todo-completed');

const value = localStorage.getItem('value');

const parse = value ? JSON.parse(value) : [];

const todoData = [...parse];

const render = function () {
    todoList.innerText = '';
    todoComplete.innerText = '';

    todoData.forEach(function (item, index) {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        li.setAttribute('data-index', index);
        li.innerHTML = `<span class="text-todo">${item.value}</span>
                        <div class="todo-buttons">
                           <button class="todo-remove"></button>
                           <button class="todo-complete"></button>
                        </div>`
        if (item.completed) {
            todoComplete.append(li);
        } else {
            todoList.append(li);
        }
        const todoRemove = li.querySelectorAll('.todo-remove');
        todoRemove.forEach(function (item) {
            item.addEventListener('click', function () {
                const arrElem = this.parentNode.parentNode
                const indexElement = arrElem.dataset.index;
                todoData.splice(indexElement, 1);

                localStorage.setItem('value', JSON.stringify(todoData));
                render();
            })
        })
        const btnTodoComplete = li.querySelector('.todo-complete');
        btnTodoComplete.addEventListener('click', function () {

            item.completed = !item.completed;

            todoData[index] = item;

            localStorage.setItem('value', JSON.stringify(todoData))

            render();
        });
    });
}


todoControl.addEventListener('submit', function (event) {
    event.preventDefault();
    if (headerInput.value.trim() !== '') {
        const newTodo = {
            value: headerInput.value,
            completed: false
        };
        todoData.unshift(newTodo);
        localStorage.setItem('value', JSON.stringify(todoData));
        headerInput.value = '';
        render();
    }
});
render();
