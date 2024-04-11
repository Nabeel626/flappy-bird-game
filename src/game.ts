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

let game_state = 'Start'; //this sets the start for the game state, when this changes the game will end
characterBird.style.display = 'none'; 
message.classList.add('messageStyle'); //this sets adds the classlist to the message

document.addEventListener('keydown', (e) => { //this sets it so when the button is pressed the bird moves accordingly
    
    if(e.key == 'Enter' && game_state != 'Play'){
       
        document.querySelectorAll('.pipe_sprite').forEach((e) => {
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

        let pipe_sprite = document.querySelectorAll('.pipe_sprite');
        
        pipe_sprite.forEach((item : any) => {
            let pipe_sprite_props = item.getBoundingClientRect();
            bird_props = bird_property.getBoundingClientRect();

            if(pipe_sprite_props.right <= 0){
                
                item.remove();

            } else {
                
                if(bird_props.left < pipe_sprite_props.left + pipe_sprite_props.width && bird_props.left + bird_props.width > pipe_sprite_props.left && bird_props.top < pipe_sprite_props.top + pipe_sprite_props.height && bird_props.top + bird_props.height > pipe_sprite_props.top){
                    
                    game_state = 'End';
                    message.innerHTML = 
                    `Game Over! <br><br> 
                    
                    Press "ENTER" To Restart Game <br><br>
                    
                    <a href="index.html"><button class="return__backToMain">MENU</button></a>
                    <a href="scoreboard.html"><button class="return__backToScore">SCORE</button></a>`;

                    message.classList.add('messageStyle');
                    characterBird.style.display = 'none';
                    return;

                } else {
                    
                    if(pipe_sprite_props.right < bird_props.left && pipe_sprite_props.right + move_speed >= bird_props.left && item.increase_score == "1"){
                        score_val.innerHTML =+ score_val.innerHTML + 1;
                    }
                    item.style.left = pipe_sprite_props.left - move_speed + 'px';
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
            return;
        }
        bird_property.style.top = bird_props.top + bird_dy + 'px';
        bird_props = bird_property.getBoundingClientRect();

        requestAnimationFrame(apply_gravity); //this will apply the gravity onto the bird
    }

    requestAnimationFrame(apply_gravity);

    let pipe_seperation = 0;

    let pipe_gap = 35;

    const createPipe = () => { //this will create the pipes
        if(game_state != 'Play') return; 

        if(pipe_seperation > 115){ //if the pipes are seperated at a certain length
            pipe_seperation = 0;

            let pipe_posi = Math.floor(Math.random() * 43) + 8; //this randomisers the position of the
            
            let pipe_sprite_inv = document.createElement('div'); //this is teh pipe for the top
            pipe_sprite_inv.className = 'pipe_sprite';
            pipe_sprite_inv.style.top = pipe_posi - 70 + 'vh';
            pipe_sprite_inv.style.left = '100vw';

            document.body.appendChild(pipe_sprite_inv);  //this is teh pipe for the bottom
            let pipe_sprite : any = document.createElement('div');
            pipe_sprite.className = 'pipe_sprite';
            pipe_sprite.style.top = pipe_posi + pipe_gap + 'vh';
            pipe_sprite.style.backgroundImage = `url("/images/pipe1.png")`;
            pipe_sprite.style.width = ""
            pipe_sprite.style.left = '100vw';
            pipe_sprite.increase_score = '1';

            document.body.appendChild(pipe_sprite);
        }
        pipe_seperation++;
        requestAnimationFrame(createPipe);
    }
    requestAnimationFrame(createPipe);
}