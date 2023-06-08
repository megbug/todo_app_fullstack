import express from 'express';
import mongoose from 'mongoose';
import { ToDo } from './model/ToDo.js'

import 'dotenv/config.js'

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
mongoose.connect(process.env.DB)

app.get('/', (req, res) => {
    res.send('i work')
})
// sollte status 200 zurückgeben

//weiterhin mit try und catch? 
app.get('/todos', async (req, res) => {
    try {
        const todos = await ToDo.find();
        res.send(todos)
    }
    catch (err) {
        console.error(err);
    }
})

app.get('/todos/:id', async (req, res) => {
    const { id } = req.params
    try {
        const todos = await ToDo.findById(id);
        res.send(todos)
    }
    catch (err) {
        console.error(err);
    }
})

app.post('/todos', async (req, res) => {
    try {
        console.log(req.body);
        const newTodo = await ToDo.create(req.body);
        res.send(newTodo)
        console.log(newTodo);
    }
    catch (err) {
        console.error(err);
    }
})

app.put('/todos/:id', async (req, res) => {
    const { id } = req.params;
    const update = req.body;
    try {
        await ToDo.updateOne({ _id: id }, update)
        const updatedTodo = await ToDo.findById(id);
        res.send(updatedTodo)
        console.log(updatedTodo);
    }
    catch (err) {
        console.error(err);
    }
})

app.delete('/todos/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await ToDo.deleteOne({ _id: id })
    }
    catch (err) {
        console.error(err);
    }
})

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})