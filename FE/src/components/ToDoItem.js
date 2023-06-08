
const ToDoItem = ({ task, completedTodo }) => {

    return (
        <form>
            <input type='checkbox' checked={task.completed} onChange={() => completedTodo(task._id, !task.completed)} />
            <label style={{ textDecoration: task.completed ? 'line-through' : 'none', color: task.completed ? 'darkblue' : 'darksalmon' }}>{task.title}</label>
        </form>
    );
}

export default ToDoItem;