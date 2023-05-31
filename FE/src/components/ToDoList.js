import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form"
import ToDoItem from "./ToDoItem";

const ToDoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        const getTodos = async () => {
            const response = await fetch('http://localhost:3001/todos', {});
            const data = await response.json();
            setTodos(data);
        }
        getTodos();
    }, []);

    console.log(todos);

    const addTodo = () => {
        const inputText = document.querySelector('form input[type="text"]');
        try {
            const postTodo = async () => {
                const response = await fetch('http://localhost:3001/todos', {
                    method: "POST",
                    body: JSON.stringify({ title: `${inputText.value}`, completed: false }),
                    headers: {
                        "content-type": "application/json",
                    }
                });
                const data = await response.json();
                setTodos(data);
            }
            postTodo();
            document.querySelector('form input[type="text"]').value = "";
        }
        catch (error) {
            console.error(error)
        }
    }

    const removeCheck = (id) => {
        const deleteTodo = async () => {
            const response = await fetch(`http://localhost:3001/todos/${id}`, {
                method: "DELETE",
            })
            const data = await response.json();
            setTodos(data);
        };
        deleteTodo();
    }

    const completedTodo = (id, value) => {
        try {
            const updatedTodo = async () => {
                const response = await fetch(`http://localhost:3001/todos/${id}`, {
                    method: "PUT",
                    body: JSON.stringify({ completed: value }),
                    headers: {
                        "content-type": "application/json",
                    }
                });
                const data = await response.json();
                setTodos(data);
            }
            updatedTodo();
            document.querySelector('form input[type="text"]').value = "";
        }
        catch (error) {
            console.error(error)
        }
    }

    return (
        <div>
            <form>
                <input type="text" name="" id="" placeholder="Add ToDo" />
                <input type="button" value="Add ToDo" onClick={addTodo} />
            </form>
            <article>
                {todos.map((elt) => {
                    return (
                        <div>
                            <ToDoItem task={elt} completedTodo={completedTodo} />
                            <button onClick={() => removeCheck(elt.id)}>delete</button>
                        </div>
                    )
                })}
            </article>
        </div >
    );
}

export default ToDoList;