import axios from "axios";

const instance = axios.create({
    baseURL: "https://social-network.samuraijs.com/api/1.0/todo-lists",
    withCredentials: true,
    headers: {"API-KEY": "2e403f5c-5d3b-4ee4-a662-100f73be85da"}
});

export const api = {
    setTasks(todolistId) {
        return instance.get(`/${todolistId}/tasks`)
    },
    addTask(todolistId, title) {
        return instance.post(`/${todolistId}/tasks`, {title: title})
    },
    deleteTask(todolistId, taskId) {
        return instance.delete(`/${todolistId}/tasks/${taskId}`)
    },
    deleteTodolist(todolistId) {
        return instance.delete(`/${todolistId}`)
    },
    changeTask(todolistId, taskId, updatedTask) {
        return instance.put(`/${todolistId}/tasks/${taskId}`, updatedTask)
    },
    setTodolists() {
        return instance.get();
    },
    addTodolist(title) {
        return instance.post(``, {title})
    },
    changeTodolist(todolistId, newTitle) {
        return instance.put(`${todolistId}`, {title: newTitle})
    }
};