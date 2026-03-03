// ==================== Service Worker Registration ====================
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(registration => console.log('Service Worker registered'))
        .catch(error => console.log('Service Worker registration failed:', error));
}

// ==================== Calculator Class ====================
class Calculator {
    constructor() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = null;
        this.history = this.loadHistory();
        this.isScientificMode = false;
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = null;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation) {
        if (this.currentOperand === '') return;
        if (this.previousOperand !== '') {
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;

        switch (this.operation) {
            case '+':
                computation = prev + current;
                break;
            case '−':
                computation = prev - current;
                break;
            case '×':
                computation = prev * current;
                break;
            case '÷':
                if (current === 0) {
                    alert('Cannot divide by zero');
                    return;
                }
                computation = prev / current;
                break;
            case '%':
                computation = prev % current;
                break;
            default:
                return;
        }

        this.addToHistory(this.previousOperand, this.operation, this.currentOperand, computation);
        this.currentOperand = computation;
        this.operation = null;
        this.previousOperand = '';
    }

    getDisplayValue() {
        let displayValue = this.currentOperand;
        if (this.operation != null) {
            return `${this.previousOperand} ${this.operation}`;
        }
        return displayValue;
    }

    // Scientific Functions
    sine() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return;
        this.currentOperand = Math.sin(value * Math.PI / 180);
        this.addToHistory(value, 'sin', '', this.currentOperand);
    }

    cosine() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return;
        this.currentOperand = Math.cos(value * Math.PI / 180);
        this.addToHistory(value, 'cos', '', this.currentOperand);
    }

    tangent() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return;
        this.currentOperand = Math.tan(value * Math.PI / 180);
        this.addToHistory(value, 'tan', '', this.currentOperand);
    }

    squareRoot() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value) || value < 0) {
            alert('Cannot calculate square root of negative number');
            return;
        }
        this.currentOperand = Math.sqrt(value);
        this.addToHistory(value, '√', '', this.currentOperand);
    }

    power() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return;
        this.currentOperand = value * value;
        this.addToHistory(value, 'x²', '', this.currentOperand);
    }

    power3() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return;
        this.currentOperand = value * value * value;
        this.addToHistory(value, 'x³', '', this.currentOperand);
    }

    logarithm() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value) || value <= 0) {
            alert('Logarithm undefined for zero or negative numbers');
            return;
        }
        this.currentOperand = Math.log10(value);
        this.addToHistory(value, 'log', '', this.currentOperand);
    }

    naturalLog() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value) || value <= 0) {
            alert('Natural logarithm undefined for zero or negative numbers');
            return;
        }
        this.currentOperand = Math.log(value);
        this.addToHistory(value, 'ln', '', this.currentOperand);
    }

    pi() {
        this.currentOperand = Math.PI;
    }

    e() {
        this.currentOperand = Math.E;
    }

    factorial() {
        const value = parseInt(this.currentOperand);
        if (isNaN(value) || value < 0) {
            alert('Factorial only works with non-negative integers');
            return;
        }
        let result = 1;
        for (let i = 2; i <= value; i++) {
            result *= i;
        }
        this.currentOperand = result;
        this.addToHistory(value, 'n!', '', result);
    }

    reciprocal() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value) || value === 0) {
            alert('Cannot calculate reciprocal of zero');
            return;
        }
        this.currentOperand = 1 / value;
        this.addToHistory(value, '1/x', '', this.currentOperand);
    }

    percent() {
        const value = parseFloat(this.currentOperand);
        if (isNaN(value)) return;
        this.currentOperand = value / 100;
    }

    // History Management
    addToHistory(prev, operation, current, result) {
        const timestamp = new Date().toLocaleString();
        let expression;

        if (current === '') {
            expression = `${operation}(${prev})`;
        } else {
            expression = `${prev} ${operation} ${current}`;
        }

        const historyItem = {
            expression: expression,
            result: this.formatNumber(result),
            timestamp: timestamp,
            id: Date.now()
        };

        this.history.unshift(historyItem);
        this.saveHistory();
    }

    formatNumber(num) {
        if (typeof num !== 'number') return num;
        if (Number.isInteger(num)) return num;
        return parseFloat(num.toFixed(10));
    }

    saveHistory() {
        localStorage.setItem('calculatorHistory', JSON.stringify(this.history));
    }

    loadHistory() {
        const saved = localStorage.getItem('calculatorHistory');
        return saved ? JSON.parse(saved) : [];
    }

    clearHistory() {
        this.history = [];
        this.saveHistory();
    }

    exportHistoryAsCSV() {
        if (this.history.length === 0) {
            alert('No history to export');
            return;
        }

        let csv = 'Expression,Result,Timestamp\n';
        this.history.forEach(item => {
            csv += `"${item.expression}","${item.result}","${item.timestamp}"\n`;
        });

        const blob = new Blob([csv], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `calculator_history_${Date.now()}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    }

    copyResult() {
        const result = this.currentOperand;
        if (result === '' || result === '0') {
            alert('No result to copy');
            return;
        }
        navigator.clipboard.writeText(result).then(() => {
            alert('Result copied to clipboard!');
        }).catch(() => {
            alert('Failed to copy result');
        });
    }
}

// ==================== Currency Converter ====================
class CurrencyConverter {
    constructor() {
        this.exchangeRates = this.loadExchangeRates();
        this.lastUpdateTime = localStorage.getItem('lastExchangeRateUpdate');
    }

    async fetchExchangeRates(baseCurrency) {
        try {
            // Using exchangerate-api.com free tier
            const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
            if (!response.ok) throw new Error('Network error');
            
            const data = await response.json();
            this.exchangeRates = data.rates;
            this.exchangeRates[baseCurrency] = 1;
            localStorage.setItem('exchangeRates', JSON.stringify(this.exchangeRates));
            localStorage.setItem('lastExchangeRateUpdate', new Date().toLocaleString());
            return data.rates;
        } catch (error) {
            console.log('Offline: Using cached rates');
            return this.exchangeRates;
        }
    }

    convert(amount, fromCurrency, toCurrency) {
        if (!this.exchangeRates[fromCurrency] || !this.exchangeRates[toCurrency]) {
            return null;
        }
        const amountInBase = amount / this.exchangeRates[fromCurrency];
        return amountInBase * this.exchangeRates[toCurrency];
    }

    saveExchangeRates() {
        localStorage.setItem('exchangeRates', JSON.stringify(this.exchangeRates));
    }

    loadExchangeRates() {
        const saved = localStorage.getItem('exchangeRates');
        return saved ? JSON.parse(saved) : {};
    }

    isOnline() {
        return navigator.onLine;
    }
}

// ==================== DOM Elements ====================
const previousOperandElement = document.getElementById('previousOperand');
const currentOperandElement = document.getElementById('currentOperand');
const numberButtons = document.querySelectorAll('[data-number]');
const operatorButtons = document.querySelectorAll('[data-operator]');
const functionButtons = document.querySelectorAll('[data-action]');
const historyList = document.getElementById('historyList');
const clearHistoryBtn = document.getElementById('clearHistoryBtn');
const darkModeToggle = document.getElementById('darkModeToggle');
const tabButtons = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const basicModeBtn = document.getElementById('basicModeBtn');
const scientificModeBtn = document.getElementById('scientificModeBtn');
const calculatorGrid = document.getElementById('calculatorGrid');
const scientificGrid = document.getElementById('scientificGrid');
const copyResultBtn = document.getElementById('copyResultBtn');
const exportHistoryBtn = document.getElementById('exportHistoryBtn');
const sciButtons = document.querySelectorAll('[data-action]');

// Currency Converter Elements
const fromCurrency = document.getElementById('fromCurrency');
const toCurrency = document.getElementById('toCurrency');
const fromAmount = document.getElementById('fromAmount');
const toAmount = document.getElementById('toAmount');
const swapCurrencyBtn = document.getElementById('swapCurrencyBtn');
const conversionInfo = document.getElementById('conversionInfo');
const offlineNotice = document.getElementById('offlineNotice');

// ==================== Initialize ====================
const calculator = new Calculator();
const currencyConverter = new CurrencyConverter();

// Load dark mode preference
const isDarkMode = localStorage.getItem('darkMode') === 'true';
if (isDarkMode) {
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
}

updateDisplay();
updateHistoryDisplay();

// ==================== Event Listeners - Calculator ====================
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.dataset.number);
        updateDisplay();
    });
});

operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.dataset.operator);
        updateDisplay();
    });
});

functionButtons.forEach(button => {
    button.addEventListener('click', () => {
        handleFunctionClick(button.dataset.action);
    });
});

// ==================== Function Handler ====================
function handleFunctionClick(action) {
    switch (action) {
        case 'clear':
            calculator.clear();
            break;
        case 'delete':
            calculator.delete();
            break;
        case 'equals':
            calculator.compute();
            break;
        case 'percent':
            calculator.percent();
            break;
        case 'sin':
            calculator.sine();
            break;
        case 'cos':
            calculator.cosine();
            break;
        case 'tan':
            calculator.tangent();
            break;
        case 'sqrt':
            calculator.squareRoot();
            break;
        case 'power':
            calculator.power();
            break;
        case 'power3':
            calculator.power3();
            break;
        case 'log':
            calculator.logarithm();
            break;
        case 'ln':
            calculator.naturalLog();
            break;
        case 'pi':
            calculator.pi();
            break;
        case 'e':
            calculator.e();
            break;
        case 'factorial':
            calculator.factorial();
            break;
        case 'reciprocal':
            calculator.reciprocal();
            break;
    }
    updateDisplay();
    updateHistoryDisplay();
}

// ==================== Display Update ====================
function updateDisplay() {
    currentOperandElement.innerText = calculator.currentOperand || '0';
    previousOperandElement.innerText = calculator.getDisplayValue();
}

function updateHistoryDisplay() {
    if (calculator.history.length === 0) {
        historyList.innerHTML = '<p class="empty-history">No calculations yet</p>';
        return;
    }

    historyList.innerHTML = calculator.history.map(item => `
        <div class="history-item">
            <div class="history-calculation">
                <div class="history-expression">${item.expression}</div>
                <div class="history-result">${item.result}</div>
            </div>
            <div class="history-timestamp">${item.timestamp}</div>
        </div>
    `).join('');
}

// ==================== Event Listeners - History ====================
clearHistoryBtn.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all history?')) {
        calculator.clearHistory();
        updateHistoryDisplay();
    }
});

copyResultBtn.addEventListener('click', () => {
    calculator.copyResult();
});

exportHistoryBtn.addEventListener('click', () => {
    calculator.exportHistoryAsCSV();
});

// ==================== Event Listeners - Dark Mode ====================
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    const isDark = document.body.classList.contains('dark-mode');
    localStorage.setItem('darkMode', isDark);
    darkModeToggle.textContent = isDark ? '☀️' : '🌙';
});

// ==================== Event Listeners - Tabs ====================
tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tabName = button.dataset.tab;
        
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));
        
        button.classList.add('active');
        document.getElementById(tabName).classList.add('active');

        if (tabName === 'currency') {
            initializeCurrencyConverter();
        }
    });
});

// ==================== Event Listeners - Mode Toggle ====================
basicModeBtn.addEventListener('click', () => {
    calculator.isScientificMode = false;
    basicModeBtn.classList.add('active');
    scientificModeBtn.classList.remove('active');
    calculatorGrid.style.display = 'grid';
    scientificGrid.style.display = 'none';
});

scientificModeBtn.addEventListener('click', () => {
    calculator.isScientificMode = true;
    scientificModeBtn.classList.add('active');
    basicModeBtn.classList.remove('active');
    calculatorGrid.style.display = 'none';
    scientificGrid.style.display = 'grid';
});

// ==================== Currency Converter Functions ====================
async function initializeCurrencyConverter() {
    const baseCurrency = fromCurrency.value;
    await currencyConverter.fetchExchangeRates(baseCurrency);
    updateCurrencyDisplay();
}

async function convertCurrency() {
    const amount = parseFloat(fromAmount.value);
    if (isNaN(amount) || amount < 0) {
        toAmount.value = '';
        conversionInfo.textContent = 'Invalid amount';
        return;
    }

    const from = fromCurrency.value;
    const to = toCurrency.value;

    // Fetch rates if online
    if (currencyConverter.isOnline()) {
        await currencyConverter.fetchExchangeRates(from);
        offlineNotice.style.display = 'none';
    } else {
        offlineNotice.style.display = 'block';
    }

    const result = currencyConverter.convert(amount, from, to);
    
    if (result === null) {
        toAmount.value = '';
        conversionInfo.textContent = 'Conversion not available';
    } else {
        toAmount.value = result.toFixed(2);
        const rate = currencyConverter.exchangeRates[to] / currencyConverter.exchangeRates[from];
        conversionInfo.textContent = `1 ${from} = ${rate.toFixed(4)} ${to}`;
    }
}

function updateCurrencyDisplay() {
    convertCurrency();
}

// ==================== Event Listeners - Currency Converter ====================
fromCurrency.addEventListener('change', updateCurrencyDisplay);
toCurrency.addEventListener('change', updateCurrencyDisplay);
fromAmount.addEventListener('input', convertCurrency);

swapCurrencyBtn.addEventListener('click', () => {
    const temp = fromCurrency.value;
    fromCurrency.value = toCurrency.value;
    toCurrency.value = temp;
    
    const tempAmount = fromAmount.value;
    fromAmount.value = toAmount.value;
    toAmount.value = tempAmount;
    
    updateCurrencyDisplay();
});

// ==================== Online/Offline Detection ====================
window.addEventListener('online', () => {
    console.log('Back online');
    if (document.getElementById('currency').classList.contains('active')) {
        offlineNotice.style.display = 'none';
    }
});

window.addEventListener('offline', () => {
    console.log('Gone offline');
    if (document.getElementById('currency').classList.contains('active')) {
        offlineNotice.style.display = 'block';
    }
});

// ==================== Keyboard Support ====================
document.addEventListener('keydown', (e) => {
    if (e.key >= '0' && e.key <= '9') {
        calculator.appendNumber(e.key);
        updateDisplay();
    }
    if (e.key === '.') {
        calculator.appendNumber('.');
        updateDisplay();
    }
    if (e.key === '+' || e.key === '-' || e.key === '*' || e.key === '/') {
        e.preventDefault();
        const op = e.key === '*' ? '×' : e.key === '/' ? '÷' : e.key === '-' ? '−' : '+';
        calculator.chooseOperation(op);
        updateDisplay();
    }
    if (e.key === 'Enter' || e.key === '=') {
        e.preventDefault();
        calculator.compute();
        updateDisplay();
        updateHistoryDisplay();
    }
    if (e.key === 'Backspace') {
        calculator.delete();
        updateDisplay();
    }
    if (e.key === 'Escape') {
        calculator.clear();
        updateDisplay();
    }
});
