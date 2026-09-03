(() => {
  const resetBtn = document.querySelector("button.reset-btn");
  const choiceBtns = document.querySelector(".choice-btns");
  const battleBtn = document.querySelector("button.battle-btn");
  const roundNumberDisplay = document.querySelector(".round-number");
  const humanScoreNumberDisplay = document.querySelector(".human-score-number");
  const computerScoreNumberDisplay = document.querySelector(
    ".computer-score-number",
  );
  const humanChoiceContainer = document.querySelector(
    ".human-choice-container",
  );
  const computerChoiceContainer = document.querySelector(
    ".computer-choice-container",
  );

  // Object to store game data
  const game = {
    humanScore: 0,
    computerScore: 0,
    numberOfRounds: 5,
    currentRound: 1,
    humanChoice: null,
    computerChoice: null,
    finalResult: null,
  };

  // Initialize
  resetGame();
  updateUI();
  updateResultInfoBox();

  resetBtn.addEventListener("click", (e) => {
    resetGame();
    updateUI();
    updateResultInfoBox();
  });

  choiceBtns.addEventListener("click", (e) => {
    if (game.finalResult) return;

    if (e.target.dataset.value) {
      game.humanChoice = getHumanChoice(e.target.dataset.value);
      console.log(`You have selected: ${game.humanChoice}`);
    }

    updateUI();
  });

  battleBtn.addEventListener("click", (e) => {
    let roundResult;

    if (game.humanChoice && game.finalResult === null) {
      game.computerChoice = getComputerChoice();
      roundResult = playRound(game.humanChoice, game.computerChoice, true);
      updateResultInfoBox(roundResult);
    } else {
      if (!game.humanChoice) {
        console.error("No choice selected!");
      } else {
        console.error("Game has ended! Start a new game.");
      }
    }

    updateUI();
  });

  function resetGame() {
    game.humanScore = 0;
    game.computerScore = 0;
    game.currentRound = 1;
    game.humanChoice = null;
    game.computerChoice = null;
    game.finalResult = null;

    console.log("Game reset.");
    console.log(`Round ${game.currentRound}`);
  }

  function getComputerChoice() {
    // Get random number between 1-3
    const choice = Math.floor(Math.random() * 3) + 1;

    switch (choice) {
      case 1:
        return "rock";
      case 2:
        return "paper";
      case 3:
        return "scissors";
    }
  }

  function getHumanChoice(choice = "") {
    const choiceIsValid = () => {
      if (choice !== "rock" && choice !== "paper" && choice !== "scissors") {
        console.error(
          `Invalid choice: "${choice}". Must be rock, paper, or scissors.`,
        );

        return false;
      }

      return true;
    };

    choice = choice.toLowerCase();

    // Return choice if valid, else return null
    if (choiceIsValid()) {
      return choice;
    } else {
      return null;
    }
  }

  function playRound(humanChoice, computerChoice) {
    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const isGameOver = () => {
      let msg;

      // Declare game winner
      if (game.currentRound === game.numberOfRounds) {
        if (game.humanScore === game.computerScore) {
          msg = "Game over. It was a draw!";
          game.finalResult = "tie";
        } else if (game.humanScore > game.computerScore) {
          msg = "Game over. You are the winner!";
          game.finalResult = "win";
        } else {
          msg = "Game over. You are the loser!";
          game.finalResult = "loss";
        }

        console.log(msg);
        return true;
      }

      return false;
    };

    const rules = {
      rock: { winsAgainst: "scissors", losesAgainst: "paper" },
      paper: { winsAgainst: "rock", losesAgainst: "scissors" },
      scissors: { winsAgainst: "paper", losesAgainst: "rock" },
    };

    let msg;
    let roundResult;

    // Determine if a game has been initiated or finished
    if (!game.currentRound || game.finalResult) {
      return console.error("No game in progress.");
    }

    // Determine winner and increase scores
    if (humanChoice === computerChoice) {
      msg = "It's a draw!";
      roundResult = "tie";
    } else if (rules[humanChoice].winsAgainst === computerChoice) {
      msg = `You have won this round! ${capitalizeFirstLetter(humanChoice)} beats ${capitalizeFirstLetter(computerChoice)}.`;
      roundResult = "win";
      game.humanScore++;
    } else if (rules[humanChoice].losesAgainst === computerChoice) {
      msg = `You have lost this round! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(humanChoice)}.`;
      roundResult = "loss";
      game.computerScore++;
    }

    console.log(msg);

    if (!isGameOver()) {
      game.currentRound++;
      console.log(`Round: ${game.currentRound}`);
    }

    return roundResult;
  }

  function updateUI() {
    const toggleSelectedChoice = () => {
      [...choiceBtns.children].forEach((e) => {
        if (game.humanChoice === e.dataset.value) {
          e.classList.add("selected");
        } else {
          e.classList.remove("selected");
        }
      });

      [...humanChoiceContainer.children].forEach((e) => {
        if (String(game.humanChoice) === e.dataset.value) {
          e.style.display = "block";
        } else {
          e.style.display = "none";
        }
      });

      [...computerChoiceContainer.children].forEach((e) => {
        if (String(game.computerChoice) === e.dataset.value) {
          e.style.display = "block";
        } else {
          e.style.display = "none";
        }
      });
    };

    roundNumberDisplay.textContent = `${game.currentRound}`;
    humanScoreNumberDisplay.textContent = `${game.humanScore}`;
    computerScoreNumberDisplay.textContent = `${game.computerScore}`;
    toggleSelectedChoice();
  }

  function updateResultInfoBox(result) {
    const roundResultInfoBox = document.querySelector(".round-result-info-box");
    const roundResultElement = document.querySelector(
      ".round-result-info-box .round-result",
    );
    const roundResultDesc = document.querySelector(
      ".round-result-info-box .round-result-desc",
    );
    const finalResultInfoBox = document.querySelector(".final-result-info-box");
    const finalResultDesc = document.querySelector(
      ".final-result-info-box .final-result-desc",
    );

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    if (game.finalResult) {
      finalResultInfoBox.style.visibility = "visible";

      switch (game.finalResult) {
        case "tie":
          finalResultDesc.textContent = "It was a tie!";
          break;
        case "win":
          finalResultDesc.textContent = "You are the winner!";
          break;
        case "loss":
          finalResultDesc.textContent = "You are the loser!";
          break;
      }
    } else {
      finalResultInfoBox.style.visibility = "hidden";
    }

    if (result) {
      roundResultInfoBox.style.visibility = "visible";
    } else {
      roundResultInfoBox.style.visibility = "hidden";
      return;
    }

    const humanChoice = capitalizeFirstLetter(game.humanChoice);
    const computerChoice = capitalizeFirstLetter(game.computerChoice);

    switch (result) {
      case "tie":
        roundResultElement.textContent = "TIE!";
        roundResultDesc.textContent = `${humanChoice} ties against ${computerChoice}`;
        break;
      case "win":
        roundResultElement.textContent = "WIN!";
        roundResultDesc.textContent = `${humanChoice} wins against ${computerChoice}`;
        break;
      case "loss":
        roundResultElement.textContent = "LOSS!";
        roundResultDesc.textContent = `${humanChoice} loses against ${computerChoice}`;
        break;
    }
  }
})();
