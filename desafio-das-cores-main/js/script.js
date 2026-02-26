const cores = ["red", "blue", "green", "yellow", "purple", "orange"];

let score = 0;

let timeLeft = 60;

let targetColor = "";

let timerInterval;



const startButton = document.getElementById("startButton");

const playAgainButton = document.getElementById("playAgainButton");

const grid = document.getElementById("grid");

const scoreDisplay = document.getElementById("score");

const targetColorDisplay = document.getElementById("targetColor");

const timerDisplay = document.getElementById("timer");

const gameInfo = document.getElementById("gameInfo");

const gameOver = document.getElementById("gameOver");

const finalScore = document.getElementById("finalScore");



function gerarGrid() {

  grid.innerHTML = "";

  for (let i = 0; i < 16; i++) {

    const square = document.createElement("div");

    const corAleatoria = cores[Math.floor(Math.random() * cores.length)];

    square.classList.add("square");

    square.style.backgroundColor = corAleatoria;

    square.dataset.color = corAleatoria;

    square.addEventListener("click", verificarCor);

    grid.appendChild(square);

  }

}



function atualizarCorAlvo() {

  targetColor = cores[Math.floor(Math.random() * cores.length)];

  targetColorDisplay.textContent = targetColor;

}



function verificarCor(event) {

  const corClicada = event.target.dataset.color;

  if (corClicada === targetColor) {

    score += 10;

  } else {

    score -= 5;

  }

  scoreDisplay.textContent = score;

  atualizarCorAlvo();

  gerarGrid();

}



function iniciarJogo() {

  const nome = document.getElementById("playerName").value.trim();

  if (!nome) {

    alert("Digite seu nome para começar.");

    return;

  }



  score = 0;

  timeLeft = 60;

  scoreDisplay.textContent = score;

  timerDisplay.textContent = timeLeft;



  startButton.disabled = true;

  gameInfo.classList.remove("hidden");

  grid.classList.remove("hidden");

  gameOver.classList.add("hidden");



  atualizarCorAlvo();

  gerarGrid();



  timerInterval = setInterval(() => {

    timeLeft--;

    timerDisplay.textContent = timeLeft;



    if (timeLeft <= 0) {

      finalizarJogo(nome);

    }

  }, 1000);

}



function finalizarJogo(nome) {

  clearInterval(timerInterval);

  grid.classList.add("hidden");

  gameInfo.classList.add("hidden");

  gameOver.classList.remove("hidden");

  finalScore.textContent = `${nome}, sua pontuação foi: ${score}`;



  salvarNoRanking(nome, score);

  exibirRanking();



  startButton.disabled = false;

}



function reiniciarJogo() {

  document.getElementById("playerName").value = "";

  gameOver.classList.add("hidden");

  scoreDisplay.textContent = "0";

  timerDisplay.textContent = "60";

  targetColorDisplay.textContent = "";

  startButton.disabled = false;

  grid.innerHTML = "";

  gameInfo.classList.add("hidden");

}



function salvarNoRanking(nome, pontuacao) {

  const ranking = JSON.parse(localStorage.getItem("rankingCores")) || [];

  ranking.push({ nome, pontuacao });



  ranking.sort((a, b) => b.pontuacao - a.pontuacao);

  const top5 = ranking.slice(0, 5);

  localStorage.setItem("rankingCores", JSON.stringify(top5));

}



function exibirRanking() {

  const rankingList = document.getElementById("rankingList");

  const ranking = JSON.parse(localStorage.getItem("rankingCores")) || [];



  rankingList.innerHTML = "";

  ranking.forEach((jogador, index) => {

    const li = document.createElement("li");

    li.textContent = `${index + 1}º ${jogador.nome} - ${jogador.pontuacao} pts`;

    rankingList.appendChild(li);

  });

}



startButton.addEventListener("click", iniciarJogo);

playAgainButton.addEventListener("click", reiniciarJogo);



// Exibir ranking na carga da página

window.onload = () => {

  exibirRanking();

};

