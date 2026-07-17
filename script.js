/* =====================================================
   PITI
   Parte 1
===================================================== */

const CORRECT_PIN = "2405";

const loginCard = document.getElementById("loginCard");
const letterSection = document.getElementById("letterSection");

const inputs = document.querySelectorAll(".digit");

const unlockBtn = document.getElementById("unlockBtn");

const errorText = document.getElementById("errorText");

const audioContainer = document.getElementById("audioContainer");

/* ==============================
      CANVAS ESTRELLAS
============================== */

const canvas = document.getElementById("stars");

const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas(){

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

}

window.addEventListener("resize",resizeCanvas);

resizeCanvas();

function createStars(){

    stars=[];

    for(let i=0;i<260;i++){

        stars.push({

            x:Math.random()*canvas.width,

            y:Math.random()*canvas.height,

            r:Math.random()*2,

            a:Math.random(),

            speed:.002+Math.random()*.004

        });

    }

}

createStars();

function drawStars(){

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>{

        star.a+=star.speed;

        let alpha=(Math.sin(star.a)+1)/2;

        ctx.beginPath();

        ctx.arc(star.x,star.y,star.r,0,Math.PI*2);

        ctx.fillStyle="rgba(255,255,255,"+alpha+")";

        ctx.fill();

    });

    requestAnimationFrame(drawStars);

}

drawStars();

/* ==============================
      INPUT PIN
============================== */

inputs.forEach((input,index)=>{

    input.addEventListener("input",()=>{

        input.value=input.value.replace(/[^0-9]/g,"");

        if(input.value && index<inputs.length-1){

            inputs[index+1].focus();

        }

    });

    input.addEventListener("keydown",(e)=>{

        if(e.key==="Backspace" && input.value===""){

            if(index>0){

                inputs[index-1].focus();

            }

        }

    });

});
