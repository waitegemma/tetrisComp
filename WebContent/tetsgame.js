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
	for (var col=0; col< gridwidth; col++) {
		if (grid[row+2][col] == 0 ){
			context.beginPath();
			context.fillStyle = "red"; 
			context.rect(col*20, row*20, 20, 20);  
			context.fill();
		} 
	}
			
	}
}
gameboard();

/* block coordinates equal create grid coordinations make 0 be 1 */
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

var block = new Block([[0,0],[0,1],[1,0],[1,1]], "yellow");
console.log("Block", block);
console.log("height", block.height())


function createBlock(){
	var num = Math.floor(Math.random()*8);
	var block;
	if  (num == 0) { block = new Block([[4,0],[5,0],[5,1]],"pink")
		} else if (num == 1) { block = new Block([[5,0],[5,1],[5,2],[5,3]],"cyan")
		} else if (num == 2) { block = new Block([[4,0],[5,0],[5,1],[5,2]],"blue")
		} else if (num == 3) { block = new Block([[5,0],[5,1],[5,2],[4,2]],"orange")
		} else if (num == 4) { block = new Block([[5,0],[4,1],[5,1],[4,2]],"red")
		} else if (num == 5) { block = new Block([[4,1],[5,0],[5,1],[5,2]],"purple")
		} else if (num == 6) { block = new Block([[4,0],[5,0],[5,1],[6,1]],"green")
		} else if (num == 7) { block = new Block([[4,0],[4,1],[5,0],[5,1]],"yellow")
	} return block; 
};
/* for (var i=0; i<10; i++) {
	console.log("Random block", createBlock().colour, createBlock().coordinates);
	
} */
// var block = createBlock();

/* time step */
	
var time =setInterval(function (){ blockmove(block)}, 2000);
function blockmove () {
	collision = false;
	for (var i=0; i<block.coordinates.length; i++) {
		y=block.coordinates[i][1];
		if (y+1>=gridheight){
	 		console.log("collision!")		// collision detection sorted, for all directions. wont move block down at this point.
	 		collision = true;
	 		break;
		}
	} if (collision == false){
		for (var i=0; i<block.coordinates.length; i++) {
			block.coordinates[i][1] += 1	
	}} else if (collision == true) {
		block.active = false;
	}
	gameboard();
return block 
}


function addblock(block) {
	for (var i=0; i<block.coordinates.length; i++){
	 x=block.coordinates[i][0];
	 y=block.coordinates[i][1];
	 context.beginPath();					// draws block onto grid
	 context.fillStyle = block.colour; 
	 context.rect(x*20, (y-2)*20, 20, 20);  
	 context.fill();
	}
}



/* keyboard functions */
function moveleft(block) {
	collision = false;
	for (var i=0; i<block.coordinates.length; i++) {
		x = block.coordinates[i][0]
		if (x<=0){
			console.log("collision")
			collision = true;
		}
	} if (collision == false){
		for (var i=0; i<block.coordinates.length; i++) {
			block.coordinates[i][0] -= 1;
		}
	}
	gameboard();
return block 
	
} 

function moveright(block) {
	collision = false;
	for (var i=0; i<block.coordinates.length; i++) {
		x = block.coordinates[i][0]
		if (x+1 >= gridwidth) {
			console.log("collision")
			collision = true;
		}
	} if (collision == false){
		for (var i=0; i<block.coordinates.length; i++) {
			block.coordinates[i][0] += 1;
			}
	}
	gameboard();
return block 
	
}
 


function key(e) {
	if (!e) e=window.event
    switch (e.keyCode) {
        case 40: // down
        blockmove(block);
	    break;
	case 39: //right
	    moveright(block);
	    break;
	case 37: //left
	    moveleft(block);
	    break;

    }
};	

/* moving block */

requestAnimationFrame(gameloop);
function gameloop () {
	/* if (block.active == false){  // for creating new block
		block = new Block;
	} */
	addblock(block);
	requestAnimationFrame(gameloop); 
	}