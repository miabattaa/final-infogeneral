//selectores
let score = 0;
let turnoActual = 0; 
let turnos = 3; // núm de rondas
let rondaActual = 1; 
let timer; 
const timeLimit = 5; // tiempo límite 

//contenedores
let contJuego = document.querySelector('.contJuego');
let contImg = document.querySelector('#contImg');
let contOpciones = document.querySelector('#opciones');
let contResultado = document.querySelector('#contResultado');
//selectores
let empezar = document.querySelector('.iniciar');
let mostrar = document.querySelector('.mostrarImg');
let scoreMostrar = document.querySelector('#score');
let scoreFinal = document.querySelector('#scoreFinal');
let reiniciar = document.querySelector('.recargar');
let temporizador = document.querySelector('.tiemporest'); 
let ganador = document.querySelector('#ganador');
//opciones
let joji = document.querySelector('.joji');
let pinkGuy = document.querySelector('.pinkguy');
let filthyFrank = document.querySelector('.filthyfrank');

//array de objetos
let imagenes = [
    { pixel: '<img src="../juego/img/pixel/pixjoji1.jpg" alt="joji">', name: 'joji' },
    { pixel: '<img src="../juego/img/pixel/pixjoji2.jpg" alt="joji">', name: 'joji' },
    { pixel: '<img src="../juego/img/pixel/pixjoji3.jpg" alt="joji">', name: 'joji' },
    { pixel: '<img src="../juego/img/pixel/pixjoji4.jpg" alt="joji">', name: 'joji' },
    { pixel: '<img src="../juego/img/pixel/pixfilthyfrank1.jpg" alt="filthyfrank">', name: 'filthyfrank' },
    { pixel: '<img src="../juego/img/pixel/pixfilthyfrank2.jpg" alt="filthyfrank">', name: 'filthyfrank' },
    { pixel: '<img src="../juego/img/pixel/pixfilthyfrank3.jpg" alt="filthyfrank">', name: 'filthyfrank' },
    { pixel: '<img src="../juego/img/pixel/pixfilthyfrank4.jpg" alt="filthyfrank">', name: 'filthyfrank' },
    { pixel: '<img src="../juego/img/pixel/pixpinkguy1.jpg" alt="pinkguy">', name: 'pinkguy' },
    { pixel: '<img src="../juego/img/pixel/pixpinkguy2.jpg" alt="pinkguy">', name: 'pinkguy' },
    { pixel: '<img src="../juego/img/pixel/pixpinkguy3.jpg" alt="pinkguy">', name: 'pinkguy' },
    { pixel: '<img src="../juego/img/pixel/pixpinkguy4.jpg" alt="pinkguy">', name: 'pinkguy' },
];

//eventos
//mostrar el juego
let imgAdivinar;
empezar.addEventListener("click", function (e) {
    e.preventDefault();
    contImg.style.display = 'block';
    contOpciones.style.display = 'block';
    contJuego.style.display = 'none';
    imgAdivinar = mostrarImagenAleatoria();
});

//eventos opciones
joji.addEventListener("click", function() {
    manejarOpcionSeleccionada('joji', imgAdivinar);
});

pinkGuy.addEventListener("click", function() {
    manejarOpcionSeleccionada('pinkguy', imgAdivinar);
});

filthyFrank.addEventListener("click", function() {
    manejarOpcionSeleccionada('filthyfrank', imgAdivinar);
});

//funciones
function mostrarImagenAleatoria() {
    //imagen aleatoria del array
    let imagenAleatoria = imagenes[Math.floor(Math.random() * imagenes.length)];
    contImg.innerHTML = imagenAleatoria.pixel;
    resetTimer();
    // guardar el objeto de la imagen correcta para la verificación
    return imagenAleatoria; 
}
//temporizador 5seg
let intervalo;
function resetTimer() {
    clearTimeout(timer); 
    clearInterval(intervalo);
    let tiempoRestante = timeLimit; 
    temporizador.innerText = tiempoRestante; 

    //actualizar en pantalla
    intervalo = setInterval(() => {
        tiempoRestante--;
        temporizador.innerText = tiempoRestante; 

        if (tiempoRestante <= 0) {
            clearInterval(intervalo); // Detiene el intervalo
            alert("¡Tiempo agotado! Se restan 2 puntos.");
            score -= 2; 
            scoreMostrar.innerText = `${score}`;
            manejarOpcionSeleccionada(null, imgAdivinar);
        }
    }, 1000); // Ejecuta cada segundo
   
    timer = setTimeout(() => {
        clearInterval(intervalo); 
    }, timeLimit * 1000); // convertir a milisegundos
}
//sumador puntos
function manejarOpcionSeleccionada(opcionSeleccionada, imagenCorrecta) {
    clearTimeout(timer); 
    clearInterval(intervalo);
    //verificacion de op
    if (opcionSeleccionada === imagenCorrecta.name) {
        score += 3; 
        scoreMostrar.innerText = `${score}`;
        alert("¡Correcto!");
        turnoActual++; 
    } else if (opcionSeleccionada !== null) {
        score -= 3; 
        scoreMostrar.innerText = `${score}`;
        alert(`Incorrecto. La respuesta correcta era: ${imagenCorrecta.name}`); 
    }
    
    // verificacion si se completo la ronda
    if (turnoActual >= 3) {
        rondaActual++; 
        if (rondaActual > turnos) {
            mostrarResultados(); 
        } else {
            alert(`¡Ronda ${rondaActual - 1} completada! Pasando a la ronda ${rondaActual}.`);
            resetTurn(); // reiniciar el turno para la nueva ronda
        }
    } else {
        imgAdivinar = mostrarImagenAleatoria(); // actualizar la img
    }
}

//reiniciar ronda
function resetTurn() {
    turnoActual = 0; 
    imgAdivinar = mostrarImagenAleatoria(); 
}

function mostrarResultados() {
    contImg.style.display = 'none';
    contOpciones.style.display = 'none';
    scoreFinal.innerHTML = ` ${score}`;
    contResultado.style.display = 'block'; 
    //ganador
    if (score >= 24) {
        ganador.style.display = 'block'; 
    } else {
        ganador.style.display = 'none'; 
    }
}

//event redireccionar al ganador a la playlist
ganador.addEventListener('click', () =>
    window.open('https://open.spotify.com/playlist/42V4HoPDVnIiJpP03VdCrL?si=jcGmvia8T7CxyC3losKzkA', '_blank')
); 

//evento para reiniciar el juego
reiniciar.addEventListener("click", function() {
    score = 0;
    turnoActual = 0; 
    rondaActual = 1; 
    scoreMostrar.innerText = ` ${score}`;
    contImg.style.display = 'none';
    contOpciones.style.display = 'none'; 
    contResultado.innerHTML = ''; 
    contJuego.style.display = 'block';
    ganador.style.display = 'none'; 
});