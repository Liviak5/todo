"use strict";

let todoList = new TodoList();

todoList.addTask('test');

ready(() => {

    let todoInputFields = document.querySelectorAll('.todo__inputfield');
    let liste = document.getElementById('liste');

    /**
     * Erstellt ein neues Listenelement mit dem Inhalt eines Tasks
     * @param task
     * @returns {HTMLLIElement}
     */
    function creatNewTodoItem(task) {
        let newItem = document.createElement('li');
        newItem.classList = 'todo__item';
        newItem.innerHTML = '<label class="todo__label">' +
            '<div class="todo__checkbox"><span class="checkbox__input"></span></div>' +
            '<div class="todo__labeltext" title="' + task.text + '">' + task.text + '</div>' +
            '<div><button class="todo__button"></button></div>' +
            '</label>';
        return newItem;
    }

    /**
     * initialisiert die Todoliste(DOM) mit allen Tasks
     * @param todoList  ist die kreierte new TodoList
     */
    function initTodoList(todoList) {
        liste.innerText = '';                                         //setzt die DOM TodoListe zurück
        todoList.forEach(function (task) {                            //für jeden Task in der TodoList
            liste.appendChild(creatNewTodoItem(task));                //führe die funktion creatNewTodoItem aus und füge Sie der DOM TodoListe hinzu
        })
    }

    function addNewTodoItem(task) {
        liste.appendChild(creatNewTodoItem(task));
    }


    /**
     * Wenn Enter gedrückt wird und der Inhalt nicht leer ist, wird der Todoliste ein neuer Task hinzugefügt
     * inputEL ist ein beliebiges Inputelement mit der Klasse 'todo_inputfield'
     * @type {NodeListOf<Element>}
     */
    todoInputFields.forEach((inputEL) => {
        inputEL.addEventListener('keypress', e => {                 //e steht für jeden Tastendruck
            if (e.keyCode === 13 && inputEL.value !== '') {         //inputEL.value spricht den Inhalt des Inputfelds an
                let task = todoList.addTask(inputEL.value);         //füge den Inhalt des Inputfelds der Taskliste hinzu
                addNewTodoItem(task);                               //füge diesen Task auch gleich der DOMListe hinzu
                inputEL.value = '';                                 //setzt den Inhalt des Inputfelds zurück
            }
        });
    });

    initTodoList(todoList.tasks);

});