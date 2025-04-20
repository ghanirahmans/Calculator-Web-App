let runningTotal = 0;
let buffer = "0";
let previousOperation;

let screen = document.querySelector(".screen");

document.addEventListener("keydown", (event) => {
	let key = event.key;

	if (!isNaN(key)) {
		buttonClick(key);
	} else if (key == "Backspace") {
		buttonClick("←");
	} else if (key == "Enter") {
		buttonClick("=");
	} else if (key == "c") {
		buttonClick("C");
	} else if (key == "+" || key == "-" || key == "*" || key == "/") {
		let symbol;
		switch (key) {
			case "+":
				symbol = "+";
				break;
			case "-":
				symbol = "−";
				break;
			case "*":
				symbol = "×";
				break;
			case "/":
				symbol = "÷";
				break;
		}
		buttonClick(symbol);
	}
});

function buttonClick(value) {
	if (isNaN(value)) {
		handleSymbol(value);
	} else {
		handleNumber(value);
	}
	screen.innerText = buffer;
}

function handleSymbol(symbol) {
	switch (symbol) {
		case "C":
			buffer = "0";
			runningTotal = 0;
			break;
		case "=":
			if (previousOperation === null) {
				return;
			}
			flushOperation(parseInt(buffer));
			previousOperation = null;
			buffer = runningTotal;
			runningTotal = 0;
			break;
		case "←":
			if (buffer.length === 1) {
				buffer = 0;
			} else {
				buffer = buffer.substring(0, buffer.length - 1);
			}
			break;
		case "+":
		case "−":
		case "×":
		case "÷":
			handleMath(symbol);
			break;
	}
}

function handleMath(symbol) {
	if (buffer === "0") {
		return;
	}
	const intBuffer = parseInt(buffer);

	if (runningTotal === 0) {
		runningTotal = intBuffer;
	} else {
		flushOperation(intBuffer);
	}
	previousOperation = symbol;
	buffer = "0";
}
function flushOperation(intBuffer) {
	if (previousOperation === "+") {
		runningTotal += intBuffer;
	} else if (previousOperation === "−") {
		runningTotal -= intBuffer;
	} else if (previousOperation === "×") {
		runningTotal *= intBuffer;
	} else if (previousOperation === "÷") {
		runningTotal /= intBuffer;
	}
}

function handleNumber(numberString) {
	if (buffer === "0") {
		buffer = numberString;
	} else {
		buffer += numberString;
	}
}

function init() {
	document
		.querySelector(".calc-buttons")
		.addEventListener("click", function (event) {
			buttonClick(event.target.innerText);
		});
}

init();
