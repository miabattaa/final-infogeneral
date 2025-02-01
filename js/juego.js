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
let imgCorrecta = document.querySelector('.correctaImg');
let scoreMostrar = document.querySelector('#score');
let reiniciar = document.querySelector('.recargar');
let temporizador = document.querySelector('.tiemporest'); 
let ganador = document.querySelector('#ganador');
//opciones
let joji = document.querySelector('.joji');
let pinkGuy = document.querySelector('.pinkguy');
let filthyFrank = document.querySelector('.filthyfrank');

//array de objetos
let imagenes = [
    { pixel: '<img src="../juego/img/pixel/pixjoji1.jpg" alt="joji">', correcta: '<img src="../juego/img/correcta/joji1.jpg" alt="joji">', name: 'joji' },
    { pixel: '<img src="../juego/img/pixel/pixjoji2.jpg" alt="joji">', correcta: '<img src="../juego/img/correcta/joji2.jpg" alt="joji">', name: 'joji' },
    { pixel: '<img src="../juego/img/pixel/pixjoji3.jpg" alt="joji">', correcta: '<img src="../juego/img/correcta/joji3.jpg" alt="joji">', name: 'joji' },
    { pixel: '<img src="../juego/img/pixel/pixjoji4.jpg" alt="joji">', correcta: '<img src="../juego/img/correcta/joji4.jpg" alt="joji">', name: 'joji' },
    { pixel: '<img src="../juego/img/pixel/pixfilthyfrank1.jpg" alt="filthyfrank">', correcta: '<img src="../juego/img/correcta/filthyfrank1.jpg" alt="filthyfrank">', name: 'filthyfrank' },
    { pixel: '<img src="../juego/img/pixel/pixfilthyfrank2.jpg" alt="filthyfrank">', correcta: '<img src="../juego/img/correcta/filthyfrank2.jpg" alt="filthyfrank">', name: 'filthyfrank' },
    { pixel: '<img src="../juego/img/pixel/pixfilthyfrank3.jpg" alt="filthyfrank">', correcta: '<img src="../juego/img/correcta/filthyfrank3.jpg" alt="filthyfrank">', name: 'filthyfrank' },
    { pixel: '<img src="../juego/img/pixel/pixfilthyfrank4.jpg" alt="filthyfrank">', correcta: '<img src="../juego/img/correcta/filthyfrank4.jpg" alt="filthyfrank">', name: 'filthyfrank' },
    { pixel: '<img src="../juego/img/pixel/pixpinkguy1.jpg" alt="pinkguy">', correcta: '<img src="../juego/img/correcta/pinkguy1.jpg" alt="pinkguy">', name: 'pinkguy' },
    { pixel: '<img src="../juego/img/pixel/pixpinkguy2.jpg" alt="pinkguy">', correcta: '<img src="../juego/img/correcta/pinkguy2.jpg" alt="pinkguy">', name: 'pinkguy' },
    { pixel: '<img src="../juego/img/pixel/pixpinkguy3.jpg" alt="pinkguy">', correcta: '<img src="../juego/img/correcta/pinkguy3.jpg" alt="pinkguy">', name: 'pinkguy' },
    { pixel: '<img src="../juego/img/pixel/pixpinkguy4.jpg" alt="pinkguy">', correcta: '<img src="../juego/img/correcta/pinkguy4.jpg" alt="pinkguy">', name: 'pinkguy' },
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
//temporizado
function resetTimer() {
    clearTimeout(timer); 
    temporizador.innerText = timeLimit;
    timer = setTimeout(() => {
        alert("¡Tiempo agotado! Se restan 2 puntos.");
        score -= 2; 
        scoreMostrar.innerText = `${score}`;
        manejarOpcionSeleccionada(null, imgAdivinar); // Llamar a la función para manejar la opción seleccionada como si no se hubiera elegido nada
    }, timeLimit * 1000); // convertir a milisegundos
}

//sumador puntos
function manejarOpcionSeleccionada(opcionSeleccionada, imagenCorrecta) {
    clearTimeout(timer); //detener al elegir op

    //verificacion de op
    if (opcionSeleccionada === imagenCorrecta.name) {
        score += 3; 
        scoreMostrar.innerText = `${score}`;
        alert("¡Correcto!");
        turnoActual++; 
    } else if (opcionSeleccionada !== null) {
        alert(`Incorrecto. La respuesta correcta era: ${imagenCorrecta.name}`);
        imgCorrecta.innerHTML = imagenCorrecta.correcta; 
    }
    
    // Mostrar la imagen correcta en el contenedor imgCorrecta
    if (opcionSeleccionada !== null) {
        imgCorrecta.innerHTML = imagenCorrecta.correcta; 
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

function resetTurn() {
    turnoActual = 0; // Reiniciar el contador de turnos
    imgAdivinar = mostrarImagenAleatoria(); // Mostrar nueva imagen
}

function mostrarResultados() {
    contImg.style.display = 'none';
    contOpciones.style.display = 'none';
    scoreMostrar.innerHTML = ` ${score}`;
    contResultado.style.display = 'block'; 
    //ganador
    if (score >= 24) {
        ganador.style.display = 'block'; 
    } else {
        ganador.style.display = 'none'; 
    }
}

// evento para reiniciar el juego
reiniciar.addEventListener("click", function() {
    score = 0;
    turnoActual = 0; 
    rondaActual = 1; 
    scoreMostrar.innerText = ` ${score}`;
    contImg.style.display = 'none';
    contOpciones.style.display = 'none'; 
    contResultado.innerHTML = ''; 
    contJuego.style.display = 'block';
});


/*
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
let imgCorrecta = document.querySelector('.correctaImg');
let scoreMostrar = document.querySelector('#score');
let reiniciar = document.querySelector('.recargar');
let temporizador = document.querySelector('.tiemporest'); 
//opciones
let joji = document.querySelector('.joji');
let pinkGuy = document.querySelector('.pinkguy');
let filthyFrank = document.querySelector('.filthyfrank');

//array de objetos
let imagenes = [
    { pixel: '<img src="../juego/img/pixel/pixjoji1.jpg" alt="joji">', correcta: '<img src="../juego/img/correcta/joji1.jpg" alt="joji">', name: 'joji' },
    { pixel: '<img src="../juego/img/pixel/pixjoji2.jpg" alt="joji">', correcta: '<img src="../juego/img/correcta/joji2.jpg" alt="joji">', name: 'joji' },
    { pixel: '<img src="../juego/img/pixel/pixjoji3.jpg" alt="joji">', correcta: '<img src="../juego/img/correcta/joji3.jpg" alt="joji">', name: 'joji' },
    { pixel: '<img src="../juego/img/pixel/pixjoji4.jpg" alt="joji">', correcta: '<img src="../juego/img/correcta/joji4.jpg" alt="joji">', name: 'joji' },
    { pixel: '<img src="../juego/img/pixel/pixfilthyfrank1.jpg" alt="filthyfrank">', correcta: '<img src="../juego/img/correcta/filthyfrank1.jpg" alt="filthyfrank">', name: 'filthyfrank' },
    { pixel: '<img src="../juego/img/pixel/pixfilthyfrank2.jpg" alt="filthyfrank">', correcta: '<img src="../juego/img/correcta/filthyfrank2.jpg" alt="filthyfrank">', name: 'filthyfrank' },
    { pixel: '<img src="../juego/img/pixel/pixfilthyfrank3.jpg" alt="filthyfrank">', correcta: '<img src="../juego/img/correcta/filthyfrank3.jpg" alt="filthyfrank">', name: 'filthyfrank' },
    { pixel: '<img src="../juego/img/pixel/pixfilthyfrank4.jpg" alt="filthyfrank">', correcta: '<img src="../juego/img/correcta/filthyfrank4.jpg" alt="filthyfrank">', name: 'filthyfrank' },
    { pixel: '<img src="../juego/img/pixel/pixpinkguy1.jpg" alt="pinkguy">', correcta: '<img src="../juego/img/correcta/pinkguy1.jpg" alt="pinkguy">', name: 'pinkguy' },
    { pixel: '<img src="../juego/img/pixel/pixpinkguy2.jpg" alt="pinkguy">', correcta: '<img src="../juego/img/correcta/pinkguy2.jpg" alt="pinkguy">', name: 'pinkguy' },
    { pixel: '<img src="../juego/img/pixel/pixpinkguy3.jpg" alt="pinkguy">', correcta: '<img src="../juego/img/correcta/pinkguy3.jpg" alt="pinkguy">', name: 'pinkguy' },
    { pixel: '<img src="../juego/img/pixel/pixpinkguy4.jpg" alt="pinkguy">', correcta: '<img src="../juego/img/correcta/pinkguy4.jpg" alt="pinkguy">', name: 'pinkguy' },
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

function resetTimer() {
    clearTimeout(timer); 
    temporizador.innerText = timeLimit;
    timer = setTimeout(() => {
        alert("¡Tiempo agotado! Se restan 2 puntos.");
        score -= 2; 
        scoreMostrar.innerText = `${score}`;
        manejarOpcionSeleccionada(null, imgAdivinar); // Llamar a la función para manejar la opción seleccionada como si no se hubiera elegido nada
    }, timeLimit * 1000); // convertir a milisegundos
}

function manejarOpcionSeleccionada(opcionSeleccionada, imagenCorrecta) {
    clearTimeout(timer); //detener al elegir op

    //verificacion de op
    if (opcionSeleccionada === imagenCorrecta.name) {
        score += 3; 
        scoreMostrar.innerText = `${score}`;
        alert("¡Correcto!");
        turnoActual++; 
    } else if (opcionSeleccionada !== null) {
        alert("Incorrecto. La respuesta correcta era:");
    }
    
    // Mostrar la imagen correcta en el contenedor imgCorrecta
    imgCorrecta.innerHTML = imagenCorrecta.correcta; // Mostrar la imagen correcta
    
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

function resetTurn() {
    turnoActual = 0; // Reiniciar el contador de turnos
    imgAdivinar = mostrarImagenAleatoria(); // Mostrar nueva imagen
}

function mostrarResultados() {
    contImg.style.display = 'none';
    contOpciones.style.display = 'none';
    scoreMostrar.innerHTML = ` ${score}`;
    contResultado.style.display = 'block'; 
}

// evento para reiniciar el juego
reiniciar.addEventListener("click", function() {
    score = 0;
    turnoActual = 0; 
    rondaActual = 1; 
    scoreMostrar.innerText = ` ${score}`;
    contImg.style.display = 'none';
    contOpciones.style.display = 'none'; 
    contResultado.innerHTML = ''; 
    contJuego.style.display = 'block';
});*/