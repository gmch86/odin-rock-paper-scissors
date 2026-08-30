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
  const choice = window.prompt().toLowerCase();

  // Validate choice
  if (choice !== "rock" && choice !== "paper" && choice !== "scissors") {
    throw new Error(`Choice must be "rock", "paper" or "scissors"`, {
      cause: `Invalid choice: "${choice}"`,
    });
  } else {
    return choice;
  }
}

function playRound(humanChoice, computerChoice) {
  let msg;

  // Determine winner and increase scores
  if (humanChoice === computerChoice) {
    msg = "It's a draw!";
  } else if (
    (computerChoice == "rock" && humanChoice == "paper") ||
    (computerChoice == "paper" && humanChoice == "scissors") ||
    (computerChoice == "scissors" && humanChoice == "rock")
  ) {
    msg = `You have won this round! ${humanChoice} beats ${computerChoice}.`;
    humanScore++;
  } else {
    msg = `You have lost this round! ${computerChoice} beats ${humanChoice}.`;
    computerScore++;
  }

  console.log(msg);
}

function playGame() {
  const numberOfRounds = 5;
  let round = 1;

  while (round <= numberOfRounds) {
    console.log(`Round ${round}`);
    playRound(getHumanChoice(), getComputerChoice());
    round++;
  }

  // Declare game winner
  if (humanScore === computerScore) {
    console.log("Game over. It was a draw!");
  } else if (humanScore > computerScore) {
    console.log("Game over. You are the winner!");
  } else {
    console.log("Game over. You are the loser!");
  }
}
