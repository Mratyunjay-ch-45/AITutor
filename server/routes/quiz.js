const express = require("express");
const { generateQuiz, submitQuiz } = require("../controller/quiz");
const router = express.Router();

router.post("/generate", generateQuiz);
router.post("/submit", submitQuiz);
module.exports = router;
