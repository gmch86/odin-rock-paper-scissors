main();

function main() {
  const uiCheckbox = document.querySelector("#ui");
  const playBtn = document.querySelector("button.play-btn");
  const endBtn = document.querySelector("button.end-btn");
  const rockBtn = document.querySelector("button.rock-btn");
  const paperBtn = document.querySelector("button.paper-btn");
  const scissorsBtn = document.querySelector("button.scissors-btn");

  // Object to store game data
  const game = {
    humanScore: 1,
    computerScore: 1,
    numberOfRounds: 5,
    currentRound: null,
    result: null,
  };

  let uiEnabled = uiCheckbox.checked;

  uiCheckbox.addEventListener("change", (e) => {
    resetGame();
    uiEnabled = e.target.checked;
  });

  playBtn.addEventListener("click", (e) => {
    resetGame();
    game.currentRound = 1;
    console.log(`Round ${game.currentRound}`);

    if (!uiEnabled) {
      while (!game.result) {
        const humanChoice = getHumanChoice();

        if (!humanChoice) {
          resetGame();
          return;
        } else {
          playRound(humanChoice, getComputerChoice());
        }
      }
    }
  });

  endBtn.addEventListener("click", (e) => {
    resetGame();
  });

  rockBtn.addEventListener("click", (e) => {
    if (uiEnabled) playRound(getHumanChoice("rock"), getComputerChoice());
  });

  paperBtn.addEventListener("click", (e) => {
    if (uiEnabled) playRound(getHumanChoice("paper"), getComputerChoice());
  });

  scissorsBtn.addEventListener("click", (e) => {
    if (uiEnabled) playRound(getHumanChoice("scissors"), getComputerChoice());
  });

  function resetGame() {
    if (game.currentRound) {
      console.log("Game has ended.");
    }

    game.humanScore = 1;
    game.computerScore = 1;
    game.currentRound = null;
    game.result = null;
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

    // If UI is disabled, keep prompting until valid or cancelled
    if (!uiEnabled) {
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
}
