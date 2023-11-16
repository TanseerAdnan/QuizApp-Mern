import express from "express";
import _ from "lodash";
import javaQuestions  from "../questions/javaQuestions.js";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    
    const shuffledQuestions = _.shuffle(javaQuestions.questions);
    const randomQuestions = shuffledQuestions.slice(0, 10);

    res.json({ questions: randomQuestions });
  } catch (error) {
    res.status(500).json({ error: "Error loading quiz data" });
  }
});

export default router;
