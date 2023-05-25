import { useState } from "react";

const ToDoItem = ({ task, completedTodo }) => {

    return (
        <form action="">
            <input type="checkbox" name="" id="" onChange={() => completedTodo(task.id, !task.completed)} />
            <label style={{ textDecoration: task.completed ? "line-through" : "none", color: task.completed ? "darkblue" : "darksalmon" }}>{task.title}</label>
        </form>
    );
}

export default ToDoItem;