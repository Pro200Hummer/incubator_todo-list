import {TaskStateType} from '../App';
import {TodoListType} from "../App";
import {tasksReducer} from "./tasks-reducer";
import {todoListReducer} from "./todolist-reducer";
import {addTodoListAC} from "./todolist-reducer";




test('ids should be equals', () => {
    const startTasksState: TaskStateType = {};
    const startTodoListsState: Array<TodoListType> = [];

    const action = addTodoListAC("new todolist");

    const endTasksState = tasksReducer(startTasksState, action)
    const endTodoListsState = todoListReducer(startTodoListsState, action)

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodoListsState[0].id;

    expect(idFromTasks).toBe(action.todoListID);
    expect(idFromTodolists).toBe(action.todoListID);
});



