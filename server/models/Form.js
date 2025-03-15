// model/schema for form
import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const formsSchema = new Schema({
    name: String,
    email: String,
    contactNum: String,
    message: String,
});

const Forms = model('Forms', formsSchema);
export default Forms;