function Cell(i, j){
	this.i = i;
	this.j = j;
	this.walls = [true, true, true, true];
	this.visited = false;

	this.show = function(){
		var x = this.i *scl;
		var y = this.j *scl;
		stroke(0);
		strokeWeight(5);
		if(this.walls[0])
			line(x,y, x+scl, y);
		if(this.walls[1])
			line(x+scl, y, x+scl, y+scl);
		if(this.walls[2])
			line(x+scl, y+scl, x, y+scl);
		if(this.walls[3])
			line(x, y+scl, x, y);
		if(this.visited){
			noStroke();
			fill(255, 100);
			rect(x, y, scl,scl);
		}
	}
	this.index = function(i, j){
		if(i<0 || j<0 || i > cols -1 || j> rows-1)
			return -1;
		return(i + j * cols);
	}
	this.checkNeighbors = function(){
		var neighbors = [];	

		var top = grid[this.index(i, j-1)];
		var right = grid[this.index(i+1, j)];
		var bottom = grid[this.index(i, j+1)];
		var left = grid[this.index(i-1, j)];
		
		if(top && !top.visited)
			neighbors.push(top);
		if(right && !right.visited)
			neighbors.push(right);
		if(bottom && !bottom.visited)
			neighbors.push(bottom);
		if(left && !left.visited)
			neighbors.push(left);

		if(neighbors.length > 0){
			var r = floor(random(0, neighbors.length));
			return neighbors[r];
		}
		else
			return undefined;
	}
	this.removeWalls = function(a, b){
		var x = a.i - b.i;
		var y = a.j - b.j;
		if(x == -1){
			a.walls[1] = false;
			b.walls[3] = false;
		}
		else if(x == 1){
			a.walls[3] = false;
			b.walls[1] = false;
		}
		if(y ==  -1){
			a.walls[2] = false;
			b.walls[0] = false;
		}
		else if(y == 1){
			a.walls[0] = false;
			b.walls[2] = false;
		}
	}
	this.highlight = function(){
		noStroke();
		fill(0);
		rect(this.i*scl, this.j*scl, scl, scl);
	}
}
