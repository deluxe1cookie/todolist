import React from 'react';

class TodoListTitle extends React.Component {
    state = {
        isEdit: false,
        title: this.props.todoListTitle
    };

    activateEditMode = () => {
        this.setState({
            isEdit: true
        })
    };

    deactivateEditMode = () => {
        this.props.changeTodolist(this.state.title);

        this.setState({
            isEdit: false
        });
    };

    onInputChanged = (e) => {
        this.setState({title: e.currentTarget.value});
    };

    _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            this.deactivateEditMode();
        }
    };

    render = () => {
        return (
            <div>
                {this.state.isEdit
                    ? <input onBlur={this.deactivateEditMode}
                             onChange={this.onInputChanged}
                             autoFocus={true}
                             value={this.state.title}
                             onKeyDown={this._handleKeyDown}/>
                    : <h3 onClick={this.activateEditMode}>{this.state.title}</h3>}
            </div>);
    }
}

export default TodoListTitle;