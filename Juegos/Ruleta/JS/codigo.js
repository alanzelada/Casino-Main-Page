var options = [
  "0", "32", "15", "19", "4", "21", "2",
  "25", "17", "34", "6", "27", "13", 
  "36", "11", "30", "8", "23", "10",
  "5", "24", "16", "33", "1", "20", 
  "14", "31", "9", "22", "18", "29", 
  "7", "28", "12", "35", "3", "26"
];

const audioWin = document.getElementById('audioPlayer_win');
const audioLose = document.getElementById('audioPlayer_lose');
const audioSpin = document.getElementById('audioPlayer_spin');
const audioChip = document.getElementById('audioPlayer_chip');
const audioClick = document.getElementById('audioPlayer_click');

var spinRightNow = false;

var preocupacion = 0;
var loggedIn = false;
var nroRonda = 0;
var startAngle = 180;
var arc = Math.PI / (options.length / 2);
var spinTimeout = null;

var spinArcStart = 0;
var spinTime = 0;
var spinTimeTotal = 0;

var spinning = true;
var numGanador = -1;

var ctx;

var newestResults = new Array(5);
newestResults = ['-', '-', '-', '-', '-'];
var selectedField = new Array(48);
var selectedFicha = 100;
var fieldState = new Array(48);
var puntosAcum = 0;

var recienIngresado = true;


let user = JSON.parse(localStorage.getItem('user'));

async function updateUserPoints(pointsToAddOrSubtract) {
  const apiUrl = "http://localhost/server/";
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: user.id,
      points: pointsToAddOrSubtract,
    }),
  };

  try {
    response = await fetch(apiUrl, requestOptions)

    if (response.ok) {
      // Points updated successfully
      console.log("Points updated successfully");
      var id = user.id;
      const points = await getUserPoints(id);
      user = { id, points };
      localStorage.setItem('user', JSON.stringify(user));
      actualizarPuntos();
    } else {
      // Handle the error here
      console.error("Error updating points");
    }
  }
  catch (error) {
    // Handle network or other errors
    console.error("Error updating points:", error);
  }
}


async function getUserPoints(username) {
  const apiUrl = `http://localhost/server/?username=${username}`;

  try {
    const response = await fetch(apiUrl);
    if (response.ok) {
      const data = await response.json();
      return data.points;
    } else {
      // Handle the error here
      console.error("Error getting user points");
      return null;
    }
  } catch (error) {
    // Handle network or other errors
    console.error("Error getting user points:", error);
    throw error;
  }
}






for(var y = 0; y <= 48; y++){
  selectedField[y] = 0;
  fieldState[y] = false;
}

function getParametroValor(nombre)
{
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(nombre);
}

/*
document.getElementById('form-ingreso').addEventListener('submit', function(event) {
  event.preventDefault();

  var userName = document.querySelector('input[name="nombre"]').value;
  //let userPts = document.querySelector('input[name="puntos"]').value;

  console.log('Nombre: ' + userName);
  document.getElementById('userName').textContent = userName;
  //console.log('Puntos: ' + userPts);
  
  //pts = parseInt(userPts);
  actualizarPuntos();

  document.querySelector('.caja-ingreso').style.display = 'none';
  
  loggedIn = true;
  
});
*/







var pts = 0; 

actualizarPuntos();
async function actualizarPuntos() {
  try {
    const puntos = await getUserPoints(user.id);
    document.getElementById("ptstotales__text").textContent = 'Puntos: ' + puntos;
    pts = puntos;
  } catch (error) {
    console.error("Error al obtener los puntos:", error);
  }
}

function actualizarHistorial(){
  if (newestResults.length <= 1) {
    return newestResults; 
  }

  const primerElemento = newestResults[0];

  for (let i = 0; i < newestResults.length - 1; i++) {
    newestResults[i] = newestResults[i + 1];
  }

  newestResults[newestResults.length - 1] = numGanador;
  //console.log(newestResults)

  document.getElementById('result-1').textContent = newestResults[4];
  document.getElementById('result-2').textContent = newestResults[3];
  document.getElementById('result-3').textContent = newestResults[2];
  document.getElementById('result-4').textContent = newestResults[1];
  document.getElementById('result-5').textContent = newestResults[0];
}

