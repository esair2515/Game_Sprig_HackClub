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
...w.`
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

  if (playerPos.x === goalPos.x && playerPos.y === goalPos.y) {
    level += 1;
    if (level < levels.length) {
      setMap(levels[level]);
    } else {
      addText("You Won!", { x: 6, y: 6, color: color`2` });
    }
  }
});
