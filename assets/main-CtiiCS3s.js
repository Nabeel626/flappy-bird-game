import"./style-CupQlkY-.js";const r=document.querySelector(".scoreboard__displayHighScore"),c=document.querySelector(".scoreboard__displayScore"),t=document.querySelector(".loadingbar"),e=document.querySelector("#main"),o=document.querySelector(".main-menu"),n=()=>{e==null||e.setAttribute("style","height: 100vh; margin: 0; box-sizing: border-box; background: url('src/images/flappybirdbackground.gif'); background-size: cover; background-repeat:no-repeat;"),t==null||t.setAttribute("style","display: none;"),o==null||o.setAttribute("style","display: grid;"),i()},a=()=>{e==null||e.setAttribute("style","width: 100vw; height: 100vh; background-size: cover; background-repeat:no-repeat; background-image: linear-gradient(to bottom, #99ccff, #8ad4f5, #8dd9e5, #9ddbd5, #b2dcc8);"),setTimeout(n,4e3)},i=()=>{r.innerHTML=localStorage.getItem("highScore"),c.innerHTML=localStorage.getItem("currentScore")};window.onload=()=>{a()};