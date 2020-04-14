import React from 'react';
import './App.css';
import TodoList from './TodoList';
import AddNewItemForm from './AddNewItemForm';
import {connect} from 'react-redux';
import {addTodolist, getTodolists, login} from './redux/reducer';
import Backend from 'react-dnd-html5-backend';
import {DndProvider} from 'react-dnd';
import Preloader from './Preloader';

class App extends React.Component {
    componentDidMount() {
        this.props.login('free@samuraijs.com', 'free');
        this.props.getTodolists();
    }

    render = () => {
        const todoListElements = this.props.todolists.map(tl => <TodoList key={tl.id} id={tl.id}
                                                                          todoListTitle={tl.title}
                                                                          tasks={tl.tasks}/>);

        return (
            <DndProvider backend={Backend}>
                <div className="App">
                    {this.props.isFetching && <Preloader/>}

                    <AddNewItemForm addItem={this.props.addTodolist}/>
                    {todoListElements}
                </div>
            </DndProvider>
        );
    };
}

const mapStateToProps = (state) => {
    return {
        todolists: state.todolists,
        isFetching: state.isFetching
    };
};

export default connect(mapStateToProps, {addTodolist, getTodolists, login})(App);