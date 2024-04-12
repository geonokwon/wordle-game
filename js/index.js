const result = "APPLE";

let attempts = 0;
let index = 0;
let timer;

function appStart() {
    const displayGameOver = () => {
        const div = document.createElement("div");
        div.innerText = "게임이 종료 되었습니다.";
        div.style =
            "display:flex; justify-content:center; align-items:center; position:absolute; top:40vh; left:40vw; background-color: white; width:200px; height:100px;";
        document.body.appendChild(div);
    };
    const nextLine = () => {
        if (attempts === 5) return gameOver();
        attempts += 1;
        index = 0;
    };
    const gameOver = () => {
        window.removeEventListener("keydown", handleKeyDown);
        displayGameOver();
        clearInterval(timer, 1000);
    };
    const handleEventKey = () => {
        //정답확인
        let resultCount = 0;

        for (let i = 0; i < 5; i++) {
            const block = document.querySelector(`.board-block[data-index='${attempts}${i}']`);
            const keyboardBlock = document.querySelector(`.keyboard-block[data-key='${block.innerText}']`);
            const inputText = block.innerText;
            const resultText = result[i];
            if (resultText === inputText) {
                resultCount += 1;
                block.style.background = "#6AAA64";
                keyboardBlock.style.backgroundColor = "#6AAA64";
            } else if (result.includes(inputText)) {
                block.style.background = "#C9B458";
                keyboardBlock.style.backgroundColor = "#C9B458";
            } else {
                block.style.background = "#787C7E";
                keyboardBlock.style.backgroundColor = "#787C7E";
            }

            block.style.color = "white";
        }
        if (resultCount === 5) gameOver();
        else nextLine();
    };
    const handleBackSpace = () => {
        if (index > 0) {
            const preBlock = document.querySelector(`.board-block[data-index='${attempts}${index - 1}']`);
            preBlock.innerText = "";
        }
        if (index !== 0) index -= 1;
    };

    //로직들
    const handleKeyDown = (event) => {
        const key = event.key.toUpperCase();
        const keyCode = event.keyCode;
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);
        if (event.key === "Backspace") handleBackSpace();
        else if (index === 5) {
            if (event.key === "Enter") handleEventKey();
            else return;
        } else if (keyCode >= 65 && keyCode <= 90) {
            thisBlock.innerText = key;
            index += 1;
        }
    };
    startTimer = () => {
        const 시작_시간 = new Date();
        function setTimer() {
            const 현재_시간 = new Date();
            const 흐른_시간 = new Date(현재_시간 - 시작_시간);
            const 분 = 흐른_시간.getMinutes().toString().padStart(2, "0");
            const 초 = 흐른_시간.getSeconds().toString().padStart(2, "0");
            const time = document.querySelector(".time");
            time.innerText = `TIME: ${분}:${초}`;
        }
        timer = setInterval(setTimer, 1000);
    };
    const handleclickDown = (event) => {
        const text = event;
        const thisBlock = document.querySelector(`.board-block[data-index='${attempts}${index}']`);
        if (text === "Backspace") handleBackSpace();
        else if (index === 5) {
            if (text === "Enter") handleEventKey();
            else return;
        } else if (text.length <= 1) {
            thisBlock.innerText = text;
            index += 1;
        }
    };
    startTimer();
    window.addEventListener("click", function (event) {
        if (event.target.classList.contains("keyboard-block")) {
            handleclickDown(event.target.dataset.key);
        } else if (event.target.classList.contains("keyboard-block__big")) {
            handleclickDown(event.target.dataset.key);
        } else if (event.target.classList.contains("keyboard-block__img")) {
            handleclickDown(event.target.parentElement.dataset.key);
        }
    });
    window.addEventListener("keydown", handleKeyDown);
}

appStart();
