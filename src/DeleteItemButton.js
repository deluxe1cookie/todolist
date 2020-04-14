import React from 'react';

class DeleteItemButton extends React.Component {
    render = () => {
        return (
            <button className='delete-button' onClick={this.props.delete}><strong>X</strong></button>);
    };
}

export default DeleteItemButton;