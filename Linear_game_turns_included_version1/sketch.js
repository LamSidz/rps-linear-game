class Cell{
	constructor(state){
		this.state = state;
	}
	setState(state){
		this.state = state;
	}
	getState(){
		return this.state
	}
}
function countNeighbor(x,y){
	let sum = 0;
	for (let i = -1;i<2;i++){
		for(let j=-1;j<2;j++){
			let col = (x+i+cols)%cols;
			let row = (y+j+rows)%rows;

			sum += ruleSet[grid[col][row].getState()][grid[x][y].getState()];
		}
	}
	return sum;
}
function nextCellState(x,y){
    for(let l = 0;l<3;l++){
		if(ruleSet[l][next[x][y].getState()]>0){
			return l;
		}
	}
}
function mostNeighbors(x,y){
    let psum = 0;
    let ysum = 0;
    let bsum = 0;
    let output;
    for (let i = -1;i<2;i++){
		for(let j=-1;j<2;j++){
			let col = (x+i+cols)%cols;
			let row = (y+j+rows)%rows;

            if(grid[col][row].getState() == 0){
                psum += ruleSet[grid[col][row].getState()][grid[x][y].getState()];
            } else if(grid[col][row].getState() == 1) {
                ysum += ruleSet[grid[col][row].getState()][grid[x][y].getState()];
            } else if(grid[col][row].getState() == 2){
                bsum += ruleSet[grid[col][row].getState()][grid[x][y].getState()];
            }
		}
	}
    psum > ysum ? bsum > psum ? output = 2 : output = 0 : ysum > bsum ? output = 1 : output = 0;
    return output;
}

function render(grid,cols,rows,applyRule){
	background(0);
	for(let i=0;i<cols; i++){
		for(let j = 0; j<rows;j++){
			let x = i*resolution, y=j*resolution;
			let cell = grid[i][j]

			if (cell.getState()==0){
				fill(255,0,255);
				stroke(0);
				//rect(x,y,resolution-1,resolution-1);
				rect(x,y,resolution-1,resolution-1);
			}
			else if(cell.getState()==1){
				fill(255,255,0);
				stroke(0);
				//rect(x,y,resolution-1,resolution-1);
				rect(x,y,resolution-1,resolution-1);
			}
			else if(cell.getState()==2){
				fill(0,255,255);
				stroke(0);
				//rect(x,y,resolution-1,resolution-1);
				rect(x,y,resolution-1,resolution-1);
			}
            else if(cell.getState()==3){
                fill(0,0,0);
                stroke(0);
                rect(x,y,resolution-1,resolution-1);
            }

		}
	}
    if(applyRule){
	  for(let i = 0;i<cols;i++){
		  for(let j=0;j<rows;j++){
			  if(countNeighbor(i,j)>=3){
				  next[i][j] = grid[i][j];
				  let nextCell = mostNeighbors(i,j);

				  next[i][j].setState(nextCell);
			  }
		  }
	  }
	grid = next;
	next = temp;
    }
}

let grid;
let cols;
let rows;
let resolution = 10;
let ruleSet = [[0,0,1,9],[1,0,0,9],[0,1,0,9],[0,0,0,0]];
let next;
let temp;
var numClicks = 0;
var start = false;
let turns = 7;


function setup() {
	createCanvas(800, 500);
	cols = width/resolution, rows = height/resolution;
	let startState = new Array(cols).fill(0).map(x=> Array.from({length: rows}, () => (3)));
	grid = new Array(cols).fill(0).map(x=>new Array(rows));
	temp = new Array(cols).fill(0).map(x=>new Array(rows));
	next = temp;
	for(let i=0;i<cols;i++){
		for(let j=0;j<rows;j++){
			grid[i][j] = new Cell(startState[i][j]);
		}
	}
    render(grid,cols,rows,false)
}

function colorGridOnClick(e){
    let x = e.clientX, y = e.clientY;
    let r = floor(x/10), c = floor(y/10);
    grid[r][c] = new Cell(numClicks%3);
    numClicks ++;
    render(grid,cols,rows,false);
}
window.addEventListener('click', colorGridOnClick);

function allowDraw(e){
  numClicks > 3*turns-1 ? start = true : start = false;
}
window.addEventListener('click', allowDraw);

function draw() {
    if(start){
	    render(grid,cols,rows,true);
    }
}
