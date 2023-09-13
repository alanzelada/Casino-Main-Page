function MostrarInstrucciones() {
  document.getElementById("myModal").style.display = "flex";
  document.getElementById("myModal").classList.add("modal-active");
}
function closeModal() {
  document.getElementById("myModal").style.display = "none";
  document.getElementById("myModal").classList.remove("modal-active");
}
let dineroDisponibleElement = document.getElementById('dineroDisponible');
let apuestaElement = document.getElementById('apuesta');
const usDadoElement = document.getElementById('usDado');
const resultElement = document.getElementById('result');
const botDado1Element = document.getElementById('botDado1');
const botDado2Element = document.getElementById('botDado2');
const instrucciones = document.getElementById('instrucciones');
let butn = 1;

let dineroDisponible = 5000; 
dineroDisponibleElement.textContent = dineroDisponible;
function tirarDados() {
  const apuesta = parseInt(apuestaElement.value);
  const usDado = parseInt(usDadoElement.value);

  const dado1 = Math.floor(Math.random() * 6) + 1;
  document.querySelector("img.img1").setAttribute("src", "images/dice" + dado1 + ".png");
  
  const dado2 = Math.floor(Math.random() * 6) + 1;
  document.querySelector("img.img2").setAttribute("src", "images/dice" + dado2 + ".png");

  const total = dado1 + dado2;

  if (total == usDado) {
    let ganancias = dineroDisponible + apuesta;
    dineroDisponible = ganancias;
    dineroDisponibleElement.textContent = dineroDisponible;
    resultElement.textContent = '¡Has ganado!';
    botDado1Element.textContent = `Dado 1: ${dado1}`;
    botDado2Element.textContent = `Dado 2: ${dado2}`;
  } else if(apuesta > dineroDisponible){
    alert("No posees el dinero suficiente para realizar esa apuesta");
  }
  else if(apuesta < 100){
    alert("introduzca una cantidad acorde por favor");
  }
  else if(usDado > 12 || usDado < 2){
    alert("Por favor introduzca un número acorde a los dados")
  }
  else{
    let ganancias = dineroDisponible - apuesta;
    dineroDisponible = ganancias;
    dineroDisponibleElement.textContent = dineroDisponible;
    resultElement.textContent = 'Has perdido.';
    botDado1Element.textContent = `Dado 1: ${dado1}`;
    botDado2Element.textContent = `Dado 2: ${dado2}`;
  }
  
}
