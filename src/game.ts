// let block : any = document.getElementById("blocks");
// let hole : any = document.getElementById("holepath");
// let character : any = document.getElementById("character-bird");

// let jumping = 0;
// let counter = 0;
// let highscore = 0;

// hole.addEventListener('animationiteration', () => {
//     let random = -((Math.random() * 300) + 150);
//     hole.style.top = random + "px";
//     counter++;
// });

// setInterval(() => {
//     let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
//     if(jumping == 0){
//         character.style.top = (characterTop + 3) +"px";
//     }
//     let blockLeft = parseInt(window.getComputedStyle(block).getPropertyValue("left"));
//     let holeTop = parseInt(window.getComputedStyle(hole).getPropertyValue("top"));
//     let cTop = -(500 - characterTop);
//     if((characterTop > 480) || ((blockLeft < 20) && (blockLeft >- 50) && ((cTop < holeTop) || (cTop > holeTop + 130)))){
//         if(counter > highscore) {
            
//             counter = highscore;
//             alert(`Game over! You got a new Score! Highscore: ${highscore}  Score: ${counter}`);

//         } else if (counter <= highscore) {
//             alert(`Game over! Better Luck next time! Highscore: ${highscore}  Score: ${counter}`);
//         } 

//         console.log(highscore + ",     score: " + counter);

//         character.style.top = 100 + "px";        
//         counter = 0;
        

//     }
// },10);

// const jump = () => {
//     jumping = 1;
//     let jumpCount = 0;
//     let jumpInterval = setInterval(() => {
//         let characterTop = parseInt(window.getComputedStyle(character).getPropertyValue("top"));
//         if((characterTop > 6) && (jumpCount < 15)){
//             character.style.top = (characterTop - 5) + "px";
//         }
//         if(jumpCount>20){
//             clearInterval(jumpInterval);
//             jumping = 0;
//             jumpCount = 0;
//         }
//         jumpCount++;
//     },10);
// }

// window.addEventListener("click", jump)

let move_speed = 3, grativy = 0.5;
let bird_property : any = document.querySelector('.character-bird');
let characterBird : any = document.querySelector('#characterBird');
let container : any = document.querySelector<Element>('.container');

// getting grabs bird element properties
let bird_props = bird_property.getBoundingClientRect();

// This method returns DOMReact for the -> top, right, bottom, left, x, y, width and height
container.getBoundingClientRect();

let score_val : any = document.querySelector('.score_val');
let message : any = document.querySelector('.message');
let score_title : any = document.querySelector('.score_title');

let score = 0;
let highscore = 0;

let game_state = 'Start'; //this sets the start for the game state, when this changes the game will end
characterBird.style.display = 'none'; 
message.classList.add('messageStyle'); //this sets adds the classlist to the message

document.addEventListener('keydown', (e) => { //this sets it so when the button is pressed the bird moves accordingly
    
    if(e.key == 'Enter' && game_state != 'Play'){
       
        document.querySelectorAll('.showPipe').forEach((e) => {
            e.remove();
        });

        characterBird.style.display = 'block';
        bird_property.style.top = '40vh';
        game_state = 'Play';
        message.innerHTML = '';
        score_title.innerHTML = 'Score : ';
        score_val.innerHTML = '0';
        message.classList.remove('messageStyle');
        play();
    }
});

const play = () => {
    
    const move = () => {
        
        if(game_state != 'Play') return;

        let showPipe = document.querySelectorAll('.showPipe');
        
        showPipe.forEach((item : any) => {
            let pipeProperty = item.getBoundingClientRect();
            bird_props = bird_property.getBoundingClientRect();

            if(pipeProperty.right <= 0){
                
                item.remove();

            } else {
                
                if(bird_props.left < pipeProperty.left + pipeProperty.width && bird_props.left + bird_props.width > pipeProperty.left && bird_props.top < pipeProperty.top + pipeProperty.height && bird_props.top + bird_props.height > pipeProperty.top){
                    
                    score = score_val.innerHTML;
                    
                    if(score > highscore) {

                        highscore = score;
                        console.log("you beat highscore");

                    } else {

                        console.log("you did not beat highscore");
                        

                    }

                    console.log(highscore);

                    game_state = 'End';                    

                    message.innerHTML = 
                    `Game Over! <br><br> 

                    Score: ${score} <br><br> 

                    Press "ENTER" To Restart Game <br><br>
                    
                    <a href="index.html"><button class="return__backToMain">MENU</button></a>
                    <a href="scoreboard.html"><button class="return__backToScore">SCORE</button></a>`;

                    message.classList.add('messageStyle');
                    characterBird.style.display = 'none';
                    return;

                } else {
                    
                    if(pipeProperty.right < bird_props.left && pipeProperty.right + move_speed >= bird_props.left && item.increase_score == "1"){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                    }
                    item.style.left = pipeProperty.left - move_speed + 'px';
                }
            }
        });

        requestAnimationFrame(move); //this requests an animation for the move function
    }

    requestAnimationFrame(move); //this requests an animation for the move function

    let bird_dy = 0;

    const apply_gravity = () => {
        
        if(game_state != 'Play') return;
        bird_dy = bird_dy + grativy;

        document.addEventListener('keydown', (event) => {
            if(event.key == 'ArrowUp' || event.key == ' '){
                characterBird.src = '/images/flappybirdv1.gif';
                bird_dy = -7.6;
            }
        });

        if(bird_props.top <= 0 || bird_props.bottom >= container.bottom){
            
            game_state = 'End';
            message.style.left = '9vw';

            window.location.reload();
            message.classList.remove('messageStyle');

        }

        bird_property.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird_property.getBoundingClientRect();

        requestAnimationFrame(apply_gravity); //this will apply the gravity onto the bird
    }

    requestAnimationFrame(apply_gravity);

    let seperatePipes = 0;
    let pipeGap = 35;

    const createPipe = () => { //this will create the pipes
            
        let showPipe : any = document.createElement('div');
        let showPipeInverted = document.createElement('div'); //this is the pipe for the top

        if(game_state != 'Play') return; 

        if(seperatePipes > 115){ //if the pipes are seperated at a certain length
            seperatePipes = 0;

            let pipePosition = Math.floor(Math.random() * 43) + 8; //this randomisers the position of the
            
            showPipeInverted.className = 'showPipe'; //this is styling for the pipes that are at the top
            showPipeInverted.style.background = `url("/images/pipe2.png") center center`;
            showPipeInverted.style.backgroundSize = "100% 100%";
            showPipeInverted.style.top = pipePosition - 70 + 'vh';
            showPipeInverted.style.left = '100vw';

            document.body.appendChild(showPipeInverted);  //this is the pipe for the bottom

            showPipe.className = 'showPipe'; //this is styling for the pipes that are at the bottom
            showPipe.style.top = pipePosition + pipeGap + 'vh';
            showPipe.style.background = `url("/images/pipe1.png") center center`;
            showPipe.style.backgroundSize = "100% 100%";
            showPipe.style.width = 90 + "px";
            showPipe.style.left = '100vw';
            showPipe.increase_score = '1';

            document.body.appendChild(showPipe);
        }

        seperatePipes++;
        requestAnimationFrame(createPipe);
    }
    requestAnimationFrame(createPipe);
}