(() => {
  const canvas = document.querySelector('#game-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const scoreEl = document.querySelector('#score');
  const highScoreEl = document.querySelector('#high-score');
  const stageLabel = document.querySelector('#stage-label');
  const stageSelect = document.querySelector('#stage-select');
  const statusEl = document.querySelector('.game-status');
  const startButton = document.querySelector('#start-button');
  const pauseButton = document.querySelector('#pause-button');
  const restartButton = document.querySelector('#restart-button');
  const boostToggle = document.querySelector('#speed-boost-toggle');
  const cols = 32, rows = 20, cell = 20, respawnTicks = 6;
  const stages = [
    { name: 'Easy', speed: 2.5, enemies: 1, bombs: 1, radius: 0, target: 50 },
    { name: 'Easy', speed: 2.8, enemies: 1, bombs: 1, radius: 0, target: 100 },
    { name: 'Easy+', speed: 3.2, enemies: 2, bombs: 1, radius: 1, target: 150 },
    { name: 'Normal', speed: 3.6, enemies: 2, bombs: 1, radius: 1, target: 220 },
    { name: 'Normal', speed: 4.0, enemies: 2, bombs: 2, radius: 1, target: 300 },
    { name: 'Normal+', speed: 4.4, enemies: 3, bombs: 2, radius: 1, target: 400 },
    { name: 'Hard', speed: 4.8, enemies: 3, bombs: 2, radius: 2, target: 520 },
    { name: 'Hard', speed: 5.2, enemies: 3, bombs: 3, radius: 2, target: 650 },
    { name: 'Hard+', speed: 5.8, enemies: 4, bombs: 3, radius: 2, target: 800 },
    { name: 'Extreme', speed: 6.4, enemies: 4, bombs: 4, radius: 3, target: 1000 }
  ];
  const directions = { up: { x: 0, y: -1 }, down: { x: 0, y: 1 }, left: { x: -1, y: 0 }, right: { x: 1, y: 0 } };
  let worm = [], direction = directions.right, nextDirection = directions.right;
  let food, enemies = [], bombs = [], score = 0, stage = 0, timer = null, tick = 0;
  let paused = false, playing = false, boostUntil = 0;
  let highScore = Number(localStorage.getItem('worm-high-score')) || 0;

  const same = (a, b) => a && b && a.x === b.x && a.y === b.y;
  const occupied = point => [...enemies, ...bombs, food, ...worm].filter(Boolean).some(item => same(item, point));
  const randomPoint = () => { let point; do { point = { x: Math.floor(Math.random() * cols), y: Math.floor(Math.random() * rows) }; } while (occupied(point)); return point; };
  const setStatus = message => { statusEl.textContent = message; };
  const isBoosted = () => Boolean(boostToggle?.checked && Date.now() < boostUntil);
  const intervalMs = () => Math.max(70, Math.round(1000 / (stages[stage].speed * (isBoosted() ? 1.35 : 1))));
  const scheduleTimer = () => { clearInterval(timer); timer = playing ? setInterval(step, intervalMs()) : null; };
  const updateLabels = () => { scoreEl.textContent = String(score); stageLabel.textContent = String(stage + 1); highScoreEl.textContent = String(highScore); };
  const drawCell = (point, color, round = 0) => { ctx.fillStyle = color; ctx.beginPath(); ctx.roundRect(point.x * cell + round, point.y * cell + round, cell - round * 2, cell - round * 2, round); ctx.fill(); };
  const draw = () => {
    ctx.fillStyle = '#080b2d'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    for (let i = 0; i < 28; i += 1) { ctx.fillStyle = i % 3 ? '#5365b8' : '#fff'; ctx.globalAlpha = .45; ctx.fillRect((i * 73) % canvas.width, (i * 47) % canvas.height, 2, 2); } ctx.globalAlpha = 1;
    drawCell(food, '#35ed7e', 5); bombs.forEach(bomb => drawCell(bomb, '#ec48bd', 4)); enemies.forEach(enemy => drawCell(enemy, '#ffcf5c', 4));
    worm.forEach((part, index) => { drawCell(part, index ? '#7c8cff' : '#b9f6ff', index ? 5 : 3); if (!index) { ctx.fillStyle = '#111644'; ctx.fillRect(part.x * cell + 5, part.y * cell + 5, 3, 3); ctx.fillRect(part.x * cell + 12, part.y * cell + 5, 3, 3); } });
    if (paused) { ctx.fillStyle = 'rgba(10,13,58,.72)'; ctx.fillRect(0, 0, canvas.width, canvas.height); ctx.fillStyle = '#fff'; ctx.font = '700 28px system-ui'; ctx.textAlign = 'center'; ctx.fillText('PAUSED', canvas.width / 2, canvas.height / 2); }
  };
  const resetObjects = () => { food = randomPoint(); enemies = Array.from({ length: stages[stage].enemies }, randomPoint); bombs = Array.from({ length: stages[stage].bombs }, randomPoint); };
  const respawnObjects = () => { enemies = enemies.map(() => randomPoint()); bombs = bombs.map(() => randomPoint()); };
  const gameOver = message => { playing = false; paused = false; clearInterval(timer); timer = null; pauseButton.disabled = true; setStatus(`${message} Score ${score}. Press restart to try again.`); draw(); };
  const unlockNext = () => { if (score >= stages[stage].target && stage + 1 < 10) { setStatus(`Stage ${stage + 1} target reached. All stages remain selectable.`); } };
  function step() {
    if (!playing || paused) return;
    if (boostUntil && Date.now() >= boostUntil) { boostUntil = 0; scheduleTimer(); }
    tick += 1; direction = nextDirection;
    const head = { x: worm[0].x + direction.x, y: worm[0].y + direction.y };
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows || worm.some((part, index) => index > 0 && same(part, head))) return gameOver('Collision! Game over');
    if (bombs.some(bomb => Math.abs(bomb.x - head.x) <= stages[stage].radius && Math.abs(bomb.y - head.y) <= stages[stage].radius)) return gameOver('Explosion! Game over');
    if (enemies.some(enemy => same(enemy, head))) return gameOver('Enemy collision! Game over');
    worm.unshift(head);
    if (same(head, food)) { score += 10; if (score > highScore) { highScore = score; localStorage.setItem('worm-high-score', String(highScore)); } food = randomPoint(); unlockNext(); } else worm.pop();
    if (tick % respawnTicks === 0) respawnObjects(); updateLabels(); draw();
  }
  const start = () => { clearInterval(timer); stage = Number(stageSelect.value); worm = [{ x: 16, y: 10 }, { x: 15, y: 10 }, { x: 14, y: 10 }]; direction = directions.right; nextDirection = directions.right; score = 0; tick = 0; boostUntil = 0; paused = false; playing = true; resetObjects(); scheduleTimer(); pauseButton.disabled = false; setStatus(`${stage + 1} ${stages[stage].name}. Target ${stages[stage].target}.`); updateLabels(); draw(); };
  const setDirection = name => { const candidate = directions[name]; if (!candidate || (candidate.x === -direction.x && candidate.y === -direction.y)) return; nextDirection = candidate; if (boostToggle?.checked && playing) { boostUntil = Date.now() + 800; scheduleTimer(); setStatus('Speed boost active'); } };
  const keyMap = { ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down', ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' };
  document.addEventListener('keydown', event => { if (keyMap[event.key]) { event.preventDefault(); setDirection(keyMap[event.key]); } if (event.key === ' ' && playing) { event.preventDefault(); paused = !paused; setStatus(paused ? 'Paused' : 'Game running'); draw(); } });
  document.querySelectorAll('[data-direction]').forEach(button => button.addEventListener('pointerdown', () => setDirection(button.dataset.direction)));
  startButton.addEventListener('click', start); restartButton.addEventListener('click', start);
  pauseButton.addEventListener('click', () => { if (!playing) return; paused = !paused; setStatus(paused ? 'Paused' : 'Game running'); draw(); });
  updateLabels(); stageSelect.innerHTML = ''; stages.forEach((config, index) => { const option = document.createElement('option'); option.value = String(index); option.textContent = `${index + 1}. ${config.name}`; stageSelect.append(option); }); stageSelect.value = '0'; draw();
})();
