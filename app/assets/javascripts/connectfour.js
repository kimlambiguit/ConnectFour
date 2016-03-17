var ConnectFour = {};

ConnectFour.CurrentTurn = "";
ConnectFour.rowSize = 0;
ConnectFour.colSize = 0;
ConnectFour.Board = [];

ConnectFour.initBoard = function(){
	for(col = 0 ; col < this.colSize; col++){
		this.Board[col] = [];
		for (row=0; row < this.rowSize; row++){
			this.Board[col][row] = null;
		}
	}
	ConnectFour.CurrentTurn = "blue";
};

ConnectFour.init = function(rowSize,colSize){
	this.rowSize = rowSize;
	this.colSize = colSize;
	this.initBoard();
	$('#currentTurn').html("<font style='color:"+this.CurrentTurn+";'>" + this.CurrentTurn+"</font>");
};

ConnectFour.drop = function(col){
	var getEmptyRowIndex = function(){
		var row = -1;
		for(r = ConnectFour.rowSize-1; r > -1; r--){
			var img = $('#cell'+r + "" + col +"empty");
			if(img.is(":visible")){
				row = r;
				break;
			}
		}
		return row;
	};
	var rowIdx = getEmptyRowIndex();
	
	if(rowIdx > -1){
		this.Board[col][rowIdx] = this.CurrentTurn;
		$('#cell'+rowIdx + "" + col+"empty").hide();
		$('#cell'+rowIdx + "" + col+""+this.CurrentTurn).show();
		var winner = this.checkWinner();
		if(winner){
			alert(winner + ' won!');
			this.reset();
		} else if(this.isBoardFull()){
			alert('Tie!');
			this.reset();
		} else {
			this.updateTurn();
		}
	}
};

ConnectFour.updateTurn = function(){
	this.CurrentTurn = this.CurrentTurn == "blue" ? "red" : "blue";
	$('#currentTurn').html("<font style='color:"+this.CurrentTurn+";'>" + this.CurrentTurn+"</font>");
};

ConnectFour.reset = function(){
	for(row = 0 ; row < this.rowSize; row++){
		for (col=0; col < this.colSize; col++){
			$('#cell'+row + "" + col+"empty").show();
			$('#cell'+row + "" + col+"red").hide();
			$('#cell'+row + "" + col+"blue").hide();
		}
	}
	ConnectFour.initBoard();
	$('#currentTurn').html("<font style='color:"+this.CurrentTurn+";'>" + this.CurrentTurn+"</font>");
};

ConnectFour.checkLine = function(w,x,y,z){
    return w != null && w == x && w==y && w==z;
};

ConnectFour.isBoardFull = function(){
	var full = true;
	for(col = 0 ; col < this.colSize; col++){
		for (row=0; row < this.rowSize; row++){
			if(this.Board[col][row] == null){
				full = false;
				break;
			}
		}
	}
	return full;
};
ConnectFour.checkWinner = function(){
	//check horizontal win
	for( row = 0; row < 3; row++){
		for(col = 0; col < this.colSize; col++){
			if(this.checkLine(this.Board[col][row], this.Board[col][row+1], this.Board[col][row+2], this.Board[col][row+3])){
				return this.Board[col][row];
			}
		}
	}

	//check horizontal win
	for( row = 0; row < this.rowSize; row++){
		for(col = 0; col < 4; col++){
			if(this.checkLine(this.Board[col][row], this.Board[col+1][row], this.Board[col+2][row], this.Board[col+3][row])){
				return this.Board[col][row];
			}
		}
	}

	//check diagonal down-right win
	for( row = 0; row < 3; row++){
		for(col = 0; col < 4; col++){
			if(this.checkLine(this.Board[col][row], this.Board[col+1][row+1], this.Board[col+2][row+2], this.Board[col+3][row+3])){
				return this.Board[col][row];
			}
		}
	}

	//check diagonal down-left win
	for( row = 3; row < this.rowSize; row++){
		for(col = 0; col < 4; col++){
			if(this.checkLine(this.Board[col][row], this.Board[col+1][row-1], this.Board[col+2][row-2], this.Board[col+3][row-3])){
				return this.Board[col][row];
			}
		}
	}

	return null;
};