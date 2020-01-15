import React from 'react';
import './App.css';
import TodoListHeader from "./TodoListHeader";
import TodoListTasks from "./TodoListTasks";
import TodoListFooter from "./TodoListFooter";
import {connect} from "react-redux";
import {addTask, changeTask, changeTodolist, deleteTask, deleteTodolist, setTasks} from "./reducer";
import {api} from "./api";

class TodoList extends React.Component {
    componentDidMount() {
        this.restoreState();
    }

    state = {
        filterValue: 'All'
    };

    changeFilter = (newFilterValue) => {
        this.setState({
            filterValue: newFilterValue
        });
    };

    restoreState = () => {
        api.setTasks(this.props.id)
            .then(res => {
                let tasks = res.data.items;
                this.props.setTasks(tasks, this.props.id);
            });
    };

    addTask = (title) => {
        api.addTask(this.props.id, title)
            .then(res => {
                let task = res.data.data.item;
                this.props.addTask(task, this.props.id);
            });
    };

    deleteTask = (taskId) => {
        api.deleteTask(this.props.id, taskId)
            .then(res => {
                this.props.deleteTask(this.props.id, taskId);
            });
    };

    deleteTodolist = () => {
        api.deleteTodolist(this.props.id)
            .then(res => {
                this.props.deleteTodolist(this.props.id);
            });
    };

    changeTask = (taskId, updatedTask) => {
        api.changeTask(this.props.id, taskId, updatedTask)
            .then(res => {
                this.props.changeTask(this.props.id, taskId, updatedTask)
            })
    };

    changeTodolist = (title) => {
        api.changeTodolist(this.props.id, title)
            .then(res => {
                this.props.changeTodolist(this.props.id, title)
            })
    };

    render = () => {
        return (
            <div className="todoList">
                <TodoListHeader addItem={this.addTask} todoListTitle={this.props.todoListTitle}
                                deleteTodolist={this.deleteTodolist} changeTodolist={this.changeTodolist}/>
                <TodoListTasks changeTask={this.changeTask}

                               tasks={this.props.tasks}
                               filterValue={this.state.filterValue}
                               deleteTask={this.deleteTask}/>
                <TodoListFooter filterValue={this.state.filterValue}
                                changeFilter={this.changeFilter}/>
            </div>
        );
    }
}

const ConnectedTodolist = connect(null, {
    addTask,
    changeTask,
    deleteTodolist,
    deleteTask,
    setTasks,
    changeTodolist
})(TodoList);

export default ConnectedTodolist;