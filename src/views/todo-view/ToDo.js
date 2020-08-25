import React from 'react';
import todoStore from "../../stores/todo-store/store"
import './todo.css';
import TodoAction from "../../actions/todo-actions/actions";

class ToDo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todo: todoStore.getAll(),
            todo_text: ""
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        console.log("Mounting event listeners...")
        todoStore.addListener("change", () => {
            console.log("Store has an update...");
            this.setState({
                todo: todoStore.getAll(),
                todo_text: this.state.todo_text
            });
        });

    }


    componentWillUnmount() {
        todoStore.removeListener("change");
    }

    handleChange(event) {
        this.setState({
            todo: this.state.todo,
            todo_text: event.target.value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        TodoAction.createTodo(this.state.todo_text);
    }

    render() {
        return (
            <div className="ToDos">
                {this.state.todo.map((todo) => {
                    return <div key={todo.id} className="ToDo">
                        <div className={todo.completed ? "completed" : "progress"}><p>{todo.text}</p></div>
                        <button onClick={() => { TodoAction.completeTodo(todo.id); }}>{todo.completed ? "Redo" : "Completed"}</button>
                        <button onClick={() => { TodoAction.deleteTodo(todo.id) }}>Delete</button>
                    </div>
                })}
                <div>
                    <form>
                        <input type="text" value={this.state.todo_text} onChange={this.handleChange} placeholder="To do.." required />
                        <input type="submit" onClick={this.handleSubmit} value="Create To-Do" />
                    </form>
                </div>
            </div>
        );
    }
}

export default ToDo;
