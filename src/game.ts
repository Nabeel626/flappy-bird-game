let block : any = document.getElementById("blocks");
let hole : any = document.getElementById("holepath");
let character : any = document.getElementById("character-bird");

let jumping = 0;
let counter = 0;
let highscore = 0;

hole.addEventListener('animationiteration', () => {
    let random = -((Math.random() * 300) + 150);
    hole.style.top = random + "px";
    counter++;
});

setInterval(() => {
    let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
    if(jumping == 0){
        character.style.top = (characterTop + 3) +"px";
    }
    let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
    let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
    let cTop = -(500 - characterTop);
    if((characterTop > 480) || ((blockLeft < 20) && (blockLeft >- 50) && ((cTop < holeTop) || (cTop > holeTop + 130)))){
        if(counter > highscore) {
            
            counter = highscore;
            alert(`Game over! You got a new Score! Highscore: ${highscore}  Score: ${counter}`);

        } else if (counter <= highscore) {
            alert(`Game over! Better Luck next time! Highscore: ${highscore}  Score: ${counter}`);
        } 

        console.log(highscore + ",     score: " + counter);

        character.style.top = 100 + "px";        
        counter = 0;
        

    }
},10);

const jump = () => {
    jumping = 1;
    let jumpCount = 0;
    let jumpInterval = setInterval(() => {
        let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
        if((characterTop > 6) && (jumpCount < 15)){
            character.style.top = (characterTop - 5) + "px";
        }
        if(jumpCount>20){
            clearInterval(jumpInterval);
            jumping = 0;
            jumpCount = 0;
        }
        jumpCount++;
    },10);
}

window.addEventListener("click", jump)