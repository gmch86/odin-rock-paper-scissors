(() => {
  // Object to store game data
  const game = {
    scores: {
      player: 0,
      opponent: 0,
    },
    scoreLimit: 5,
    currentRound: {
      value: 1,
      result: null,
    },
    playerChoice: null,
    opponentChoice: null,
    finalResult: null,
  };

  let choiceBtnSelection;

  // Button for resetting game data
  const resetBtn = document.querySelector("button.reset-btn");
  resetBtn.addEventListener("click", handleResetClick);

  // Buttons for setting the player's choice
  const choiceBtns = document.querySelector(".choice-btns");
  choiceBtns.addEventListener("mouseup", handleChoiceClick);

  // Button for playing a round once player has a selected choice
  const battleBtn = document.querySelector("button.battle-btn");
  battleBtn.addEventListener("click", handleBattleClick);

  // Initialize game
  resetGame();
  updateUI();
  console.log(getGameMessage("round"));

  function resetGame() {
    game.scores.player = 0;
    game.scores.opponent = 0;
    game.currentRound.count = 1;
    game.currentRound.result = null;
    game.opponentChoice = null;
    game.playerChoice = null;
    game.finalResult = null;
    choiceBtnSelection = null;
  }

  function setOpponentChoice() {
    // Get random number between 1-3
    const choice = Math.floor(Math.random() * 3) + 1;

    return choice === 1
      ? "rock"
      : choice === 2
        ? "paper"
        : choice === 3
          ? "scissors"
          : null;
  }

  function setPlayerChoice(choice = "") {
    const choiceIsValid = () => {
      if (choice !== "rock" && choice !== "paper" && choice !== "scissors") {
        console.error(
          `Invalid choice: "${choice}". Must be rock, paper, or scissors.`,
        );
        return false;
      } else return true;
    };

    choice = choice.toLowerCase();
    return choiceIsValid() ? choice : null;
  }

  function isGameOver() {
    const playerScore = game.scores.player;
    const opponentScore = game.scores.opponent;

    // Declare game winner
    if (playerScore === game.scoreLimit) {
      game.finalResult = "win";
    } else if (opponentScore === game.scoreLimit) {
      game.finalResult = "loss";
    } else {
      return false;
    }

    return true;
  }

  function playRound(playerChoice, opponentChoice, scores) {
    const rules = {
      rock: { winsAgainst: "scissors", losesAgainst: "paper" },
      paper: { winsAgainst: "rock", losesAgainst: "scissors" },
      scissors: { winsAgainst: "paper", losesAgainst: "rock" },
    };

    let result;

    // Determine winner
    if (playerChoice === opponentChoice) {
      result = "tie";
    } else if (rules[playerChoice].winsAgainst === opponentChoice) {
      result = "win";
      scores.player++;
    } else if (rules[playerChoice].losesAgainst === opponentChoice) {
      result = "loss";
      scores.opponent++;
    }

    return result;
  }

  function handleResetClick(e) {
    resetGame();
    console.log(getGameMessage("reset"));
    updateUI();
  }

  function handleChoiceClick(e) {
    if (game.finalResult) return;

    if (game.playerChoice !== e.target.dataset.value) {
      game.playerChoice = setPlayerChoice(e.target.dataset.value);
      console.log(getGameMessage("choice"));
    } else {
      game.playerChoice = null;
    }

    choiceBtnSelection = game.playerChoice;
    updateUI();
  }

  function handleBattleClick(e) {
    if (game.finalResult) return;

    if (game.playerChoice) {
      game.opponentChoice = setOpponentChoice();

      game.currentRound.result = playRound(
        game.playerChoice,
        game.opponentChoice,
        game.scores,
      );

      console.log(getGameMessage("roundResult"));

      // Check for winner
      if (isGameOver()) {
        console.log(getGameMessage("gameOver"));
        console.log(getGameMessage("gameResult"));
      } else {
        game.currentRound.count++;
        console.log(getGameMessage("round"));
      }

      choiceBtnSelection = null; // To deselect choice button after each round
      updateUI();

      // Unset choices AFTER updating the UI, to keep game info of previous round displayed
      game.playerChoice = null;
      game.opponentChoice = null;
    } else if (!game.playerChoice) {
      console.error("No choice selected!");
    } else if (game.finalResult) {
      console.error("Game has ended! Start a new game.");
    }
  }

  function updateUI() {
    const roundCountElement = document.querySelector(".round-count");
    const playerScoreElement = document.querySelector(".player-score-value");
    const opponentScoreElement = document.querySelector(
      ".opponent-score-value",
    );
    const playerChoiceContainer = document.querySelector(
      ".player-choice-container",
    );
    const opponentChoiceContainer = document.querySelector(
      ".opponent-choice-container",
    );
    const roundResultInfoBox = document.querySelector(".round-result.info-box");
    const gameResultInfoBox = document.querySelector(".game-result.info-box");

    const toggleSelectedChoice = () => {
      [...choiceBtns.children].forEach((e) => {
        if (String(choiceBtnSelection) === e.dataset.value) {
          e.classList.add("selected");
        } else {
          e.classList.remove("selected");
        }
      });
    };

    const displaySelectedChoice = (container, choice) => {
      [...container.children].forEach((e) => {
        if (choice === e.dataset.value) {
          e.style.display = "block";
        } else {
          e.style.display = "none";
        }
      });
    };

    const displayInfoBox = () => {
      const roundResultTitleElement = roundResultInfoBox.querySelector(
        ".round-result-title",
      );
      const roundResultDescElement =
        roundResultInfoBox.querySelector(".round-result-desc");
      const gameResultDescElement =
        gameResultInfoBox.querySelector(".game-result-desc");

      if (!game.finalResult) {
        gameResultInfoBox.style.visibility = "hidden";
      } else {
        gameResultInfoBox.style.visibility = "visible";
        gameResultDescElement.textContent = getGameMessage("gameResult");
      }

      if (
        game.currentRound.count <= 1 ||
        !game.playerChoice ||
        !game.opponentChoice
      ) {
        roundResultInfoBox.style.visibility = "hidden";
      } else {
        roundResultInfoBox.style.visibility = "visible";
        roundResultTitleElement.textContent = `${game.currentRound.result.toUpperCase()}`;
        roundResultDescElement.textContent = getGameMessage("roundResult");
      }
    };

    roundCountElement.textContent = `${game.currentRound.count}`;
    playerScoreElement.textContent = `${game.scores.player}`;
    opponentScoreElement.textContent = `${game.scores.opponent}`;
    toggleSelectedChoice();
    displaySelectedChoice(playerChoiceContainer, String(game.playerChoice));
    displaySelectedChoice(opponentChoiceContainer, String(game.opponentChoice));
    displayInfoBox();
  }

  // Retrieves textual information about game progress
  function getGameMessage(type) {
    function capitalizeFirstLetter(string) {
      if (string) return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const playerChoice = capitalizeFirstLetter(game.playerChoice);
    const opponentChoice = capitalizeFirstLetter(game.opponentChoice);

    const roundMessages = {
      tie: `${playerChoice} ties against ${opponentChoice}`,
      win: `${playerChoice} wins against ${opponentChoice}`,
      loss: `${playerChoice} loses against ${opponentChoice}`,
    };

    const gameOverMessages = {
      tie: "It was a tie!",
      win: "You are the winner!",
      loss: "You are the loser!",
    };

    const messages = {
      round: `Round ${game.currentRound.count}`,
      roundResult: roundMessages[game.currentRound.result] || null,
      gameResult: gameOverMessages[game.finalResult],
      choice: `You have selected: ${playerChoice}`,
      reset: "Game reset",
      gameOver: "GAME OVER",
    };

    return messages[type];
  }
})();
