
const imagenes = [
    { pixel: '<img src="juego/img/pixel/pixjoji1.jpg" alt="joji">', correcta: '<img src="juego/img/correcta/joji1.jpg" alt="joji">', name: 'joji 1' },
    { pixel: '<img src="juego/img/pixel/pixjoji2.jpg" alt="joji">', correcta: '<img src="juego/img/correcta/joji2.jpg" alt="joji">', name: 'joji 2' },
    { pixel: '<img src="juego/img/pixel/pixjoji3.jpg" alt="joji">', correcta: '<img src="juego/img/correcta/joji3.jpg" alt="joji">', name: 'joji 3' },
    { pixel: '<img src="juego/img/pixel/pixjoji4.jpg" alt="joji">', correcta: '<img src="juego/img/correcta/joji4.jpg" alt="joji">', name: 'joji 4' },
    { pixel: '<img src="juego/img/pixel/pixfilthyfrank1.jpg" alt="filthyfrank">', correcta: '<img src="juego/img/correcta/filthyfrank1.jpg" alt="filthyfrank">', name: 'filthyfrank 1' },
    { pixel: '<img src="juego/img/pixel/pixfilthyfrank2.jpg" alt="filthyfrank">', correcta: '<img src="juego/img/correcta/filthyfrank2.jpg" alt="filthyfrank">', name: 'filthyfrank 2' },
    { pixel: '<img src="juego/img/pixel/pixfilthyfrank3.jpg" alt="filthyfrank">', correcta: '<img src="juego/img/correcta/filthyfrank3.jpg" alt="filthyfrank">', name: 'filthyfrank 3' },
    { pixel: '<img src="juego/img/pixel/pixfilthyfrank4.jpg" alt="filthyfrank">', correcta: '<img src="juego/img/correcta/filthyfrank4.jpg" alt="filthyfrank">', name: 'filthyfrank4' },
    { pixel: '<img src="juego/img/pixel/pixpinkguy1.jpg" alt="pinkguy">', correcta: '<img src="juego/img/correcta/pinkguy1.jpg" alt="pinkguy">', name: 'pinkguy 1' },
    { pixel: '<img src="juego/img/pixel/pixpinkguy2.jpg" alt="pinkguy">', correcta: '<img src="juego/img/correcta/pinkguy2.jpg" alt="pinkguy">', name: 'pinkguy 2' },
    { pixel: '<img src="juego/img/pixel/pixpinkguy3.jpg" alt="pinkguy">', correcta: '<img src="juego/img/correcta/pinkguy3.jpg" alt="pinkguy">', name: 'pinkguy 3' },
    { pixel: '<img src="juego/img/pixel/pixpinkguy4.jpg" alt="pinkguy">', correcta: '<img src="juego/img/correcta/pinkguy4.jpg" alt="pinkguy">', name: 'pinkguy 4' },
];

let score = 0;
let currentTurn = 0;
const totalTurns = 3;
let timer; // Variable para el temporizador
const timeLimit = 5; // Tiempo límite en segundos

let startButton = document.querySelector('.start-button');
let questionImage = document.querySelector('.question-image');
let optionsContainer = document.querySelector('.options-container');
let resultContainer = document.querySelector('.result-container');
let finalScore = document.querySelector('.final-score');
let reloadButton = document.querySelector('.reload-button');
let timerDisplay = document.querySelector('.tiemporest'); // Crear un elemento para mostrar el temporizador


startButton.addEventListener('click', startGame);
reloadButton.addEventListener('click', reloadGame);
optionsContainer.addEventListener('click', checkAnswer); // Añadir evento de clic a las opciones

function startGame() {
    score = 0;
    currentTurn = 0;
    startButton.style.display = 'none';
    timerDisplay.innerText = ''; // Limpiar el temporizador
    questionImage.style.display = 'block'; // Mostrar la imagen de la pregunta
    nextTurn();
}

function nextTurn() {
    if (currentTurn < totalTurns) {
        currentTurn++;
        showQuestion();
    } else {
        endGame();
    }
}

