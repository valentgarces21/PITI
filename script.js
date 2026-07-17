function unlock() {
    const password = document.getElementById("pass").value;

    if (password === "2405") {

        document.getElementById("login").style.display = "none";

        const letter = document.getElementById("letter");

        letter.innerHTML = `
            <h2>💌 Para ti, Radip</h2>

            <p>
            Hay recuerdos que nunca dejan de existir.<br><br>

            Hay personas que llegan para cambiar nuestra vida.<br><br>

            Y hay palabras que merecen ser escuchadas con calma.
            </p>

            <p><b>Este pequeño rincón existe únicamente para ti.</b></p>

            <audio controls autoplay>
                <source src="https://res.cloudinary.com/frtrtnp5/video/upload/v1784302511/Carrera_13_18_xyvox7.m4a" type="audio/mp4">
            </audio>

            <p style="margin-top:30px">
                Con todo mi amor,<br>
                <strong>Valentina ❤️</strong>
            </p>
        `;

        letter.classList.remove("hidden");

    } else {

        document.getElementById("err").textContent =
            "❤️ Piensa en la fecha de nuestro aniversario.";

    }
}
