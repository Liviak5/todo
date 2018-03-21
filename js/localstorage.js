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

