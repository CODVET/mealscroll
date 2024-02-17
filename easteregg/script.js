const gameContainer = document.getElementById("game-container");
const player = document.getElementById("player");
const obstacles = [];
const obstacleInterval = 150;
const playerSpeed = 20;

function createObstacle() {
  const obstacle = document.createElement("div");
  obstacle.className = "obstacle";
  obstacle.style.top = `${Math.random() * (gameContainer.clientHeight - 20)}px`;
  obstacle.style.left = `${gameContainer.clientWidth}px`;
  gameContainer.appendChild(obstacle);
  obstacles.push(obstacle);
}

function updateObstacles() {
  for (let i = obstacles.length - 1; i >= 0; i--) {
    const obstacle = obstacles[i];
    const obstacleLeft = parseInt(obstacle.style.left);
    obstacle.style.left = `${obstacleLeft - 5}px`;

    if (
      obstacleLeft < player.offsetLeft + player.offsetWidth &&
      obstacleLeft + 20 > player.offsetLeft &&
      parseInt(obstacle.style.top) < player.offsetTop + player.offsetHeight &&
      parseInt(obstacle.style.top) + 20 > player.offsetTop
    ) {
      alert("Game Over!");
      resetGame();
    }

    if (obstacleLeft < 0) {
      obstacles.splice(i, 1);
      gameContainer.removeChild(obstacle);
    }
  }
}

function resetGame() {
  player.style.top = `${gameContainer.clientHeight / 2}px`;
  player.style.left = `${gameContainer.clientWidth / 2}px`;
  obstacles.forEach((obstacle) => gameContainer.removeChild(obstacle));
  obstacles.length = 0;
}

document.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "w":
      player.style.top = `${Math.max(player.offsetTop - playerSpeed, 0)}px`;
      break;
    case "s":
      player.style.top = `${Math.min(
        player.offsetTop + playerSpeed,
        gameContainer.clientHeight - player.offsetHeight
      )}px`;
      break;
    case "a":
      player.style.left = `${Math.max(player.offsetLeft - playerSpeed, 0)}px`;
      break;
    case "d":
      player.style.left = `${Math.min(
        player.offsetLeft + playerSpeed,
        gameContainer.clientWidth - player.offsetWidth
      )}px`;
      break;
  }
});

setInterval(createObstacle, obstacleInterval);
setInterval(updateObstacles, 10);
