import React from 'react';

class AddNewItemForm extends React.Component {
    state = {
        error: true,
        title: ''
    };

    onAddItemClick = () => {
        if (!this.state.error) {
            this.props.addItem(this.state.title);
            this.setState({error: true, title: ''});
        }
    };

    inputOnChange = (e) => {
        if (e.currentTarget.value.trim() === '') {
            this.setState({error: true, title: ''});
        } else {
            this.setState({
                error: false, title: e.currentTarget.value
            });
        }
    };

    inputOnKeyPress = (e) => {
        if (e.key === 'Enter')
            this.onAddItemClick(e);
    };

    render = () => {
        const classForButton = this.state.error ? 'button error' : 'button';

        return (
            <div className="todoList-newItemForm">
                <input className='newItemForm-input' onKeyPress={this.inputOnKeyPress} onChange={this.inputOnChange}
                       type="text"
                       placeholder="New item name"
                       value={this.state.title}/>
                <button className={classForButton} onClick={this.onAddItemClick}>Add</button>
            </div>);
    };
}

export default AddNewItemForm;