// Machen wir nur für die node Tests
if (typeof module !== 'undefined' && module) {
    assert = require('chai').assert;
    expect = require('chai').expect;

    Task = require('./todo-model.js').Task;
    TodoList = require('./todo-model.js').TodoList;
}

describe('Todo', function () {


    describe('TodoList', function () {

        it('wir sollten ein TodoList Objekt erzeugen können', function () {
            let t = new TodoList;
            assert.instanceOf(t, TodoList);
        });

        it('Todolist sollte ein Attribut tasks (array) mit Tasks haben', function () {
            let tl = new TodoList;
            assert.typeOf(tl.tasks, 'array');
        });

        it('Sollte beim Löschen eines Task onDeleteTask aufrufen ', function () {
            let liste = new TodoList();
            let t = liste.addTask('Neue Aufgabe');
            let check = 0;

            liste.onDeleteTask = task => {
                check = 1;

                return true;
            };
            liste.removeTask(0);
            expect(liste.tasks.length).equal(0);
            expect(check).equal(1);
        });

        it('sollte beim aktualisieren eines Tasks den onUpdateTask vom Test aufrufen', function () {
            let liste = new TodoList();
            liste.addTask('Neue Aufgabe');
            liste.addTask('Neue Aufgabe 1');
            liste.addTask('Neue Aufgabe 2');
            liste.addTask('Neue Aufgabe 3');
            liste.addTask('Neue Aufgabe 4');

            let check = 0;
            liste.onUpdateTask = task => {
                check++;
                return true;
            };


            liste.updateTaskText(1, 'Halloween');
            expect(liste.tasks[0]._text).equal('Halloween');
            expect(check).equal(1);

            liste.updateTaskErledigt(1);
            expect(liste.tasks[0].erledigt).equal(true);
            expect(check).equal(2);

            liste.updateTaskErledigt(1);
            expect(liste.tasks[0].erledigt).equal(false);
            expect(check).equal(3);

            liste.moveBefore(1,3);
            expect(check).equal(4);

        });

        it('beim Erstellen eines Tasks bei dem onNewTask fehlerhaft war, task nicht in die Liste aufnehmen', function () {
            let liste = new TodoList();

            liste.onNewTask = (task) => {
                expect(task.text).equal('Neue Aufgabe');
                return false;
            };

            liste.addTask('Neue Aufgabe');
            expect(liste.tasks.length).equal(0);
        });

        it('beim Erstellen eines Tasks sollte onNewTask callback aufgerufen werden', function () {
            let liste = new TodoList();

            let check = 0;

            liste.onNewTask = task => {
                check = 1;

                return true;
            };

            liste.addTask('Neue Aufgabe');
            expect(check).equal(1);
            expect(liste.tasks[0].text).equal('Neue Aufgabe');
            expect(liste.tasks.length).equal(1);
        });

        it('Ein Task soll entfernt werden können', function () {
            let liste = new TodoList();
            liste.addTask('Neue Aufgabe A');
            liste.addTask('Neue Aufgabe B');
            liste.addTask('Neue Aufgabe C');
            liste.addTask('Neue Aufgabe D');
            liste.addTask('Neue Aufgabe E');
            liste.addTask('Neue Aufgabe F');
            liste.addTask('Neue Aufgabe G');

            liste.removeTask(1);
            expect(liste.tasks.length).equal(6);
            expect(liste.tasks[0].text).equal('Neue Aufgabe A');
            expect(liste.tasks[1].text).equal('Neue Aufgabe C');

            liste.removeTask(0);
            expect(liste.tasks.length).equal(5);
            expect(liste.tasks[0].text).equal('Neue Aufgabe C');
            expect(liste.tasks[1].text).equal('Neue Aufgabe D');

        });

        it('ein Task sollte auch mit seiner ID entfernt werden können', function () {
            let liste = new TodoList();
            liste.addTask('Neue Aufgabe A'); // id 1
            liste.addTask('Neue Aufgabe B'); // id 2
            liste.addTask('Neue Aufgabe C'); // id 3
            liste.addTask('Neue Aufgabe D'); // id 4

            // nicht existierender index sollte keine Auswirkung haben
            liste.removeTaskByID(9);
            expect(liste.tasks[1].id).equal(2);
            expect(liste.tasks.length).equal(4);

            liste.removeTaskByID(3);
            expect(liste.tasks[2].id).equal(4);
            expect(liste.tasks[0].text).equal('Neue Aufgabe A');
            expect(liste.tasks.length).equal(3);

        });

        it('Ein Task sollte nach hinten verschoben werden können', function () {
            let liste = new TodoList();
            liste.addTask('Neue Aufgabe');
            liste.addTask('Neue Aufgabe A');
            liste.addTask('Neue Aufgabe L');
            //--- A sollte hier sein
            liste.addTask('Neue Aufgabe E');
            liste.addTask('Neue Aufgabe X');
            liste.addTask('Neue Aufgabe ANDER');


            liste.moveBefore(1, 3);
            // wir schieben von 1 auf bevor 3 (=>2)
            expect(liste.tasks[2].text).equal('Neue Aufgabe A');
            expect(liste.tasks[2].position).equal(3.5);

            liste.moveBefore(0, 3);
            expect(liste.tasks[2].text).equal('Neue Aufgabe');
            expect(liste.tasks[2].position).equal(3.75);

        });

        it('Ein Task sollte nach vorne verschoben werden können', function () {
            let liste = new TodoList();
            liste.addTask('Neue Aufgabe');
            liste.addTask('Neue Aufgabe A');
            liste.addTask('Neue Aufgabe L');
            //--- A sollte hier sein
            liste.addTask('Neue Aufgabe E');
            liste.addTask('Neue Aufgabe X');
            liste.addTask('Neue Aufgabe ANDER');


            liste.moveBefore(5, 0);
            // wir schieben von 1 auf bevor 3 (=>2)
            expect(liste.tasks[0].text).equal('Neue Aufgabe ANDER');
            expect(liste.tasks[0].position).equal(0.5);
            console.log(liste);

        });

        it('Der Text eines Tasks in der Liste sollte aktualisert werden können', function () {
            let liste = new TodoList();
            liste.addTask('Neue Aufgabe');
            liste.addTask('Neue Aufgabe B');
            let task = liste.addTask('Neue Aufgabe C');

            liste.updateTaskText(1, "neuer Text");
            expect(liste.tasks[0].text).equal("neuer Text");
            liste.tasks[0].text = "Hi";
            expect(liste.tasks[0].text).equal("Hi");

            liste.updateTaskText(2, 3);
            expect(liste.tasks[1].text).equal("3");
        });

        it('Status eines Tasks aus Liste auf erledigt und unerledigt setzen können', function () {
            let liste = new TodoList();
            liste.addTask('Neue Aufgabe');
            liste.addTask('Neue Aufgabe B');
            let task = liste.addTask('Neue Aufgabe C');

            liste.updateTaskErledigt(2);
            expect(liste.tasks[1].erledigt).equal(true);

            liste.updateTaskErledigt(3);
            expect(liste.tasks[2].erledigt).equal(true);

            liste.updateTaskErledigt(2);
            expect(liste.tasks[1].erledigt).equal(false);

        });

        it('Wir sollten einen Task der Liste hinzufügen können', function () {
            let liste = new TodoList();
            liste.addTask('Neue Aufgabe');
            expect(liste.tasks.length).equals(1);
            liste.addTask('Neue Aufgabe B');
            expect(liste.tasks.length).equals(2);

            expect(liste.tasks[0].text).equal("Neue Aufgabe");
            expect(liste.tasks[1].text).equal("Neue Aufgabe B");

        });

        it('Neue Tasks sollten die Position des letzten Tasks +1 haben', function () {
            let liste = new TodoList();

            liste.addTask('Neue Aufgabe');
            expect(liste.tasks[0].position).equal(1);

            liste.addTask('Neue Aufgabe B');
            expect(liste.tasks[1].position).equal(2);
            liste.tasks[1].position = 202;
            expect(liste.tasks[1].position).equal(202);

            liste.addTask('Neue Aufgabe C');
            expect(liste.tasks[2].position).equal(203);
        });

    });

    describe('Task', function () {

        it('wir sollten ein Task Objekt erzeugen können', function () {
            let t = new Task;
            assert.instanceOf(t, Task);
        });

        it('Tasks sollten id,text,erledigt,position haben', function () {
            let t = new Task;
            expect(t.id).to.not.equal(undefined);
            expect(t.text).to.not.equal(undefined);
            expect(t.erledigt).to.not.equal(undefined);
            expect(t.position).to.not.equal(undefined);
        });

        it('Sollte einen Task direkt mit Text erzeugen können', function () {
            let t = new Task("Textbeispiel");
            expect(t.text).equal("Textbeispiel");
            t.text = 1;
            expect(t.text).equal("1");
            t.text = true;
            expect(t.text).equal("true");
        });

        it('sollte den Text aktualisieren können', function () {
            let t = new Task("Textbeispiel");
            t.text = "**";
            expect(t.text).equal("**")
        });

        it('Es sollte eine neue Positionsnummer zugewiesen werden können', function () {
            let t = new Task;
            t.position = 7.5;
            expect(t.position).equal(7.5);
            t.position = "Banane";
            expect(t.position).equal(7.5)
        });

    });

});