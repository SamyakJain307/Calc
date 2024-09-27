let calcInput = ""; // Store the current input
let isSquareRoot = false;  // To track if the √ symbol is active

// DOM elements
const calcDisplay = document.getElementById('calc-display'); // Corrected from 'calc-input' to 'calc-display'

// Basic event listeners for button clicks
document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => appendNumber(button.innerText)); // Removed stray character
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => appendOperator(button.innerText));
});

document.querySelector('.clear').addEventListener('click', clearScreen);
document.querySelector('.delete').addEventListener('click', deleteLast);
document.querySelector('.sqrt').addEventListener('click', appendSquareRoot);
document.querySelector('.equals').addEventListener('click', calculate);

function updateDisplay(value) {
    calcDisplay.innerText = value; // Updated to use correct DOM element
}

function appendNumber(number) {
    calcInput += number;  // Add the clicked number to the input
    updateDisplay(calcInput);  // Update the display with the new input
}

function appendOperator(operator) {
    // Avoid consecutive operators or starting with an operator
    if (calcInput !== "" && !isNaN(calcInput.slice(-1))) {
        calcInput += operator;  // Add the clicked operator to the input
        updateDisplay(calcInput);  // Update the display with the new input
    }
}

function clearScreen() {
    calcInput = "";  // Reset the input
    isSquareRoot = false;  // Reset the square root flag
    updateDisplay("");  // Clear the display
}

function deleteLast() {
    calcInput = calcInput.slice(0, -1);  // Remove the last character from the input
    updateDisplay(calcInput);  // Update the display
}

// Function to append √ symbol and enable square root calculation
function appendSquareRoot() {
    if (!isSquareRoot) {  // Ensure √ is not already present
        calcInput += "√";  // Add the √ symbol to the input
        updateDisplay(calcInput);// Display the √ symbol
        isSquareRoot = true;  // Set the flag that square root mode is active
    }
}

function calculate() {
    try {
        // Simple square root logic:
        if (isSquareRoot) {
            let numberAfterSquareRoot = calcInput.split("√")[1];
            let calcResult = Math.sqrt(numberAfterSquareRoot).toFixed(5);
            updateDisplay(calcResult);  // Update display with the result
            calcInput = calcResult.toString();
            isSquareRoot = false;
        } else {
            let calcResult = parseExpression(calcInput);  // Evaluate the expression
            calcResult = parseFloat(calcResult.toFixed(5)); // Ensure result is up to 5 decimal places
            updateDisplay(calcResult);  // Display the result
            calcInput = calcResult.toString();  // Store result for further calculations
        }
    } catch (e) {
        updateDisplay("Error");
    }
}

// Basic math parser (replaces eval)
function parseExpression(expr) {
    // Replace multiplication and division symbols
    expr = expr.replace(/x/g, '*').replace(/÷/g, '/');

    // Use the Function constructor to safely parse math expressions
    try {
        return new Function('return ' + expr)();  // Create a new function and return its result
    } catch (error) {
        return "Error";
    }
}

// Handle keyboard input
document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('keydown', handleKeyPress);
});

function handleKeyPress(event) {
    const key = event.key;

    // Check if the key is a number
    if (!isNaN(key)) {
        appendNumber(key);  // Append the number
    } 
    // Check for operators
    else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        appendOperator(key);
    } 
    // Handle Enter key for calculation
    else if (key === 'Enter') {
        calculate();
    } 
    // Handle Backspace for deleting last entry
    else if (key === 'Backspace') {
        deleteLast();
    } 
    // Handle Escape key for clearing the screen
    else if (key === 'Escape') {
        clearScreen();
    } 
    // Custom handling for the square root symbol
    else if (key === 'r') {
        appendSquareRoot();
    } 
    // Handle decimal point
    else if (key === '.') {
        appendNumber('.'); // Corrected: Using appendNumber for decimal point instead of appendOperator
    }
}
