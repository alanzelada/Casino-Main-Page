// Identificacion de cartas
let cards = ['♥', '♣', '♦', '♠'];
let numbers = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K']; 
// Baraja de cartas
let CartasJ = 0; let P_CartasJ = 0; // Cambiar P_CartasJ y P_CartasB por un vector para mostrar las cartas que ganaste
let CartasB = 0; let P_CartasB = 0; // y perdiste durante la partida.
// Calcular los elementos del vector al final de la partida para dictaminar si gano el bot o el usuario y mostrar
// las cartas perdidas-obtenidas al final de la partida
// Cartas solas
let ConversionCard;
let singleCard;
let singleNumber;
const Puntuacion = document.getElementById("Puntuacion");
//Apuestas
let Pantalla = false;
var Pantallas;
var Apuesta = 100;
let Saldo = 500 // 500 de inicio para probar

document.addEventListener('DOMContentLoaded', function(){
    Puntuacion.innerHTML = 'Su apuesta actual es: ' + Apuesta + '<br>' + 'Su Saldo actual es: ' + Saldo + '<br>';
})

function displayCardJ() {
    let showCard = GenerarCarta();
    document.getElementById("MostrarCartaUsuario").innerHTML = showCard[5];
    document.getElementById("MostrarCartaUsuario-2").innerHTML = showCard[4];
    document.getElementById("MostrarCartaUsuario-3").innerHTML = showCard[3];
    CartasJ = showCard[2];
}

function displayCardB(){
    showCard = GenerarCarta();
    document.getElementById("MostrarCartaBot").innerHTML = showCard[5];
    document.getElementById("MostrarCartaBot-2").innerHTML = showCard[4];
    document.getElementById("MostrarCartaBot-3").innerHTML = showCard[3];
    CartasB = showCard[2];
}

function Conversiones(){
    switch(ConversionCard){
        case 'A':
            ConversionCard = 1;
        break;
        case 'J':
            ConversionCard = 11
        break;
        case 'Q':
            ConversionCard = 12
        break;
        case 'K':
            ConversionCard = 13
        break;
    }
}

function GenerarCarta() {
    singleCard = cards[Math.floor(Math.random() * cards.length)];
    singleNumber = numbers[Math.floor(Math.random() * numbers.length)];
    ConversionCard = singleNumber;
    Conversiones();
    return [singleCard, singleNumber, ConversionCard, `${singleNumber} <br> ${singleCard}`, `${singleCard}`, `${singleCard} <br> ${singleNumber}`];
}

function Juego(){
    if(Saldo - Apuesta >= 1){
        displayCardB();
        displayCardJ();
        if(CartasJ > CartasB){
            console.log("| Victoria para el jugador |");
            P_CartasJ += 1;
            Saldo = Saldo + (Apuesta * 1.15);
            Puntuacion.innerHTML = `Su apuesta actual es: ${Apuesta} <br> Su Saldo actual es: ${Saldo} <br> Punto para el jugador.<br>Jugador = ${P_CartasJ} | Maquina = ${P_CartasB}`;
        }else if(CartasJ < CartasB){
            console.log("| Victoria para el bot |");
            P_CartasB += 1;
            Saldo -= Apuesta;
            Puntuacion.innerHTML = `Su apuesta actual es: ${Apuesta} <br> Su Saldo actual es: ${Saldo} <br> Punto para la maquina.<br>Jugador = ${P_CartasJ} | Maquina = ${P_CartasB}`;
        }else{
            console.log("Empate");
            Puntuacion.innerHTML = `Su apuesta actual es: ${Apuesta} <br> Su Saldo actual es: ${Saldo} <br> Empate.<br>Jugador = ${P_CartasJ} | Maquina = ${P_CartasB}`;
        }
    }else{
        console.log("No hay dinero disponible para realizar esa apuesta.");
    }
    Test_Errores();
}

//

function MostrarPantalla(l){
    switch(l){
        case 1:
            Pantallas = document.getElementById('Apuestas');
            if(Pantalla == false){
                Pantallas.style.display = 'flex';
                Pantalla = true;
                console.log("hola");
            }else{
                Pantallas.style.display = 'none';
                Pantalla = false;
                console.log("chau");
            }
        break;

        case 2:
            Pantallas = document.getElementById('ModApuesta');
            if(Pantalla == false){
                Pantallas.style.display = 'flex';
                Pantalla = true;
            }else{
                Pantallas.style.display = 'none';
                Pantalla = false;
            }
        break;

        case 3:
            Pantallas = document.getElementById('Instrucciones');
            if(Pantalla == false){
                Pantallas.style.display = 'flex';
                Pantalla = true;
                console.log("Muestra");
            }else{
                Pantallas.style.display = 'none';
                Pantalla = false;
                console.log("Cerrar");
            }
    }
}

function guardarApuesta(){
    let apuestaInput = document.getElementById('apuesta-input');
    let Apuesta1 = parseFloat(apuestaInput.value);
    if(!isNaN(Apuesta1) && Apuesta1 > 0){
        Apuesta = Apuesta1;
    }else{
        console.log("Error, valor ingresado no valido.")
    }
}

function VolverFuncion(){
    let Volver = document.getElementById('Volver');
    location.href = "../../index.html"; 
    /*
     * Volver a pagina de inicio de juegos del casino
    */
}

// Testeo de errores

function Test_Errores(){
    console.log("==============================");
    console.log(GenerarCarta()+" | "+singleCard+" | "+singleNumber + " | " + ConversionCard);
    console.log("J: " + P_CartasJ + " ! " + " B: " + P_CartasB);
    console.log("J: " + CartasJ + " | " + " B: " + CartasB);
    console.log("Apuesta: " + Apuesta + " | " + "Saldo actual: " + Saldo);
    console.log("==============================");
    return 0;
}