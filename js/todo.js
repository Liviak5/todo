"use strict";

let todoList = new TodoList();

ready(() => {


    /**
     * Wenn Enter gedrückt wird und der Inhalt nicht leer ist, wird der Todoliste ein neuer Task hinzugefügt
     * @type {NodeListOf<Element>}
     */
    let taskInputFields = document.querySelectorAll('.todo__inputfield');
    let liste = document.getElementById('liste');

    taskInputFields.forEach((inputEL) => {
        inputEL.addEventListener('keypress', e => {
            if (e.keyCode === 13 && inputEL.value !== '') {
                todoList.addTask(inputEL.value);
                inputEL.value = '';
            }
        });
    });




});