function showQuestion() {
    const correctImage = imagenes[Math.floor(Math.random() * imagenes.length)];
    questionImage = correctImage.pixel; // Mostrar imagen pixelada
    questionImage.style.display = 'block'; // Asegurarse de que la imagen se muestre

    startTimer(); // Iniciar el temporizador
}

function startTimer() {
    let tiempoRestante = timeLimit;
    timerDisplay.innerText = `Tiempo restante: ${tiempoRestante} segundos`;

    timer = setInterval(() => {
        tiempoRestante--;
        timerDisplay.innerText = `Tiempo restante: ${tiempoRestante} segundos`;

        if (tiempoRestante <= 0) {
            clearInterval(timer);
            timerDisplay.innerText = '¡Tiempo agotado!';
            nextTurn(); // Pasar a la siguiente pregunta si se acaba el tiempo
        }
    }, 1000);
}

function checkAnswer(event) {
    const selectedOption = event.target; // Obtener el elemento que fue clickeado
    if (selectedOption.tagName === 'IMG') { // Asegurarse de que se hizo clic en una imagen
        clearInterval(timer); // Detener el temporizador
        const selectedName = selectedOption.getAttribute('data-name'); // Obtener el nombre de la opción seleccionada

        // Encontrar la imagen correcta en el array
        const correctImage = imagenes.find(img => img.name === selectedName);
        questionImage.src = correctImage.correcta; // Mostrar imagen correcta

        if (selectedName === correctImage.name) {
            score += 3; // Sumar puntos si la respuesta es correcta
        }

        setTimeout(nextTurn, 2000); // Esperar 2 segundos antes de la siguiente pregunta
    }
}

function endGame() {
    questionImage.src = '';
    optionsContainer.innerHTML = ''; // Limpiar las opciones
    resultContainer.style.display = 'block'; // Mostrar el contenedor de resultados
    finalScore.innerText = score; // Mostrar el puntaje final
}

function reloadGame() {
    resultContainer.style.display = 'none'; // Ocultar el contenedor de resultados
    startButton.style.display = 'block'; // Mostrar el botón de inicio
}







