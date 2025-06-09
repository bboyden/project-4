const { data } = require('./p4-data.js');

// Main functions
function getQuestions() {
  return data.map(obj => obj.question);
}

function getAnswers() {
  return data.map(obj => obj.answer);
}

function getQuestionsAnswers() {
  return data.map(obj => ({ ...obj }));
}

function getQuestion(number = "") {
  const index = number - 1;
  const result = { question: "", number, error: "" };

  if (number === "") {
    result.error = "Question number must be an integer";
  } else if (!Number.isInteger(number)) {
    result.error = "Question number must be an integer";
  } else if (number < 1) {
    result.error = "Question number must be >= 1";
  } else if (number > data.length) {
    result.error = `Question number must be less than the number of questions (${data.length})`;
  } else {
    result.question = data[index].question;
  }

  return result;
}

function getAnswer(number = "") {
  const index = number - 1;
  const result = { answer: "", number, error: "" };

  if (number === "") {
    result.error = "Answer number must be an integer";
  } else if (!Number.isInteger(number)) {
    result.error = "Answer number must be an integer";
  } else if (number < 1) {
    result.error = "Answer number must be >= 1";
  } else if (number > data.length) {
    result.error = `Answer number must be less than the number of questions (${data.length})`;
  } else {
    result.answer = data[index].answer;
  }

  return result;
}

function getQuestionAnswer(number = "") {
  const index = number - 1;
  const result = { question: "", answer: "", number, error: "" };

  if (number === "") {
    result.error = "Question number must be an integer";
  } else if (!Number.isInteger(number)) {
    result.error = "Question number must be an integer";
  } else if (number < 1) {
    result.error = "Question number must be >= 1";
  } else if (number > data.length) {
    result.error = `Question number must be less than the number of questions (${data.length})`;
  } else {
    result.question = data[index].question;
    result.answer = data[index].answer;
  }

  return result;
}

function addQuestionAnswer(info) {
    let result = {
      error: "",
      message: "",
      number: -1
    };
  
    if (!info || typeof info !== "object") {
      result.error = "Invalid input";
      return result;
    }
  
    if (!info.question) {
      result.error = "Missing question";
      return result;
    }
  
    if (!info.answer) {
      result.error = "Missing answer";
      return result;
    }
  
    data.push({ question: info.question, answer: info.answer });
    result.message = "Added new question";
    result.number = data.length;
    return result;
  }

function updateQuestionAnswer(info) {
    let result = {
      error: "",
      message: "",
      number: ""
    };
  
    if (!info || !Number.isInteger(info.number)) {
      result.error = "Invalid or missing number";
      return result;
    }
  
    if (info.number < 1 || info.number > data.length) {
      result.error = "Number out of range";
      return result;
    }
  
    const index = info.number - 1;
  
    if (info.question) {
      data[index].question = info.question;
    }
  
    if (info.answer) {
      data[index].answer = info.answer;
    }
  
    if (!info.question && !info.answer) {
      result.error = "Nothing to update";
      return result;
    }
  
    result.message = "Update complete";
    result.number = info.number;
    return result;
  }

function deleteQuestionAnswer(number) {
    let result = {
      error: "",
      message: "",
      number: ""
    };
  
    if (!Number.isInteger(number)) {
      result.error = "Invalid number";
      return result;
    }
  
    if (number < 1 || number > data.length) {
      result.error = "Number not in range";
      return result;
    }
  
    data.splice(number - 1, 1);
    result.message = "Deleted";
    result.number = number;
    return result;
  }

/*****************************
  Module function testing
******************************/
function testing(category, ...args) {
  console.log(`\n** Testing ${category} **`);
  console.log("-------------------------------");
  for (const o of args) {
    console.log(`-> ${category}${o.d}:`);
    console.log(o.f);
  }
}

const testGetQs = false;
const testGetAs = false;
const testGetQsAs = false;
const testGetQ = false;
const testGetA = false;
const testGetQA = false;
const testAdd = false;
const testUpdate = false;
const testDelete = false;

if (testGetQs) testing("getQuestions", { d: "()", f: getQuestions() });
if (testGetAs) testing("getAnswers", { d: "()", f: getAnswers() });
if (testGetQsAs) testing("getQuestionsAnswers", { d: "()", f: getQuestionsAnswers() });
if (testGetQ) {
  testing("getQuestion",
    { d: "()", f: getQuestion() },
    { d: "(0)", f: getQuestion(0) },
    { d: "(1)", f: getQuestion(1) },
    { d: "(4)", f: getQuestion(4) }
  );
}
if (testGetA) {
  testing("getAnswer",
    { d: "()", f: getAnswer() },
    { d: "(0)", f: getAnswer(0) },
    { d: "(1)", f: getAnswer(1) },
    { d: "(4)", f: getAnswer(4) }
  );
}
if (testGetQA) {
  testing("getQuestionAnswer",
    { d: "()", f: getQuestionAnswer() },
    { d: "(0)", f: getQuestionAnswer(0) },
    { d: "(1)", f: getQuestionAnswer(1) },
    { d: "(4)", f: getQuestionAnswer(4) }
  );
}
if (testAdd) {
  testing("addQuestionAnswer",
    { d: "()", f: addQuestionAnswer() },
    { d: "({})", f: addQuestionAnswer({}) },
    { d: '(question: "Q4")', f: addQuestionAnswer({ question: "Q4" }) },
    { d: '(answer: "A4")', f: addQuestionAnswer({ answer: "A4" }) },
    { d: '(question: "Q4", answer: "A4")', f: addQuestionAnswer({ question: "Q4", answer: "A4" }) }
  );
}
if (testUpdate) {
  testing("updateQuestionAnswer",
    { d: "()", f: updateQuestionAnswer() },
    { d: "({})", f: updateQuestionAnswer({}) },
    { d: '(question: "Q1U")', f: updateQuestionAnswer({ question: "Q1U" }) },
    { d: '(answer: "A1U")', f: updateQuestionAnswer({ answer: "A1U" }) },
    { d: '(question: "Q1U", answer: "A1U")', f: updateQuestionAnswer({ question: "Q1U", answer: "A1U" }) },
    { d: '(number: 1, question: "Q1U", answer: "A1U")', f: updateQuestionAnswer({ number: 1, question: "Q1U", answer: "A1U" }) }
  );
  console.log(data);
}
if (testDelete) {
  testing("deleteQuestionAnswer",
    { d: "()", f: deleteQuestionAnswer() },
    { d: "(0)", f: deleteQuestionAnswer(0) },
    { d: "(1)", f: deleteQuestionAnswer(1) },
    { d: "(4)", f: deleteQuestionAnswer(4) }
  );
  console.log(data);
}


module.exports = {
  getQuestions,
  getAnswers,
  getQuestionsAnswers,
  getQuestion,
  getAnswer,
  getQuestionAnswer,
  addQuestionAnswer,
  updateQuestionAnswer,
  deleteQuestionAnswer
};