function selectFicha(element) {
  var ind = element.getAttribute('data-index');
  var divFichaSelec = document.querySelector('#fichaSeleccionada img');
  divFichaSelec.src = 'IMG/ficha' + ind + '.png';
  selectedFicha = parseInt(ind);
  console.log('Ficha ' + ind + ' seleccionada');

  audioClick.pause();
  audioClick.currentTime = 0;
  audioClick.play();
}

function limpiarTablero(){
  for(var l = 0; l <= 48; l++){
      if(selectedField[l] > 0 && selectedField[l] <= 500)
      {
        var imagen = document.getElementById(l).querySelector('img');
        document.getElementById(l).querySelector('h1').style.display = 'flex';
        selectedField[l] = 0;
        fieldState[l] = false;
        if(imagen){
          imagen.remove();
        }
      }
      if(selectedField[l] > 1000){
        selectedField[l] = 0;
      }
      puntosAcum = 0;
  }
  for(let n = 1; n <= 36; n++){
    document.getElementById(n).style.opacity = '100%';
  }
  console.log('Tablero restablecido.')
  //console.log(selectedField)
}

document.addEventListener("keydown", function(event) {
  if (event.key === "F9") {
    if(spinning === true){
      mensaje('Esperá a que gire la ruleta para resetear el tablero', 'red', 2);
    }
    else{
      limpiarTablero();
      mensaje('F7 - Tablero reseteado con éxito', 'white', 2);
      console.log('Tablero reiniciado')
    }
  }
});

