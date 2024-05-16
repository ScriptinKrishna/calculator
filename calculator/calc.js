let display = document.getElementById("display");
let operand1 = '';
let operand2 = '';
let operator = '';

// Event listeners for keyboard input
document.addEventListener('keydown', handleKeyPress);

// Function to handle keyboard input
function handleKeyPress(event) {
    const key = event.key;
    if (/[0-9./*+-]/.test(key)) {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Backspace') {
        clearDisplay();
    }
}

// Function to append input to the display
function appendToDisplay(input) {
    if (input === '.' && display.value.includes('.')) return;
    display.value += input;
}

// Function to clear the display
function clearDisplay() {
    display.value = '';
    operand1 = '';
    operand2 = '';
    operator = '';
}

// Function to perform calculation
function calculate() {
    const expression = display.value;
    if (!expression) return;
    
    const tokens = expression.match(/(-?\d+\.?\d*)([+\-*/])/);
    if (!tokens) {
        display.value = 'ERROR';
        return;
    }
    
    operand1 = parseFloat(tokens[1]);
    operator = tokens[2];
    operand2 = parseFloat(expression.substring(tokens[0].length));

    if (operator === '/' && operand2 === 0) {
        display.value = 'ERROR: Division by zero';
        return;
    }

    let result;
    switch (operator) {
        case '+':
            result = operand1 + operand2;
            break;
        case '-':
            result = operand1 - operand2;
            break;
        case '*':
            result = operand1 * operand2;
            break;
        case '/':
            result = operand1 / operand2;
            break;
        default:
            display.value = 'ERROR';
            return;
    }

    display.value = result;
}
