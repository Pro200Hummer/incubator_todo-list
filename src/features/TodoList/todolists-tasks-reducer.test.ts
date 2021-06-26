import {tasksReducer, TaskStateType} from "./Task/tasks-reducer";
import {TodoListDomainType} from "../../api/todo-list-api";
import {addTodoListAC, todoListReducer} from "./todolist-reducer";


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

    const action = addTodoListAC(newTodoList);

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodoLists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoList.id);
    expect(idFromTodoLists).toBe(action.todoList.id);
});



