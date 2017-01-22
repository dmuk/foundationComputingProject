function nextQuestion(){
  incrementProgressBar();
  genAdditionQuestion();
}

function chooseRandomQuestionType(){

}

function genAdditionQuestion(){
  var binNum1 = $('#binNum1');
  var binNum2 = $('#binNum2');
  var operator = $('#operator');

  var num1 = genBinary();
  console.log(num1);
  var num2 = genBinary();
  console.log(num2);

  binNum1.text(num1);
  binNum2.text(num2);
  operator.text('+');
}

function genSubtractionQuestion(){

}

function genDecimalToBinaryQuestion(){

}

function checkAnswer(){

}

function genBinary() {
  var random = Math.floor(Math.random()*16);
  return (random >>> 0).toString(2);
}



function incrementProgressBar(){
  var progressBar = $('.test-progress-bar');
  var progressText = $('.test-progress-text');
  var qNum = $('#qNum')
  var width = progressBar.width() / progressBar.parent().width() * 100;
  var prog = parseInt(qNum.text());
  console.log(qNum.text());
  console.log(width);
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
