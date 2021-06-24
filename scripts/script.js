'use strict';

class Todo {
    constructor(form, input, todoList, todoCompleted, container) {
        this.input = document.querySelector(input);
        this.container = document.querySelector(container);
        this.todoList = document.querySelector(todoList);
        this.form = document.querySelector(form);
        this.todoCompleted = document.querySelector(todoCompleted);
        this.todoData = new Map(JSON.parse(localStorage.getItem('toDoList')));
        this.currentKey = '';
    }

    render() {
        this.input.value =''
        this.todoList.textContent = '';
        this.todoCompleted.textContent = '';
        this.todoData.forEach(this.createItem);
        this.addToStorage();
    }

    addToStorage() {
        localStorage.setItem('toDoList', JSON.stringify([...this.todoData]));
    }

    createItem = (todo) => {
        const li = document.createElement('li');
        li.key = todo.key;
        li.classList.add('todo-item');
        li.insertAdjacentHTML('beforeend',
            `<span class="text-todo">${todo.value}</span>
         <div class="todo-buttons">
              <button class="todo-remove"></button>
              <button class="todo-complete"></button>
          </div>`);

        if (todo.completed) {
            this.todoCompleted.prepend(li);
        } else {
            this.todoList.prepend(li);
        }
    }

    addTodo(e) {
        e.preventDefault();
        if (this.input.value.trim()) {
            const newTodo = {
                value: this.input.value,
                completed: false,
                key: this.generateKey(),
            };
            this.todoData.set(newTodo.key, newTodo);
            this.render();
        } else {
            this.input.style.border = '2px solid red';
            this.input.placeholder = 'Поле не должно быть пустым'
            setTimeout(() => {
                this.input.style.border = '';
                this.input.placeholder = 'Какие планы?'
            }, 2000)
        }
    }

    generateKey() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

    deleteItem() {
        this.todoData.forEach((item,index)=> {
            if (item.key === this.currentKey) {
this.todoData.delete(index)
            }
        })
        this.render()
    }

    completedItem() {
        this.todoData.forEach((item)=>{
            if(item.key===this.currentKey){
                item.completed=!item.completed
            }
            this.render()
        })
        for (let i=0;i<this.todoList.children.length;i++){

        }

    }

    handler(item) {
        item.addEventListener('click', (e) => {
            const target = e.target;

            if (target.matches('.todo-complete')) {
                this.currentKey = target.closest('.todo-item').key

                this.completedItem();
            } else if (target.matches('.todo-remove')) {
                this.currentKey = target.closest('.todo-item').key
                this.deleteItem();
            }
        })
    }

    init() {
        this.form.addEventListener('submit', this.addTodo.bind(this));
        this.render();
        this.handler(this.container)
    }
}


const todo = new Todo('.todo-control', '.header-input', '.todo-list', '.todo-completed', '.todo-container');
todo.init()
