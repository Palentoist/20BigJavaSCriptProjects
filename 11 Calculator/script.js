const calculatorDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');

let firstValue = 0;
let operatorValue = '';
let awaitingNextValue = false;

function sendNumberValue(number)
{
    // Replace the current value if first value if entered
    if(awaitingNextValue === true)
    {
        calculatorDisplay.textContent = number;
        awaitingNextValue = false;
    }
    else
    {
         // If current display value is 0 , replace it , otherwise add number
        const displayValue = calculatorDisplay.textContent;
        calculatorDisplay.textContent = displayValue === '0' ? number : displayValue + number; 
    }        
}

function addDecimal()
{
    // If Operator pressed , dont add decimal
    if(awaitingNextValue)
    {
        return;
    }

    // If no decimal , then add one
    if(!calculatorDisplay.textContent.includes('.'))
    {
        calculatorDisplay.textContent = `${calculatorDisplay.textContent}.`;
    }
}

// Calculate First and Second Values depending on the Operator
const calculate = {
   '/' : (firstNumber , secondNumber) => firstNumber / secondNumber,
   '*' : (firstNumber , secondNumber) => firstNumber * secondNumber,
   '+' : (firstNumber , secondNumber) => firstNumber + secondNumber,
   '-' : (firstNumber , secondNumber) => firstNumber - secondNumber,
   '=' : (firstNumber , secondNumber) => secondNumber,
};

function useOperator(operator)
{
    const currentValue = Number(calculatorDisplay.textContent);

    // Prevent multiple operators
    if(operatorValue && awaitingNextValue)
    {
        operatorValue = operator;
        return;
    }

    // Assign First Value if no value
    if(!firstValue)
    {
        firstValue = currentValue;
    }
    else
    {
        const calculation = calculate[operatorValue](firstValue , currentValue);
        calculatorDisplay.textContent = calculation;
        firstValue = calculation;
    }

    // Ready for the next value store our Operator
    awaitingNextValue = true;

    operatorValue = operator;
}

// Add Event Listeners for numbers , operators , decimal buttons
inputBtns.forEach((inputBtn) => {
    if(inputBtn.classList.length === 0)
    {
        inputBtn.addEventListener('click' , () => sendNumberValue(inputBtn.value));
    }
    else if(inputBtn.classList.contains('operator'))
    {
        inputBtn.addEventListener('click' , () => useOperator(inputBtn.value));
    }
    else if(inputBtn.classList.contains('decimal'))
    {
        inputBtn.addEventListener('click' , () => addDecimal());
    }
});

// Reset all values , Display
function resetAll()
{
    firstValue = 0;
    operatorValue = '';
    awaitingNextValue = false;
    calculatorDisplay.textContent = '0';
}

// Event Listener
clearBtn.addEventListener('click' , resetAll);