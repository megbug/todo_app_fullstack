import mongoose from 'mongoose';
import { ToDo } from '../model/ToDo.js';

import 'dotenv/config.js';

await mongoose.connect(process.env.DB);

await ToDo.create({
    title: 'call friend',
    completed: false
},
    {
        title: 'text grandma',
        completed: false
    }
)

mongoose.disconnect();