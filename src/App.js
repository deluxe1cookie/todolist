import React from 'react';
import './App.css';
import TodoList from "./TodoList";
import AddNewItemForm from "./AddNewItemForm";
import {connect} from "react-redux";
import {addTodolist, setTodolists} from "./reducer";
import {api} from "./api";

class App extends React.Component {
    componentDidMount() {
        this.restoreState();
    }

    restoreState = () => {
        api.setTodolists()
            .then(res => {
                this.props.setTodolists(res.data);
            });
    };

    addTodoList = (title) => {
        api.addTodolist(title)
            .then(res => {
                const todolist = res.data.data.item;
                this.props.addTodolist(todolist);
            });
    };

    render = () => {
        const todoListElements = this.props.todolists.map(tl => <TodoList id={tl.id} todoListTitle={tl.title}
                                                                          tasks={tl.tasks}/>);

        return (
            <div className="App">
                <AddNewItemForm addItem={this.addTodoList}/>
                {todoListElements}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists
    }
};

const ConnectedApp = connect(mapStateToProps, {addTodolist, setTodolists})(App);
export default ConnectedApp;