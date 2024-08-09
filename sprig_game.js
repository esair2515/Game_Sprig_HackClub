/*
First time? Check out the tutorial game:  
https://sprig.hackclub.com/gallery/getting_started  

@title: Colorful Grid Explorer  
@author: Ehaan  
@tags: []  
@addedOn: 2024-00-00  
*/

const player = "p";
const wall = "w";
const goal = "g";
const background = "b"; // Background for the home screen

let gameStarted = false;

setLegend(
  [ player, bitmap`
................
................
................
......0000......
.....0....0.....
....0.0..0.0....
....0......0....
....0.0..0.0....
....0......0....
....0.0000.0....
.....0....0.....
......0000......
................
................
................
................` ],
  [ wall, bitmap`
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777
7777777777777777` ],
  [ goal, bitmap`
................
................
................
.......000......
......0...0.....
......0.0.0.....
.......000......
................
................
................
................
................
................
................
................
................` ],
  [ background, bitmap`
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................
................` ]
);

let level = 0;
const levels = [
  map`
pw.
..g`,
  map`
p..
.w.
..g`,
  map`
p.w..
..w..
.w..g
.w...
...w.`,
  map`
p..w.
.w...
.w.wg
....w
w....`,
  map`
pw...
.w...
.w.w.
.w.wg
....w`,
  map`
p.w..
w....
.w.w.
.wg..
.w.w.`,
  map`
p.w.w
.w...
...w.
wwwg.
..www`,
  map`
p.w...
.w..w.
...w..
.wwwwg
.w...w
.w.ww.
...w.w`
];

function startGame() {
  gameStarted = true;
  setMap(levels[level]);
  addText(`Level: ${level + 1}`, { x: 1, y: 1, color: color`3` });
}

function showHomeScreen() {
  setMap(map`
bbbbb
bbbbb
bbbbb
bbbbb
bbbbb`);
  clearText();
  addText("Welcome", { x: 5, y: 5, color: color`3` });
  addText("Press L to Play", { x: 3, y: 8, color: color`3` });
}

onInput("l", () => {
  if (!gameStarted) {
    startGame();
  }
});

onInput("w", () => {
  if (gameStarted) getFirst(player).y -= 1;
});

onInput("a", () => {
  if (gameStarted) getFirst(player).x -= 1;
});

onInput("s", () => {
  if (gameStarted) getFirst(player).y += 1;
});

onInput("d", () => {
  if (gameStarted) getFirst(player).x += 1;
});

afterInput(() => {
  if (gameStarted) {
    clearText();
    addText(`Level: ${level + 1}`, { x: 1, y: 1, color: color`3` });

    const playerPos = getFirst(player);
    const goalPos = getFirst(goal);

    if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
      addText("Next Level!", { x: 5, y: 6, color: color`3` });
      setTimeout(() => {
        level += 1;
        if (level < levels.length) {
          clearText();
          setMap(levels[level]);
          addText(`Level: ${level + 1}`, { x: 1, y: 1, color: color`3` });
        } else {
          clearText();
          addText("You Won!", { x: 6, y: 6, color: color`3` });
        }
      }, 1000);
    }

    if (getTile(playerPos.x, playerPos.y).filter(t => t.type === wall).length > 0) {
      setMap(levels[level]);
    }
  }
});

// Show the home screen when the game starts
showHomeScreen();
