"use strict";

todoListe.onNewTask = (task) => {
    let storageItemName = 'task' + task.id;
    localStorage.setItem(storageItemName, JSON.stringify(task));
};

todoListe.onUpdateTask = (task) => {
    let storageItemName = 'task' + task.id;
    localStorage.setItem(storageItemName, JSON.stringify(task));
};

todoListe.onDeleteTask = (task) => {
    let storageItemName = 'task' + task.id;
    localStorage.removeItem(storageItemName);
};


function buildTaskListFromLocalstorage() {
    for (let task in localStorage) {
        if (localStorage.hasOwnProperty(task)) {
            let template = JSON.parse(localStorage.getItem(task));
            let t = new Task(template._text);
            t.id = template.id;
            t._position = template._position;
            t.erledigt = template.erledigt;
            todoListe.tasks.push(t);
        }
    }
}

todoListe.onInit = (liste) =>{
    buildTaskListFromLocalstorage();
    initTaskListeUi(todoListe.tasks);
};
todoListe.onInit(todoListe);
