import React from 'react';

class TodoListFooter extends React.Component {
    state = {
        isHidden: false
    };

    onAllFilterClick = () => this.props.changeFilter("All");
    onCompletedFilterClick = () => this.props.changeFilter("Completed");
    onActiveFilterClick = () => this.props.changeFilter("Active");
    onShowOrHideFiltersClick = () => this.setState((state) => {
        return {isHidden: !state.isHidden}
    });

    render = (props) => {
        let classForAll = this.props.filterValue === "All" ? "filter-active" : "";
        let classForCompleted = this.props.filterValue === "Completed" ? "filter-active" : "";
        let classForActive = this.props.filterValue === "Active" ? "filter-active" : "";

        return (
            <div className="todoList-footer">
                {!this.state.isHidden &&
                <div className="buttons">
                    <button onClick={this.onAllFilterClick} className={classForAll}>All</button>
                    <button onClick={this.onCompletedFilterClick} className={classForCompleted}>Completed</button>
                    <button onClick={this.onActiveFilterClick} className={classForActive}>Active</button>
                    <span onClick={this.onShowOrHideFiltersClick}>hide</span>
                </div>}
                {this.state.isHidden &&
                <span onClick={this.onShowOrHideFiltersClick}>show</span>}
            </div>
        );
    }
}

export default TodoListFooter;