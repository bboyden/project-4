const express = require('express');
const app = express();
const port = 8080;

app.use(express.json());

const {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer
} = require('./p4-module');

app.get('/cit/question', (req, res) => {
  res.json({
    error: "",
    statusCode: 200,
    questions: getQuestions()
  });
});

app.get('/cit/answer', (req, res) => {
  res.json({
    error: "",
    statusCode: 200,
    answers: getAnswers()
  });
});

app.get('/cit/questionanswer', (req, res) => {
  res.json({
    error: "",
    statusCode: 200,
    questions_answers: getQuestionsAnswers()
  });
});

app.get('/cit/question/:number', (req, res) => {
  const num = Number(req.params.number);
  const result = getQuestion(num);
  res.status(result.error ? 400 : 200).json({
    error: result.error,
    statusCode: result.error ? 400 : 200,
    question: result.question,
    number: result.number
  });
});

app.get('/cit/answer/:number', (req, res) => {
  const num = Number(req.params.number);
  const result = getAnswer(num);
  res.status(result.error ? 400 : 200).json({
    error: result.error,
    statusCode: result.error ? 400 : 200,
    answer: result.answer,
    number: result.number
  });
});

app.get('/cit/questionanswer/:number', (req, res) => {
  const num = Number(req.params.number);
  const result = getQuestionAnswer(num);
  res.status(result.error ? 400 : 200).json({
    error: result.error,
    statusCode: result.error ? 400 : 200,
    question: result.question,
    answer: result.answer,
    number: result.number
  });
});


app.post('/cit/question', (req, res) => {
  const result = addQuestionAnswer(req.body);
  res.status(result.error ? 400 : 201).json({
    error: result.error,
    statusCode: result.error ? 400 : 201,
    number: result.number
  });
});


app.put('/cit/question', (req, res) => {
  const result = updateQuestionAnswer(req.body);
  res.status(result.error ? 400 : 200).json({
    error: result.error,
    statusCode: result.error ? 400 : 200,
    number: result.number
  });
});


app.delete('/cit/question/:number', (req, res) => {
  const result = deleteQuestionAnswer(Number(req.params.number));
  res.status(result.error ? 400 : 200).json({
    error: result.error,
    statusCode: result.error ? 400 : 200,
    number: result.number
  });
});


app.use((req, res) => {
  res.status(404).json({
    error: "Not found",
    statusCode: 404
  });
});

app.listen(port, () => {
  console.log(`Server is up on http://localhost:${port}`);
});
