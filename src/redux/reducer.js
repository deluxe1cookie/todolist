import {api} from '../api';

const ADD_TODOLIST = 'TodoList/reducer/ADD-TODOLIST';
const ADD_TASK = 'TodoList/reducer/ADD-TASK';
const CHANGE_TASK = 'TodoList/reducer/CHANGE-TASK';
const DELETE_TODOLIST = 'TodoList/reducer/DELETE-TODOLIST';
const DELETE_TASK = 'TodoList/reducer/DELETE-TASK';
const SET_TODOLISTS = 'TodoList/reducer/SET-TODOLISTS';
const SET_TASKS = 'TodoList/reducer/SET-TASKS';
const CHANGE_TODOLIST = 'TodoList/reducer/CHANGE_TODOLIST';
const TOGGLE_IS_FETCHING = 'TodoList/reducer/TOGGLE_IS_FETCHING';

const initialState = {
    'todolists': [],
    isFetching: false
};

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TODOLISTS:
            return {
                ...state,
                todolists: action.todolists.map(tl => ({...tl, tasks: []}))
            };
        case ADD_TODOLIST:
            let newTodoList = {...action.newTodolist};
            newTodoList.tasks = [];
            return {
                ...state,
                todolists: [...state.todolists, newTodoList]
            };
        case ADD_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {...tl, tasks: [...tl.tasks, action.newTask]};
                    } else {
                        return tl;
                    }
                })
            };
        case CHANGE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.map(t => {
                                if (t.id === action.taskId) {
                                    return {...t, ...action.obj};
                                } else {
                                    return t;
                                }
                            })
                        };
                    } else {
                        return tl;
                    }
                })
            };
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl;
                    }
                })
            };
        case DELETE_TASK:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: tl.tasks.filter(t => {
                                if (t.id !== action.taskId) {
                                    return t;
                                }
                            })
                        };
                    } else {
                        return tl;
                    }
                })
            };
        case SET_TASKS:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl,
                            tasks: action.tasks
                        };
                    } else {
                        return tl;
                    }
                })
            };
        case CHANGE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.map(tl => {
                    if (tl.id === action.todolistId) {
                        return {
                            ...tl, title: action.newTitle
                        };
                    } else {
                        return tl;
                    }
                })
            };
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching};
        }
        default: {
            return state;
        }
    }
};

const addTaskAC = (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId});
const changeTaskAC = (todolistId, taskId, obj) => ({type: CHANGE_TASK, todolistId, taskId, obj});
const deleteTodolistAC = (todolistId) => ({type: DELETE_TODOLIST, todolistId});
const deleteTaskAC = (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId});
const addTodolistAC = (newTodolist) => ({type: ADD_TODOLIST, newTodolist});
const setTodolists = (todolists) => ({type: SET_TODOLISTS, todolists});
const setTasksAC = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId});
const changeTodolistAC = (todolistId, newTitle) => ({type: CHANGE_TODOLIST, todolistId, newTitle});
const toggleIsFetchingAC = (isFetching) => ({type: TOGGLE_IS_FETCHING, isFetching});

export const moveTask = (taskId, fromTodolistId, toTodolistId, title) => async (dispatch) => {
    dispatch(toggleIsFetchingAC(true));

    let response = await api.addTask(toTodolistId, title);
    let task = response.data.data.item;
    dispatch(addTaskAC(task, toTodolistId));

    await api.deleteTask(fromTodolistId, taskId);
    dispatch(deleteTaskAC(fromTodolistId, taskId));

    dispatch(toggleIsFetchingAC(false));
};

export const getTodolists = () => (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    api.setTodolists()
        .then(res => {
            dispatch(setTodolists(res.data));
            dispatch(toggleIsFetchingAC(false));
        });
};

export const addTodolist = (title) => (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    api.addTodolist(title)
        .then(res => {
            const todolist = res.data.data.item;
            dispatch(addTodolistAC(todolist));
            dispatch(toggleIsFetchingAC(false));
        });
};

export const getTasks = (todolistId) => (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    api.setTasks(todolistId)
        .then(res => {
            let tasks = res.data.items;
            dispatch(setTasksAC(tasks, todolistId));
            dispatch(toggleIsFetchingAC(false));
        });
};

export const addTask = (todolistId, title) => (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    api.addTask(todolistId, title)
        .then(res => {
            let task = res.data.data.item;
            dispatch(addTaskAC(task, todolistId));
            dispatch(toggleIsFetchingAC(false));
        });
};

export const deleteTask = (todolistId, taskId) => (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    api.deleteTask(todolistId, taskId)
        .then(res => {
            dispatch(deleteTaskAC(todolistId, taskId));
            dispatch(toggleIsFetchingAC(false));
        });
};

export const deleteTodolist = (todolistId) => (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    api.deleteTodolist(todolistId)
        .then(res => {
            dispatch(deleteTodolistAC(todolistId));
            dispatch(toggleIsFetchingAC(false));
        });
};

export const changeTask = (todolistId, taskId, updatedTask) => (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    api.changeTask(todolistId, taskId, updatedTask)
        .then(res => {
            dispatch(changeTaskAC(todolistId, taskId, updatedTask));
            dispatch(toggleIsFetchingAC(false));
        });
};

export const changeTodolist = (todolistId, title) => (dispatch) => {
    dispatch(toggleIsFetchingAC(true));
    api.changeTodolist(todolistId, title)
        .then(res => {
            dispatch(changeTodolistAC(todolistId, title));
            dispatch(toggleIsFetchingAC(false));
        });
};

export const login = (email, password) => async () => {
    await api.login(email, password);
};

export default reducer;