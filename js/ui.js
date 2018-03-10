"use strict";

let todoListe = new TodoList();
let domListe = document.getElementById('liste');
let domListeSolved = document.getElementById('liste--erledigt')
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
    item.task = task;

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
function addTasktoUIunsolved(task) {
    let newDomItem = creatNewDomItem(task);
    domListe.appendChild(newDomItem);
}

/**
 * fügt einen Task der DOMListeErledigt hinzu
 * @param task
 */
function addTasktoUIsolved(task) {
    let newDomItem = creatNewDomItem(task);
    domListeSolved.appendChild(newDomItem);
}

let setUiList =(task)=>{
    if(task.erledigt === true){
        addTasktoUIsolved(task);
    }else {
        addTasktoUIunsolved(task);
    }
};

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
        addTasktoUIunsolved(task);
    })
};

/**
 * prüft welcher Task gelöscht werden soll und entfernt ihn
 * @param e
 */
let deleteTaskIfPossible = e => {
    if (e.target.classList.contains('todo__button')) {
        todoListe.removeTaskByID(e.target.parentNode.task.id);
        e.target.parentNode.remove();
    }
};

/**
 * prüft welcher Task auferledigt/unerledigt gesetzt werden soll und macht es auch
 * @param e
 */
let updateTaskErledigtIfPossible = e => {
    if (e.target.classList.contains('todo__checkbox')) {
        let task = e.target.parentNode.task;
        todoListe.updateTaskErledigt(task.id);
        e.target.parentNode.remove();
        setUiList(task);
    }
};


initTaskListeUi(todoListe.tasks);

ready(() => {

    inputfields = document.querySelectorAll('.todo__inputfield');

    /**
     * Prüft ob in einem Inputfield die Entertaste gedrückt wurde, erstellt einen neuen Task und
     * leert das Inputfeld dann wieder
     * @param inputTasten
     */
    inputfields.forEach(inputTotal => {
        inputTotal.addEventListener('keypress', inputTaste => {
            if (inputTaste.keyCode === ENTERTASTE && inputTotal.value !== '') {
                creatTaskViaInputfield(inputTotal);
                inputTotal.value = '';
                let task = todoListe.tasks[todoListe.tasks.length - 1];
                addTasktoUIunsolved(task);
            }
        });
    });

    domListe.addEventListener('click', e => {
        deleteTaskIfPossible(e);
        updateTaskErledigtIfPossible(e);
    });

    domListeSolved.addEventListener('click', e => {
        deleteTaskIfPossible(e);
        updateTaskErledigtIfPossible(e);
    });


});