"use strict";

let todoListe = new TodoList();
let domListe = document.getElementById('liste');
let inputfields;

const ENTERTASTE = 13;

/**
 * erstellt einen neuen DOMTask
 * @param task
 * @returns {HTMLLIElement}
 */
let creatNewDomItem = (task) => {
    let item = document.createElement('li');
    item.classList = 'todo__item';

    let check = document.createElement('button');
    check.classList = 'todo__checkbox';
    if (task.erledigt === true) {
        check.classList.add('todo__checkbox-checked')
    } else {
        check.classList.remove('todo__checkbox-checked');
    }
    item.appendChild(check);

    let text = document.createElement('span');
    text.classList = 'todo__labeltext';
    text.innerHTML = task.text;
    text.setAttribute('title', task.text);
    text.setAttribute('contentEditable', true);
    item.appendChild(text);

    let delTask = document.createElement('button');
    delTask.classList = 'todo__button';
    item.appendChild(delTask);


    return item;

};

/**
 * fügt einen Task der DOMListe hinzu
 * @param task
 */
function addTasktoUI(task) {
    let newDomItem = creatNewDomItem(task);
    domListe.appendChild(newDomItem);
}

/**
 * erstellt einen Neuen Task via Inputfeld und fügt ihn der Liste hinzu
 * @param input
 */
let creatTaskViaInputfield = (input) => {
    todoListe.addTask(input.value);
};

/**
 * fügt bestehende Todoliste der Domliste hinzu
 * @param taskListe
 */
let initTaskListeUi = (taskListe) => {
    taskListe.forEach(task => {
        addTasktoUI(task);
    })
};

initTaskListeUi(todoListe.tasks);

ready(() => {

    inputfields = document.querySelectorAll('.todo__inputfield');

    /**
     * Prüft ob in einem Inputfield die Entertaste gedrückt wurde, erstellt einen neuen Task und
     * leert das Inputfeld dann wieder
     * @param inputTasten
     */
    inputfields.forEach(inputTotal =>{
        inputTotal.addEventListener('keypress', inputTaste =>{
            if (inputTaste.keyCode === ENTERTASTE && inputTotal.value !== '') {
                creatTaskViaInputfield(inputTotal);
                inputTotal.value = '';
                let task = todoListe.tasks[todoListe.tasks.length-1];
                addTasktoUI(task);
            }
        });
    });

});