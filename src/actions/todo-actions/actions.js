import dispatcher from "../../dispatcher/dispatcher";

var createTodo = function (text) {
    dispatcher.dispatch(
        {
            type: "CREATE_TODO",
            text: text
        }
    );
}

var deleteTodo = function (id) {
    dispatcher.dispatch(
        {
            type: "DELETE_TODO",
            id: id
        }
    );
}

var completeTodo = function (id) {
    dispatcher.dispatch(
        {
            type: "COMPLETE_TODO",
            id: id
        }
    );
}

export default {
    createTodo: createTodo,
    deleteTodo: deleteTodo,
    completeTodo: completeTodo
}