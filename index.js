
const computerScoreDisplay = document.getElementById("com-score");
const playerScoreDisplay = document.getElementById("player-score");
const choiceButtons = document.querySelectorAll(".player-choice-section button");
const computerImage = document.getElementById("com-image");
const playerImage = document.getElementById("player-image");
const result = document.querySelector(".result p");
const endGameContainer = document.getElementsByClassName("end-game")[0]
const winnerDisplay = document.querySelector(".end-game .winner");
const replayButton = document.getElementById("replay-button");
let computerScore = 0;
let playerScore = 0;
let round = 0;


choiceButtons.forEach((btn) =>
    btn.addEventListener("click", clickHandler)
);

function clickHandler(event) {
    const value = event.target.value;
    const playerChoice = value.charAt(0).toUpperCase() + value.slice(1);
    playerImage.setAttribute("src", `./assets//${value}.png`);

    const { choice, src } = generateRandomChoice();
    computerImage.setAttribute("src", src);

    if (
        (choice === "paper" && value === "scissor") ||
        (choice === "rock" && value === "paper") ||
        (choice === "scissor" && value === "rock")
    ) {
        playerScore++;
        result.innerHTML = "YOU WON";
    } else if (choice === value) {
        result.innerHTML = "DRAW";
    } else {
        computerScore++;
        result.innerHTML = "YOU LOST";
    }

    playerScoreDisplay.innerHTML = playerScore;
    computerScoreDisplay.innerHTML = computerScore;
    round++;
    if (playerScore >= 5 || computerScore >= 5) {
        // endGameContainer.style.opacity = "1";
        endGameContainer.style.display = 'block'
        console.log(endGameContainer);
        console.log('inside');
        if (playerScore > computerScore) {
            winnerDisplay.innerHTML = "Player";
        } else {
            winnerDisplay.innerHTML = "Computer";
        }
        choiceButtons.forEach((btn) => (btn.disabled = true));
    }
}

replayButton.addEventListener("click", replayGame);

function replayGame() {
    endGameContainer.style.display = 'none'
    computerScore = 0;
    playerScore = 0;
    round = 0;
    playerScoreDisplay.innerHTML = playerScore;
    computerScoreDisplay.innerHTML = computerScore;
    playerImage.setAttribute("src", "");
    comImage.setAttribute("src", "");
    result.innerHTML = "";
    endGameContainer.style.display = "none";
    choiceButtons.forEach((btn) => (btn.disabled = false));
}

function generateRandomChoice() {
    const choices = ["rock", "paper", "scissor"];
    const randomIndex = Math.floor(Math.random() * choices.length);
    const choice = choices[randomIndex];
    console.log(choice);
    const src = `./assets//${choice}.png`;
    return { choice, src };
}