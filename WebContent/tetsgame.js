/**
 * 
 */
var gridheight = 10;
var gridwidth = 6;


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
console.log(grid);




/* creating game board */
var canvas = document.getElementById('tetrisgame');
var context = canvas.getContext("2d");
 
function gameboard() {
for (var i= 0;  i< gridheight; i++) {
	for (var j=0; j< gridwidth; j++) {
		if (grid[i][j] == 0 ){ 
			context.beginPath();
			context.fillStyle = "white";
			context.rect(j*20, i*20, 20, 20);  
			context.fill();
		} else {
			context.beginPath();
			context.fillStyle = "blue";
			context.rect(j*20, i*20, 20, 20);  
			context.fill();
		}
	}
			
	}
}
gameboard();

/* block coordinates equal create grid coordinations make 0 be 1 */
var testblock = { 
		coord: [[0,0],[1,0],[1,1]],
		z: 1
};
var block1 = {
		coord: [[0,0],[0,1],[0,2],[0,3]],
		z: 2
};
var block2 = {
		coord: [[0,0],[1,0],[1,1],[1,2]],
		z: 3
};
var block3 = {
		coord: [[1,0],[1,1],[1,2],[0,2]],
		z: 4
};
var block4 = {
		coord: [[1,0],[0,1],[1,1],[0,2]],
		z: 5
};
var block5 = {
		coord: [[0,1],[1,0],[1,1],[1,2]],
		z: 6
};
var block6 = {
		coord: [[0,0],[1,0],[1,1],[1,2]],
		z: 7
};
var block7 = {
		coord: [[0,0],[0,1],[1,0],[1,1]],
		z: 8
};


var num = Math.floor(Math.random()*8);
var block = new Object();
	
function createblock (num) {
	if  (num <= 8) { block.coord = testblock.coord; block.z = testblock.z; 
		} else if (num == 1) { block.coord = block1.coord; block.z = block1.z;
		} else if (num == 2) { block.coord = block2.coord; block.z = block2.z;
		} else if (num == 3) { block.coord = block3.coord; block.z = block3.z;
		} else if (num == 4) { block.coord = block4.coord; block.z = block4.z;
		} else if (num == 5) { block.coord = block5.coord; block.z = block5.z;
		} else if (num == 6) { block.coord = block6.coord; block.z = block6.z;
		} else if (num == 7) { block.coord = block7.coord; block.z = block7.z;
	} return block.coord, block.z; 
};

createblock (num);
console.log(block.coord);
console.log(block.z);
console.log(block);
blockLength = Object.keys(block.coord).length
console.log(blockLength);





/* time step */

	
var time =setInterval(function (){ blockmove(block)}, 2000);
function blockmove () {
	for (var i=0; i<blockLength; i++) {
	block.coord[i][1] += 1	
	}
	gameboard();
return block 
}


function addblock(block,z) {
	grid=creategrid();
	for (var i=0; i<blockLength; i++){
	 x=block.coord[i][0];
	 y=block.coord[i][1];
	 	if (y!=gridheight){
	 		grid[y][x] = z ;
	 	} else {
	 		console.log("collision!")
	 		/* var num = Math.floor(Math.random()*8);
	 		var block = new array(createblock (num));
	 		return num, block, z; */
	 		
	 	}
	}
}



/* keyboard functions */
function moveleft(block) {
	for (var i=0; i<blockLength; i++) {
		x = block.coord[i][0]
		if (x != 0) {
			block.coord[i][0] -= 1;
		}else{
		console.log("collosion!")
		}
	}
	gameboard();
return block 
	
} 

function moveright(block) {
	for (var i=0; i<blockLength; i++) {
		x = block.coord[i][0]
		if (x != gridwidth) {
	block.coord[i][0] += 1;
		} else {
			console.log("collosion!")
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
	addblock(block);
	requestAnimationFrame(gameloop); 
	}