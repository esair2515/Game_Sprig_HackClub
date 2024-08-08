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
.......222......
......2...2.....
......2.2.2.....
.......222......
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

setSolids([wall]);

let level = 0;
const levels = [
  map`
pw.
..g`,
  map`
p.w
.wg
..w`,
  map`
p.w..
..w..
.w..g
.w...
...w.`,
  map`
p..ww
.w.wg
.w.w.
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
w.w..
.w...
.wg..
.w.w.`,
  map`
p.w.w
..w..
ww.w.
..wg.
...w.`,
  map`
p.....
w.w...
...w..
...w.g
.w.w..
.w.w..
...w.w`
];

setMap(levels[level]);

setPushables({
  [player]: []
});

onInput("w", () => {
  getFirst(player).y -= 1;
});

onInput("a", () => {
  getFirst(player).x -= 1;
});

onInput("s", () => {
  getFirst(player).y += 1;
});

onInput("d", () => {
  getFirst(player).x += 1;
});

afterInput(() => {
  const playerPos = getFirst(player);
  const goalPos = getFirst(goal);

  // checks if player reached the goal
  if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
    level += 1;
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You Won!", { x: 6, y: 6, color: color`2` });
    }
  }

  // checks if player touched a wall
  if (getTile(playerPos.x, playerPos.y).filter(t => t.type === wall).length > 0) {
    setMap(levels[level]); // restarts
  }
});
