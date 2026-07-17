/* =====================================================
   PITI - CÓDIGO COMPLETO ULTRA SEGURO
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

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createStars(){
    stars = [];
    for(let i = 0; i < 260; i++){
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            r: Math.random() * 2,
            a: Math.random(),
            speed: .002 + Math.random() * .004
        });
    }
}

createStars();

function drawStars(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        star.a += star.speed;
        let alpha = (Math.sin(star.a) + 1) / 2;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255," + alpha + ")";
        ctx.fill();
    });
    requestAnimationFrame(drawStars);
}

drawStars();

/* ==============================
      INPUT PIN & VALIDACIÓN
============================== */

inputs.forEach((input, index) => {
    // Detecta la escritura y limpia datos extraños
    input.addEventListener("input", (e) => {
        input.value = input.value.replace(/[^0-9]/g, "");

        if (input.value && index < inputs.length - 1) {
            inputs[index + 1].focus();
        }

        // Validación automática
        const currentPin = getPin();
        if (currentPin.length === 4) {
            unlock();
        }
    });

    // Control al borrar con retroceso
    input.addEventListener("keydown", (e) => {
        if (e.key === "Backspace" && input.value === "") {
            if (index > 0) {
                inputs[index - 1].focus();
            }
        }
    });
    
    // Soporte para presionar ENTER en móviles
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

// Acción del botón físico (Ahora con doble verificación)
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

    // Si aún no se completan los 4 dígitos, no hacemos nada todavía
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
        Gracias por escuchar hasta el final.
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
