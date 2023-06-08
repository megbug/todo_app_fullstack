import { model, Schema } from 'mongoose';

const toDoSchema = new Schema({
    title: String,
    completed: Boolean
});

export const ToDo = model('ToDo', toDoSchema);