function sort(){
  var canvas = document.getElementById('sortingCanvas');
  var context = canvas.getContext("2d");
  context.translate(0, canvas.height);
  context.scale(1, -1);

  var arr = createArray();
  console.log(arr);
  // bubbleSort(arr);

  var xPos = 0;
  for(let i = 0; i < arr.length; i++){
    xPos+=5;
    context.rect(xPos, 0, 5, arr[i]);
    context.stroke();
  }
}

function createArray(){
  var arr = []
  for(let i = 1; i <= 400; i++){
    arr[i-1] = i;
  }
  // arr.sort(function(a, b){return 0.5 - Math.random()});
  return arr;
}

function randomArr(array){
  var i = 0
    , j = 0
    , temp = null

  for (let i = array.length - 1; i > 0; i -= 1) {
    j = Math.floor(Math.random() * (i + 1))
    temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}

function bubbleSort(a)
{
    var swapped;
    do {
        swapped = false;
        for (var i=0; i < a.length-1; i++) {
            if (a[i] > a[i+1]) {
                var temp = a[i];
                a[i] = a[i+1];
                a[i+1] = temp;
                swapped = true;
            }
        }
    } while (swapped);
}
