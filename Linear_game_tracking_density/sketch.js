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
function getAnalytics(grid){
	let rockDensity = 0, paperDensity=0, scissorsDensity=0;
	let gridSize = grid[0].length*grid.length;
	for(let i =0; i<grid.length;i++){
		//console.log(grid[i]);
		rockDensity += grid[i].filter(x=>x.getState()==0).length;
		paperDensity += grid[i].filter(x=>x.getState()==1).length;
		scissorsDensity += grid[i].filter(x=>x.getState()==2).length;
	}
	rockDensity/=gridSize;
	paperDensity/=gridSize;
	scissorsDensity/=gridSize;
	return [rockDensity, paperDensity, scissorsDensity];
}
function countNeighbor(x,y){
	let sum = 0;
	for (let i = -1;i<2;i++){
		for(let j=-1;j<2;j++){
			let col = (x+i+cols)%cols;
			let row = (y+j+rows)%rows;

			sum+= ruleSet[grid[col][row].getState()][grid[x][y].getState()];
		}
	}
	return sum;
}
function nextCellState(x,y){
	for(let l = 0;l<3;l++){
		if(ruleSet[l][next[x][y].getState()]==1){
			return l;
		}
	}
}
function drawEllipses(arr,color){
  noStroke();
	//fill(color);
    // draw ellipses
  for(let i =0; i < arr.length; i++){
    let x = i * ((width + 500)/ (400));
    let y = floor(arr[i]*100);
    ellipse(x, y, 7);
  }
}
function render(grid,cols,rows){
	background(0);
	for(let i=0;i<cols; i++){
		for(let j = 0; j<rows;j++){
			let x = i*resolution, y=j*resolution;
			let cell = grid[i][j]

			if (cell.getState()==0){
				fill("#FF00FF");
				stroke(0);
				//rect(x,y,resolution-1,resolution-1);
				rect(x,y,resolution-1,resolution-1);
			}
			else if(cell.getState()==1){
				fill("#00FFFF");
				stroke(0);
				//rect(x,y,resolution-1,resolution-1);
				rect(x,y,resolution-1,resolution-1);
			}
			else if(cell.getState()==2){
				fill("#ffff00");
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
	for(let i = 0;i<cols;i++){
		for(let j=0;j<rows;j++){
			if(countNeighbor(i,j)>=3){
				next[i][j] = grid[i][j];
				let nextCell = nextCellState(i,j);

				next[i][j].setState(nextCell);
			}
		}
	}
	let density = getAnalytics(grid);
	let rockDensityValues = new Array(),paperDensityValues = new Array(), scissorsDensityValues = new Array();
	rockDensityValues.push(density[0]);
	paperDensityValues.push(density[1]);
	scissorsDensityValues.push(density[2]);
	if(rockDensityValues.length > 100){
		rockdDensityValues.shift();
		paperDensityValues.shift();
		scissorsDensityValues.shift();
	}

	drawEllipses(rockDensityValues, '#ff00ff');
	//console.log(rockDensityValues[rockDensityValues.length-1]+"\n"+paperDensityValues[paperDensityValues.length-1]+"\n"+scissorsDensityValues[scissorsDensityValues.length-1]);
	grid = next;
	next = temp;

}


let grid;
let cols;
let rows;
let resolution = 10;
let ruleSet = [[0,0,1,1],[1,0,0,1],[0,1,0,1],[0,0,0,0]];
let next;
let temp;
var wait=true;


function setup() {
	console.log(ruleSet[1][0]);
	createCanvas(1000, 800);
	cols = (width/2)/resolution, rows = (height/2)/resolution;
	let startState = new Array(cols).fill(0).map(x=> Array.from({length: rows}, () => floor(random(4))));
	grid = new Array(cols).fill(0).map(x=>new Array(rows));
	temp = new Array(cols).fill(0).map(x=>new Array(rows));
	next = temp;
	for(let i=0;i<cols;i++){
		for(let j=0;j<rows;j++){
			grid[i][j] = new Cell(startState[i][j]);
		}
	}
   //  for(let i=0;i<12;i++){
   //    wait = true
   //    while(wait){
   //      canvas.click(function(e){
   //          let x=e.clientX, y=e.clientY;
   //          let r=floor(x/10), c=floor(y/10);
   //          grid[r][c] = (i%3);
   //          draw();
   //        wait = false;
   //      })
   //    }
   // }
}

function draw() {

	render(grid,cols,rows);

}
