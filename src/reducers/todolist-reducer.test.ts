import {v1} from 'uuid';
import {
    addTodoListAC,
    changeTodoListFilter,
    changeTodoListTitle, FilterValuesType,
    removeTodoList, TodoListDomainType,
    todoListReducer
} from "./todolist-reducer";

let todolistId1: string
let todolistId2: string
let startState: Array<TodoListDomainType>

beforeEach(() => {
    todolistId1 = v1();
    todolistId2 = v1();

    startState = [
        {id: todolistId1, title: "What to learn", filter: "all", addedDate: "", order: 0},
        {id: todolistId2, title: "What to buy", filter: "all", addedDate: "", order: 0},
    ]
})

test('correct todolist should be removed', () => {

    const action = removeTodoList(todolistId1)
    const endState = todoListReducer(startState, action)

    expect(endState.length).toBe(1);
    expect(endState[0].id).toBe(todolistId2);

});
test('correct todolist should be added', () => {

    const action = addTodoListAC("New Todolist")
    const endState = todoListReducer(startState, action)

    expect(endState.length).toBe(3);
    expect(endState[2].title).toBe("New Todolist");

});
test('correct todolist should change its name', () => {

    let newTodolistTitle = "New Todolist";

    const action = changeTodoListTitle(newTodolistTitle, todolistId2)
    const endState = todoListReducer(startState, action);

    expect(endState[0].title).toBe("What to learn");
    expect(endState[1].title).toBe(newTodolistTitle);
});
test('correct filter of todolist should be changed', () => {

    let newFilter: FilterValuesType = "completed";

    const action = changeTodoListFilter(newFilter, todolistId2)
    const endState = todoListReducer(startState, action);

    expect(endState[0].filter).toBe("all");
    expect(endState[1].filter).toBe(newFilter);
});







