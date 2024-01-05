const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var fps = 5;
const start_pos = 100;
const row_count = 20;
const col_count = 20;
const cell_length = 25;
var apple_count = 0;
var game_paused = false;

var grid = [];
for (let i = 0; i < row_count; i++) {
    grid[i] = [];
    for (let j = 0; j < col_count; j++) {
        grid[i][j] = 0;
    }
}

const snake_head_up = document.getElementById("snake_head_up");
const snake_head_left = document.getElementById("snake_head_left");
const snake_head_right = document.getElementById("snake_head_right");
const snake_head_down = document.getElementById("snake_head_down");

var current_pos = [0, 0];
var snake_queue = [];
snake_queue.push(current_pos);

var moving_dir = "right";
var x = 200;
var y = 200;
generate_apple();
animate();

function hit_snake(row, col){
    for (var i=0; i<snake_queue.length; i++){
        if (snake_queue[i][0] == row && snake_queue[i][1] == col) {
            return true;
        }
    }
    return false;
}

function generate_apple(){
    var row = Math.floor(Math.random() * row_count);
    var col = Math.floor(Math.random() * col_count);
    while (hit_snake(row, col)){
        row = Math.floor(Math.random() * row_count);
        col = Math.floor(Math.random() * col_count);
    }
    grid[row][col] = 2;
}

function eat_apple(x, y){
    if (x < 20 && y < 20 && grid[x][y] == 2){
        apple_count += 1;
        fps += 0.5;
        snake_queue.push(current_pos);
        grid[x][y] = 0;
        generate_apple();
    }
}

function game_over(){
    game_paused = true;
}

function draw_grid(){
    if (!game_paused) snake_queue.shift();
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
            if (hit_snake(row, col)){
                switch(moving_dir){
                    case "right":
                        ctx.drawImage(snake_head_right, row*cell_length + start_pos, col*cell_length + start_pos);
                        break;
                    case "left":
                        ctx.drawImage(snake_head_left, row*cell_length + start_pos, col*cell_length + start_pos);
                        break;
                    case "up":
                        ctx.drawImage(snake_head_up, row*cell_length + start_pos, col*cell_length + start_pos);
                        break;
                    case "down":
                        ctx.drawImage(snake_head_down, row*cell_length + start_pos, col*cell_length + start_pos);
                        break;
                }
            }
            else{
            let x_pos = row*cell_length + start_pos;
            let y_pos = col*cell_length + start_pos;
            
            ctx.fillRect(x_pos, y_pos, cell_length, cell_length);
            }
        }
    }
}

function next_snake_pos(){
    var snake_row = current_pos[0];
    var snake_col = current_pos[1];
    switch(moving_dir){
        case "right":
            if(snake_row < row_count-1 && !hit_snake(snake_row+1, snake_col)){
                eat_apple(snake_row+1, snake_col);
                snake_queue.push([snake_row+1, snake_col]);
                current_pos = [snake_row+1, snake_col];
            } else{
                game_over();
            }
            break;
        case "left":
            if(snake_row > 0 && !hit_snake(snake_row-1, snake_col)){
                eat_apple(snake_row-1, snake_col);
                snake_queue.push([snake_row-1, snake_col]);
                current_pos = [snake_row-1, snake_col];
            } else{
                game_over();
            }
            break;
        case "up":
            if(snake_col > 0 && !hit_snake(snake_row, snake_col-1)){
                eat_apple(snake_row, snake_col-1);
                snake_queue.push([snake_row, snake_col-1]);
                current_pos = [snake_row, snake_col-1];
            } else{
                game_over();
            }
            break;
        case "down":
            if(snake_col < col_count-1 && !hit_snake(snake_row, snake_col+1)){
                eat_apple(snake_row, snake_col+1);
                snake_queue.push([snake_row, snake_col+1]);
                current_pos = [snake_row, snake_col+1];
            } else{
                game_over();
            }
            break;
    }
}

function animate(){
    const timer = setTimeout(() => {
        requestAnimationFrame(animate);
      }, 1000 / fps);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.font = "30px Arial";
    ctx.fillText(apple_count, 10, 50);
    next_snake_pos();
    if (game_paused) clearTimeout(timer);
    draw_grid();
}

document.onkeydown = function (event) {
    switch(event.key){
        case "a":
            if (moving_dir != "right" || apple_count == 0) moving_dir = "left";
            break;
        case "d":
            if (moving_dir != "left" || apple_count == 0) moving_dir = "right";
            break;
        case "w":
            if (moving_dir != "down" || apple_count == 0) moving_dir = "up";
            break;
        case "s":
            if (moving_dir != "up" || apple_count == 0) moving_dir = "down";
        break;
    }
};

