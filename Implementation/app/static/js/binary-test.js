function Quiz(title) {
  this.title = title;
  this.score = 0;
  this.questions = [];
  this.correct = [];
  this.incorrect = [];
};

function Question() {
  this.num1 = 0;
  this.num2 = 0;
  this.operator = "";
  this.answer = 0;
};

//Globals
var currentQuestion = 0;
var quiz = null;
var binNum1 = $('#binNum1');
var binNum2 = $('#binNum2');
var operator = $('#operator');
var quNum = $('#quNum');
var binAnswer = $('#binAnswer');

window.onload = initQuiz;

function initQuiz(){
  quiz = new Quiz("Binary Test");
  for(let i = 0; i < 10; i++){
    quiz.questions.push(genAdditionQuestion());
  }
  console.log(quiz.title);
  console.log(quiz.questions);

  //Display first question
  binNum1.text(quiz.questions[0].num1);
  binNum2.text(quiz.questions[0].num2);
  operator.text(quiz.questions[0].operator);
}

function genAdditionQuestion(){
  do {
    var question = new Question();
    var num1 = genNumber();
    var num2 = genNumber();
    question.num1 = toBinary(num1);
    question.num2 = toBinary(num2);
    question.operator = "+";
    question.answer = genAnswer(num1, num2);
  }while(checkExists(question));

  return question;
}


function nextQuestion(){
  if(checkAnswer(quiz.questions[currentQuestion].answer, binAnswer.val())){
    quiz.score++;
  }
  incrementProgressBar();
  currentQuestion++;
  if(currentQuestion < quiz.questions.length){
    quNum.html(currentQuestion+1);
  }
  console.log(quNum.text());
  binNum1.text(quiz.questions[currentQuestion].num1);
  binNum2.text(quiz.questions[currentQuestion].num2);
  operator.text(quiz.questions[currentQuestion].operator);
  binAnswer.val('');
  console.log(quiz.score);
}

function chooseRandomQuestionType(){

}

function genSubtractionQuestion(){

}

function genDecimalToBinaryQuestion(){

}

function checkExists(question){
  var exists = false;
  for(var q in quiz.questions){
    if(question === q){
      console.log("Duplicate Question Found");
      exists = true;
    }
  }

  return exists;
}

function checkAnswer(actual, input){
  return actual === input;
}

function genNumber() {
  var random = Math.floor(Math.random()*(15-3+1)+3);
  return random;
}

function toBinary(num){
  return (num >>> 0).toString(2);
}

function genAnswer(num1, num2) {
  var answer = num1 + num2;
  return (answer >>> 0).toString(2);
}

function incrementProgressBar(){
  var submitBtn = $('#hidden');
  var progressBar = $('.test-progress-bar');
  var progressText = $('.test-progress-text');
  var qNum = $('#qNum');
  var width = progressBar.width() / progressBar.parent().width() * 100;
  var prog = parseInt(qNum.text());
  // console.log(qNum.text());
  // console.log(width);
  if(width < 90){
    prog++;
    width += 10;
    if(width >= 90){
      progressText.html('Complete!');
    }
    else {
      qNum.html(prog);
    }
    progressBar.css('width', width + '%');
  }
}
