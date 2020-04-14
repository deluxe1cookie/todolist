import React from 'react';
import TodoListTitle from './TodoListTitle';
import AddNewItemForm from './AddNewItemForm';
import DeleteItemButton from './DeleteItemButton';

class TodoListHeader extends React.Component {
    render = () => {
        return (
            <div className="todoList-header">
                <div className="todoList-title">
                    <TodoListTitle todoListTitle={this.props.todoListTitle} changeTodolist={this.props.changeTodolist}/>
                    <DeleteItemButton delete={this.props.deleteTodolist}/>
                </div>
                <AddNewItemForm addItem={this.props.addItem}/>
            </div>);
    };
}

export default TodoListHeader;