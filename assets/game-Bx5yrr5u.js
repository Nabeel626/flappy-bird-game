import"./style-C0TqwBll.js";let y=3,b=.2,s=document.querySelector(".character-bird"),c=document.querySelector("#characterBird"),h=document.querySelector(".container"),t=s.getBoundingClientRect();h.getBoundingClientRect();let i=document.querySelector(".score_val"),d=document.querySelector(".message"),S=document.querySelector(".score_title"),n="Start";c.style.display="none";d.classList.add("messageStyle");document.addEventListener("keydown",l=>{l.key=="Enter"&&n!="Play"&&(document.querySelectorAll(".showPipe").forEach(a=>{a.remove()}),c.style.display="block",s.style.top="40vh",n="Play",d.innerHTML="",S.innerHTML="Score : ",i.innerHTML="0",d.classList.remove("messageStyle"),v())});const v=()=>{const l=()=>{if(n!="Play")return;document.querySelectorAll(".showPipe").forEach(e=>{let o=e.getBoundingClientRect();if(t=s.getBoundingClientRect(),o.right<=0)e.remove();else if(t.left<o.left+o.width&&t.left+t.width>o.left&&t.top<o.top+o.height&&t.top+t.height>o.top){g(),n="End",d.innerHTML=`Game Over! <br><br> 

                    Score: ${Number(i.innerHTML)} <br><br> 

                    Press "ENTER" To Restart Game <br><br>
                    
                    <a href="index.html"><button class="return__backToMain">MENU</button></a>
                    <a href="scoreboard.html"><button class="return__backToScore">SCORE</button></a>`,d.classList.add("messageStyle"),c.style.display="none";return}else o.right<t.left&&o.right+y>=t.left&&e.increase_score=="1"&&(i.innerHTML=+i.innerHTML+1),e.style.left=o.left-y+"px"}),requestAnimationFrame(l)};requestAnimationFrame(l);let a=0;const u=()=>{if(n!="Play")return;a=a+b,document.addEventListener("keydown",e=>{(e.key=="ArrowUp"||e.key==" ")&&(c.src="/flappybirdv1.gif",a=-7.6)}),document.addEventListener("keyup",e=>{(e.key=="ArrowUp"||e.key==" ")&&(c.src="/flappybirdv1.gif")});let r=h.getBoundingClientRect();if(t.top<=r.top&&t.bottom<=r.top||t.top>=r.bottom&&t.bottom>r.bottom){g(),n="End",console.log("ENDED"),window.location.reload();return}s.style.top=t.top+a+"px",t=s.getBoundingClientRect(),requestAnimationFrame(u)};requestAnimationFrame(u);let p=0,f=35;const m=()=>{let r=document.createElement("div"),e=document.createElement("div");if(n=="Play"){if(p>115){p=0;let o=Math.floor(Math.random()*43)+8;e.className="showPipe",e.style.background='url("/pipe2.png") center center',e.style.backgroundSize="100% 100%",e.style.top=o-70+"vh",e.style.left="100vw",document.body.appendChild(e),r.className="showPipe",r.style.top=o+f+"vh",r.style.background='url("/pipe1.png") center center',r.style.backgroundSize="100% 100%",r.style.width="90px",r.style.left="100vw",r.increase_score="1",document.body.appendChild(r)}p++,requestAnimationFrame(m)}};requestAnimationFrame(m)},g=()=>{if(localStorage){localStorage.setItem("currentScore",String(i.innerHTML));const l=localStorage.getItem("highScore");i.innerHTML>l&&localStorage.setItem("highScore",String(i.innerHTML))}else alert("NO LOCAL STORAGE!")};
