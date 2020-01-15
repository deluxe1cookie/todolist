import React from 'react';

class DeleteItemButton extends React.Component {
    render = () => {
        return (
            <button onClick={this.props.delete}>X</button>);
    }
}

export default DeleteItemButton;