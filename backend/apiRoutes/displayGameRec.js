import express from "express";
import { GameRecord } from "../models/getScore.js";

const router = express.Router();

router.get('/',async(req,res)=>{

    try {
        //This will get all the scores >=7
        const takesScoreGreaterThanSeven = await GameRecord.countDocuments({ score : { $gte : 7 }});

        //Count total Number of Games Played
        const totalGames = await GameRecord.countDocuments()

        //Applying percentage logic
        const percentage = (takesScoreGreaterThanSeven / totalGames)*200;
        res.json({percentage, message :"Players have scored more or equal than 7"});

    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Failed to Calculate the Percentage"})
    }
})

export default router;