//Constants
var NUM_COLUMNS=10;
var NUM_ROWS=15;
var BRICK_SIZE=30;

//Grid variables
var grid_width=NUM_COLUMNS*BRICK_SIZE;
var grid_height=NUM_ROWS*BRICK_SIZE;

//Canvas variables
var canvas;
var context;
canvas_width = grid_width + 1;
canvas_height = grid_height + 1;

//App variables
var store = null;
var grid = null;
var selected_brick_class = null;
var current_button = null;

function clearCanvas(){
	canvas.width = canvas_width;
	canvas.height = canvas_height;
}

function draw(){
	//Clean stuff first
	clearCanvas();
	context.translate(0.5, 0.5);
	grid.draw(context);
}

function initUI(){
	$(canvas).click(on_grid_clicked);
	$("#bricks-container button").click(function(event){
		event.preventDefault();
		var id = $(this).attr("id");
		set_brick(id);
	});
	$("#clear-track").click(function(event){
		event.preventDefault();
		grid.clear();
		draw();
	});
}

function set_brick(button_id){
	if(current_button){
		current_button.removeAttr("disabled");
	}
	current_button = $("#"+button_id);
	current_button.attr("disabled","disabled");
	
	switch(button_id){
		case "square-brick":
			selected_brick_class = Square;
		break;
		case "circle-brick":
			selected_brick_class = Circle;
		break;
		case "triangle-brick":
			selected_brick_class = Triangle;
		break;
		case "curve-brick":
			selected_brick_class = Curve;
		break;
	}
}

function on_grid_clicked(event){
	console.log("on grid clicked")

	//both calls are consiered, either offsetX or layerX
	var mouseX = (event.offsetX || event.clientX - $(event.target).offset().left);
	//both calls are consiered, either offsetY or layerY
	var mouseY = (event.offsetY || event.clientY - $(event.target).offset().left);
	var column = Math.floor(mouseX / BRICK_SIZE);
	var row = Math.floor(mouseY / BRICK_SIZE);
	console.log("BSIZE:",BRICK_SIZE);
	console.log("mX:",mouseX);
	console.log("mY:",mouseY);
	console.log("col:",column)
	console.log("row:",row)
	var selected_brick = grid.get_brick_at(column, row);
	if(selected_brick){
		selected_brick.rotation += 90;
		draw();
	}
	else{
		create_brick_at(column, row);
	}
}

function create_brick_at(column, row){
	if(!selected_brick_class) return;
	var brick = new selected_brick_class();
	brick.column = column;
	brick.row = row;
	grid.add_brick(brick, context);
}

//jQuery function when the DOM's ready
$(document).ready(function(){
	//enable all buttons
	canvas = document.getElementById('grid');
	context = canvas.getContext('2d');
	grid = new Grid(grid_width, grid_height, BRICK_SIZE);
	//init UI
	initUI();
	//draw app contents in canvas
	draw();
});
