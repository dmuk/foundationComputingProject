function decimalToBinary(){
  var div = $('.arrow-container');
  var decimalNumber = $('.decimal-number');
  var conversionStep = $('.conversion-step');
  var inputBox = $('#decimalInputBox');
  var steps = [256, 128, 64, 32, 16, 8, 4, 2 , 1];
  //Set intial number from user input
  decimalNumber.text(inputBox.val());
  conversionStep.text("");

  //Display div
  div.fadeIn("slow");

  var dec = decimalNumber.text();
  //Loop through each step
  for(let i = 0; i <= 9; i++){
    var diff = dec - steps[i];
    moveToNextStep();
    console.log("step");
    if(!diff < 0){
      console.log(diff);
      decimalNumber.text(diff);
    }
  }
}


function moveToNextStep(){
  var arrowContainer = $('.arrow-container');
  var left = arrowContainer.css("left");
  console.log(left);
  arrowContainer.animate({
    left: "+=80"
  }, 3000);
}


function setBinaryBit(i){
  var bin1 = $('#bin-1');
  var bin2 = $('#bin-2');
  var bin3 = $('#bin-3');
  var bin4 = $('#bin-4');
  var bin5 = $('#bin-5');
  var bin6 = $('#bin-6');
  var bin7 = $('#bin-7');
  var bin8 = $('#bin-8');
  var bin9 = $('#bin-9');

  var binArr = [bin1, bin2, bin3, bin4, bin5, bin6, bin7, bin8, bin9];

  binArr[i].fadeOut("slow");
  binArr[i].text("1");
  binArr[i].fadeIn("slow");
}
