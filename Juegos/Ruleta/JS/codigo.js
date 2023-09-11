var options = [
  "0", "32", "15", "19", "4", "21", "2",
  "25", "17", "34", "6", "27", "13", 
  "36", "11", "30", "8", "23", "10",
  "5", "24", "16", "33", "1", "20", 
  "14", "31", "9", "22", "18", "29", 
  "7", "28", "12", "35", "3", "26"
];

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
var selectedFicha = 10;
var fieldState = new Array(48);
var puntosAcum = 0;



for(var y = 0; y <= 48; y++){
  selectedField[y] = 0;
  fieldState[y] = false;
}

function getParametroValor(nombre)
{
  var urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(nombre);
}

var pts = 100;
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


function actualizarPuntos()
{
  document.getElementById("datosIngresados").textContent = 'Puntos: '+pts;
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
  console.log(newestResults)

  document.getElementById('result-1').textContent = newestResults[4];
  document.getElementById('result-2').textContent = newestResults[3];
  document.getElementById('result-3').textContent = newestResults[2];
  document.getElementById('result-4').textContent = newestResults[1];
  document.getElementById('result-5').textContent = newestResults[0];
}

function selectFicha(element) {
  var ind = element.getAttribute('data-index');
  var divFichaSelec = document.getElementById('fichaSeleccionada');
  divFichaSelec.style.backgroundImage = 'url(IMG/f' + ind + '.png)';
  selectedFicha = parseInt(ind);
  console.log('Ficha ' + ind + ' seleccionada');
}

function limpiarTablero(){
  for(var l = 0; l <= 48; l++){
      if(selectedField[l] > 0 && selectedField[l] <= 50)
      {
        var imagen = document.getElementById(l).querySelector('img');
        document.getElementById(l).querySelector('h1').style.display = 'flex';
        selectedField[l] = 0;
        fieldState[l] = false;
        if(imagen){
          imagen.remove();
        }
      }
      if(selectedField[l] > 100){
        selectedField[l] = 0;
      }
      puntosAcum = 0;
  }
  for(let n = 1; n <= 36; n++){
    document.getElementById(n).style.opacity = '100%';
  }
  console.log('Tablero limpiado. Array:'+selectedField)
}

document.addEventListener("keydown", function(event) {
  if (event.key === "F7") {
    if(spinning === true){
      mensaje('Esperá a que gire la ruleta para resetear el tablero', 'red', 2);
    }
    else{
      limpiarTablero();
      mensaje('F7 - Tablero reseteado con éxito', 'white', 2);
    }
  }
});

