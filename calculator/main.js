(function calculator(){
  'use strict';

  let documentReady = () => {

    var $output = $('.output');
    let result = 0;
    let firstNum;
    let secondNum;
    let operands = [false, false, false, false];
    let equalsPressed = false;


    function checkOperands(){
      return operands.every(function(elem){
        return !elem;
      });
    }


    $('.box').on('click', clickHandler);

    function clickHandler(event){
      // console.log(checkOperands());

      let input = event.target.innerHTML;
      console.log(typeof input);
      //numbers controller
      if (('0' || parseInt(input)) && !isNaN(input)){
        // bug here: variables get reset even if continuing to operate
        // also problems with 0
        if (equalsPressed){
          result = 0;
          $output.text(result);
          firstNum = undefined;
          secondNum = undefined;
          equalsPressed = false;
        }

        // let number = parseInt(input);
        let number = input;
        // result = parseInt(result);

        // if no operands active
        if (checkOperands()){

          console.log(input);
          if ($output.text() !== '0') {
            result = parseFloat(result.toString() + number.toString());
            firstNum = result;
          } else {
            firstNum = number;
            result = number;
            // console.log('firstNum', firstNum, 'result', result);
          }


        // if operands active
        } else {
          if (secondNum) {
            result = parseFloat(result.toString() + number.toString());
            secondNum = result;
          } else {
            secondNum = number;
            result = secondNum;
            $output.text(result);
          }
        }
      }

      // equals key controller
      if (input === "="){

        if (checkOperands()){
          //repeat last operation
          console.log('here');
          return;
        } else {

          var operatorIndex = operands.indexOf(true);;
          selectOperation(operatorIndex);
          console.log('result', result);
          equalsPressed = true;
        }
      }

      // addition, multiplication, subtraction, division
      function selectOperation(i){
        if (i === 0){
          result = firstNum + secondNum;
          // $output.text(result);
          operands[0] = false;
        } else if (i === 1){
          result = firstNum - secondNum;
          // firstNum = result;
          operands[1] = false;
        } else if (i === 2) {
          result = firstNum * secondNum;
          // firstNum = result;
          operands[2] = false;
        } else if (i === 3) {
          result = firstNum / secondNum;
          // firstNum = result;
          operands[3] = false;
        }
      }

      if (checkOperands()){
        console.log(operands);
        switch(input){
          case '+':
            operands[0] = true;
            // secondNum = undefined;
            firstNum = result;
            break;
          case '-':
            operands[1] = true;
            // secondNum = undefined;
            firstNum = result;
            break;
          case 'x':
            operands[2] = true;
            // secondNum = undefined;
            firstNum = result;
            break;
          case '÷':
            operands[3] = true;
            // secondNum = undefined;
            firstNum = result;
            break;
        }
      } else {
        console.log(operands);
      }

      // decimal point controller
      if (input === '.'){
        result = $output.text() + ".";
        // change the data state to clicked so can't click again
      }

      if (input === '+/-'){
        if ($output.text() === "0"){
          console.log($output.text())
          return;
        } else {
          result = $output.text() * -1;
          if (firstNum){
            firstNum *= -1;
          } else {
            secondNum *= -1;
          }

        }
      }

      if (input === '%'){
        result = $output.text() * 0.01;
      }

      // clear controller
      if (input === 'AC'){
        result = 0;
        firstNum = undefined;
        secondNum = undefined;
        operands = [false, false, false, false];
      }






      $output.text(result);
    console.log('result', result, 'firstNum', firstNum, 'secondNum', secondNum);
    }
    $output.text(result);


  }

  $(documentReady);

})();
