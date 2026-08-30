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
  // make humanChoice case-insensitive
  // increments score of round winner
  // logs round winner to console
}

function playGame() {
  // keeps track of scores
  // calls playRound 5 times before declaring winner
}
