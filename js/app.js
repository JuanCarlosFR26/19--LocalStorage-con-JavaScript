// Variables
const formulario = document.querySelector('#formulario');
const lista = document.querySelector('#lista-tweets');
let tweets = [];


// Event Listeners
eventListeners();
function eventListeners() {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    // Cuando el documento está listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') || [] );

        // Dejarlo en el HTML
        crearHTML();
    })
}


// Funciones
function agregarTweet(e) {
    e.preventDefault();

    // Textarea donde el usuario escribe
    const tweet = document.querySelector('#tweet').value;

    // Validación
    if(tweet === '' ) {
        mostrarError('Un mensaje no puede ir vacío');

        return; // Evita que se ejecuten más líneas de código
    } 

    const tweetObj = {
        id: Date.now(),
        tweet   // Esto es igual a tweet : tweet
    }

    // Añadir al arreglo de tweets
    tweets = [...tweets, tweetObj];

    // Crear HTML
    crearHTML();

    // Reiniciar el formulario
    formulario.reset();
}

// Mostrar mensaje de error
function mostrarError(error) {
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    // Insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout( () => {
        mensajeError.remove(); // Elimina el mensaje de erorr después de 3 segundos
    }, 3000)
}


// Muestra un listado de los tweets
function crearHTML() {

    limpiarHTML();

    if(tweets.length > 0) {
        tweets.forEach( tweet => {
            // Agregar un botón
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            // Añadir la función eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }

            // Crear el HTML

            const li = document.createElement('li');

            // Añadir el texto
            li.innerText = tweet.tweet;

            // Asignar el botñón
            li.appendChild(btnEliminar);

            // Insertar en el HTML
            lista.appendChild(li);
        });
    }


    // Sincronizar Storage
    sincronizarStorage();
}
// Agregar tweets al localStorage
function sincronizarStorage() {
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

// Limpiar el HTML
function limpiarHTML() {
    while(lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}


// Eliminar tweet
function borrarTweet(id) {
    tweets = tweets.filter( tweet => tweet.id !== id); // Trae todos menos el del click

    crearHTML();
}