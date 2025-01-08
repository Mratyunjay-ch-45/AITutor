const {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = "AIzaSyBnCX_GpA-m-gD_kyFYgfY7rF0pmM6RlS0";
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});

const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 40,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};

const generateQuiz = async (req, res) => {
    try {
        const { topic, numQuestions = 10, numOptions = 4 } = req.body;

        // Validate required fields
        if (!topic) {
            return res.status(400).json({
                error: 'Topic is required'
            });
        }

        const prompt = `Generate a quiz about ${topic} with ${numQuestions} questions. 
        Each question should have ${numOptions} multiple choice options.
        Make sure the questions are challenging but appropriate for students.
        Return the response in this exact JSON format:
        {
            "questions": [
                {
                    "question": "question text here",
                    "options": ["option1", "option2", "option3", "option4"],
                    "correctAnswer": "correct option here"
                }
            ]
        }`;

        const chat = model.startChat({
            generationConfig,
            history: []
        });

        const result = await chat.sendMessage(prompt);
        const response = await result.response;
        
        try {
            // Add error handling for JSON parsing
            let quizData;
            try {
                quizData = JSON.parse(response.text());
            } catch (jsonError) {
                console.error('JSON Parse Error:', jsonError);
                return res.status(500).json({
                    error: 'Invalid response format from AI',
                    details: 'Failed to parse JSON response'
                });
            }
            
            // Validate response format
            if (!quizData.questions || !Array.isArray(quizData.questions)) {
                return res.status(500).json({
                    error: 'Invalid response format from AI model',
                    details: 'Response missing questions array'
                });
            }

            // Validate each question has required fields
            for (let i = 0; i < quizData.questions.length; i++) {
                const q = quizData.questions[i];
                if (!q.question || !q.options || !q.correctAnswer) {
                    return res.status(500).json({
                        error: 'Invalid question format',
                        details: `Question ${i + 1} is missing required fields`
                    });
                }
                if (!Array.isArray(q.options) || q.options.length !== numOptions) {
                    return res.status(500).json({
                        error: 'Invalid options format',
                        details: `Question ${i + 1} has invalid options`
                    });
                }
                if (!q.options.includes(q.correctAnswer)) {
                    return res.status(500).json({
                        error: 'Invalid correct answer',
                        details: `Question ${i + 1} has invalid correct answer`
                    });
                }
            }

            // Set CORS headers
            res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
            res.header('Access-Control-Allow-Credentials', true);
            res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
            res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

            return res.json(quizData);

        } catch (parseError) {
            console.error('Error processing quiz data:', parseError);
            return res.status(500).json({
                error: 'Failed to process quiz data',
                details: parseError.message
            });
        }

    } catch (error) {
        console.error('Error generating quiz:', error);
        return res.status(500).json({
            error: 'Failed to generate quiz',
            details: error.message
        });
    }
};

const submitQuiz = async (req, res) => {
    try {
        const { userAnswers, questions } = req.body;

        // Validate required fields
        if (!userAnswers || !questions || !Array.isArray(questions)) {
            return res.status(400).json({
                error: 'Valid user answers and questions array are required'
            });
        }

        // Calculate score
        let correctAnswers = 0;
        let detailedResults = [];

        questions.forEach((question, index) => {
            const isCorrect = userAnswers[index] === question.correctAnswer;
            if (isCorrect) {
                correctAnswers++;
            }
            
            detailedResults.push({
                question: question.question,
                userAnswer: userAnswers[index],
                correctAnswer: question.correctAnswer,
                isCorrect: isCorrect
            });
        });

        const score = (correctAnswers / questions.length) * 100;

        // Set CORS headers
        res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
        res.header('Access-Control-Allow-Credentials', true);
        res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
        res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, Accept');

        return res.json({
            score: score,
            correctAnswers: correctAnswers,
            totalQuestions: questions.length,
            detailedResults: detailedResults
        });

    } catch (error) {
        console.error('Error submitting quiz:', error);
        return res.status(500).json({
            error: 'Failed to submit quiz',
            details: error.message
        });
    }
};

module.exports = {
    generateQuiz,
    submitQuiz
};

