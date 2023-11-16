import express from "express";
import _ from "lodash";
import jsQuestions  from "../questions/jsQuestions.js";

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    
    const shuffledQuestions = _.shuffle(jsQuestions.questions);
    const randomQuestions = shuffledQuestions.slice(0, 10);

    res.json({ questions: randomQuestions });
  } catch (error) {
    res.status(500).json({ error: "Error loading quiz data" });
  }
});

export default router;
