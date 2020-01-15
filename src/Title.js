import React from 'react';

// props: title, changeTitle()
class Title extends React.Component {
    state = {
        isEdit: false,
        title: this.props.title
    };

    activateEditMode = () => {
        this.setState({isEdit: true})
    };

    deactivateEditMode = () => {
        this.props.changeTitle(this.state.title);

        this.setState({isEdit: false});
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
                    :
                    <span className="todoList-header__title" onClick={this.activateEditMode}>{this.state.title}</span>}
            </div>);
    }
}

export default Title;