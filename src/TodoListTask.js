import React, {useState} from 'react';
import DeleteItemButton from './DeleteItemButton';
import {useDrag} from 'react-dnd';
import ItemTypes from './utils/ItemTypes';

const TodoListTask = (props) => {
    const [isEdit, setIsEdit] = useState(false);
    const [title, setTitle] = useState(props.task.title);

    const [collectedProps, drag] = useDrag({
        item: {type: ItemTypes.TASK, id: props.task.id, todolistId: props.todolistId, title},
        collect: monitor => ({isDragging: !!monitor.isDragging()})
    });

    const activateEditMode = () => {
        setIsEdit(true);
    };

    const deactivateEditMode = () => {
        const updatedTask = {...props.task, title};
        props.changeTask(props.task.id, updatedTask);

        setIsEdit(false);
    };

    const onIsDoneChanged = (e) => {
        const status = e.currentTarget.checked ? 2 : 0;
        const updatedTask = {...props.task, status};
        props.changeTask(props.task.id, updatedTask);
    };

    const onInputChanged = (e) => {
        setTitle(e.currentTarget.value);
    };

    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            deactivateEditMode();
        }
    };

    const isDone = (props.task.status === 2);
    const classForTask = isDone ? 'todoList-task done' : 'todoList-task';

    return (
        <div className={classForTask} ref={drag}>
            <div>
                <input type="checkbox"
                       onClick={onIsDoneChanged}
                       defaultChecked={isDone}
                />
                {isEdit
                    ? <input onBlur={deactivateEditMode}
                             onChange={onInputChanged}
                             autoFocus
                             value={title}
                             onKeyDown={_handleKeyDown}/>
                    : <span
                        onClick={activateEditMode}>{title} {props.task.priority}</span>
                }
            </div>
            <DeleteItemButton delete={props.deleteTask}/>
        </div>
    );
};

export default TodoListTask;