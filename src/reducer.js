export const ADD_TODOLIST = 'TodoList/Reducer/ADD-TODOLIST';
export const ADD_TASK = 'TodoList/Reducer/ADD-TASK';
export const CHANGE_TASK = 'TodoList/Reducer/CHANGE-TASK';
export const DELETE_TODOLIST = 'TodoList/Reducer/DELETE-TODOLIST';
export const DELETE_TASK = 'TodoList/Reducer/DELETE-TASK';
export const SET_TODOLISTS = 'TodoList/Reducer/SET-TODOLISTS';
export const SET_TASKS = 'TodoList/Reducer/SET-TASKS';
export const CHANGE_TODOLIST = 'TodoList/Reducer/CHANGE_TODOLIST';

const initialState = {
    "todolists": []
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
                        return tl
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
                                    return {...t, ...action.obj}
                                } else {
                                    return t;
                                }
                            })
                        }
                    } else {
                        return tl
                    }
                })
            };
        case DELETE_TODOLIST:
            return {
                ...state,
                todolists: state.todolists.filter(tl => {
                    if (tl.id !== action.todolistId) {
                        return tl
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
                        }
                    } else {
                        return tl
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
                        }
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
                        }
                    } else {
                        return tl;
                    }
                })
            };
        default: {
            console.log("reducer: ", action);
            return state;
        }
    }
};

export const addTask = (newTask, todolistId) => ({type: ADD_TASK, newTask, todolistId});
export const changeTask = (todolistId, taskId, obj) => ({type: CHANGE_TASK, todolistId, taskId, obj});
export const deleteTodolist = (todolistId) => ({type: DELETE_TODOLIST, todolistId});
export const deleteTask = (todolistId, taskId) => ({type: DELETE_TASK, todolistId, taskId});
export const addTodolist = (newTodolist) => ({type: ADD_TODOLIST, newTodolist});
export const setTodolists = (todolists) => ({type: SET_TODOLISTS, todolists});
export const setTasks = (tasks, todolistId) => ({type: SET_TASKS, tasks, todolistId});
export const changeTodolist = (todolistId, newTitle) => ({type: CHANGE_TODOLIST, todolistId, newTitle});

export default reducer;