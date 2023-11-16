import express from "express";
import _ from "lodash";
import cQuestions  from "../questions/cQuestions.js";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    
    const shuffledQuestions = _.shuffle(cQuestions.questions);
    const randomQuestions = shuffledQuestions.slice(0, 10);

    res.json({ questions: randomQuestions });
  } catch (error) {
    res.status(500).json({ error: "Error loading quiz data" });
  }
});

export default router;
