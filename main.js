window.onload = function(){
  disableButton("changeSign");
}

let isHighlighted = true;
let isError = false;
let btnHighlighted = "";
let value1 = "";
let value2 = "";
let operationType = "";
let isNewNumber = false;
let lengthResult = false;
let catchedSecondNumber = false;
let firsIsCatched = false;

function getResult() {
    return (document.getElementById('displayid').innerHTML);
}

function setResult(setValue) {
    let result = "";
    result = result + setValue; // IMP
    result = result.replace('.', ',');

    if (checkError(setValue) == false) {
        document.getElementById('displayid').innerHTML = result;
    } else {
        document.getElementById('displayid').innerHTML = "ERROR";
        disableButton("changeSign");
        isError = true;
    } 
  }

function checkError(value) {
    let result = "";
    result += value;
    let length = maxLength(result);
    if (result.length > length + 1 || result == "Infinity" || result=="NaN") {
      disableButton("btn");
      return true;
    } else {
      return false;
    }
  }

function maxLength(value) {
    let result = "";
    result += value;
    let lengthResult =  9;
    if ((result.includes("-") && result.includes(".")) || (result.includes("-") && result.includes(","))) {
      lengthResult += +2;
    } else if (result.includes("-") || result.includes(".") || result.includes(",")) {
      lengthResult += +1;
    }
    return lengthResult;
  }
 
function add(key) {
    if (isNewNumber) {
        setResult(0);
        isNewNumber = false;
    }
    let displayNumbers = getResult();
    switch (key) {
        case ",":
            if (notRepeatedComma() && maxLength10()) {
                setResult(displayNumbers + key);
            } 
            disableButton("changeSign");
            break;

        default:
            if (maxLength10()) {
                if (displayNumbers == '0') {
                    setResult(key);
                    enableButton("changeSign");
                } else { 
                    setResult(displayNumbers + key);
                    enableButton("changeSign");
                }
                maxLength10();
                
            }
            break;
    }
}

function clearDisplay() {
    setResult(0);
    enableButton("btn");
    enableButton("comma");
    disableButton("changeSign");
    rmvHighlighted(btnHighlighted);
    isError == false;
}

function maxLength10() {
    let displayNumbers = getResult();
    let counter = 0;
    for (let index = 0; index < displayNumbers.length; index++) {
        if (displayNumbers.charAt(index) != "," && displayNumbers.charAt(index) != "-") {
            counter++;
        } 
    }

    if (counter < 10){
        return true;
    } else {
        disableButton("numericButton");
        return false;
    }
}

function notRepeatedComma() {
    let displayNumbers = getResult();
    let commasCounter = 0;
    for (let index = 0; index < displayNumbers.length; index++) {
        if (displayNumbers.charAt(index) == ','){
            commasCounter++;
        }
    }
    if (commasCounter < 1) {
        disableButton("comma");
        disableButton("changeSign");
        return true;
    } else {
        enableButton("comma");
        return false;
    }  
}

function changeSign() {
    let displayNumbers = "";
    displayNumbers = getResult();
    if (displayNumbers.charAt(displayNumbers.length - 1) == ","){
        displayNumbers = -displayNumbers.replace(',', '.') + ".";
    } else {
        displayNumbers = -displayNumbers.replace(',', '.');
    }
    setResult(displayNumbers);
}

function setHighlighted(key) {
    rmvHighlighted(btnHighlighted);
    if (isHighlighted == true) {
      isHighlighted = false;
      enableButton("btn");
      disableButton("changeSign");
      switch (key) {
        case "*":
          let multiply = document.getElementById("multiply");
          multiply.style.backgroundColor = "#5b7aa1";
          btnHighlighted = key;
          break;
        case "/":
          let divide = document.getElementById("divide");
          divide.style.backgroundColor = "#5b7aa1";
          btnHighlighted = key;
          break;
        case "+":
          let sum = document.getElementById("sum");
          sum.style.backgroundColor = "#5b7aa1";
          btnHighlighted = key;
          break;
        case "-":
          let substract = document.getElementById("substract");
          substract.style.backgroundColor = "#5b7aa1";
          btnHighlighted = key;
          break;
        default:
          break;
      }
    }
  }

