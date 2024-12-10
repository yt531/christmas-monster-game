let gameInterval; // 控制怒氣值變化的計時器
let timerInterval; // 倒數計時器
let isGamePaused = false; // 判斷遊戲是否暫停
let angerLevel = 60; // 初始怒氣值
let timeRemaining = 180; // 遊戲倒數計時（以秒為單位）

// 獲取DOM元素
const startButton = document.getElementById("start-button");
const pauseButton = document.getElementById("pause-button");
const restartButton = document.getElementById("restart-button");
const reduceAngerButton = document.getElementById("reduce-anger-button");
const angerLevelElement = document.getElementById("anger-level");
const timerElement = document.getElementById("timer");
const messageDisplay = document.getElementById("message-display");
const monsterImage = document.getElementById("monster-image");

// 更新怒氣值顯示
function updateAngerLevel() {
  angerLevelElement.innerText = `🔥怒氣值：${angerLevel}%`;

  if (angerLevel === 0) {
    stopGame();
    messageDisplay.innerHTML = "恭喜你！成功阻止怪獸爆氣～❤️";
  }

  if (angerLevel === 100) {
    stopGame();
    messageDisplay.innerHTML = "遊戲結束！怪獸要爆氣了！🔥";
  }
}

// 更新倒數計時顯示
function updateTimerDisplay() {
  const minutes = Math.floor(timeRemaining / 60);
  const seconds = timeRemaining % 60;
  timerElement.innerText = `🕒剩餘時間：${minutes}:${
    seconds < 10 ? "0" : ""
  }${seconds}`;
}

// 怒氣值變化動畫
function changeMonsterImage(imagePath) {
  monsterImage.src = imagePath;
}

// 怒氣值增加邏輯
function increaseAnger() {
  const randomIncrease = Math.floor(Math.random() * 7) + 1;
  angerLevel = Math.min(100, angerLevel + randomIncrease);
  updateAngerLevel();
  changeMonsterImage("assets/img-monster-angry.png");
  setTimeout(() => changeMonsterImage("assets/img-monster-cover.png"), 500);
}

// 怒氣值減少邏輯
function reduceAnger() {
  const randomDecrease = Math.floor(Math.random() * 4) + 7;
  angerLevel = Math.max(0, angerLevel - randomDecrease);
  updateAngerLevel();
  changeMonsterImage("assets/img-monster-happy.png");
  setTimeout(() => changeMonsterImage("assets/img-monster-cover.png"), 500);
}

// 倒數計時邏輯
function startTimer() {
  timerInterval = setInterval(() => {
    if (!isGamePaused) {
      timeRemaining--;
      updateTimerDisplay();

      if (timeRemaining <= 0) {
        stopGame();
        messageDisplay.innerHTML = "時間到！怪獸要爆氣了！😢";
      }
    }
  }, 1000);
}

// 遊戲主邏輯
function startGameLogic() {
  gameInterval = setInterval(() => {
    if (!isGamePaused) {
      increaseAnger();
    }
  }, 30000);
}

// 開始遊戲邏輯
startButton.addEventListener("click", () => {
  startButton.disabled = true; // 禁用「開始遊戲」按鈕
  pauseButton.disabled = false; // 啟用「暫停遊戲」按鈕
  restartButton.disabled = false; // 啟用「重新開始」按鈕
  reduceAngerButton.disabled = false; // 啟用「減少怒氣值」按鈕
  messageDisplay.innerHTML = ""; // 清空訊息顯示
  isGamePaused = false;
  startTimer(); // 啟動倒數計時
  startGameLogic(); // 啟動遊戲邏輯
});

pauseButton.addEventListener("click", () => {
  isGamePaused = true;
  startButton.disabled = false;
  pauseButton.disabled = true;
});

// 重新開始遊戲
restartButton.addEventListener("click", () => {
  // 停止所有計時器和遊戲邏輯
  stopGame();

  // 重置遊戲狀態
  angerLevel = 60; // 重置怒氣值
  timeRemaining = 180; // 重置剩餘時間
  updateAngerLevel(); // 更新怒氣值顯示
  updateTimerDisplay(); // 更新倒數計時顯示

  // 清空訊息顯示
  messageDisplay.innerHTML = "";

  // 重置按鈕狀態
  startButton.disabled = false; // 啟用「開始遊戲」按鈕
  pauseButton.disabled = true; // 禁用「暫停遊戲」按鈕
  reduceAngerButton.disabled = true; // 禁用「減少怒氣值」按鈕
  restartButton.disabled = true; // 禁用「重新開始」按鈕，直到遊戲再次啟動
});

// 停止遊戲函數
function stopGame() {
  clearInterval(gameInterval); // 清除怒氣值計時器
  clearInterval(timerInterval); // 清除倒數計時器
  gameInterval = null;
  timerInterval = null;
  isGamePaused = false; // 重置暫停狀態

  // 禁用相關按鈕
  startButton.disabled = false; // 允許玩家重新啟動遊戲
  pauseButton.disabled = true;
  reduceAngerButton.disabled = true;
}

// 新增事件綁定到減少怒氣值按鈕
reduceAngerButton.addEventListener("click", reduceAnger);
