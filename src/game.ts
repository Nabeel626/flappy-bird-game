import "./style.scss";

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

let score : number = 0;
let highscore : number = 0;

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
            
            let pipeProperty = item.getBoundingClientRect(); //This returns the size of an element and its position that is relative to the viewport/ window
            bird_props = bird_property.getBoundingClientRect(); //this has 8 properties -  left, top, right, bottom, x, y, width, height.

            if(pipeProperty.right <= 0){
                
                item.remove();

            } else {
                
                if(bird_props.left < pipeProperty.left + pipeProperty.width && bird_props.left + bird_props.width > pipeProperty.left && bird_props.top < pipeProperty.top + pipeProperty.height && bird_props.top + bird_props.height > pipeProperty.top){
                    
                    game_state = 'End';                    

                    message.innerHTML = 
                    `Game Over! <br><br> 

                    Score: ${Number(score_val.innerHTML)} <br><br> 

                    Press "ENTER" To Restart Game <br><br>
                    
                    <a href="index.html"><button class="return__backToMain">MENU</button></a>
                    <a href="scoreboard.html"><button class="return__backToScore">SCORE</button></a>`;

                    message.classList.add('messageStyle');
                    characterBird.style.display = 'none';

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

        console.log("bottom container " + container);
        console.log("bird property bottom " + bird_props.bottom);
        console.log("bird property top " + bird_props.top);

        if(bird_props.top <= 0 || bird_props.bottom >= container.height){

            game_state = 'End';
            message.style.left = '9vw';            

            game_state = 'Play';
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