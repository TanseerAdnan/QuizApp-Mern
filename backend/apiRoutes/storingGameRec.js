import express from "express";
import { GameRecord } from "../models/getScore.js";

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const { score } = req.body;
        // Create a new game record
        const newGameRecord = new GameRecord({
            score
        });

        // Save it in the database
        await newGameRecord.save();
        res.status(201).json({ message: 'Game record saved successfully' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to save game record' });
    }
});

export default router;
