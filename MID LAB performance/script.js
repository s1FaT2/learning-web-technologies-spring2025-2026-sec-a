let mainDiv = document.getElementById('calculator');

let display = document.createElement('input');
display.type = "text";
display.id = "display";
display.readOnly = true;
mainDiv.appendChild(display);

mainDiv.appendChild(document.createElement('br'));

let buttons = [
    "9","8","7","/",
    "6","5","4","*",
    "3","2","1","-",
    "0",".","=","+"
];

buttons.forEach(function(val, index){

    let btn = document.createElement('button');
    btn.innerHTML = val;
    btn.style.margin = "5px";

    btn.addEventListener('click', function(){

        if(val === "="){
            calculate();
        }else{
            display.value += val;
        }

    });

    mainDiv.appendChild(btn);

    if((index + 1) % 4 === 0){
        mainDiv.appendChild(document.createElement('br'));
    }

});

function calculate(){

    let expression = display.value;

    let values1 = "";
    let values2 = "";
    let operator = "";

    for(let i = 0; i < expression.length; i++){

        let ch = expression[i];

        if(ch === "+" || ch === "-" || ch === "*" || ch === "/"){
            operator = ch;
        }
        else{
            if(operator === ""){
                values1 += ch;
            }else{
                values2 += ch;
            }
        }
    }

    values1 = parseFloat(values1);
    values2 = parseFloat(values2);

    let result = 0;

    if(operator === "+"){
        result = values1 + values2;
    }
    else if(operator === "-"){
        result = values1 - values2;
    }
    else if(operator === "*"){
        result = values1 * values2;
    }
    else if(operator === "/"){
        result = values1 / values2;
    }

    alert("OUTPUT: " + result);  

    display.value = "";          
}