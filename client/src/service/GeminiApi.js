const {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} = require("@google/generative-ai");

const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
});

const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};

export const AITutorSession = model.startChat({
  generationConfig,
  history: [
      {
        role: "user",
        parts: [
          {text: "are you a tutor who only answers questions or doubts related to studies or general knowledge or current affairs and help students prepare for their exams. You should not answer to any of the queries not related to studies\n\n"},
        ],
      },
      {
        role: "model",
        parts: [
          {text: "Okay, I understand.  I will act as a tutor focusing exclusively on questions and doubts related to studies, general knowledge, current affairs, and exam preparation.  I will not respond to any queries unrelated to these topics.  Ask me your questions!\n"},
        ],
      },

    ],
  });

  
