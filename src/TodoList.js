import React, {useEffect, useState} from 'react';
import './App.css';
import TodoListHeader from './TodoListHeader';
import TodoListTasks from './TodoListTasks';
import TodoListFooter from './TodoListFooter';
import {connect} from 'react-redux';
import {addTask, changeTask, changeTodolist, deleteTask, deleteTodolist, getTasks, moveTask} from './redux/reducer';
import ItemTypes from './utils/ItemTypes';
import {useDrop} from 'react-dnd';

const TodoList = (props) => {
    const [filterValue, setFilterValue] = useState('All');
    const [collectedProps, drop] = useDrop({
        accept: ItemTypes.TASK,
        drop: (item) => props.moveTask(item.id, item.todolistId, props.id, item.title),
        collect: monitor => ({isOver: !!monitor.isOver()})
    });

    useEffect(() => {
        props.getTasks(props.id);
    }, []);

    const addTask = (title) => {
        props.addTask(props.id, title);
    };

    const deleteTask = (taskId) => {
        props.deleteTask(props.id, taskId);
    };

    const changeTask = (taskId, updatedTask) => {
        props.changeTask(props.id, taskId, updatedTask);
    };

    const changeTodolist = (title) => {
        props.changeTodolist(props.id, title);
    };

    const changeFilter = (newFilterValue) => {
        setFilterValue(newFilterValue);
    };

    return (
        <div className="todoList" ref={drop}>
            <TodoListHeader addItem={addTask}
                            todoListTitle={props.todoListTitle}
                            deleteTodolist={() => props.deleteTodolist(props.id)}
                            changeTodolist={changeTodolist}/>
            <TodoListTasks changeTask={changeTask}
                           tasks={props.tasks}
                           filterValue={filterValue}
                           deleteTask={deleteTask}
                           todolistId={props.id}/>
            <TodoListFooter filterValue={filterValue}
                            changeFilter={changeFilter}/>
        </div>
    );

};

export default connect(null, {
    addTask,
    changeTask,
    deleteTodolist,
    deleteTask,
    getTasks,
    changeTodolist,
    moveTask
})(TodoList);