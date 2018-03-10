"use strict";

class Task {
    constructor(text) {
        this.id = 1;
        this._position = 1;
        this._text = text || '';
        this.erledigt = false;
    }

    set position(value) {
        if (typeof value === 'number') {
            this._position = value;
        } else {
            console.log('keine Nummer');
        }
    }

    get position() {
        return this._position;
    }

    set text(text) {
        if (typeof text === 'string') {
            this._text = text;
        } else {
            this._text = text.toString();
        }
    }

    get text() {
        return this._text;
    }

}

class TodoList {
    constructor() {
        this.tasks = [];
    }

    /**
     * fügt einen neuen Task der Todoliste hinzu
     * @param text
     */
    addTask(text) {
        let t = new Task(text);
        if (this.tasks.length > 0) {
            let lPosition = this.getLastTask().position;
            t.position = ++lPosition;
            let lId = this.getLastTask().id;
            t.id = ++lId;
        }
        let storageTask = this.onNewTask(t);
        if (storageTask != false){
            this.tasks.push(t);
        } else  {
            return false;
        }
    }

    /**
     * Aktualisiert den Task ob er erledigt ist oder nicht
     * @param taskID
     */
    updateTaskErledigt(taskID) {
        let index = this.findIndexById(taskID);
        this.onUpdateTask(this.tasks[index]);
        if (this.tasks[index].erledigt === false) {
            this.tasks[index].erledigt = true;
        } else {
            this.tasks[index].erledigt = false;
        }
    }

    /**
     * aktualisiert den Text eines Tasks
     * @param taskID
     * @param text
     */
    updateTaskText(taskID, text) {
        let index = this.findIndexById(taskID);
        this.tasks[index].text = text;
        this.onUpdateTask(this.tasks[index]);
    }

    /**
     * löscht einen Task mit der Angabe des Index
     * @param index
     */
    removeTask(index) {
        this.tasks.splice(index, 1);
        this.onDeleteTask(this.tasks[index]);
    }

    /**
     * löscht Task mit der Angabe der ID
     * @param taskID
     */
    removeTaskByID(taskID) {
        let index = this.findIndexById(taskID);
        if(index >=0){
            this.removeTask(index);
        }

    }

    /**
     * Findet den Index über die ID des Tasks
     * @param taskID
     * @returns {number}
     */
    findIndexById(taskID) {
        let idVergleich = (task) => {
            return task.id === taskID;
        };
        let index = this.tasks.findIndex(idVergleich);
        return index;
    }

    /**
     * verschiebt einen Task in der Reihenfolge
     * @param sourceIndex
     * @param targetIndex
     */
    moveBefore(sourceIndex, targetIndex) {

        let followIndex = this.tasks[targetIndex].position;
        let prevIndex = 0;

        function sortTasks(a, b) {
            return a.position - b.position;
        }

        if (targetIndex > 0) {
            prevIndex = this.tasks[targetIndex - 1].position;
        }
        let newPosition = (prevIndex + followIndex) / 2;

        this.tasks[sourceIndex].position = newPosition;
        this.tasks.sort(sortTasks);

        this.onUpdateTask(this.tasks[sourceIndex]);
    }

    //Hilfsfunktionen
    /**
     * ermittelt den letzten Task
     * @returns {*}
     */
    getLastTask() {
        let l = this.tasks[this.tasks.length - 1];
        return l;
    }

    onNewTask(task) {
        return true;
    }

    onDeleteTask(task) {
        return true;
    }

    onUpdateTask(task) {
        return true;
    }

}


// Machen wir nur für die Tests
if (typeof module !== 'undefined'&& module) {
    module.exports.Task = Task;
    module.exports.TodoList = TodoList;
}