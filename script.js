let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  // Random number between 1-3
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

function getHumanChoice() {
  // Prompts user for a choice and convert to all lowercase
  let choice = window.prompt(`Choose "rock", "paper" or "scissors"!`);

  if (choice) {
    choice = choice.toLowerCase();
  }

  // Validate choice
  if (choice !== "rock" && choice !== "paper" && choice !== "scissors") {
    const error = new Error(`Choice must be "rock", "paper" or "scissors"`, {
      cause: `Invalid choice. Received: "${choice}`,
    });

    error.value = choice;
    throw error;
  } else {
    return choice;
  }
}

function playRound(humanChoice, computerChoice) {
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const rules = {
    rock: { winsAgainst: "scissors", losesAgainst: "paper" },
    paper: { winsAgainst: "rock", losesAgainst: "scissors" },
    scissors: { winsAgainst: "paper", losesAgainst: "rock" },
  };

  // Determine winner and increase scores
  let msg;

  if (humanChoice === computerChoice) {
    msg = "It's a draw!";
  } else if (rules[humanChoice].winsAgainst === computerChoice) {
    msg = `You have won this round! ${capitalizeFirstLetter(humanChoice)} beats ${capitalizeFirstLetter(computerChoice)}.`;
    humanScore++;
  } else if (rules[humanChoice].losesAgainst === computerChoice) {
    msg = `You have lost this round! ${capitalizeFirstLetter(computerChoice)} beats ${capitalizeFirstLetter(humanChoice)}.`;
    computerScore++;
  }

  console.log(msg);
  alert(msg);
}

function playGame() {
  const numberOfRounds = 5;
  let round = 1;
  let msg;

  while (round <= numberOfRounds) {
    try {
      console.log(`Round ${round}`);
      playRound(getHumanChoice(), getComputerChoice());
      round++;
    } catch (err) {
      // Exit game if prompt window is closed
      if (err.value === null) {
        return console.log("Game ended.");
      }

      console.log(err);
    }
  }

  // Declare game winner
  if (humanScore === computerScore) {
    msg = "Game over. It was a draw!";
  } else if (humanScore > computerScore) {
    msg = "Game over. You are the winner!";
  } else {
    msg = "Game over. You are the loser!";
  }

  console.log(msg);
  alert(msg);
}
