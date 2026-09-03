(() => {
  const enabledUIContainer = document.querySelector(".enabled-ui-container");
  const uiCheckbox = document.querySelector("#ui");
  const playBtn = document.querySelector("button.play-btn");
  const resetBtn = document.querySelector("button.reset-btn");
  const choiceBtns = document.querySelector(".choice-btns");
  const battleBtn = document.querySelector("button.battle-btn");
  const roundDisplay = document.querySelector(".round-display");
  const humanScoreDisplay = document.querySelector(".human-score");
  const computerScoreDisplay = document.querySelector(".computer-score");

  // Object to store game data
  const game = {
    humanScore: 0,
    computerScore: 0,
    numberOfRounds: 5,
    currentRound: 1,
    humanChoice: null,
    result: null,
  };

  resetGame();
  updateUI();

  uiCheckbox.addEventListener("change", (e) => {
    resetGame();
    updateUI();
  });

  playBtn.addEventListener("click", (e) => {
    if (game.currentRound !== 1) {
      resetGame();
    }

    while (!game.result) {
      const humanChoice = getHumanChoice();

      if (!humanChoice) {
        resetGame();
        return;
      } else {
        playRound(humanChoice, getComputerChoice());
      }
    }
  });

  resetBtn.addEventListener("click", (e) => {
    resetGame();
    updateUI();
  });

  choiceBtns.addEventListener("click", (e) => {
    game.humanChoice = getHumanChoice(e.target.value);
    console.log(`You have selected: ${game.humanChoice}`);

    updateUI();
  });

  battleBtn.addEventListener("click", (e) => {
    if (game.humanChoice) {
      playRound(game.humanChoice, getComputerChoice());
    } else {
      console.error("No choice selected!");
    }

    updateUI();
  });

  function resetGame() {
    game.humanScore = 0;
    game.computerScore = 0;
    game.currentRound = 1;
    game.humanChoice = null;
    game.result = null;

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

    // Prompt user for choice until valid or cancelled
    if (!choice) {
      while (true) {
        choice = window.prompt(`Choose "rock", "paper" or "scissors"!`);

        // Return null if user cancels prompt so game can be exited
        if (choice === null) {
          console.error("Prompt cancelled by user.");
          return null;
        }

        choice = choice.toLowerCase();

        // Return choice if valid, else re-prompt
        if (choiceIsValid()) {
          return choice;
        }
      }
    } else {
      choice = choice.toLowerCase();

      // If UI is enabled, return choice if valid, else return null
      if (choiceIsValid()) {
        return choice;
      } else {
        return null;
      }
    }
  }

  function playRound(humanChoice, computerChoice) {
    // Determine if a game has been initiated or finished
    if (!game.currentRound || game.result) {
      return console.error("No game in progress.");
    }

    const capitalizeFirstLetter = (string) => {
      return string.charAt(0).toUpperCase() + string.slice(1);
    };

    const isGameOver = () => {
      let msg;

      // Declare game winner
      if (game.currentRound === game.numberOfRounds) {
        if (game.humanScore === game.computerScore) {
          msg = "Game over. It was a draw!";
          game.result = "tie";
        } else if (game.humanScore > game.computerScore) {
          msg = "Game over. You are the winner!";
          game.result = "win";
        } else {
          msg = "Game over. You are the loser!";
          game.result = "loss";
        }

        console.log(msg);
        alert(msg);

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

    // Determine winner and increase scores
    if (humanChoice === computerChoice) {
      msg = "It's a draw!";
    } else if (rules[humanChoice].winsAgainst === computerChoice) {
      msg = `You have won this round! ${capitalizeFirstLetter(humanChoice)} beats ${capitalizeFirstLetter(computerChoice)}.`;
      game.humanScore++;
    } else if (rules[humanChoice].losesAgainst === computerChoice) {
      msg = `You have lost this round! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(humanChoice)}.`;
      game.computerScore++;
    }

    console.log(msg);
    alert(msg);

    if (!isGameOver()) {
      game.currentRound++;
      console.log(`Round: ${game.currentRound}`);
    }
  }

  function updateUI() {
    const toggleSelectedChoice = () => {
      [...choiceBtns.children].forEach((e) => {
        e.classList.remove("selected");
        if (game?.humanChoice === e.value) {
          e.classList.add("selected");
        }
      });
    };

    let uiEnabled = uiCheckbox.checked;

    if (uiEnabled) {
      enabledUIContainer.style.display = "";
      playBtn.style.display = "none";
      roundDisplay.textContent = `Round ${game.currentRound}`;
      humanScoreDisplay.textContent = `Human Score: ${game.humanScore}`;
      computerScoreDisplay.textContent = `Computer Score: ${game.computerScore}`;
      toggleSelectedChoice();
    } else {
      enabledUIContainer.style.display = "none";
      playBtn.style.display = "";
    }
  }
})();
