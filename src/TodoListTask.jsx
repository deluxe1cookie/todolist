import React from 'react';
import DeleteItemButton from "./DeleteItemButton";

class TodoListTask extends React.Component {
    state = {
        isEdit: false,
        title: this.props.task.title
    };

    activateEditMode = () => {
        this.setState({
            isEdit: true
        })
    };

    deactivateEditMode = () => {
        let updatedTask = {...this.props.task, title: this.state.title};
        this.props.changeTask(this.props.task.id, updatedTask);

        this.setState({
            isEdit: false
        });
    };

    onIsDoneChanged = (e) => {
        let status = e.currentTarget.checked ? 2 : 0;
        let updatedTask = {...this.props.task, status};
        this.props.changeTask(this.props.task.id, updatedTask);
    };

    onInputChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    };

    render = () => {
        const isDone = (this.props.task.status === 2);

        const classForTask = isDone ? 'todoList-task done' : 'todoList-task';

        return (
            <div className={classForTask}>
                <input type="checkbox"
                       onClick={this.onIsDoneChanged}
                       checked={isDone}
                />
                {this.state.isEdit
                    ? <input onBlur={this.deactivateEditMode}
                             onChange={this.onInputChanged}
                             autoFocus={true}
                             value={this.state.title}/>
                    : <span
                        onClick={this.activateEditMode}>{this.state.title} {this.props.task.priority}</span>
                }
                <DeleteItemButton delete={this.props.deleteTask}/>
            </div>
        );
    }
}

export default TodoListTask;