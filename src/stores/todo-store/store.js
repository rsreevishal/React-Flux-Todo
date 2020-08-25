import { EventEmitter } from "events";
import dispatcher from "../../dispatcher/dispatcher";

class ToDoStore extends EventEmitter {
    constructor() {
        super("toDoStore");
        this.fakeDB = {
            todo: [
                {
                    id: "123",
                    text: "Read books",
                    completed: false
                },
                {
                    id: "456",
                    text: "Workout",
                    completed: false
                }
            ]
        };
    }

    createTodo(text) {
        console.log("Creating todo...")
        let todo = {
            id: Date.now(),
            text: text,
            completed: false
        }
        this.fakeDB.todo.push(todo);
        this.emit("change")
    }

    deleteTodo(id) {
        console.log("Deleting todo...")
        this.fakeDB.todo = this.fakeDB.todo.filter((todo) => todo.id !== id)
        this.emit("change")
    }

    completeToDo(id) {
        console.log("Complete todo...")
        this.fakeDB.todo = this.fakeDB.todo.map((todo) => {
            if(todo.id === id) {
                todo.completed = !todo.completed;
                return todo;
            }
            return todo;
        });
        this.emit("change");
    }

    getAll() {
        console.log("Getting all todos...")
        return this.fakeDB.todo;
    }

    handleAction(action) {
        switch (action.type) {
            case "CREATE_TODO": {
                this.createTodo(action.text);
                break;
            }
            case "DELETE_TODO": {
                this.deleteTodo(action.id);
                break;
            }
            case "COMPLETE_TODO": {
                this.completeToDo(action.id);
                break;
            }
            default: {
                break;
            }
        }
    }
}

let todoStore = new ToDoStore();

dispatcher.register(todoStore.handleAction.bind(todoStore));

export default todoStore;