function rmvHighlighted(key) {
    if (isHighlighted == false) {
      isHighlighted = true;
      switch (key) {
        case "*":
          let multiply = document.getElementById("multiply");
          multiply.style.backgroundColor = "#013668";
          break;
        case "/":
          let divide = document.getElementById("divide");
          divide.style.backgroundColor = "#013668";
          break;
        case "+":
          let sum = document.getElementById("sum");
          sum.style.backgroundColor = "#013668";
          break;
        case "-":
          let substract = document.getElementById("substract");
          substract.style.backgroundColor = "#013668";
          break;
        default:
          break;
      }
    }
  }

function preValue(key) {
    value1 = "";
    operationType = key;
    
    value1 = value1 + getResult();
    value1 = value1.replace(",", ".");
    isNewNumber = true;
}

function postValue() {
  if (isNewNumber == true){
    setResult("");
  }
    value2 = value2 + getResult();
    value2 = value2.replace(",", ".");
}

function equalButton() {
    let resultLength = 0;
    rmvHighlighted(btnHighlighted);
    enableButton("btn");
    let result = "";
    isNewNumber = true;
    switch (operationType) {
        case "+":
            result = Number(parseFloat(value1)+parseFloat(value2));
            break;
    
        case "-":
            result = Number(parseFloat(value1)-parseFloat(value2));
            break;

        case "*":
            result = Number(parseFloat(value1)*parseFloat(value2));
        break;

        case "/":
            result = Number(parseFloat(value1)/parseFloat(value2));
            break;
        default:
            result = value2;
            isNewNumber = false;
            break;
    }

    value1= "";
    value2= "";
    operationType = "";
    let decimals = checkDecimals(result);
    result = parseFloat(result).toFixed(decimals);
    setResult(parseFloat(result));
    
}

function checkDecimals(resultOperation) {
    let result = "";
    result = result + resultOperation;
    let numDecimals = 10;
    if (result.includes(".") == true) {
      numDecimals = numDecimals - result.indexOf(".");
    } else {
      numDecimals = 9;
    }
    return numDecimals;
}

// DISABLING BUTTONS

function disableButton(className){
    let classResult = document.getElementsByClassName(className);
    for (let index = 0; index < classResult.length; index++) {
      let idButton = document.getElementsByClassName(className);
      idButton[index].disabled = true;
      idButton[index].classList.add("disabledButton");   
    }
}

function enableButton(className){
    let classResult = document.getElementsByClassName(className);
    for (let index = 0; index < classResult.length; index++) {
      let idButton = document.getElementsByClassName(className);
      idButton[index].disabled = false;
      idButton[index].classList.remove("disabledButton");
      idButton[index].classList.add("button");   
    }
}

// KEYBOARD EVENTS
window.onload = function(){
  document.onkeyup = keys;
}

function keys(event){
  let ascii = event.keyCode;
  let code = String.fromCharCode(ascii);
  console.log(ascii);
  
  if (ascii >= 48 && code <= 57){
    add(code);
  } else {
      switch (ascii) {
        case 188:
          add(",");
          break;
      
        case 27:
          clearDisplay();
          break;

        case 17:
          changeSign();
          break;

        case 187:
          preValue("+");
          setHighlighted("+");
          break;

        case 189:
          preValue("-");
          setHighlighted("-");
          break;

        case 68:
          preValue("/");
          setHighlighted("/");
          break;

        case 83:
          preValue("*");
          setHighlighted("*");
          break;

        case 13:
          postValue();
          equalButton();

        default:
          break;
      }
  }
}


