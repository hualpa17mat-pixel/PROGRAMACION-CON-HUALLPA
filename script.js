// Get the display element
const display = document.getElementById('display');

// Append a number to the display
function appendNumber(number) {
    if (display.value === '0' && number !== '.') {
        display.value = number;
    } else if (number === '.' && display.value.includes('.')) {
        return; // Prevent multiple decimal points
    } else {
        display.value += number;
    }
}

// Append an operator to the display
function appendOperator(operator) {
    const lastChar = display.value.slice(-1);
    
    // Prevent multiple operators in a row
    if (['+', '-', '×', '/'].includes(lastChar)) {
        return;
    }
    
    // Prevent operator at the start
    if (display.value === '') {
        return;
    }
    
    display.value += operator;
}

// Clear the display
function clearDisplay() {
    display.value = '0';
}

// Delete the last character
function deleteLast() {
    if (display.value.length === 1) {
        display.value = '0';
    } else {
        display.value = display.value.slice(0, -1);
    }
}

// Calculate the result
function calculate() {
    try {
        let expression = display.value;
        
        // Replace × and − with standard operators
        expression = expression.replace(/×/g, '*');
        expression = expression.replace(/−/g, '-');
        
        // Prevent division by zero
        if (expression.includes('/0')) {
            display.value = 'Error: División por 0';
            setTimeout(() => {
                display.value = '0';
            }, 2000);
            return;
        }
        
        // Evaluate the expression
        const result = eval(expression);
        
        // Round to avoid floating point errors
        display.value = Math.round(result * 10000) / 10000;
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '0';
        }, 2000);
    }
}

// Allow keyboard input
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        appendNumber(e.key);
    } else if (e.key === '.') {
        appendNumber(e.key);
    } else if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        const operator = e.key === '*' ? '×' : (e.key === '-' ? '−' : e.key);
        appendOperator(operator);
    } else if (e.key === 'Enter') {
        e.preventDefault();
        calculate();
    } else if (e.key === 'Backspace') {
        e.preventDefault();
        deleteLast();
    } else if (e.key === 'Escape') {
        clearDisplay();
    } else if (e.key === 'c' || e.key === 'C') {
        clearDisplay();
    }
});
