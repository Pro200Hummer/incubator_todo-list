import {TaskStatuses, TaskStateType, TodoTaskPriority } from "./task-types";
import {asyncTasksActions, fetchTasks, tasksReducer} from "./tasks-reducer";
import {asyncTodoListActions} from "../todolist-reducer";


const restTaskParams = {
    order: 0,
    priority: TodoTaskPriority.Low,
    startDate: "",
    deadline: "",
    addedDate: "",
    description: ""
}

let startState: TaskStateType
beforeEach(() => {
    startState = {
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", ...restTaskParams},
            {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", ...restTaskParams},
            {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", ...restTaskParams}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", ...restTaskParams},
            {id: "2", title: "milk", status: TaskStatuses.Completed, todoListId: "todolistId2", ...restTaskParams},
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", ...restTaskParams}
        ]
    }

});

test('correct task should be deleted from correct array', () => {
    const payload = {todoListID: "todolistId2", taskID: "2"}

    const action = asyncTasksActions.removeTask.fulfilled(payload, 'requestId', payload);

    const endState = tasksReducer(startState, action)

    expect(endState).toEqual({
        "todolistId1": [
            {id: "1", title: "CSS", status: TaskStatuses.New, todoListId: "todolistId1", ...restTaskParams},
            {id: "2", title: "JS", status: TaskStatuses.Completed, todoListId: "todolistId1", ...restTaskParams},
            {id: "3", title: "React", status: TaskStatuses.New, todoListId: "todolistId1", ...restTaskParams}
        ],
        "todolistId2": [
            {id: "1", title: "bread", status: TaskStatuses.New, todoListId: "todolistId2", ...restTaskParams},
            {id: "3", title: "tea", status: TaskStatuses.New, todoListId: "todolistId2", ...restTaskParams}
        ]
    })
    expect(endState["todolistId2"].length).toBe(2)

});

test('correct task should be added to correct array', () => {
    const newTask = {
        id: "4",
        title: "vodka",
        status: TaskStatuses.New,
        todoListId: "todolistId2",
        ...restTaskParams
    }

    const payload = { task: newTask, todoListID:  newTask.todoListId}
    const action = asyncTasksActions.addTask.fulfilled(payload, 'requestId',
        {todoListID: newTask.todoListId, taskTitle: newTask.title});

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId1"].length).toBe(3);
    expect(endState["todolistId2"].length).toBe(4);
    expect(endState["todolistId2"][0].id).toBeDefined();
    expect(endState["todolistId2"][0].title).toBe("vodka");
    expect(endState["todolistId2"][0].status).toBe(TaskStatuses.New);
});

test('status of specified task should be changed', () => {

    const model = {
        order: 0,
        priority: TodoTaskPriority.Low,
        startDate: "",
        deadline: "",
        addedDate: "",
        description: "",
        title: "",
        status: TaskStatuses.New,
    };

    const payload = { todoListID: "todolistId2", taskID: "2", model: model}

    const action = asyncTasksActions.updateTask.fulfilled(payload, 'requestId', payload);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][1].status).toBe(TaskStatuses.New);
    expect(endState["todolistId1"][1].status).toBe(TaskStatuses.Completed);
});

test('title of specified task should be changed', () => {

    const model = {
        order: 0,
        priority: TodoTaskPriority.Low,
        startDate: "",
        deadline: "",
        addedDate: "",
        description: "",
        title: "coffee",
        status: TaskStatuses.New,
    };

    const payload = { todoListID: "todolistId2", taskID: "3", model: model}

    const action = asyncTasksActions.updateTask.fulfilled(payload, 'requestId', payload);

    const endState = tasksReducer(startState, action)

    expect(endState["todolistId2"][2].title).toBe("coffee");
    expect(endState["todolistId1"][2].title).toBe("React");
});

test('new array should be added when new todolist is added', () => {

    const newTodoList = {
        id: "todoListId3",
        title: "What to learn",
        filter: "all",
        addedDate: "",
        order: 0
    }

    const action = asyncTodoListActions.createTodoList.fulfilled({todoList: newTodoList}, 'requestId', newTodoList.id);

    const endState = tasksReducer(startState, action)

    const keys = Object.keys(endState);
    const newKey = keys.find(k => k != "todolistId1" && k != "todolistId2");
    if (!newKey) {
        throw Error("new key should be added")
    }

    expect(keys.length).toBe(3);
    expect(endState[newKey]).toEqual([]);
});

test('property with todolistId should be deleted', () => {

    const action = asyncTodoListActions.deleteTodoList.fulfilled({todoListID: "todolistId2"}, 'requestId', "todolistId2");

    const endState = tasksReducer(startState, action)


    const keys = Object.keys(endState);

    expect(keys.length).toBe(1);
    expect(endState["todolistId2"]).not.toBeDefined();
});

test('tasks should be added', () => {
    const startState = {
        "todoListID1": []
    }
    const tasks = [
        {id: "1", title: "vodka", status: TaskStatuses.New, todoListId: "todolistId2", ...restTaskParams},
        {id: "2", title: "pivo", status: TaskStatuses.New, todoListId: "todolistId2", ...restTaskParams}
    ]
    const action = fetchTasks.fulfilled({tasks: tasks, todoListID: "todoListID1"}, 'requestId', "todoListID1")
    const endState = tasksReducer(startState, action)

    expect(endState["todoListID1"].length).toBe(2)
});





