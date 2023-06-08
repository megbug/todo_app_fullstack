import mongoose from 'mongoose';
import 'dotenv/config.js';

const connection = await mongoose.connect(process.env.DB);
const isDeleted = await mongoose.connection.db.dropDatabase();

if (isDeleted) {
    console.log('Database is dropped');
}
else {
    console.log('Database was not dropped');
}
