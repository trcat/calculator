let total = 0;
let content = "";
let output = total.toString();
let stateMap = {
    INPUT: 0,
    PULS: 1,
    SUBSCRIBE: 2,
    MULTIPLY: 3,
    DIVIDE: 4
};
let state = stateMap.INPUT;
const screen = document.getElementsByClassName("content")[0];

function updateScreen(value) {
    output = value.toString();
    screen.value = output;
}

function createButton(value, clickEvent) {
    const result = document.createElement("button");
    result.innerHTML = value.toString();
    result.addEventListener("click", (e) => {
        e.stopPropagation();
        clickEvent();
    });

    return result;
}

function createConfigButtons() {
    const parent = document.getElementsByClassName("config")[0];
    
    parent.appendChild(createButton("AC", () => {
        total = 0;
        content = "";
        updateScreen(total);
    }));
    parent.appendChild(createButton("+/-", () => {
        content = output.toString();
        if (parseFloat(content)) {
            if (content >= 0) {
                content = "-" + content;
                updateScreen(content);
            } else {
                content = Math.abs(parseFloat(content)).toString();
                updateScreen(content);
            }
        }
    }));
    parent.appendChild(createButton("%", () => {
        content = output.toString();
        let _content = parseFloat(content);
        if (_content) {
            _content = _content / 100;
            content = _content.toString();
            updateScreen(_content);
        }
    }));
}

function createSymbolButtons() {
    const parent = document.getElementsByClassName("symbol")[0];
    const changeTotalAndContent = () => {
        const _content = content ? parseFloat(content) : 0;
        const symbol = state;

        switch (symbol) {
            case stateMap.PULS: 
                total = total + _content;
                break;
            case stateMap.SUBSCRIBE: 
                total = total - _content;
                break;
            case stateMap.MULTIPLY:
                total = total * _content;
                break;
            case stateMap.DIVIDE:
                total = total / _content;
                break;
            default: 
                total = _content;
                break;
        }
        
        content = "";
    };
    parent.appendChild(createButton("+", () => {
        changeTotalAndContent();
        state = stateMap.PULS;
    }));
    parent.appendChild(createButton("-", () => {
        changeTotalAndContent();
        state = stateMap.SUBSCRIBE;

    }));
    parent.appendChild(createButton("x", () => {
        changeTotalAndContent();
        state = stateMap.MULTIPLY;
    }));
    parent.appendChild(createButton("/", () => {
        changeTotalAndContent();
        state = stateMap.DIVIDE;
    }));
    parent.appendChild(createButton("=", () => {
        changeTotalAndContent();
        updateScreen(total);
        total = 0;
        content = "";
        state = stateMap.INPUT;
    }));
}

function createFigureButtons() {
    const parent = document.getElementsByClassName("figure")[0];
    const event = (value) => {
        content += value.toString();
        updateScreen(content);
    };
    
    for (let i = 0; i < 10; i++) {
        const value = i + 1 < 10 ? i + 1 : 0;
        const clickEvent = () => event(value);
        parent.appendChild(createButton(value, clickEvent));
    }

    parent.appendChild(createButton(".", () => event(".")));
}

createConfigButtons();
createFigureButtons();
createSymbolButtons();
updateScreen(0);