function markNumber(element)
{
    if(spinning === true){
      mensaje('Espera a que gire la ruleta para apostar o quitar fichas.', 'red', 2)
    }
    else if(spinning === false){
      if(preocupacion != 0){
        preocupacion = 100;
        console.log('Nivel de preocupación restaurado por interacción')
      }
      var idx = parseInt(element.getAttribute('data-index'));

      audioChip.pause();
      audioChip.currentTime = 0;
      audioChip.play();
      
      if(pts === 0){
        document.getElementById('noPts').style.display = 'flex';
      }
      if(selectedField[idx] === 0 && puntosAcum + selectedFicha > pts){
        mensaje('¡Puntos insuficientes!', 'white', 1)
        mensaje('Estás intentando apostar '+(puntosAcum + selectedFicha)+' en fichas teniendo '+pts+' puntos', 'white', 2)
      }
      if(selectedField[idx] === 0 && puntosAcum + selectedFicha <= pts){
        var imagen = document.createElement('img');
        
        imagen.src = 'IMG/ficha'+selectedFicha+'.png';
        
        imagen.style.width = '28px';
        imagen.style.height = '28px';
        
        selectedField[idx] = selectedFicha;
        fieldState[idx] = true;
  
        console.log('Ficha '+selectedFicha+' colocada en casillero '+idx);
  
        element.querySelector('h1').style.display = 'none';
        element.appendChild(imagen);
        switch(idx){
          case 37:{ //2 A 1
            if(selectedField[38] === 0 && selectedField[39] === 0 && selectedFicha >= 200){
              for(let n = 3; n <= 36; n = n+3){


                var imagen = document.getElementById(n).querySelector('img');
                document.getElementById(n).querySelector('h1').style.display = 'flex';
                //Testing
                if(selectedField[n] <= 500){
                  puntosAcum = puntosAcum - selectedField[n];
                  //console.log("-"+selectedField[n]+" puntos de apuesta acumulados (Total "+puntosAcum+")");
                }
                //
                selectedField[n] = 0;
                fieldState[n] = false;
                if(imagen){
                  imagen.remove();
                }


                selectedField[n] = 1037;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '40%';
              }
            }
            else{
              if(selectedField[38] != 0 || selectedField[39]  != 0){
                mensaje('Solo podés apostar a un solo casillero de 2 A 1', 'white', 2);
              }
              else{
                mensaje('Solo podés apostar con fichas de 200 o 500 en esta casilla (2 A 1)', 'white', 2);
              }
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
            break;
          }
          case 38:{ //2 A 1
            if(selectedField[37] === 0 && selectedField[39] === 0 && selectedFicha >= 200){
              for(let n = 2; n <= 35; n = n+3){

                
                var imagen = document.getElementById(n).querySelector('img');
                document.getElementById(n).querySelector('h1').style.display = 'flex';
                //Testing
                if(selectedField[n] <= 500){
                  puntosAcum = puntosAcum - selectedField[n];
                  //console.log("-"+selectedField[n]+" puntos de apuesta acumulados (Total "+puntosAcum+")");
                }
                //
                selectedField[n] = 0;
                fieldState[n] = false;
                if(imagen){
                  imagen.remove();
                }


                selectedField[n] = 1038;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '40%';
              }
            }
            else{
              if(selectedField[37] != 0 || selectedField[39]  != 0){
                mensaje('Solo podés apostar a un solo casillero de 2 A 1', 'white', 2);
              }
              else{
                mensaje('Solo podés apostar con fichas de 200 o 500 en esta casilla (2 A 1)', 'white', 2);
              }
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 39:{ //2 A 1
            if(selectedField[37] === 0 && selectedField[38] === 0 && selectedFicha >= 200){
              for(let n = 1; n <= 34; n = n+3){

                
                var imagen = document.getElementById(n).querySelector('img');
                document.getElementById(n).querySelector('h1').style.display = 'flex';
                //Testing
                if(selectedField[n] <= 500){
                  puntosAcum = puntosAcum - selectedField[n];
                  //console.log("-"+selectedField[n]+" puntos de apuesta acumulados (Total "+puntosAcum+")");
                }
                //
                selectedField[n] = 0;
                fieldState[n] = false;
                if(imagen){
                  imagen.remove();
                }


                selectedField[n] = 1039;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '40%';
              }
            }
            else{
              if(selectedField[37] != 0 || selectedField[38]  != 0){
                mensaje('Solo podés apostar a un solo casillero de 2 A 1', 'white', 2);
              }
              else{
                mensaje('Solo podés apostar con fichas de 200 o 500 en esta casilla (2 A 1)', 'white', 2);
              }
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 40:{ //1RA DOCENA
            if(selectedFicha >= 200){
              for(let n = 1; n <= 12; n++){

                
                var imagen = document.getElementById(n).querySelector('img');
                document.getElementById(n).querySelector('h1').style.display = 'flex';
                //Testing
                if(selectedField[n] <= 500){
                  puntosAcum = puntosAcum - selectedField[n];
                  //console.log("-"+selectedField[n]+" puntos de apuesta acumulados (Total "+puntosAcum+")");
                }
                //

                selectedField[n] = 0;
                fieldState[n] = false;

                if(imagen){
                  imagen.remove();
                }


                selectedField[n] = 1040;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '40%';
                
              }
            }
            else{
              mensaje('Solo podés apostar con fichas de 200 o 500 en esta casilla (1ra docena)', 'white', 2);
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 41:{ //2DA DOCENA
            if(selectedFicha >= 200){
              for(let n = 13; n <= 24; n++){

                
                var imagen = document.getElementById(n).querySelector('img');
                document.getElementById(n).querySelector('h1').style.display = 'flex';
                //Testing
                if(selectedField[n] <= 500){
                  puntosAcum = puntosAcum - selectedField[n];
                  //console.log("-"+selectedField[n]+" puntos de apuesta acumulados (Total "+puntosAcum+")");
                }
                //
                selectedField[n] = 0;
                fieldState[n] = false;
                if(imagen){
                  imagen.remove();
                }


                selectedField[n] = 1041;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '40%';
              }
            }
            else{
              mensaje('Solo podés apostar con fichas de 200 o 500 en esta casilla (2da docena)', 'white', 2);
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 42:{ //3RA DOCENA
            if(selectedFicha >= 200){
              for(let n = 25; n <= 36; n++){

                
                var imagen = document.getElementById(n).querySelector('img');
                document.getElementById(n).querySelector('h1').style.display = 'flex';
                //Testing
                if(selectedField[n] <= 500){
                  puntosAcum = puntosAcum - selectedField[n];
                  //console.log("-"+selectedField[n]+" puntos de apuesta acumulados (Total "+puntosAcum+")");
                }
                //
                selectedField[n] = 0;
                fieldState[n] = false;
                if(imagen){
                  imagen.remove();
                }


                selectedField[n] = 1042;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '40%';
              }
            }
            else{
              mensaje('Solo podés apostar con fichas de 200 o 500 en esta casilla (3ra docena)', 'white', 2);
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 43:{ // 1 A 18
            if(selectedFicha >= 200 && selectedField[48] === 0){
              for(let n = 1; n <= 18; n++){

                
                var imagen = document.getElementById(n).querySelector('img');
                document.getElementById(n).querySelector('h1').style.display = 'flex';
                //Testing
                if(selectedField[n] <= 500){
                  puntosAcum = puntosAcum - selectedField[n];
                  //console.log("-"+selectedField[n]+" puntos de apuesta acumulados (Total "+puntosAcum+")");
                }
                //
                selectedField[n] = 0;
                fieldState[n] = false;
                if(imagen){
                  imagen.remove();
                }


                selectedField[n] = 1043;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '40%';
              }
            }
            else{
              if(selectedField[48] != 0){
                mensaje('No podés apostar a la casilla 1-18 teniendo una ficha sobre la casilla 19-36', 'white', 2);
              }
              else{
                mensaje('Solo podés apostar con fichas de 200 o 500 en esta casilla (1-18)', 'white', 2);
              }
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 44:{ // PAR
            if(selectedFicha >= 200 && selectedField[47] === 0){
              for(let n = 2; n <= 36; n = n+2){

                
                var imagen = document.getElementById(n).querySelector('img');
                document.getElementById(n).querySelector('h1').style.display = 'flex';
                //Testing
                if(selectedField[n] <= 500){
                  puntosAcum = puntosAcum - selectedField[n];
                  //console.log("-"+selectedField[n]+" puntos de apuesta acumulados (Total "+puntosAcum+")");
                }
                //
                selectedField[n] = 0;
                fieldState[n] = false;
                if(imagen){
                  imagen.remove();
                }


                selectedField[n] = 1044;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '40%';
              }
            }
            else{
              if(selectedField[47] != 0){
                mensaje('No podés apostar a la casilla PAR teniendo una ficha sobre la casilla IMPAR', 'white', 2);
              }
              else{
                mensaje('Solo podés apostar con fichas de 200 o 500 en esta casilla (PAR)', 'white', 2);
              }
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 45:{ // ROJO
            if(selectedFicha >= 200 && selectedField[46] === 0){
              const rojos = [1, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

              for (let i = 0; i < rojos.length; i++) {
                const fieldIndex = rojos[i];
                
                var imagen = document.getElementById(fieldIndex).querySelector('img');
                document.getElementById(fieldIndex).querySelector('h1').style.display = 'flex';
                //Testing
                if(selectedField[fieldIndex] <= 500){
                  puntosAcum = puntosAcum - selectedField[fieldIndex];
                  //console.log("-"+selectedField[fieldIndex]+" puntos de apuesta acumulados (Total "+puntosAcum+")");
                }
                //
                selectedField[fieldIndex] = 0;
                fieldState[fieldIndex] = false;
                if(imagen){
                  imagen.remove();
                }


                selectedField[fieldIndex] = 1045;
                //fieldState[fieldIndex] = true;
                document.getElementById(fieldIndex).style.opacity = '40%';
              }
            }
            else{
              if(selectedField[46] != 0){
                mensaje('No podés apostar a la casilla "ROJO" teniendo una ficha sobre la casilla "NEGRO"', 'white', 2);
              }
              else{
                mensaje('Solo podés apostar con fichas de 200 o 500 en esta casilla (Color Rojo)', 'white', 2);
              }
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 46:{ // NEGRO
            if (selectedFicha >= 200 && selectedField[45] === 0) {
              const negros = [2, 3, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

              for (let i = 0; i < negros.length; i++) {
                const fieldIndex = negros[i];

                
                var imagen = document.getElementById(fieldIndex).querySelector('img');
                document.getElementById(fieldIndex).querySelector('h1').style.display = 'flex';
                //Testing
                if(selectedField[fieldIndex] <= 500){
                  puntosAcum = puntosAcum - selectedField[fieldIndex];
                  //console.log("-"+selectedField[fieldIndex]+" puntos de apuesta acumulados (Total "+puntosAcum+")");
                }
                //

                selectedField[fieldIndex] = 0;
                fieldState[fieldIndex] = false;
                if(imagen){
                  imagen.remove();
                }


                selectedField[fieldIndex] = 1046;
                //fieldState[fieldIndex] = true;
                document.getElementById(fieldIndex).style.opacity = '40%';
              }
            }
            else{
              if(selectedField[45] != 0){
                mensaje('No podés apostar a la casilla "NEGRO" teniendo una ficha sobre la casilla "ROJO"', 'white', 2);
              }
              else{
                mensaje('Solo podés apostar con fichas de 200 o 500 en esta casilla (Color Negro)', 'white', 2);
              }
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 47:{ // IMPAR
            if(selectedFicha >= 200 && selectedField[44] === 0){
              for(let n = 1; n <= 35; n = n+2){

                
                var imagen = document.getElementById(n).querySelector('img');
                document.getElementById(n).querySelector('h1').style.display = 'flex';
                //Testing
                if(selectedField[n] <= 500){
                  puntosAcum = puntosAcum - selectedField[n];
                  //console.log("-"+selectedField[n]+" puntos de apuesta acumulados (Total "+puntosAcum+")");
                }
                //
                selectedField[n] = 0;
                fieldState[n] = false;
                if(imagen){
                  imagen.remove();
                }


                selectedField[n] = 1047;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '40%';
              }
            }
            else{
              if(selectedField[44] != 0){
                mensaje('No podés apostar a la casilla IMPAR teniendo una ficha sobre la casilla PAR', 'white', 2);
              }
              else{
                mensaje('Solo podés apostar con fichas de 200 o 500 en esta casilla (IMPAR)', 'white', 2);
              }
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 48:{ //19-36
            if(selectedFicha >= 200 && selectedField[43] === 0){
              for(let n = 19; n <= 36; n++){

                
                var imagen = document.getElementById(n).querySelector('img');
                document.getElementById(n).querySelector('h1').style.display = 'flex';
                //Testing
                if(selectedField[n] <= 500){
                  puntosAcum = puntosAcum - selectedField[n];
                  //console.log("-"+selectedField[n]+" puntos de apuesta acumulados (Total "+puntosAcum+")");
                }
                //
                selectedField[n] = 0;
                fieldState[n] = false;
                if(imagen){
                  imagen.remove();
                }


                selectedField[n] = 1048;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '40%';
              }
            }
            else{
              if(selectedField[43] != 0){
                mensaje('No podés apostar a la casilla 19-36 teniendo una ficha sobre la casilla 1-18', 'white', 2);
              }
              else{
                mensaje('Solo podés apostar con fichas de 200 o 500 en esta casilla (19-36)', 'white', 2);
              }
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
        }
        if(fieldState[idx] === true){
            puntosAcum = puntosAcum + selectedFicha;
            //console.log("+"+selectedFicha+" puntos de apuesta acumulados (Total "+puntosAcum+")");
        }
      }
      else if(fieldState[idx] === true){
        var imagen = element.querySelector('img');
        element.querySelector('h1').style.display = 'flex';
        puntosAcum = puntosAcum - selectedField[idx];
        //console.log("-"+selectedField[idx]+" puntos de apuesta acumulados (Total "+puntosAcum+")");

        selectedField[idx] = 0;
        fieldState[idx] = false;
        imagen.remove();

        switch(idx){
          case 37:{ //2 A 1 arriba
            for(let n = 3; n <= 36; n = n+3){
              selectedField[n] = 0;
              fieldState[n] = false;
              document.getElementById(n).style.opacity = '100%';

              var imagen = document.getElementById(n).querySelector('img');
              document.getElementById(n).querySelector('h1').style.display = 'flex';
              if (imagen) {
                imagen.remove();
              }
              
              //element.querySelector('h1').style.display = 'flex';
            }
            break;
          }
          case 38:{ //2 A 1 en medio
            for(let n = 2; n <= 35; n = n+3){
              selectedField[n] = 0;
              fieldState[n] = false;
              document.getElementById(n).style.opacity = '100%';
            }
            break;
          }
          case 39:{ //2 A 1 abajo
            for(let n = 1; n <= 34; n = n+3){
              selectedField[n] = 0;
              fieldState[n] = false;
              document.getElementById(n).style.opacity = '100%';
            }
            break;
          }
          case 40:{ //1RA DOCENA
            for(let n = 1; n <= 12; n++){
              selectedField[n] = 0;
              fieldState[n] = false;
              document.getElementById(n).style.opacity = '100%';
            }
            break;
          }
          case 41:{ //2DA DOCENA
            for(let n = 13; n <= 24; n++){
              selectedField[n] = 0;
              fieldState[n] = false;
              document.getElementById(n).style.opacity = '100%';
            }
            break;
          }
          case 42:{ //3RA DOCENA
            for(let n = 25; n <= 36; n++){
              selectedField[n] = 0;
              fieldState[n] = false;
              document.getElementById(n).style.opacity = '100%';
            }
            break;
          }
          case 43:{ // 1-18
            for(let n = 1; n <= 18; n++){
              selectedField[n] = 0;
              fieldState[n] = false;
              document.getElementById(n).style.opacity = '100%';
            }
            break;
          }
          case 44:{ // PAR
            for(let n = 2; n <= 36; n = n+2){
              selectedField[n] = 0;
              fieldState[n] = false;
              document.getElementById(n).style.opacity = '100%';
            }
            break;
          }
          case 45:{ // ROJO
            const rojos = [1, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

            for (let i = 0; i < rojos.length; i++) {
              const fieldIndex = rojos[i];
              selectedField[fieldIndex] = 0;
              fieldState[fieldIndex] = false;
              document.getElementById(fieldIndex).style.opacity = '100%';
            }
            break;
          }
          case 46:{ // NEGRO
            const negros = [2, 3, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

            for (let i = 0; i < negros.length; i++) {
              const fieldIndex = negros[i];
              selectedField[fieldIndex] = 0;
              fieldState[fieldIndex] = false;
              document.getElementById(fieldIndex).style.opacity = '100%';
            }
            break;
          }
          case 47:{ // IMPAR
              for(let n = 1; n <= 35; n = n+2){
                selectedField[n] = 0;
                fieldState[n] = false;
                document.getElementById(n).style.opacity = '100%';
              }
          }
          case 48:{ //19-36
            for(let n = 19; n <= 36; n++){
              selectedField[n] = 0;
              fieldState[n] = false;
              document.getElementById(n).style.opacity = '100%';
            }
          }
        }
      }
    }
    //console.log('selectedField['+idx+'] = '+selectedField[idx]);
    //console.log(selectedField)
}

function cuentaAtras(){
    var contadorElement = document.getElementById('contador');
    var spinNowElement = document.getElementById('spinNow');
    var contador = 60;

    spinning = false;

    const intervalo = setInterval(function() {
    contador--;
    contadorElement.textContent = contador + 's';

    
    spinNowElement.textContent = 'GIRAR YA';
    spinNowElement.style.display = 'flex';
    spinNowElement.style.color = 'white';
    spinNowElement.style.backgroundColor = '#47b850';
    spinNowElement.style.outline = '1px solid white';
    spinNowElement.style.cursor = 'pointer';

    if (contador <= 10){
      contadorElement.style.color = '#ad2525';
      if(contador === 1) mensaje('Las apuestas cerrarán en un segundo', 'red', 1);
      else mensaje('Las apuestas cerrarán en ' +contador+ ' segundos', 'red', 1);
    }
    if (contador === 0 || spinRightNow === true) {
      spinRightNow = false;
      clearInterval(intervalo);
      contadorElement.textContent = '...';
      contadorElement.style.color = 'white';

      spinNowElement.textContent = 'Girando ruleta...';
      spinNowElement.style.fontSize = '0.9rem';
      spinNowElement.style.color = 'gray';
      spinNowElement.style.backgroundColor = '#111111';
      spinNowElement.style.outline = 'none';
      spinNowElement.style.cursor = 'default';

      spin();
    }
  }, 1000);
}

function checkWin(numGanador){
  var res = 0;
  var suma = 0;
  if(selectedField[numGanador] >= 1)
  {
    var win = true;
    console.log('El jugador ganó con ficha de '+selectedField[numGanador]+' en el casillero '+numGanador);
  }
  for (var num = 0; num <= 36; num++) {
    /* SUMAR PUNTOS */
    if (num === numGanador && selectedField[numGanador] >= 1) 
    {
      if (selectedField[numGanador] > 1000)
      {
        let pos = parseInt(selectedField[numGanador]) - 1000;
        suma = parseInt(selectedField[pos]);

        var imagen = document.getElementById(pos).querySelector('img');
        document.getElementById(pos).querySelector('h1').style.display = 'flex';
        if (imagen) {
          imagen.remove();
        }

        selectedField[pos] = 0;
        fieldState[pos] = false;
      } 
      else
      {
        suma = parseInt(selectedField[numGanador]);
      }
    } 
  }

  for (var num = 0; num <= 36; num++) {
    if (num != numGanador) 
    {
      if (selectedField[num] != 0) 
      {
        if (selectedField[num] < 1000) 
        {
          res = res + parseInt(selectedField[num]);
        }
        else if(selectedField[num] > 1000){
          /*var pos = parseInt(selectedField[num]) - 1000;
          if(fieldState[pos] === true){
            console.log(selectedField[pos])
            res = res + parseInt(selectedField[pos]);
            fieldState[pos] === false;
          }*/
        }
      }
    }
  }
  for (var num = 37; num <= 48; num++) {
    if(num != numGanador){
      switch(num){
        case 37:{
          if(selectedField[3] === 1037){
            res = res + parseInt(selectedField[37]);
          }
          break;
        }
        case 38:{
          if(selectedField[2] === 1038){
            res = res + parseInt(selectedField[38]);
          }
          break;
        }
        case 39:{
          if(selectedField[1] === 1039){
            res = res + parseInt(selectedField[39]);
          }
          break;
        }
        case 40:{
          if(selectedField[1] === 1040){
            res = res + parseInt(selectedField[40]);
          }
          break;
        }
        case 41:{
          if(selectedField[13] === 1041){
            res = res + parseInt(selectedField[41]);
          }
          break;
        }
        case 42:{
          if(selectedField[25] === 1042){
            res = res + parseInt(selectedField[42]);
          }
          break;
        }
        case 43:{
          if(selectedField[18] === 1043){
            res = res + parseInt(selectedField[43]);
          }
          break;
        }
        case 44:{
          if(selectedField[2] === 1044){
            res = res + parseInt(selectedField[44]);
          }
          break;
        }
        case 45:{
          if(selectedField[9] === 1045){
            res = res + parseInt(selectedField[45]);
          }
          break;
        }
        case 46:{
          if(selectedField[1] === 1046){
            res = res + parseInt(selectedField[46]);
          }
          break;
        }
        case 47:{
          if(selectedField[3] === 1047){
            res = res + parseInt(selectedField[47]);
          }
          break;
        }
        case 48:{
          if(selectedField[36] === 1048){
            res = res + parseInt(selectedField[48]);
          }
          break;
        }
      }
    }
  }

  suma = suma * 2;
  updateUserPoints(-res)
  updateUserPoints(suma)


  if(suma === 0 && res === 0){
      if(recienIngresado === true){
        recienIngresado = false;
      }
      else{
        if(preocupacion === 100){
          preocupacion = 0;
          console.log('Nivel de preocupación: '+preocupacion)
        }
        else{
          if(document.getElementById("myModal").style.display != "flex"){
            preocupacion++;
          }
          if(preocupacion === 2){
            document.getElementById('boxPreocupado').style.display = 'flex';
            preocupacion = 0;
          }

          console.log('Nivel de preocupación: '+preocupacion);
        }

        mensaje('¡No apostaste ninguna ficha! Salió el número '+numGanador, 'white', 1);
      }
  }
  else {
    mensaje('¡Ganaste ' + suma + ' puntos y perdiste ' + res + '! Salió el número ' + numGanador, 'white', 1);

    var textPlusPoint = '';
    if(suma-res < 0){
      textPlusPoint = (suma-res);
    }
    
    if(suma-res > 0){
      textPlusPoint = '+'+(suma-res);
    }

    if (suma > 0 && suma > res) {
        audioWin.play();
        document.getElementById('pluspoint').style.display = 'none';
        setTimeout(function () {
            document.getElementById('pluspoint').style.display = 'flex';
            document.getElementById('pluspoint').textContent = textPlusPoint;
        }, 2);
    } 
    else if (suma <= res) {
        audioLose.play();
        document.getElementById('pluspoint').style.display = 'none';
        setTimeout(function () {
            document.getElementById('pluspoint').style.display = 'flex';
            document.getElementById('pluspoint').textContent = textPlusPoint;
        }, 2); 
    }
  }

  suma = 0;
  res = 0; 
  actualizarHistorial();
  limpiarTablero();
  cuentaAtras();
}

function RGB2Color(r, g, b) {
  return '#ffffff';
}

function getColor(item, maxitem) {
  var phase = 0;
  var center = 128;
  var width = 127;
  var frequency = Math.PI * 2 / maxitem;

  red = Math.sin(frequency * item + 2 + phase) * width + center;
  green = Math.sin(frequency * item + 0 + phase) * width + center;
  blue = Math.sin(frequency * item + 4 + phase) * width + center;

  return RGB2Color(red, green, blue);
}

function drawRouletteWheel() {
  var canvas = document.getElementById("canvas");
  if (canvas.getContext) {
    var outsideRadius = 160;
    var textRadius = 128;
    var insideRadius = 100;

    ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, 500, 500);

    ctx.strokeStyle = "white";
    ctx.lineWidth = 2;

    ctx.font = "bold 0.8rem 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";

    for (var i = 0; i < options.length; i++) {
      var angle = startAngle + i * arc;

      if (i === 0) ctx.fillStyle = '#3BCD05';
      else if (i % 2 === 0) ctx.fillStyle = '#000000';
      else ctx.fillStyle = '#f31616';

      ctx.beginPath();
      ctx.arc(250, 250, outsideRadius, angle, angle + arc, false);
      ctx.arc(250, 250, insideRadius, angle + arc, angle, true);
      ctx.stroke();
      ctx.fill();

      ctx.save();
      ctx.fillStyle = "white";
      ctx.translate(250 + Math.cos(angle + arc / 2) * textRadius,
        250 + Math.sin(angle + arc / 2) * textRadius);
      ctx.rotate(angle + arc / 2 + Math.PI / 2);
      var text = options[i];
      ctx.fillText(text, -ctx.measureText(text).width / 2, 0);
      ctx.restore();
    }

    //Arrow
    ctx.fillStyle = "white";
    ctx.beginPath();
    ctx.moveTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius + 5));
    ctx.lineTo(250 + 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 + 0, 250 - (outsideRadius - 13));
    ctx.lineTo(250 - 9, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius - 5));
    ctx.lineTo(250 - 4, 250 - (outsideRadius + 5));
    ctx.fill();
  }
}

function spin() {
  spinning = true;

  //if (spinTimeout !== null) return; // Evitar múltiples giros al hacer clic repetidamente
  audioSpin.play();
  
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;

  
  spinTimeTotal = 7500;

  rotateWheel();

  mensaje('Apuestas cerradas', 'white', 1);
  mensaje('Esperá a que gire la ruleta para apostar', 'white', 2);


  if(recienIngresado === true){
    mensaje('¡Bienvenido/a a la ruleta!', 'white', 1);
    mensaje('Si no sabés como jugar, hacé click en el botón de abajo a la izquierda "?"', 'white', 2);
  }

}

function mensaje(mensaje, color, tipo){
  var msj = document.getElementById('mensaje');

  switch(tipo){
    case 1:{ //Principal
      var msj = document.getElementById('mensaje');
      break;
    }
    case 2:{ //Secundario
      var msj = document.getElementById('subMensaje');
      break;
    }
  }
  msj.textContent = mensaje;
  msj.style.color = color;
}

function rotateWheel() {
  spinTime += 30;
  if (spinTime >= spinTimeTotal) {
    stopRotateWheel();
    return;
  }
  var spinAngle = spinAngleStart - easeOut(spinTime, 0, spinAngleStart, spinTimeTotal);
  startAngle += (spinAngle * Math.PI / 180);
  drawRouletteWheel();
  spinTimeout = setTimeout(rotateWheel, 30);
}

function stopRotateWheel() {
  clearTimeout(spinTimeout);
  spinTimeout = null; // Restablecer el valor del timeout para permitir giros adicionales

  var degrees = startAngle * 180 / Math.PI + 90;
  var arcd = arc * 180 / Math.PI;
  var index = Math.floor((360 - degrees % 360) / arcd);
  ctx.save();
  ctx.font = "bold 2.2rem 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', Arial, sans-serif";
  var text = options[index];
  if(recienIngresado === true){
    ctx.fillText('', 250 - ctx.measureText(text).width / 2, 250 + 10);
  }
  else{
    ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  }
  ctx.restore();

  mensaje('Realice su apuesta por favor', 'white', 1);
  mensaje('Selecciona una ficha y apostala en cualquier lugar del tablero', 'white', 2);
  
  numGanador = parseInt(text);
  console.log('Numero ganador: '+text);


  checkWin(numGanador);
  nroRonda++;
  console.log ('\n||---- RONDA N°'+nroRonda+' ----||');
}

function okBoton(){
  document.getElementById('boxPreocupado').style.display = 'none';
}
function ayudaBoton(){
  document.getElementById('boxPreocupado').style.display = 'none';
  document.getElementById("myModal").style.display = "flex";
  document.getElementById("myModal").classList.add("modal-active");
}


function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

function spinNow(){
  if(spinning === false){
    spinRightNow = true;
    console.log('Giro instantáneo solicitado')
    audioClick.pause();
    audioClick.currentTime = 0;
    audioClick.play();
  }
}

spin();
