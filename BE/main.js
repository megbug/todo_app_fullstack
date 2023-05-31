import express from 'express';
import { error } from 'node:console';
import fsP from 'node:fs/promises'
// import cors from 'cors'

const app = express();
const port = 3001;

app.use(express.json());
app.use(express.static("../FE/build"));
// app.use(cors());

let idCount = 0;

app.get('/', (req, res) => {
    res.send('i work')
})

app.get('/todos', async (req, res) => {
    try {
        const todos = await fsP.readFile('./todo.json')
        res.send(JSON.parse(todos))
    }
    catch (err) {
        console.error(err)
    }
})

app.get('/todos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const todos = await fsP.readFile('./todo.json');
        const parsedTodos = JSON.parse(todos);

        let filteredTodo = parsedTodos.filter((elt) => {
            return (
                elt.id === Number(id)
            )
        })
        res.send(filteredTodo[0]);
    }
    catch (err) {
        console.error(err)
    }
})

app.post('/todos', async (req, res) => {
    try {
        const newTodo = req.body;
        // let newTodo = { title: 'test post req', completed: false, id: idCount }
        idCount = idCount + 1;

        newTodo.id = idCount;
        const todos = await fsP.readFile('./todo.json');
        const parsedTodos = JSON.parse(todos);
        console.log(parsedTodos);

        parsedTodos.push(newTodo);
        await fsP.writeFile('./todo.json', JSON.stringify(parsedTodos, null, 2))
        res.send(parsedTodos)
    }
    catch (err) {
        console.error(err)
    }
})

app.put('/todos/:id', async (req, res) => {
    let { id } = req.params;
    let updatedTodo = req.body;
    // let updatedTodo = { title: 'test put' }

    try {
        const todos = await fsP.readFile('./todo.json');
        const parsedTodos = JSON.parse(todos);
        console.log(parsedTodos);
        const findTodo = parsedTodos.findIndex((elt) => {
            return elt.id == id;
        })

        parsedTodos[findTodo] = {
            ...parsedTodos[findTodo],
            ...updatedTodo
        }
        console.log(parsedTodos);
        await fsP.writeFile('./todo.json', JSON.stringify(parsedTodos, null, 2))
        res.send(parsedTodos);
    }
    catch (err) {
        console.error(err)
    }
})

app.delete('/todos/:id', async (req, res) => {
    let { id } = req.params;

    try {
        const todos = await fsP.readFile('./todo.json');
        const parsedTodos = JSON.parse(todos);
        let newTodos = parsedTodos.filter((elt) => {
            return (
                elt.id !== Number(id)
            )
        })
        await fsP.writeFile('./todo.json', JSON.stringify(newTodos, null, 2))
        res.send(newTodos)
    }
    catch (err) {
        console.error(err)
    }
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

// testing
// curl --header "Content-Type: application/json" \
// --request POST \
// --data '{"title": "test post req", "completed": false}' \
// http://localhost:3000/todos

// curl --header "Content-Type: application/json" \
// --request PUT \
// --data '{ "mail": "updated@mail.com" }' \
// http://localhost:3000/contacts/1

// curl --header "Content-Type: application/json" \
// --request DELETE \
// http://localhost:3000/todos/2