var grid = [];
var stack = [];
var scl = 50;
var rows;
var cols;
var current;
var generating;

function setup(){
	createCanvas(500, 500);
	rows = floor(height/scl);
	cols = floor(width/scl);
	for(var j = 0; j<rows; j++){
		for(var i = 0; i<cols; i++){
			var cell = new Cell(i,j);
			grid.push(cell);
		}
	}
	current = grid[0];
	
}
function draw(){
	background(51);
	fill(255);
	for(var i=0; i<grid.length; i++){
		grid[i].show();
	}
	current.visited = true;
	//Step 1
	current.highlight();
	var next = current.checkNeighbors();
	if(next){
		next.visited = true;
		//Step 2 
		stack.push(current);
		generating = true;
		//Step 3
		current.removeWalls(current, next);
		//Step 4
		current = next;
	}
	else if(stack.length > 0){
		current = stack.pop();
	}
	else{
		noStroke();
		fill(255, 0, 255, 100);
		rect(width-scl, height-scl, scl, scl);
		generating = false;
		for(var i = 0; i<4; i++)
			current.walls[i] = false;
	}
}

function keyPressed(){
	if( !generating){
		var i = current.i;
		var j = current.j;
		if(keyCode == UP_ARROW && current.j-1 >= 0 && !grid[current.index(i,j-1)].walls[2]){
			current.j = current.j-1;
		}
		else if(keyCode == RIGHT_ARROW && current.i+1 <= cols-1 && !grid[current.index(i+1, j)].walls[3]){
			current.i = current.i+1;
		}
		else if(keyCode == DOWN_ARROW && current.j+1 <= rows-1 && !grid[current.index(i, j+1)].walls[0]){
			current.j = current.j+1;
		
		}
		else if(keyCode == LEFT_ARROW && current.i-1 >= 0 && !grid[current.index(i-1, j)].walls[1]){
				current.i = current.i-1;
		}
	}
}
