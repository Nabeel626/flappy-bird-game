
import "./style.scss";

const highScoreDisplay : any = document.querySelector(".scoreboard__displayHighScore");
const scoreDisplay : any = document.querySelector(".scoreboard__displayScore");
const loadingBar = document.querySelector(".loadingbar");
const body = document.querySelector("#main");
const mainMenuPage = document.querySelector(".main-menu");

//WINDOW LOADER WHEN APP STARTS
const showPage = () => { //This is a on show function where the window is loadded then shpow the page

    body?.setAttribute("style", "background: url('./images/flappybirdbackground.gif'); background-size: cover; background-repeat:no-repeat;");
    loadingBar?.setAttribute("style", "display: none;");
    mainMenuPage?.setAttribute("style", "display: grid;");

    getItems();
}

const onPageLoad = () => { //This is a on load page function when the window loadsit does a specific command

    body?.setAttribute("style", "width: 100vw; height: 100vh; background-size: cover; background-repeat:no-repeat; background-image: linear-gradient(to bottom, #99ccff, #8ad4f5, #8dd9e5, #9ddbd5, #b2dcc8);");
    setTimeout(showPage, 4000); //this determines the loading time which is 4 seconds
}

const getItems = () => {

    highScoreDisplay.innerHTML = localStorage.getItem("highScore");
    scoreDisplay.innerHTML = localStorage.getItem("currentScore");

}

window.onload = () => { //When the window starts then it will run the page load function
    onPageLoad();
    
}
