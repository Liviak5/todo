"use strict";

let domListe = document.getElementById('liste');
let inputfield = document.querySelectorAll('todo__inputfield');

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

function addTasktoUI(task) {
    let newDomItem = creatNewDomItem(task);
    domListe.appendChild(newDomItem);
};

let initTaskListeUi = (taskListe) => {
    taskListe.forEach(task =>{
        addTasktoUI(task);
    })
};

initTaskListeUi(todoListe.tasks);

