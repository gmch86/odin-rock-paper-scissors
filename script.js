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
  // prompts user for a choice between "rock", "paper" or "scissors"
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
