import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const activitySchema = new Schema({
    title: String,
    img1: String,
    img2: String,
    img3: String,
    desc1: String,
    desc2: String,
});

const Activity = model('Activity', activitySchema);
export default Activity;