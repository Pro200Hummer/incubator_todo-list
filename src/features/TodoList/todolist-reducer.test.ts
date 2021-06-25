import {v1} from 'uuid';
import {
    addTodoListAC, changeEntityStatusAC,
    changeTodoListFilterAC,
    changeTodoListTitleAC,
    removeTodoListAC, setTodoListsAC,
    todoListReducer
} from "./todolist-reducer";
import {FilterValuesType, TodoListDomainType} from "../../api/Todo-list-api";


let todolistId1: string
let todolistId2: string
let startState: Array<TodoListDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: "idle", addedDate: "", order: 0},
    ]
})

test('correct todolist should be removed', () => {

    const action = removeTodoListAC(todolistId1)
    const endState = todoListReducer(startState, action)

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

});
test('correct todolist should be added', () => {

    const newTodoList = {
        id: "todoListId3",
        title: "New Todolist",
        filter: "all",
        addedDate: "",
        order: 0
    }

    const action = addTodoListAC(newTodoList)
    const endState = todoListReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New Todolist");

});
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = changeTodoListTitleAC(newTodolistTitle, todolistId2)
    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = changeTodoListFilterAC(newFilter, todolistId2)
    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todo lists should be added', () => {
    const startState: TodoListDomainType[] = []
    const todoLists = [
        {id: todolistId1, title: "What to learn", filter: "all",entityStatus: "idle", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all",entityStatus: "idle", addedDate: "", order: 0},
    ]
    const action = setTodoListsAC(todoLists)
    const endState = todoListReducer(startState, action)

    expect(endState.length).toBe(2)
})

test('entityStatus should be changed', () => {

    const action = changeEntityStatusAC("loading", todolistId1)
    const endState = todoListReducer(startState, action)

    expect(endState[0].entityStatus).toBe("loading")
    expect(endState[1].entityStatus).toBe("idle")
})







