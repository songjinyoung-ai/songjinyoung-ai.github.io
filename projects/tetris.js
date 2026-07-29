(() => {
  const canvas = document.querySelector('#tetris-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const modeSelect = document.querySelector('#tetris-mode');
  const startButton = document.querySelector('#tetris-start');
  const pauseButton = document.querySelector('#tetris-pause');
  const restartButton = document.querySelector('#tetris-restart');
  const status = document.querySelector('#tetris-status');
  const W = 10, H = 20;
  const shapes = [
    [[1,1,1,1]], [[1,1],[1,1]], [[0,1,0],[1,1,1]], [[1,0,0],[1,1,1]],
    [[0,0,1],[1,1,1]], [[0,1,1],[1,1,0]], [[1,1,0],[0,1,1]]
  ];
  const colors = ['#72d8ff','#ffd166','#b69cff','#ff9b71','#8df0b4','#ff7191','#fff08a'];
  let players = [], timer = null, playing = false, paused = false, mode = '1p';
  const blank = () => Array.from({ length: H }, () => Array(W).fill(0));
  const clone = shape => shape.map(row => row.slice());
  const rotate = shape => shape[0].map((_, x) => shape.map(row => row[x]).reverse());
  const piece = () => { const type = Math.floor(Math.random() * shapes.length); return { shape: clone(shapes[type]), color: colors[type], x: 3, y: 0 }; };
  const makePlayer = () => { const p = piece(); return { board: blank(), current: p, score: 0, over: false }; };
  const hit = (player, shape = player.current.shape, x = player.current.x, y = player.current.y) => shape.some((row, dy) => row.some((cell, dx) => cell && (x + dx < 0 || x + dx >= W || y + dy >= H || (y + dy >= 0 && player.board[y + dy][x + dx]))));
  const merge = player => player.current.shape.forEach((row, dy) => row.forEach((cell, dx) => { if (cell && player.current.y + dy >= 0) player.board[player.current.y + dy][player.current.x + dx] = player.current.color; }));
  const clearLines = player => { let cleared = 0; player.board = player.board.filter(row => { const full = row.every(Boolean); if (full) cleared += 1; return !full; }); while (player.board.length < H) player.board.unshift(Array(W).fill(0)); player.score += [0,100,300,500,800][cleared] || 0; };
  const spawn = player => { player.current = piece(); player.over = hit(player); };
  const drop = player => { if (player.over) return; player.current.y += 1; if (hit(player)) { player.current.y -= 1; merge(player); clearLines(player); spawn(player); } };
  const move = (player, dx) => { if (player.over) return; player.current.x += dx; if (hit(player)) player.current.x -= dx; };
  const turn = player => { if (player.over) return; const next = rotate(player.current.shape); if (!hit(player, next)) player.current.shape = next; };
  const drawBoard = (player, offset, cell) => { ctx.fillStyle = '#050b20'; ctx.fillRect(offset, 0, W * cell, H * cell); player.board.forEach((row, y) => row.forEach((color, x) => { if (color) { ctx.fillStyle = color; ctx.fillRect(offset + x * cell + 1, y * cell + 1, cell - 2, cell - 2); } })); player.current.shape.forEach((row, y) => row.forEach((filled, x) => { if (filled && player.current.y + y >= 0) { ctx.fillStyle = player.current.color; ctx.fillRect(offset + (player.current.x + x) * cell + 1, (player.current.y + y) * cell + 1, cell - 2, cell - 2); } })); ctx.strokeStyle = 'rgba(255,255,255,.18)'; ctx.strokeRect(offset, 0, W * cell, H * cell); };
  const draw = () => { ctx.clearRect(0, 0, canvas.width, canvas.height); const cell = mode === '2p' ? 15 : 30; players.forEach((player, index) => drawBoard(player, index * (W * cell + 10), cell)); };
  const tick = () => { if (!playing || paused) return; players.forEach(drop); if (players.some(p => p.over)) { playing = false; clearInterval(timer); timer = null; status.textContent = `Game over · ${players.map((p, i) => `P${i + 1} ${p.score}`).join(' · ')}`; pauseButton.disabled = true; } draw(); };
  const start = () => { clearInterval(timer); mode = modeSelect.value; players = Array.from({ length: mode === '2p' ? 2 : 1 }, makePlayer); playing = true; paused = false; pauseButton.disabled = false; status.textContent = mode === '2p' ? '2P local · P1 WASD · P2 arrows / 4 5 6 8' : '1P · WASD to move and rotate'; timer = setInterval(tick, 650); draw(); };
  const control = (playerIndex, action) => { if (!playing) return; const player = players[playerIndex]; if (action === 'left') move(player, -1); if (action === 'right') move(player, 1); if (action === 'rotate') turn(player); if (action === 'drop') drop(player); draw(); };
  document.addEventListener('keydown', event => { const map = { a: [0, 'left'], d: [0, 'right'], w: [0, 'rotate'], s: [0, 'drop'], ArrowLeft: [1, 'left'], ArrowRight: [1, 'right'], ArrowUp: [1, 'rotate'], ArrowDown: [1, 'drop'], '4': [1, 'left'], '6': [1, 'right'], '8': [1, 'rotate'], '5': [1, 'drop'] }; const entry = map[event.key] || map[event.key.toLowerCase()]; if (entry && (mode === '2p' || entry[0] === 0)) { event.preventDefault(); control(entry[0], entry[1]); } });
  startButton.addEventListener('click', start); restartButton.addEventListener('click', start); pauseButton.addEventListener('click', () => { if (!playing) return; paused = !paused; status.textContent = paused ? 'Paused' : 'Playing'; });
  draw();
})();
