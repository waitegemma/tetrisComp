/**
 * 
 */

var NewGrid = function(height, width) {
	this.height = height;
	this.width = width;
	this.rows = [];
	for (var i = 0;  i< this.height; i++) {
		var row = [];
		for (var j = 0; j< this.width; j++) {
			row.push(0);
		}
		this.rows.push(row);
	}
	
	this.addCoordinate = function(coordinates,colour) {
		coordinates.forEach(function(coordinate) {
            this.rows[coordinate[1]][coordinate[0]] = colour;
        }, this);
    }
	
	this.willFit = function(shiftedCoordinates) {
		for(var r=0; r<shiftedCoordinates.length; r++){
			if (shiftedCoordinates[r][0]<=-1){
				return false;
			}
			if(shiftedCoordinates[r][0]>= this.width){
				return false;
			}
			if (shiftedCoordinates[r][1]>= this.height){
				return false;
			} else {			// check grid for none 0 elements
				x=shiftedCoordinates[r][0];
				y=shiftedCoordinates[r][1];
					if (this.rows[y][x] != 0){
						console.log("collision");
						return false;
					}
			} 
		} return true; 
	}
};

var grid = new NewGrid(22,10);

 /* function draw(grid) {
	var gridString = grid.rows.map(function(row) {
       return row.join(" "); 
    }).join("<br/>");
    $("div").html(gridString);
}

draw(grid); */

// creating game board
var canvas = document.getElementById('tetrisgame');
var context = canvas.getContext("2d");

function gameboard() {		// can't seem to figure out how to save game board once reaching the bottom.
for (var x=0;  x< grid.height-2; x++) {
	for (var col=0; col< grid.width; col++) { // copy gameboard() at point of collision.
		if (grid.rows[x+2][col] == 0 ){
			context.beginPath();
			context.fillStyle = "grey"; 
			context.rect(col*20, x*20, 20, 20);  
			context.fill();
		} else {
			context.beginPath();					// draws block onto grid
			context.fillStyle = grid.rows[x+2][col]; 
			context.rect(col*20, x*20, 20, 20);  
			context.fill(); 
	} 			
}
}
}

gameboard(); 

var Block = function(coordinates, colour) {
	this.coordinates = coordinates;
	this.colour = colour;
	this.active = true; 			// for creating new block.
	this.height = function(){
		var maxY;
		var minY;
		this.coordinates.forEach(function(coordinate) {
			if(maxY == undefined || coordinate[1]>maxY) {
				maxY = coordinate[1];
			}
			if(minY == undefined || coordinate[1] <minY) {
				minY = coordinate[1];
			}
		});
		return 1 + maxY - minY;
	};
	
};

var activeBlock = new Block([[0,0],[0,1],[1,0],[1,1]], "yellow");

// draw(grid);
// gameboard();

function createBlock(){
	var num = Math.floor(Math.random()*8);
	var block;
	if  (num == 0) { activeBlock = new Block([[4,0],[5,0],[5,1]],"pink")
		} else if (num == 1) { activeBlock = new Block([[5,0],[5,1],[5,2],[5,3]],"cyan")
		} else if (num == 2) { activeBlock = new Block([[4,0],[5,0],[5,1],[5,2]],"blue")
		} else if (num == 3) { activeBlock = new Block([[5,0],[5,1],[5,2],[4,2]],"orange")
		} else if (num == 4) { activeBlock = new Block([[5,0],[4,1],[5,1],[4,2]],"red")
		} else if (num == 5) { activeBlock = new Block([[4,1],[5,0],[5,1],[5,2]],"purple")
		} else if (num == 6) { activeBlock = new Block([[4,0],[5,0],[5,1],[6,1]],"green")
		} else if (num == 7) { activeBlock = new Block([[4,0],[4,1],[5,0],[5,1]],"yellow")
	} return activeBlock; 
};

/* time step */
	
var time =setInterval(function (){ blockmove(activeBlock)}, 2000);
function blockmove() {
	var shiftedCoordinates = activeBlock.coordinates.map(function(coordinate){
		return [
		    coordinate[0],
		    coordinate[1]+1
		];
	});
	if (grid.willFit(shiftedCoordinates)){
		for (var i=0; i<activeBlock.coordinates.length; i++) {
			activeBlock.coordinates[i][1] += 1;
		}
	} else {activeBlock.active = false;
	console.log(activeBlock.coordinates)
	}
	gameboard();
return activeBlock 
}


function addblock(activeBlock) {
	for (var i=0; i<activeBlock.coordinates.length; i++){
		x=activeBlock.coordinates[i][0];
		y=activeBlock.coordinates[i][1];
		context.beginPath();					// draws block onto grid
		context.fillStyle = activeBlock.colour; 
		context.rect(x*20, (y-2)*20, 20, 20);  
		context.fill(); 
		}
}




/* keyboard functions */
function moveleft(activeBlock) {
	var shiftedCoordinates = activeBlock.coordinates.map(function(coordinate){
		return [
		    coordinate[0]-1,
		    coordinate[1]
		];
	});
	if (grid.willFit(shiftedCoordinates)){
		for (var i=0; i<activeBlock.coordinates.length; i++) {
			activeBlock.coordinates[i][0] -= 1;
		}
	}
	gameboard();
	return activeBlock	
} 

function moveright(activeBlock) {
	var shiftedCoordinates = activeBlock.coordinates.map(function(coordinate){
		return [
		    coordinate[0]+1,
		    coordinate[1]
		];
	});
	if (grid.willFit(shiftedCoordinates)){
		for (var i=0; i<activeBlock.coordinates.length; i++) {
			activeBlock.coordinates[i][0] += 1;
		}
	}
	gameboard();
	return activeBlock 	
}
 


function key(e) {
	if (!e) e=window.event
    switch (e.keyCode) {
        case 40: // down
        blockmove(activeBlock);
	    break;
	case 39: //right
	    moveright(activeBlock);
	    break;
	case 37: //left
	    moveleft(activeBlock);
	    break;

    }
};	

/* moving block */

requestAnimationFrame(gameloop);
function gameloop () {
	if (activeBlock.active == false){
		// console.log(activeBlock.coordinates,activeBlock.colour);
		grid.addCoordinate(activeBlock.coordinates, activeBlock.colour);
		// draw(grid);
		activeBlock = createBlock();
		gameboard();
	} 
	addblock(activeBlock);
	requestAnimationFrame(gameloop); 
}

