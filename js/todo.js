"use strict";

let todoList = new TodoList();

let inputEL = document.querySelectorAll('.todo__inputfield');
let liste = document.getElementById('liste');

/**
 *Höhrt auf Inputfeld.
 * Wenn Entertaste gedrückt wird und der String nicht leer ist
 * wird ein neuer Task mit dem Inputfeld Inhalt in der todoList erstellt
 */
inputEL.addEventListener('keypress', function (e) {
    //Wenn entertaste gedrückt wird und das Inputfeld nicht leer ist
    if (e.value === 13 && e.value !== '') {
        //dann schreibe einen neuen Task mit dem Inhalt des Inputfelds
        todoList.addTask(e.value);
        //anschliessend setze Inputfeld auf leer
        inputEL.value = '';
    }
});