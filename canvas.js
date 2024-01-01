var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

const fps = 10;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const start_pos = 100;
const row_count = 20;
const col_count = 20;
const cell_length = 25;

var apple_count = 0;

var grid = [];
for (let i = 0; i < row_count; i++) {
    grid[i] = [];
    for (let j = 0; j < col_count; j++) {
        grid[i][j] = 0;
    }
}

var current_pos = [0, 0];
grid[0][0] = 1;

var snake_queue = [];
snake_queue.push(current_pos);

var moving_dir = "right";

var x = 200;
var y = 200;

generate_apple();
animate();

function generate_apple(){
    grid[Math.floor(Math.random() * row_count)][Math.floor(Math.random() * col_count)] = 2;
}

function eat_apple(x, y){
    if (x < 20 && y < 20 && grid[x][y] == 2){
        apple_count += 1;
        snake_queue.push(current_pos);
        grid[x][y] = 0;
        generate_apple();
    }
}

function draw_grid(){

    snake_queue.shift();
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
            }
            for (var i=0; i<snake_queue.length; i++){
                if (snake_queue[i][0] == row && snake_queue[i][1] == col) {
                    ctx.fillStyle = 'blue';
                }
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
                eat_apple(snake_row+1, snake_col, 'right');
                snake_queue.push([snake_row+1, snake_col]);
                current_pos = [snake_row+1, snake_col];
            }
            break;
        case "left":
            if(snake_row > 0){
                eat_apple(snake_row-1, snake_col, 'left');
                snake_queue.push([snake_row-1, snake_col]);
                current_pos = [snake_row-1, snake_col];
            }
            break;
        case "up":
            if(snake_col > 0){
                eat_apple(snake_row, snake_col-1, 'up');
                snake_queue.push([snake_row, snake_col-1]);
                current_pos = [snake_row, snake_col-1];
            }
            break;
        case "down":
            if(snake_col < col_count-1){
                eat_apple(snake_row, snake_col+1, 'down');
                snake_queue.push([snake_row, snake_col+1]);
                current_pos = [snake_row, snake_col+1];
            }
            break;
    }
    console.log(snake_queue)

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

