import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {'API-KEY': '2e403f5c-5d3b-4ee4-a662-100f73be85da'}
});

export const api = {
    setTasks(todolistId) {
        return instance.get(`/todo-lists/${todolistId}/tasks`);
    },
    addTask(todolistId, title) {
        return instance.post(`/todo-lists/${todolistId}/tasks`, {title: title});
    },
    deleteTask(todolistId, taskId) {
        return instance.delete(`/todo-lists/${todolistId}/tasks/${taskId}`);
    },
    deleteTodolist(todolistId) {
        return instance.delete(`/todo-lists/${todolistId}`);
    },
    changeTask(todolistId, taskId, updatedTask) {
        return instance.put(`/todo-lists/${todolistId}/tasks/${taskId}`, updatedTask);
    },
    setTodolists() {
        return instance.get(`/todo-lists`);
    },
    addTodolist(title) {
        return instance.post(`/todo-lists`, {title});
    },
    changeTodolist(todolistId, newTitle) {
        return instance.put(`/todo-lists/${todolistId}`, {title: newTitle});
    },
    login(email, password) {
        return instance.post(`auth/login`, {email, password});
    }
};