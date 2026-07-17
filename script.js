.pin{
    display:flex;
    justify-content:center;
    gap:14px;
    margin-bottom:30px;
}

.digit{

    width:60px;
    height:70px;

    border-radius:18px;

    border:1px solid rgba(255,255,255,.25);

    background:rgba(255,255,255,.08);

    color:white;

    text-align:center;

    font-size:28px;

    outline:none;

    transition:.3s;

}

.digit:focus{

    border-color:#8ec5ff;

    transform:translateY(-3px);

    box-shadow:0 0 20px #8ec5ff66;

}

button{

    width:100%;

    border:none;

    cursor:pointer;

    border-radius:18px;

    padding:18px;

    background:linear-gradient(135deg,#5ba8ff,#83d0ff);

    color:white;

    font-size:17px;

    font-weight:600;

    transition:.35s;

}

button:hover{

    transform:translateY(-3px);

    box-shadow:0 15px 30px rgba(70,150,255,.35);

}

#errorText{

    margin-top:18px;

    color:#ffd2d2;

    min-height:25px;

}

.hidden{

    display:none;

}

.envelope{

    position:relative;

    width:650px;

    max-width:92vw;

    animation:fadeIn 1.2s;

}

.paper{

    background:white;

    color:#333;

    border-radius:20px;

    padding:50px;

    box-shadow:0 25px 60px rgba(0,0,0,.45);

}

.paper h2{

    color:#12335c;

    margin-bottom:30px;

    text-align:center;

}

.paper p{

    line-height:1.9;

    margin-bottom:18px;

    font-size:17px;

}

#audioContainer{

    margin-top:35px;

    text-align:center;

}

audio{

    width:100%;

}

.signature{

    margin-top:45px;

    text-align:center;

    color:#12335c;

    font-size:22px;

    font-family:"Cormorant Garamond",serif;

}

@keyframes heartbeat{

0%{transform:scale(1)}

25%{transform:scale(1.15)}

40%{transform:scale(1)}

65%{transform:scale(1.15)}

100%{transform:scale(1)}

}

@keyframes fadeIn{

from{

opacity:0;

transform:translateY(40px);

}

to{

opacity:1;

transform:translateY(0);

}

}

@media(max-width:650px){

.card{

padding:28px;

}

.paper{

padding:30px;

}

.digit{

width:50px;

height:60px;

font-size:24px;

}

h1{

font-size:34px;

}

.subtitle{

font-size:15px;

}

}
