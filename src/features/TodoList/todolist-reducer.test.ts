import {v1} from 'uuid';
import {FilterValuesType, TodoListDomainType} from "./todo-list-types";
import {asyncTodoListActions, changeEntityStatusAC, changeTodoListFilterAC, todoListReducer} from "./todolist-reducer";


let todolistId1: string
let todolistId2: string
let startState: TodoListDomainType[]

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: "idle", addedDate: "", order: 0},
    ]
})

test('correct todolist should be removed', () => {

    const action = asyncTodoListActions.deleteTodoList.fulfilled({todoListID: todolistId1}, 'requestId', todolistId1)
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

    const action = asyncTodoListActions.createTodoList.fulfilled({todoList: newTodoList}, 'requestId', newTodoList.title)
    const endState = todoListReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[0].title).toBe("New Todolist");

});

test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";
    let payload = {title: newTodolistTitle, todoListID: todolistId2}

    const action = asyncTodoListActions.changeTodoListTitle.fulfilled(payload, 'requestId', payload)
    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});

test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = changeTodoListFilterAC({filter: newFilter, id: todolistId2})
    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});

test('todo lists should be added', () => {
    const startState: TodoListDomainType[] = []
    const todoLists = [
        {id: todolistId1, title: "What to learn", filter: "all", entityStatus: "idle", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", entityStatus: "idle", addedDate: "", order: 0},
    ];

    const action = asyncTodoListActions.fetchTodoLists.fulfilled({todoLists}, 'requestId')
    const endState = todoListReducer(startState, action)

    expect(endState.length).toBe(2)
})

test('entityStatus should be changed', () => {

    const action = changeEntityStatusAC({entityStatus: "loading", todoListID: todolistId1})
    const endState = todoListReducer(startState, action)

    expect(endState[0].entityStatus).toBe("loading")
    expect(endState[1].entityStatus).toBe("idle")
})







