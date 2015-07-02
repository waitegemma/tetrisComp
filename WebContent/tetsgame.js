var gridheight = 10;
var gridwidth = 6;

/* create grid of 0's */			
function creategrid() {
	var grid =[];
	for (i = 0;  i< gridheight; i++) {
		grid.push([]);
		for (j=0; j< gridwidth; j++) {
			grid[i].push(0);
		}
	}
	return grid
}
var grid = creategrid();




/* creating game board */
var canvas = document.getElementById('tetrisgame');
var context = canvas.getContext("2d");
 
function gameboard() {
for (i= 0;  i< gridheight; i++) {
	for (j=0; j< gridwidth; j++) {
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

/* block coordinates equal creategrid coordations make 0 be 1 */
var testblock =[[0,0],[1,0]];
var block1 = [[0,0],[0,1],[0,2],[0,3]]; 
var block2 =[[0,0],[1,0],[1,1],[1,2]];
var block3 = [[1,0],[1,1],[1,2],[0,2]];
var block4 = [[1,0],[0,1],[1,1],[0,2]];
var block5 = [[0,1],[1,0],[1,1],[1,2]];
var block6 = [[0,0],[1,0],[1,1],[1,2]];
var block7 =[[0,0],[0,1],[1,0],[1,1]]; 


var num = Math.floor(Math.random()*8);
var block = createblock (num);
	
function createblock (num) {
	if  (num <= 8) { var block = testblock; 
		} else if (num == 1) { var block = block1;
		} else if (num == 2) { var block = block2;
		} else if (num == 3) { var block = block3;
		} else if (num == 4) { var block = block4;
		} else if (num == 5) { var block = block5;
		} else if (num == 6) { var block = block6;
		} else if (num == 7) { var block = block7;
	} return block;
};

var z = createz (num);
 function createz (num) {
	 if  (num <= 8) { var z = 1; 
		} else if (num == 1) { var z = 2;
		} else if (num == 2) { var z = 3;
		} else if (num == 3) { var z = 4;
		} else if (num == 4) { var z = 5;
		} else if (num == 5) { var z = 6;
		} else if (num == 6) { var z = 7;
		} else if (num == 7) { var z = 8;
	} return z;
 };




/* time step */

	
var time =setInterval(function (){ blockmove(block)}, 5000);
function blockmove () {
	for (i=0; i<block.length; i++) {
	block[i][1] += 1	
	}
	gameboard();
return block 
}


function addblock(block,z) {
	for (i=0; i<block.length; i++){
	 x=block[i][0];
	 y=block[i][1];
	 	if (y!=gridheight){
	 		grid[y][x] = z ;
	 	} else {
	 		alert ("collision!")
	 		/* var num = Math.floor(Math.random()*8);
	 		var block = new array(createblock (num));
	 		var z = createz (num);
	 		return num, block, z; */
	 		return block;
	 		
	 	}
	}
}



/* keyboard functions */
function moveleft(block) {
	for (i=0; i<block.length; i++) {
		x = block[i][0]
		if (x != 0) {
			block[i][0] -= 1;
		}else{
		alert("collosion!")
		}
	}
	gameboard();
return block 
	
} 

function moveright(block) {
	for (i=0; i<block.length; i++) {
		x = block[i][0]
		if (x != gridwidth) {
	block[i][0] += 1;
		} else {
			alert("collosion!")
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
	grid=creategrid();
	addblock(block,z);
	requestAnimationFrame(gameloop); 
	}