/*const imagenes = [
    { pixel: '<img src="juego/img/pixel/pixjoji1.jpg" alt="joji">', correcta: '<img src="juego/img/correcta/joji1.jpg" alt="joji">', name: 'joji 1' },
    { pixel: '<img src="juego/img/pixel/pixjoji2.jpg" alt="joji">', correcta: '<img src="juego/img/correcta/joji2.jpg" alt="joji">', name: 'joji 2' },
    { pixel: '<img src="juego/img/pixel/pixjoji3.jpg" alt="joji">', correcta: '<img src="juego/img/correcta/joji3.jpg" alt="joji">', name: 'joji 3' },
    { pixel: '<img src="juego/img/pixel/pixjoji4.jpg" alt="joji">', correcta: '<img src="juego/img/correcta/joji4.jpg" alt="joji">', name: 'joji 4' },
    { pixel: '<img src="juego/img/pixel/pixfilthyfrank1.jpg" alt="filthyfrank">', correcta: '<img src="juego/img/correcta/filthyfrank1.jpg" alt="filthyfrank">', name: 'filthyfrank 1' },
    { pixel: '<img src="juego/img/pixel/pixfilthyfrank2.jpg" alt="filthyfrank">', correcta: '<img src="juego/img/correcta/filthyfrank2.jpg" alt="filthyfrank">', name: 'filthyfrank 2' },
    { pixel: '<img src="juego/img/pixel/pixfilthyfrank3.jpg" alt="filthyfrank">', correcta: '<img src="juego/img/correcta/filthyfrank3.jpg" alt="filthyfrank">', name: 'filthyfrank 3' },
    { pixel: '<img src="juego/img/pixel/pixfilthyfrank4.jpg" alt="filthyfrank">', correcta: '<img src="juego/img/correcta/filthyfrank4.jpg" alt="filthyfrank">', name: 'filthyfrank4' },
    { pixel: '<img src="juego/img/pixel/pixpinkguy1.jpg" alt="pinkguy">', correcta: '<img src="juego/img/correcta/pinkguy1.jpg" alt="pinkguy">', name: 'pinkguy 1' },
    { pixel: '<img src="juego/img/pixel/pixpinkguy2.jpg" alt="pinkguy">', correcta: '<img src="juego/img/correcta/pinkguy2.jpg" alt="pinkguy">', name: 'pinkguy 2' },
    { pixel: '<img src="juego/img/pixel/pixpinkguy3.jpg" alt="pinkguy">', correcta: '<img src="juego/img/correcta/pinkguy3.jpg" alt="pinkguy">', name: 'pinkguy 3' },
    { pixel: '<img src="juego/img/pixel/pixpinkguy4.jpg" alt="pinkguy">', correcta: '<img src="juego/img/correcta/pinkguy4.jpg" alt="pinkguy">', name: 'pinkguy 4' },
];

let score = 0;
let currentTurn = 0;
const totalTurns = 3;
let timer; // Variable para el temporizador
const timeLimit = 5; // Tiempo límite en segundos

const startButton = document.getElementById('start-button');
const questionImage = document.getElementById('question-image');
const optionsContainer = document.getElementById('options-container');
const resultContainer = document.getElementById('result-container');
const finalScore = document.getElementById('final-score');
const reloadButton = document.getElementById('reload-button');
const timerDisplay = document.createElement('div'); // Crear un elemento para mostrar el temporizador
document.getElementById('game-container').appendChild(timerDisplay); // Añadir el temporizador al contenedor del juego

startButton.addEventListener('click', startGame);
reloadButton.addEventListener('click', reloadGame);

function startGame() {
    score = 0;
    currentTurn = 0;
    startButton.style.display = 'none';
    timerDisplay.innerText = ''; // Limpiar el temporizador
    nextTurn();
}

function nextTurn() {
    if (currentTurn < totalTurns) {
        currentTurn++;
        showQuestion();
    } else {
        endGame();
    }
}

function showQuestion() {
    const correctImage = imagenes[Math.floor(Math.random() * imagenes.length)];
    questionImage.src = correctImage.pixel; // Mostrar imagen pixelada
   

    const options = [correctImage];
    while (options.length < 3) {
        const randomImage = imagenes[Math.floor(Math.random() * imagenes.length)];
        if (!options.includes(randomImage)) {
            options.push(randomImage);
        }
    }

    options.sort(() => Math.random() - 0.5); // Mezclar opciones

    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.innerHTML = option.name;
        button.onclick = () => checkAnswer(option, correctImage);
        optionsContainer.appendChild(button);
    });

    startTimer(); // Iniciar el temporizador
}

function startTimer() {
    let tiempoRestante = timeLimit;
    timerDisplay.innerText = `Tiempo restante: ${tiempoRestante} segundos`;

    timer = setInterval(() => {
        tiempoRestante--;
        timerDisplay.innerText = `Tiempo restante: ${tiempoRestante} segundos`;

        if (tiempoRestante <= 0) {
            clearInterval(timer);
            timerDisplay.innerText = '¡Tiempo agotado!';
            nextTurn(); // Pasar a la siguiente pregunta si se acaba el tiempo
        }
    }, 1000);
}

function checkAnswer(selectedOption, correctImage) {
    clearInterval(timer); // Detener el temporizador
    questionImage.classList.remove('pixel'); // Quitar pixelado
    questionImage.src = correctImage.correcta; // Mostrar imagen correcta

    if (selectedOption.name === correctImage.name) {
        score += 3;
    }

    setTimeout(nextTurn, 2000); // Esperar 2 segundos antes de la siguiente pregunta
}

function endGame() {
    questionImage.src = '';
    optionsContainer.innerHTML = '';
    resultContainer.style.display = 'block';
    finalScore.innerText = score;
}

function reloadGame() {
    resultContainer.style.display = 'none';
    startButton.style.display = 'block';
}
*/