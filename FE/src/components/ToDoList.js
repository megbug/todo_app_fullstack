import { useState, useEffect } from 'react';
import ToDoItem from './ToDoItem';
import axios from 'axios';

const ToDoList = () => {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        axios.get('/todos').then(({ data }) => setTodos(data))
    }, [])

    console.log(todos);

    const submitForm = (async (e) => {

        e.preventDefault()
        console.log(e);
        // Form field values
        const title = e.currentTarget[0].value;

        try {
            const resp = await axios.post('/todos', { title, completed: false });
            setTodos((prevState) => [...prevState, resp.data])
        }
        catch (err) {
            console.error(err);
        }
    })

    const completedTodo = (id, value) => {
        try {
            const updatedTodo = async () => {
                const resp = await axios.put(`/todos/${id}`, { completed: value });
                setTodos((prevState) => {
                    console.log(prevState);
                    const filteredTodoList = prevState.filter(item => {
                        return (
                            item._id !== id
                        )
                    })
                    console.log(filteredTodoList);
                    console.log(resp.data);
                    return [...filteredTodoList, resp.data]
                    //return filteredTodoList // returned Liste ohne clicked todo -> korrekt für deleting
                })
            }
            updatedTodo();
            document.querySelector('form input[type="text"]').value = "";
        }
        catch (error) {
            console.error(error)
        }
    }

    // const removeCheck = (id) => {
    //     const deleteTodo = async () => {
    //         const response = await axios.delete(`/todos/${id}`, {
    //             method: "DELETE",
    //         })
    //         const data = await response.json();
    //         setTodos(data);
    //     };
    //     deleteTodo();
    // }



    return (
        <div>
            <form onSubmit={submitForm}>
                <input type="text" name="" id="" placeholder="Add ToDo" />
                <input type="submit" value="Add ToDo" />
            </form>
            <article>
                {todos.map((elt) => {
                    // console.log(elt);
                    return (
                        <div>
                            <ToDoItem key={elt._id} task={elt} completedTodo={completedTodo} />
                            {/* <button onClick={() => removeCheck(elt._id)}>delete</button> */}
                        </div>
                    )
                })}
            </article>
        </div >
    );
}

export default ToDoList;