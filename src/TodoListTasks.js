import React from 'react';
import TodoListTask from './TodoListTask';

class TodoListTasks extends React.Component {
    render = () => {

        //let tasksElements = this.props.tasks.sort((a, b) => b.priority.length - a.priority.length);

        let tasksElements = this.props.tasks.filter((task) => {
            switch (this.props.filterValue) {
                case 'All':
                    return true;
                case 'Completed':
                    return task.isDone;
                case 'Active':
                    return !task.isDone;
            }
        });

        tasksElements = tasksElements.map(task => <TodoListTask key={task.id} task={task}
                                                                changeTask={this.props.changeTask}
                                                                deleteTask={() => this.props.deleteTask(task.id)}
                                                                todolistId={this.props.todolistId}/>);

        return (
            <div className="todoList-tasks">
                {tasksElements}
            </div>
        );
    };
}

export default TodoListTasks;