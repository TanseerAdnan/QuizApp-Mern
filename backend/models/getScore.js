import mongoose, { mongo } from "mongoose";

//schema
const gameRecordSchema = new mongoose.Schema({
    score: Number,
    timestamp: {type: Date, default: Date.now}
});

//Model for schema
export const GameRecord = mongoose.model('GameRecord',gameRecordSchema);