function markNumber(element)
{
    if(spinning === true){
      mensaje('Espera a que gire la ruleta para apostar', 'red', 2)
    }
    else if(spinning === false){
      var idx = parseInt(element.getAttribute('data-index'));

      if(pts === 0){
        document.getElementById('noPts').style.display = 'flex';
      }
      if(selectedField[idx] === 0 && puntosAcum + selectedFicha > pts){
        mensaje('¡Puntos insuficientes!', 'white', 1)
        mensaje('Estás intentando apostar '+(puntosAcum + selectedFicha)+' en fichas teniendo solo '+pts+' puntos', 'white', 2)
      }
      if(selectedField[idx] === 0 && puntosAcum + selectedFicha <= pts){
        var imagen = document.createElement('img');
        
        imagen.src = 'IMG/f'+selectedFicha+'.png';
        
        imagen.style.width = '28px';
        imagen.style.height = '28px';
        
        selectedField[idx] = selectedFicha;
        fieldState[idx] = true;
  
        console.log('Ficha '+selectedFicha+' colocada en el casillero '+idx);
  
        element.querySelector('h1').style.display = 'none';
        element.appendChild(imagen);
        switch(idx){
          case 37:{ //2 A 1
            if(selectedField[38] === 0 && selectedField[39] === 0 && selectedFicha >= 20){
              for(let n = 3; n <= 36; n = n+3){
                selectedField[n] = 137;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '60%';
              }
            }
            else{
              if(selectedFicha >= 20){
                mensaje('Solo podés apostar a un solo casillero de 2 A 1', 'white', 2);
              }
              else{
                mensaje('Solo podés apostar con fichas de 20 o 50 en esta casilla (2 A 1)', 'white', 2);
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
            if(selectedField[37] === 0 && selectedField[39] === 0 && selectedFicha >= 20){
              for(let n = 2; n <= 35; n = n+3){
                selectedField[n] = 138;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '60%';
              }
            }
            else{
              if(selectedFicha >= 20){
                mensaje('Solo podés apostar a un solo casillero de 2 A 1', 'white', 2);
              }
              else{
                mensaje('Solo podés apostar con fichas de 20 o 50 en esta casilla (2 A 1)', 'white', 2);
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
            if(selectedField[37] === 0 && selectedField[38] === 0 && selectedFicha >= 20){
              for(let n = 1; n <= 34; n = n+3){
                selectedField[n] = 139;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '60%';
              }
            }
            else{
              if(selectedFicha >= 20){
                mensaje('Solo podés apostar a un solo casillero de 2 A 1', 'white', 2);
              }
              else{
                mensaje('Solo podés apostar con fichas de 20 o 50 en esta casilla (2 A 1)', 'white', 2);
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
            if(selectedFicha >= 20){
              for(let n = 1; n <= 12; n++){
                selectedField[n] = 140;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '60%';
              }
            }
            else{
              mensaje('Solo podés apostar con fichas de 20 o 50 en esta casilla (1ra docena)', 'white', 2);
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 41:{ //2DA DOCENA
            if(selectedFicha >= 20){
              for(let n = 13; n <= 24; n++){
                selectedField[n] = 141;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '60%';
              }
            }
            else{
              mensaje('Solo podés apostar con fichas de 20 o 50 en esta casilla (2da docena)', 'white', 2);
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 42:{ //3RA DOCENA
            if(selectedFicha >= 20){
              for(let n = 25; n <= 36; n++){
                selectedField[n] = 142;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '60%';
              }
            }
            else{
              mensaje('Solo podés apostar con fichas de 20 o 50 en esta casilla (3ra docena)', 'white', 2);
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 43:{ // 1 A 18
            if(selectedFicha >= 20 && selectedField[48] === 0){
              for(let n = 1; n <= 18; n++){
                selectedField[n] = 143;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '60%';
              }
            }
            else{
              mensaje('Solo podés apostar con fichas de 20 o 50 en esta casilla (1-18)', 'white', 2);
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 44:{ // PAR
            if(selectedFicha >= 20 && selectedField[47] === 0){
              for(let n = 2; n <= 36; n = n+2){
                selectedField[n] = 144;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '60%';
              }
            }
            else{
              mensaje('Solo podés apostar con fichas de 20 o 50 en esta casilla (PAR)', 'white', 2);
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 45:{ // ROJO
            if(selectedFicha >= 20 && selectedField[46] === 0){
              const rojos = [1, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36];

              for (let i = 0; i < rojos.length; i++) {
                const fieldIndex = rojos[i];
                selectedField[fieldIndex] = 145;
                //fieldState[fieldIndex] = true;
                document.getElementById(fieldIndex).style.opacity = '60%';
              }
            }
            else{
              mensaje('Solo podés apostar con fichas de 20 o 50 en esta casilla (ROJO)', 'white', 2);
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 46:{ // NEGRO
            if (selectedFicha >= 20 && selectedField[45] === 0) {
              const negros = [2, 3, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35];

              for (let i = 0; i < negros.length; i++) {
                const fieldIndex = negros[i];
                selectedField[fieldIndex] = 146;
                //fieldState[fieldIndex] = true;
                document.getElementById(fieldIndex).style.opacity = '60%';
              }
            }
            else{
              mensaje('Solo podés apostar con fichas de 20 o 50 en esta casilla (NEGRO)', 'white', 2);
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 47:{ // IMPAR
            if(selectedFicha >= 20 && selectedField[44] === 0){
              for(let n = 1; n <= 35; n = n+2){
                selectedField[n] = 147;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '60%';
              }
            }
            else{
              mensaje('Solo podés apostar con fichas de 20 o 50 en esta casilla (IMPAR)', 'white', 2);
              var imagen = element.querySelector('img');
              element.querySelector('h1').style.display = 'flex';
              selectedField[idx] = 0;
              fieldState[idx] = false;
              imagen.remove();
            }
            break;
          }
          case 48:{ //19-36
            if(selectedFicha >= 20 && selectedField[43] === 0){
              for(let n = 19; n <= 36; n++){
                selectedField[n] = 148;
                //fieldState[n] = true;
                document.getElementById(n).style.opacity = '60%';
              }
            }
            else{
              mensaje('Solo podés apostar con fichas de 20 o 50 en esta casilla (19-36)', 'white', 2);
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
            console.log("puntos apostados:"+puntosAcum);
        }
      }
      else if(fieldState[idx] === true){
        var imagen = element.querySelector('img');
        element.querySelector('h1').style.display = 'flex';
        puntosAcum = puntosAcum - selectedField[idx];
        console.log("puntos apostados:"+puntosAcum);

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
    console.log('selectedField['+idx+'] = '+selectedField[idx]);
    console.log(selectedField)
}

function cuentaAtras(){
    var contadorElement = document.getElementById('contador');
    var contador = 40;

    spinning = false;

    var intervalo = setInterval(function() {
    contador--;
    contadorElement.textContent = contador + 's';

    if (contador <= 10){
      contadorElement.style.color = '#ad2525';
      if(contador === 1) mensaje('Las apuestas cerrarán en un segundo', 'red', 1);
      else mensaje('Las apuestas cerrarán en ' +contador+ ' segundos', 'red', 1);
    }
    if (contador === 0) {
      clearInterval(intervalo);
      contadorElement.textContent = '...';
      contadorElement.style.color = 'white';

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
    mensaje('¡Ganaste! Salió el número '+numGanador, 'white', 1)
  }
  for (var num = 0; num <= 36; num++) {
    /* SUMAR PUNTOS */
    if (num === numGanador && selectedField[numGanador] >= 1) 
    {
      if (selectedField[numGanador] > 100)
      {
        let pos = parseInt(selectedField[numGanador]) - 100;
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
        if (selectedField[num] < 100) 
        {
          res = res + parseInt(selectedField[num]);
        }
        else if(selectedField[num] > 100){
          /*var pos = parseInt(selectedField[num]) - 100;
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
          if(selectedField[3] === 137){
            res = res + parseInt(selectedField[37]);
          }
          break;
        }
        case 38:{
          if(selectedField[2] === 138){
            res = res + parseInt(selectedField[38]);
          }
          break;
        }
        case 39:{
          if(selectedField[1] === 139){
            res = res + parseInt(selectedField[39]);
          }
          break;
        }
        case 40:{
          if(selectedField[1] === 140){
            res = res + parseInt(selectedField[40]);
          }
          break;
        }
        case 41:{
          if(selectedField[13] === 141){
            res = res + parseInt(selectedField[41]);
          }
          break;
        }
        case 42:{
          if(selectedField[25] === 142){
            res = res + parseInt(selectedField[42]);
          }
          break;
        }
        case 43:{
          if(selectedField[18] === 143){
            res = res + parseInt(selectedField[43]);
          }
          break;
        }
        case 44:{
          if(selectedField[2] === 144){
            res = res + parseInt(selectedField[44]);
          }
          break;
        }
        case 45:{
          if(selectedField[9] === 145){
            res = res + parseInt(selectedField[45]);
          }
          break;
        }
        case 46:{
          if(selectedField[1] === 146){
            res = res + parseInt(selectedField[46]);
          }
          break;
        }
        case 47:{
          if(selectedField[3] === 147){
            res = res + parseInt(selectedField[47]);
          }
          break;
        }
        case 48:{
          if(selectedField[36] === 148){
            res = res + parseInt(selectedField[48]);
          }
          break;
        }
      }
    }
  }
  pts = parseInt(pts) + parseInt(suma);
  pts = parseInt(pts) - parseInt(res);
  suma = 0;
  res = 0; 
  actualizarPuntos();
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
  
  spinAngleStart = Math.random() * 10 + 10;
  spinTime = 0;
  spinTimeTotal = 10000; // tiempo girando

  rotateWheel();

  mensaje('Apuestas cerradas', 'white', 1);
  mensaje('Esperá a que gire la ruleta', 'white', 2);
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
  ctx.fillText(text, 250 - ctx.measureText(text).width / 2, 250 + 10);
  ctx.restore();

  mensaje('Realice su apuesta por favor', 'white', 1);
  mensaje('Apuestas abiertas', 'white', 2);
  
  numGanador = parseInt(text);
  console.log('Numero ganador: '+text);

  checkWin(numGanador);
  nroRonda++;
  console.log ('Ronda en curso: '+nroRonda);
}

function easeOut(t, b, c, d) {
  var ts = (t /= d) * t;
  var tc = ts * t;
  return b + c * (tc + -3 * ts + 3 * t);
}

spin();