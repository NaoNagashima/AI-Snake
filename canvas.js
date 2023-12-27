var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

const fps = 10;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var start_pos = 100;
var row_count = 20;
var col_count = 20;
var cell_length = 25;

var apple_count = 0;

const snake_queue = [];

var grid = [];
for (let i = 0; i < row_count; i++) {
    grid[i] = [];
    for (let j = 0; j < col_count; j++) {
        grid[i][j] = 0;
    }
}

var current_pos = [0, 0];
grid[0][0] = 1;

var moving_dir = "left";

var x = 200;
var y = 200;

generate_apple();
animate();

function generate_apple(){
    grid[Math.floor(Math.random() * row_count)][Math.floor(Math.random() * col_count)] = 2;
}

function eat_apple(x, y){
    console.log(x,y);
    if (x < 20 && y < 20 && grid[x][y] == 2){
        apple_count += 1;
        generate_apple();
    }

}

function draw_grid(){
    for (let row = 0; row < row_count; row++){
        for (let col = 0; col < col_count; col++){
            if (grid[row][col] == 0){
                if(row%2 == 0 && col%2 == 0 || row%2 == 1 && col%2 == 1){
                    ctx.fillStyle = '#43de69';
                } else{
                    ctx.fillStyle = '#32a84f';
                }
            } else if(grid[row][col] == 2){
                ctx.fillStyle = 'red';
            } else{
                ctx.fillStyle = 'blue';
            }
            let x_pos = row*cell_length + start_pos;
            let y_pos = col*cell_length + start_pos;
            
            ctx.fillRect(x_pos, y_pos, cell_length, cell_length);
        }
    }

}

function next_snake_pos(){
    
    var snake_row = current_pos[0];
    var snake_col = current_pos[1];
    
    switch(moving_dir){
        case "right":
            if(snake_row < row_count-1){
                eat_apple(snake_row+1, snake_col);
                grid[snake_row+1][snake_col] = 1;
                current_pos = [snake_row+1, snake_col];
                grid[snake_row][snake_col] = 0;
            }
            break;
        case "left":
            if(snake_row > 0){
                eat_apple(snake_row-1, snake_col);
                grid[snake_row-1][snake_col] = 1;
                current_pos = [snake_row-1, snake_col];
                grid[snake_row][snake_col] = 0;
            }
            break;
        case "up":
            if(snake_col > 0){
                eat_apple(snake_row, snake_col-1);
                grid[snake_row][snake_col-1] = 1;
                current_pos = [snake_row, snake_col-1];
                grid[snake_row][snake_col] = 0;
            }
            break;
        case "down":
            if(snake_col < col_count-1){
                eat_apple(snake_row, snake_col+1);
                grid[snake_row][snake_col+1] = 1;
                current_pos = [snake_row, snake_col+1];
                grid[snake_row][snake_col] = 0;
            }
            break;
    }

}

function animate(){
    setTimeout(() => {
        requestAnimationFrame(animate);
      }, 1000 / fps);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillText(apple_count, 10, 50);
    next_snake_pos();
    draw_grid();
}

document.onkeydown = function (event) {
    switch(event.key){
        case "a":
            moving_dir = "left";
            break;
        case "d":
            moving_dir = "right";
            break;
        case "w":
            moving_dir = "up";
            break;
        case "s":
            moving_dir = "down";
        break;
    }
};