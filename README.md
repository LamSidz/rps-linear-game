# rps-linear-game
This is a rock-paper-scissors tile game for our linear algebra class.

## how it works
Players take turns putting tiles of their color onto the board. Once each player has placed 5, the game will start updating. This updating can be paused or started by pressing e.
When a tile is surrounded by 3 or more of its enemy tile (for example 3 yellow tiles around a pink one, but not 3 pinks around a yellow), the surrounded tile changes color. This only happens while the game is updating states. Additionally, the board wraps around, so tiles on the far left side can affect the far right side, for example (similar to how the ship moves in asteroids).

After a while, if a winner is not evident (which is what happens most of the time), players should pause to see which color takes up the most space. It may be different depending on when the game is paused.
Players can press e to pause or play at any time, even when not all turns have been taken. This means the game's updating process can be started early in order to shorten the setup phase.

Note: the colors of the analytics match the bottom right cell, they do not reflect the winner; to determine the winner you should read the numbers. We kept it this way because it looks cool. 

## play the game
[play the game here](https://lamsidz.github.io/rps-linear-game/Linear_game_final_build)

## connection to linear algebra

The ruleset for our game is represented internally by a square matrix. This matrix is the reference for many parts of the code, and determines which colors beat which, as well as how strongly. For example, each color beats the gray cells with very high strength; just one colored neighbor and a gray cell gets subsumed. But yellow beats purple with a strength of 1, which means that each purple cell needs 3 yellow neighbors in order to change color (3 is the threshold we set). The rules matrix is not applied to the board as a whole, but is used to calculate what color each cell should become based on its neighbors. 

Additionally, the boardstate is a very large matrix whose entries are cell objects. These cell objects have information about the state of the cell, and we use this information to iterate the board state, and to display it on the screen. 

There are also connections with [target and spiral waves in the Belousov-Zhabotinsky reaction](https://www.youtube.com/watch?v=PnOy1fSxBdI), which are modeled by linear differential equations. These linear differential equations are solved using linear algebra techniques. The spirals produced by our game are very similar to some of the spirals produced by that chemical reaction.

## creators
This game was created by Michio Morizono (MIMOR02) and Sam Lidz (LamSidz)
