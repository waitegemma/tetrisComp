/**
 * 
 */
var gridheight = 22; // normal grid size plus 2 hidden rows at the top.
var gridwidth = 10;


/* create grid of 0's */			
function creategrid() {
	var grid =[];
	for (var i = 0;  i< gridheight; i++) {
		grid.push([]);
		for (var j=0; j< gridwidth; j++) {
			grid[i].push(0);
		}
	}
	return grid
}

var grid = creategrid();

/* creating game board */
var canvas = document.getElementById('tetrisgame');
var context = canvas.getContext("2d");

function gameboard() {		// can't seem to figure out how to save game board once reaching the bottom.
for (var row=0;  row< gridheight-2; row++) {
	for (var col=0; col< gridwidth; col++) { // copy gameboard() at point of collision.
		if (grid[row+2][col] == 0 ){
			context.beginPath();
			context.fillStyle = "grey"; 
			context.rect(col*20, row*20, 20, 20);  
			context.fill();
		} 
	}			
}
}

gameboard();

var collision = false;
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
	
}

var activeBlock = new Block([[0,0],[0,1],[1,0],[1,1]], "yellow");
// console.log("Block", activeBlock);
// console.log("height", activeBlock.height())


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
//for (var i=0; i<10; i++) {
	//console.log("Random block", createBlock().colour, createBlock().coordinates);
//} 
//var blocks = [];
var blocks = {coordinates:[], colour:[]};

/* time step */
	
var time =setInterval(function (){ blockmove(activeBlock)}, 2000);
function blockmove () {
	state = "movable";
	shiftedCoordinates = activeBlock.coordinates.map(function(coordinate){
		return [
		    coordinate[0],
		    coordinate[1]+1
		];
	});
	for(var i=0; i<shiftedCoordinates.length; i++){
		if (shiftedCoordinates[i][1]>=gridheight){
			state = "collision";
			activeBlock.active = false;
			break;
		}
	}
	if (state == "movable"){
		if (willFit(shiftedCoordinates)){
			for (var i=0; i<activeBlock.coordinates.length; i++) {
				activeBlock.coordinates[i][1] += 1;
			}
		} else {activeBlock.active = false;}
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
	}for (var k=0; k<blocks.coordinates.length; k++){
			x=blocks.coordinates[k][0];
			y=blocks.coordinates[k][1];
			context.beginPath();					// draws block onto grid
			context.fillStyle = blocks.colour[k]; 
			context.rect(x*20, (y-2)*20, 20, 20);  
			context.fill(); 
		}
}




/* keyboard functions */
function moveleft(activeBlock) {
	state = "movable";
	shiftedCoordinates = activeBlock.coordinates.map(function(coordinate){
		return [
		    coordinate[0]-1,
		    coordinate[1]
		];
	});
	for(var i=0; i<shiftedCoordinates.length; i++){
		if (shiftedCoordinates[i][0]<=-1){
			state = "collision";
			break;
		}
	}
	if (state == "movable"){
		if (willFit(shiftedCoordinates)){
			for (var i=0; i<activeBlock.coordinates.length; i++) {
				activeBlock.coordinates[i][0] -= 1;
			}

		}
	}
	gameboard();
	return activeBlock	
} 

function moveright(activeBlock) {
	state="movable";
	shiftedCoordinates = activeBlock.coordinates.map(function(coordinate){
		return [
		    coordinate[0]+1,
		    coordinate[1]
		];
	});
	for (var i=0; i<shiftedCoordinates.length; i++) {
		if(shiftedCoordinates[i][0]>= gridwidth){
			state="collision";
			break;
		}
	} 
	if (state == "movable"){
		if (willFit(shiftedCoordinates)){
			for (var i=0; i<activeBlock.coordinates.length; i++) {
				activeBlock.coordinates[i][0] += 1;
			}
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
		// for creating new block
		for (var i=0; i<activeBlock.coordinates.length; i++){
		blocks.coordinates.push(activeBlock.coordinates[i]);// push coordinates over and color of coord
		blocks.colour.push([activeBlock.colour]);
		}
		activeBlock = createBlock();
	} 
	addblock(activeBlock);
	requestAnimationFrame(gameloop); 
}

function willFit(){
	// return true if in grid
	if (blocks.coordinates.length>0) {
	for(var r=0; r<shiftedCoordinates.length; r++){
			for (var k=0; k<blocks.coordinates.length; k++){
					x=blocks.coordinates[k][0];
					y=blocks.coordinates[k][1];
					if (shiftedCoordinates[r][0] == x && shiftedCoordinates[r][1] == y){
						console.log("collision");
						return false;
						break;
					}
			}
		}
	} if (!false){return true;}
}

