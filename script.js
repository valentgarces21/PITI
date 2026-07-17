/* =====================================================
   PITI - CÓDIGO COMPLETO CON CORAZONES Y ESTRELLAS
===================================================== */

const CORRECT_PIN = "2405";

const loginCard = document.getElementById("loginCard");
const letterSection = document.getElementById("letterSection");
const inputs = document.querySelectorAll(".digit");
const unlockBtn = document.getElementById("unlockBtn");
const errorText = document.getElementById("errorText");
const audioContainer = document.getElementById("audioContainer");

/* ==========================================
      CANVAS: ESTRELLAS TITILANTES Y CORAZONES
========================================== */

const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let elements = [];

function resizeCanvas(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createBackground() {
    elements = [];
    
    // Creación de 100 estrellas titilantes
    for(let i = 0; i < 100; i++){
        elements.push({
            type: "star",
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5 + 0.5,
            alpha: Math.random(),
            speed: 0.01 + Math.random() * 0.02
        });
    }

    // Creación inicial de 40 corazones flotantes
    for(let i = 0; i < 40; i++){
        elements.push(newHeart(true)); // true indica que se distribuyen por toda la pantalla al inicio
    }
}

function newHeart(randomY = false) {
    return {
        type: "heart",
        x: Math.random() * canvas.width,
        y: randomY ? Math.random() * canvas.height : canvas.height + 20,
        size: Math.random() * 12 + 6, // Tamaños variados
        speed: 0.4 + Math.random() * 0.8, // Velocidad de subida
        opacity: 0.1 + Math.random() * 0.5, // Transparencia sutil para que no tape el texto
        wobble: Math.random() * 100,
        wobbleSpeed: 0.02 + Math.random() * 0.03
    };
}

// Función auxiliar para dibujar corazones en el Canvas
function drawHeartShape(ctx, x, y, size) {
    ctx.moveTo(x, y + size / 4);
    ctx.bezierCurveTo(x, y, x - size / 2, y, x - size / 2, y + size / 4);
    ctx.bezierCurveTo(x - size / 2, y + (size * 5) / 8, x, y + (size * 7) / 8, x, y + size);
    ctx.bezierCurveTo(x, y + (size * 7) / 8, x + size / 2, y + (size * 5) / 8, x + size / 2, y + size / 4);
    ctx.bezierCurveTo(x + size / 2, y, x, y, x, y + size / 4);
}

function drawBackground(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    elements.forEach((el, index) => {
        if (el.type === "star") {
            // Lógica de titileo (brillo que cambia)
            el.alpha += el.speed;
            let currentAlpha = (Math.sin(el.alpha) + 1) / 2;
            
            ctx.beginPath();
            ctx.arc(el.x, el.y, el.size, 0, Math.PI * 2);
            ctx.fillStyle = "rgba(255, 255, 255, " + currentAlpha * 0.6 + ")";
            ctx.fill();
        } 
        else if (el.type === "heart") {
            // Movimiento hacia arriba y leve balanceo de lado a lado
            el.y -= el.speed;
            el.wobble += el.wobbleSpeed;
            let currentX = el.x + Math.sin(el.wobble) * 15;
            
            ctx.beginPath();
            drawHeartShape(ctx, currentX, el.y, el.size);
            ctx.fillStyle = "rgba(255, 78, 118, " + el.opacity + ")"; // Color rosado/rojo romántico
            ctx.fill();
            
            // Si el corazón se sale por arriba de la pantalla, lo reiniciamos abajo
            if (el.y < -20) {
                elements[index] = newHeart(false);
            }
        }
    });
    
    requestAnimationFrame(drawBackground);
}

createBackground();
drawBackground();

/* ==============================
      INPUT PIN & VALIDACIÓN
============================== */

inputs.forEach((input, index) => {
    input.addEventListener("input", (e) => {
        input.value = input.value.replace(/[^0-9]/g, "");

        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }

        const currentPin = getPin();
        if (currentPin.length === 4) {
            unlock();
        }
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "") {
            if (index > 0) {
                inputs[index - 1].focus();
            }
        }
    });
    
    input.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            unlock();
        }
    });
});

function getPin() {
    return [...inputs].map(input => input.value.trim()).join("");
}

function clearPin() {
    inputs.forEach(input => input.value = "");
    if(inputs[0]) inputs[0].focus();
}

if (unlockBtn) {
    unlockBtn.addEventListener("click", (e) => {
        e.preventDefault();
        unlock();
    });
}

/* =====================================================
   DESBLOQUEO Y CARTA
===================================================== */

function unlock() {
    const pin = getPin();

    if (pin.length < 4) return;

    if (pin !== CORRECT_PIN) {
        loginCard.classList.add("shake");
        if (errorText) errorText.textContent = "❤️ Esa no es la clave correcta. Piensa en la fecha de nuestro aniversario.";

        setTimeout(() => {
            loginCard.classList.remove("shake");
            clearPin();
        }, 500);
        return;
    }

    if (errorText) errorText.textContent = "";
    loginCard.classList.add("fadeOut");
    setTimeout(showLetter, 1000);
}

function showLetter() {
    loginCard.style.display = "none";
    if (letterSection) {
        letterSection.classList.remove("hidden");
        letterSection.classList.add("fadeIn");
    }

    const paper = document.querySelector(".paper");

    setTimeout(() => {
        if (paper) paper.classList.add("show");
        createAudioButton();
    }, 800);
}

/* =====================================================
   BOTÓN DE AUDIO Y MENSAJE FINAL
===================================================== */

function createAudioButton() {
    if (!audioContainer) return;
    audioContainer.innerHTML = "";
    
    const button = document.createElement("button");
    button.className = "listenBtn";
    button.innerHTML = "❤️ Escuchar mi mensaje";
    button.onclick = playMessage;
    audioContainer.appendChild(button);
}

function playMessage() {
    if (!audioContainer) return;
    audioContainer.innerHTML = "";

    const audio = document.createElement("audio");
    audio.controls = true;
    audio.autoplay = true;

    audio.innerHTML = `
        <source src="https://res.cloudinary.com/frtrtnp5/video/upload/v1784302511/Carrera_13_18_xyvox7.m4a" type="audio/mp4">
    `;

    audioContainer.appendChild(audio);
    audio.addEventListener("ended", showFinalMessage);
}

function showFinalMessage() {
    const final = document.createElement("div");
    final.className = "finalMessage";

    final.innerHTML = `
        🌹
        <br><br>
        Sabes que sigues siendo el dueño de mi corazón...
        <br><br>
        Y sabes que quiero todo contigo...
        <br><br>
        Te extraño y extraño amarnos y acompañarnos...
        <br><br>
        Y comer hamburguesita con coca colita.
        <br><br>
        <strong>Con todo mi amor,<br>Valentina ❤️</strong>
    `;

    const paper = document.querySelector(".paper");
    if (paper) {
        paper.appendChild(final);
        setTimeout(() => {
            final.classList.add("show");
        }, 200);
    }
}
