
//constant variables
let direction = {x:0,y:0}
const boxSound = new Audio("../gameFiles/box.mp3")
const gameOverSound = new Audio("../gameFiles/gameOver.mp3")
const moveSound = new Audio("../gameFiles/moveSound.mp3")
const gameSound = new Audio("../gameFiles/gameSound.mp3")
gameSound.play();
let speed = 10;
let lastTime = 0;
let score = 0;
let boxArr = [
    {x:13, y:15}
]
food = {x: 6, y: 7};

//game functions
function main(ctime){
    window.requestAnimationFrame(main)
    //console.log(ctime);
    if((ctime-lastTime)/1000 < 1/speed){
        return;
    }
    lastTime = ctime;
    gameEngine()
    
}
function isCollide(box){
    //if box bumps into itself
    for(let i = 1; i<boxArr.length;i++){
        if(box[i].x === box[0].x && box[i].y === box[0].y){
            return true
        }
    }
    //if box is out of boundary
    if(box[0].x>=18|| box[0].x<=0 || box[0].y>=18 || box[0].y<=0){
        return true;
    }
    }
 
function gameEngine(){
    //updatin boxArr and food
    
    if(isCollide(boxArr)){
        gameOverSound.play();
        gameSound.pause();
        direction = {x:0, y:0};
        alert("Game Over. Press any key to play again");
        boxArr = [{x:8,y:8}];
        gameSound.play();
        score =0;
    }

    //box eaten another box, incrementing score
    if(boxArr[0].y=== food.y && boxArr[0].x === food.x){
        boxSound.play();
        score+=1
        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval));
            hiscoreBox.innerHTML = "High Score: " + hiscoreval;
        }
        scoreBox.innerHTML = "Score: " + score;
        boxArr.unshift({x: boxArr[0].x + direction.x,y: boxArr[0].y+direction.y})
        let a = 2;
        let b = 16;
        food = {x: Math.round(a+(b-a)*Math.random()), y:Math.round(a+(b-a)*Math.random())}
    }

    //moving box
    for (let i = boxArr.length-2; i >=0; i--) { 
        boxArr[i+1] = {...boxArr[i]};

    }
    boxArr[0].x += direction.x;
    boxArr[0].y += direction.y;

    //displaying box and score 
    board.innerHTML = "";
    boxArr.forEach((e, index)=>{
        boxElement = document.createElement('div');
        boxElement.style.gridRowStart = e.y;
        boxElement.style.gridColumnStart = e.x;
        if(index===0){
            boxElement.classList.add('boxHead')
        }else{
            boxElement.classList.add('box')
        }
        board.appendChild(boxElement);
    });
    //displaying food
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('boxFood')
        board.appendChild(foodElement);
}





let hiscore = localStorage.getItem('hiscore')
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "HiScore: " + hiscore;
}



window.requestAnimationFrame(main);
window.addEventListener('keydown',e=>{
    direction ={x:0,y:1};
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            direction.x = 0;
            direction.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            direction.x = 0;
            direction.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            direction.x = -1;
            direction.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            direction.x = 1;
            direction.y = 0;
            break;
        default:
            break;
    }
});