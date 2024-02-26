// Obtener botones y elementos del DOM
var botonEncriptar = document.querySelector(".btn-encriptar");
var botonDesencriptar = document.querySelector(".btn-desencriptar");
var munieco = document.querySelector(".contenedormunieco");
var contenedor = document.querySelector(".contenedor-parrafo");
var resultado = document.querySelector(".texto-resultado");

// Asignar eventos a los botones
botonEncriptar.onclick = encriptar;
botonDesencriptar.onclick = desencriptar;


// Función para encriptar el texto
function encriptar() {
    var cajatexto = recuperarTexto()
    if (validarTexto(cajatexto)) {
        resultado.textContent = transformarTexto(cajatexto, true);
        limpiarCajaTexto(); // Limpia el área de texto
        ocultarAdelante();
    } else {
        alert("El texto no debe contener: mayusculas, acentos ni caracteres especiales");
    }
}

function limpiarCajaTexto() {
    var cajatexto = document.querySelector(".cajatexto");
    cajatexto.value = ""; // Establece el valor del área de texto a una cadena vacía
}


// Función para desencriptar el texto
function desencriptar() {
    var cajatexto = recuperarTexto()
    if (validarTexto(cajatexto)) {
        resultado.textContent = desencriptarTexto(cajatexto);
        limpiarCajaTexto(); // Limpia el área de texto
        ocultarAdelante();
    } else {
        alert("El texto no debe contener: mayusculas, acentos ni caracteres especiales");
    }
}


// Función para recuperar el texto ingresado por el usuario
function recuperarTexto() {
    var cajatexto = document.querySelector(".cajatexto")
    return cajatexto.value
}

// Función para ocultar elementos del DOM
function ocultarAdelante() {
    munieco.classList.add("ocultar");
    contenedor.classList.add("ocultar");
}


/*Luego, la función divide el mensaje en un array de caracteres usando el método split(''). 
Después, aplica el método map() a este array para iterar sobre cada letra del mensaje.
Finalmente, la función une todos los elementos del array resultante en una cadena de texto 
usando el método join('') y devuelve el resultado.*/

// Función para validar el texto ingresado
function validarTexto(texto) {
    // Validar que solo se ingresen letras minúsculas y espacio
    //El * después de [a-z ] permite que haya cero o más espacios después de las letras minúsculas.
    var regex = /^[a-z !]*$/;
    return regex.test(texto);
}

function transformarTexto(mensaje, encriptar) {
    const letras = { 'a': 'ai', 'e': 'enter', 'i': 'imes', 'o': 'ober', 'u': 'ufat' };
    return mensaje.split('').map(letra => (encriptar ? letras[letra] || letra : letra)).join('');//map se encarga de maperar cada letra haciendo el intercambio correspondiente
}



function desencriptarTexto(mensaje) {
    var texto = mensaje;
    var textoFinal = "";

    for (var i = 0; i < texto.length; i++) {
        if (texto[i] == "a") {
            textoFinal = textoFinal + "a"
            i = i + 1;
        }
        else if (texto[i] == "e") {
            textoFinal = textoFinal + "e"
            i = i + 4;
        }
        else if (texto[i] == "i") {
            textoFinal = textoFinal + "i"
            i = i + 3;
        }
        else if (texto[i] == "o") {
            textoFinal = textoFinal + "o"
            i = i + 3;
        }

        else if (texto[i] == "u") {
            textoFinal = textoFinal + "u"
            i = i + 3;
        }
        else {
            textoFinal = textoFinal + texto[i];
        }

    }

    return textoFinal;

}


/*selecciona el botón con la clase .btn-copiar del documento HTML y lo asigna a la variable btnCopiar.*/
const btnCopiar = document.querySelector(".btn-copiar");
/*Aquí se agrega un evento de clic al botón btnCopiar. 
Cuando el botón se hace clic, se ejecuta la función 
definida. La variable e representa el evento de clic, 
que contiene información sobre el clic del usuario, 
como las coordenadas del puntero del mouse.*/

btnCopiar.addEventListener("click", function (e) { /*se crea un evento de click al boton*/
    // Obtener coordenadas del click relativas al contenedor
    /*Estas líneas de código calculan las coordenadas del
    clic del usuario dentro del botón btnCopiar. 
    getBoundingClientRect() devuelve el tamaño y la posición 
    del botón con respecto a la ventana del navegador. 
    Restando las coordenadas del puntero del mouse 
    (obtenidas de e.clientX y e.clientY) de las coordenadas 
    del rectángulo del botón, obtenemos las coordenadas 
    relativas dentro del botón.*/
    const rect = btnCopiar.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Crear elemento de onda 
    /*se crea un elemento span para representar el efecto 
    ripple. Se le añade la clase ripple-effect para aplicar
    los estilos de la onda. Se establecen las propiedades 
    left y top del estilo en las coordenadas calculadas 
    anteriormente para colocar la onda en la posición 
    correcta dentro del botón. Finalmente, se añade este 
    elemento de onda como hijo del botón btnCopiar.*/
    const ripple = document.createElement("span");
    ripple.classList.add("ripple-effect");
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    btnCopiar.appendChild(ripple);

    /*Este bloque de código elimina el elemento de onda 
    después de un tiempo determinado (en este caso, 500 
    milisegundos o 0.5 segundos) para que la onda desaparezca 
    después de completar su animación.*/

    // Eliminar elemento de onda después de la animación
    setTimeout(() => {
        ripple.remove();
    }, 500);

    // Código para copiar el texto
    /*Esta parte del código utiliza la API del Portapapeles 
    (navigator.clipboard) para copiar el contenido del elemento
    con la clase .texto-resultado al portapapeles del usuario 
    cuando se hace clic en el botón. textContent se utiliza 
    para obtener el texto dentro de ese elemento.*/
    var contenido = document.querySelector(".texto-resultado").textContent;
    navigator.clipboard.writeText(contenido);
    limpiarResultado(); // Limpia el resultado
});

function limpiarResultado() {
    var resultado = document.querySelector(".texto-resultado");
    resultado.textContent = ""; // Establece el contenido del resultado a una cadena vacía
}
