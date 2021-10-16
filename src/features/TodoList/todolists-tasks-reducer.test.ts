import {TaskStateType} from "./Task/task-types";
import {TodoListDomainType} from "./todo-list-types";
import {tasksReducer} from "./Task/tasks-reducer";
import {asyncTodoListActions, todoListReducer} from "./todolist-reducer";


test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodoListsState: TodoListDomainType[] = [];

    const newTodoList = {
        id: "todoListId3",
        title: "New Todolist",
        filter: "all",
        addedDate: "",
        order: 0
    }

    const action = asyncTodoListActions.createTodoList.fulfilled({todoList: newTodoList}, 'requestId', newTodoList.title)

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    if(action.payload){
        expect(idFromTasks).toBe(action.payload.todoList.id);
        expect(idFromTodoLists).toBe(action.payload.todoList.id);
    }

});



