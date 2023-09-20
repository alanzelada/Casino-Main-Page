const betInput = document.querySelector(".bet-input");

let user = JSON.parse(localStorage.getItem('user'));
const celdasUsuario = document.querySelectorAll(".tdUsuario");

let filaCantada = false;
let bingoCantado = false;
//SE ABRE SECCIÓN CARTON USUARIO// 
//Aca se crean numeros aleatorios de la primera fila con sus respectivos rangos para lograr un carton real de bingo.
let nFila1Usuario_1_3 = Math.floor(Math.random() * 3) + 1;
let nFila1Usuario_10_13 = Math.floor(Math.random() * 4) + 10;
let nFila1Usuario_20_23 = Math.floor(Math.random() * 4) + 20;
let nFila1Usuario_30_33 = Math.floor(Math.random() * 4) + 30;
let nFila1Usuario_40_43 = Math.floor(Math.random() * 4) + 40;
let nFila1Usuario_50_53 = Math.floor(Math.random() * 4) + 50;
let nFila1Usuario_60_63 = Math.floor(Math.random() * 4) + 60;
let nFila1Usuario_70_73 = Math.floor(Math.random() * 4) + 70;
let nFila1Usuario_80_83 = Math.floor(Math.random() * 4) + 80;

//Aca se crean numeros aleatorios de la segunda fila con sus respectivos rangos para lograr un carton real de bingo.
let nFila2Usuario_4_6 = Math.floor(Math.random() * 3) + 4;
let nFila2Usuario_14_16 = Math.floor(Math.random() * 3) + 14;
let nFila2Usuario_24_26 = Math.floor(Math.random() * 3) + 24;
let nFila2Usuario_34_36 = Math.floor(Math.random() * 3) + 34;
let nFila2Usuario_44_46 = Math.floor(Math.random() * 3) + 44;
let nFila2Usuario_54_56 = Math.floor(Math.random() * 3) + 54;
let nFila2Usuario_64_66 = Math.floor(Math.random() * 3) + 64;
let nFila2Usuario_74_76 = Math.floor(Math.random() * 3) + 74;
let nFila2Usuario_84_86 = Math.floor(Math.random() * 3) + 84;

//Aca se crean numeros aleatorios de la tercera fila con sus respectivos rangos para lograr un carton real de bingo.
let nFila3Usuario_7_9 = Math.floor(Math.random() * 3) + 7;
let nFila3Usuario_17_19 = Math.floor(Math.random() * 3) + 17;
let nFila3Usuario_27_29 = Math.floor(Math.random() * 3) + 27;
let nFila3Usuario_37_39 = Math.floor(Math.random() * 3) + 37;
let nFila3Usuario_47_49 = Math.floor(Math.random() * 3) + 47;
let nFila3Usuario_57_59 = Math.floor(Math.random() * 3) + 57;
let nFila3Usuario_67_69 = Math.floor(Math.random() * 3) + 67;
let nFila3Usuario_77_79 = Math.floor(Math.random() * 3) + 77;
let nFila3Usuario_87_90 = Math.floor(Math.random() * 4) + 87;

const fila1Usuario = [nFila1Usuario_1_3, nFila1Usuario_10_13, null, nFila1Usuario_30_33, null, nFila1Usuario_50_53, nFila1Usuario_60_63, null, null]
const fila2Usuario = [null, nFila2Usuario_14_16, nFila2Usuario_24_26, null, nFila2Usuario_44_46, nFila2Usuario_54_56, null, null, nFila2Usuario_84_86]
const fila3Usuario = [nFila3Usuario_7_9, null, nFila3Usuario_27_29, nFila3Usuario_37_39, null, null, nFila3Usuario_67_69, nFila3Usuario_77_79, null]

const cartonUsuario = [fila1Usuario, fila2Usuario, fila3Usuario]

console.log(cartonUsuario)
//SE CIERRA SECCIÓN CARTON USUARIO//

//SE ABRE SECCIÓN CARTON BOT//
//Aca se crean numeros aleatorios de la primera fila con sus respectivos rangos para lograr un carton real de bingo.
let nFila1Bot_1_3 = Math.floor(Math.random() * 3) + 1;
let nFila1Bot_10_13 = Math.floor(Math.random() * 4) + 10;
let nFila1Bot_20_23 = Math.floor(Math.random() * 4) + 20;
let nFila1Bot_30_33 = Math.floor(Math.random() * 4) + 30;
let nFila1Bot_40_43 = Math.floor(Math.random() * 4) + 40;
let nFila1Bot_50_53 = Math.floor(Math.random() * 4) + 50;
let nFila1Bot_60_63 = Math.floor(Math.random() * 4) + 60;
let nFila1Bot_70_73 = Math.floor(Math.random() * 4) + 70;
let nFila1Bot_80_83 = Math.floor(Math.random() * 4) + 80;

//Aca se crean numeros aleatorios de la segunda fila con sus respectivos rangos para lograr un carton real de bingo.
let nFila2Bot_4_6 = Math.floor(Math.random() * 3) + 4;
let nFila2Bot_14_16 = Math.floor(Math.random() * 3) + 14;
let nFila2Bot_24_26 = Math.floor(Math.random() * 3) + 24;
let nFila2Bot_34_36 = Math.floor(Math.random() * 3) + 34;
let nFila2Bot_44_46 = Math.floor(Math.random() * 3) + 44;
let nFila2Bot_54_56 = Math.floor(Math.random() * 3) + 54;
let nFila2Bot_64_66 = Math.floor(Math.random() * 3) + 64;
let nFila2Bot_74_76 = Math.floor(Math.random() * 3) + 74;
let nFila2Bot_84_86 = Math.floor(Math.random() * 3) + 84;

//Aca se crean numeros aleatorios de la tercera fila con sus respectivos rangos para lograr un carton real de bingo.
let nFila3Bot_7_9 = Math.floor(Math.random() * 3) + 7;
let nFila3Bot_17_19 = Math.floor(Math.random() * 3) + 17;
let nFila3Bot_27_29 = Math.floor(Math.random() * 3) + 27;
let nFila3Bot_37_39 = Math.floor(Math.random() * 3) + 37;
let nFila3Bot_47_49 = Math.floor(Math.random() * 3) + 47;
let nFila3Bot_57_59 = Math.floor(Math.random() * 3) + 57;
let nFila3Bot_67_69 = Math.floor(Math.random() * 3) + 67;
let nFila3Bot_77_79 = Math.floor(Math.random() * 3) + 77;
let nFila3Bot_87_90 = Math.floor(Math.random() * 4) + 87;

const fila1Bot = [nFila1Bot_1_3, nFila1Bot_10_13, null, null, nFila1Bot_40_43, nFila1Bot_50_53, null, nFila1Bot_70_73, null]
const fila2Bot = [null, nFila2Bot_14_16, nFila2Bot_24_26, null, nFila2Bot_44_46, nFila2Bot_54_56, null, null, nFila2Bot_84_86]
const fila3Bot = [nFila3Bot_7_9, nFila3Bot_17_19, null, nFila3Bot_37_39, null, null, nFila3Bot_67_69, null, nFila3Bot_87_90]

const cartonBot = [fila1Bot, fila2Bot, fila3Bot]

console.log(cartonBot)
//SE CIERRA SECCIÓN CARTON BOT//
let numeroAleatorio = 0
let numerosSalientes = [];
        // Función para generar números aleatorios sin repeticiones
        function generarNumeroAleatorio() {

            // Verifica si ya se han generado todos los números del 1 al 90
            if (numerosSalientes.length >= 90) {
                alert("Se han generado todos los números del 1 al 90.");
                return;
            }
    
            do {
                // Genera un número aleatorio del 1 al 90
                numeroAleatorio = Math.floor(Math.random() * 90) + 1;
            } while (numerosSalientes.includes(numeroAleatorio)); // Verifica si el número ya ha sido generado
            
            // Agrega el número aleatorio al array de números salientes
            numerosSalientes.push(numeroAleatorio);
            
            // Aquí puedes realizar cualquier acción adicional con el número generado
            console.log("Número generado: " + numeroAleatorio);

            const numeroAleatorioElement = document.getElementById("numeroAleatorio");
            numeroAleatorioElement.textContent = "" + numeroAleatorio;

            comprobarCartonBot(numeroAleatorio);

            // Realiza la comparación con cartonUsuario y cartonBot
            compararCartones(numeroAleatorio, celdaUsuario);

            comprobarTabla()
        }

        const celdaUsuario = document.querySelectorAll(".tdUsuario")
        const celdaBot = document.querySelectorAll(".tdBot")
        
        // Función para comparar cartonUsuario y cartonBot con numerosSalientes
        function compararCartones(numeroAleatorio, celdaUsuario) {
            
            // Compara cartonBot
            for (let i = 0; i < cartonBot.length; i++) {
                for (let j = 0; j < cartonBot[i].length; j++) {
                    if (cartonBot[i][j] !== null && cartonBot[i][j] === numeroAleatorio) {
                        console.log("Número coincidente en cartonBot: " + numeroAleatorio);
                    }
                }
            }

            //Comprueba si hay línea en alguno de los cartones del usuario o bot
            if (filaCantada == false) {
                if(fila1Bot.every(num => num === null || numerosSalientes.includes(num))){
                    console.log("¡LÍNEA EN LA PRIMERA FILA DEL BOT!");
                    filaCantada = true; // Marcar que la fila se ha cantado
                        updateUserPoints(-document.querySelector(".bet-input").value/4)
                }

                else if(fila2Bot.every(num => num === null || numerosSalientes.includes(num))){
                    console.log("¡LÍNEA EN LA SEGUNDA FILA DEL BOT!");
                    filaCantada = true; // Marcar que la fila se ha cantado
                        updateUserPoints(-document.querySelector(".bet-input").value/4)
                }

                else if(fila3Bot.every(num => num === null || numerosSalientes.includes(num))){
                    console.log("¡LÍNEA EN LA TERCERA FILA DEL BOT!");
                    filaCantada = true; // Marcar que la fila se ha cantado
                        updateUserPoints(-document.querySelector(".bet-input").value/4)
                }

            }

                if(fila1Bot.every(num => num === null || numerosSalientes.includes(num)) && fila2Bot.every(num => num === null || numerosSalientes.includes(num)) && fila3Bot.every(num => num === null || numerosSalientes.includes(num)) && bingoCantado == false){
                    const mensajeContainer = document.getElementById("mensajeContainer");
                    mensajeContainer.innerHTML = "";
                    
                    const mensaje = document.createElement("p");
                    mensaje.classList.add("perdiste");
                    mensaje.textContent="!GANO EL BOT!";
                    actualizarPuntos();
                    mensajeContainer.appendChild(mensaje);
                    bingoCantado = true;
                        updateUserPoints(-document.querySelector(".bet-input").value)

                    setTimeout(function () {
                        mensaje.classList.remove("perdiste");
                        mensajeContainer.removeChild(mensaje);
                    }, 2000);
                    

                    // Deshabilitar el botón de "Generar Número Aleatorio"
                    document.getElementById("generarNumero").disabled = true;
                }
        }

        function actualizarCartones() {
            // Obtén los elementos div de los cartones por sus identificadores
            const cartonUsuarioDiv = document.getElementById("carton-usuario");
            const cartonBotDiv = document.getElementById("carton-bot");
        
            // Genera el contenido HTML para los cartones de usuario y bot
            const cartonUsuarioHTML = generarTablaHTML(cartonUsuario, "cartonUsuario", "tdUsuario"); // Agrega el ID "cartonUsuario"
            const cartonBotHTML = generarTablaHTML(cartonBot, "cartonBot", "tdBot"); // Agrega el ID "cartonBot"
        
            // Asigna el contenido HTML a los elementos div
            cartonUsuarioDiv.innerHTML = cartonUsuarioHTML;
            cartonBotDiv.innerHTML = cartonBotHTML;

            asignarIdsUnicos("tdUsuario");
            asignarIdsUnicosBot("tdBot");
        }

        // Función para generar el contenido HTML de una tabla a partir de un cartón
        
        function generarTablaHTML(carton, idTabla, claseCelda) {

            let tablaHTML = `<table id="${idTabla}">`; // Asigna el ID correspondiente a la tabla

            for (let i = 0; i < carton.length; i++) {
                tablaHTML += '<tr>';

                for (let j = 0; j < carton[i].length; j++) {
                    tablaHTML += `<td class="${claseCelda}"`;
                    if (carton[i][j] === null) {
                        tablaHTML += ' style="background-color: black;"'; // Cambiar el fondo a azul
                    }
                    tablaHTML += '>';
                    if (carton[i][j] === null) {
                        tablaHTML += ''; // Mostrar 'X' en celdas vacías
                    } else {
                        tablaHTML += carton[i][j]; // Mostrar el número
                    }
                    tablaHTML += '</td>';
                }

                tablaHTML += '</tr>';
            }

            tablaHTML += '</table>';
            return tablaHTML;
        }

        
// Función para asignar IDs únicos a elementos con la clase especificada
function asignarIdsUnicos(claseCelda) {
    const celdas = document.querySelectorAll("." + claseCelda);
    
    celdas.forEach((celda, index) => {
        celda.id = "celdaUsuario_" + index; // Asigna un ID único basado en el índice
    });
}

function asignarIdsUnicosBot(claseCeldaBot){
    const celdas = document.querySelectorAll("." + claseCeldaBot);

    celdas.forEach((celda, index)=>{
        celda.id = "celdaBot_" + index
    })
}
        // Llama a la función para inicializar y mostrar los cartones al cargar la página
        actualizarCartones();

    const numerosDel1Al90 = Array.from({ length: 90 }, (_, index) => index + 1);

// Obtener una referencia a la tabla en el documento HTML
const tablaNumeros = document.getElementById('tablaNumeros');

// Crear el contenido HTML de la tabla
let tablaHTML = '<tr>';

numerosDel1Al90.forEach((numero, index) => {
    // Cada 10 números, cerrar la fila actual y abrir una nueva
    if (index > 0 && index % 10 === 0) {
        tablaHTML += '</tr><tr>';
    }

    // Generar un ID único basado en el número
    const idUnico = `numero_${numero}`;

    // Agregar cada número como una celda de la tabla con el ID único
    tablaHTML += `<td id="${idUnico}">${numero}</td>`;
});

tablaHTML += '</tr>';

// Insertar el contenido HTML generado en la tabla
tablaNumeros.innerHTML = tablaHTML;

function comprobarTabla(){
numerosDel1Al90.forEach((numero) => {
    const idUnico = `numero_${numero}`;
    const celda = document.getElementById(idUnico);

    // Comprobar si el número coincide con el número saliente
    if (numero === numeroAleatorio) {
        // Si coincide, cambiar el fondo a rojo
        celda.style.backgroundColor = 'red';
    }
});
}
        //se empiezan a comparar las tablas del usuario
        const cantidadDeCeldas = 27;

// Recorrer un bucle para generar los eventos de click para cada celda
for (let i = 0; i < cantidadDeCeldas; i++) {
    const celdaUsuario = document.getElementById(`celdaUsuario_${i}`);
    celdaUsuario.dataset.coincidencia = "false"; // Inicialmente, establece el atributo a "false"
    
    if(celdaUsuario.textContent == 'X'){
        celdaUsuario.dataset.coincidencia = "true";
    }

    celdaUsuario.addEventListener("click", function () {
        if (celdaUsuario.textContent == numeroAleatorio) {
            console.log("Número coincidente");
            celdaUsuario.dataset.coincidencia = "true"; // Establece el atributo a "true" cuando coincide
            // Luego, puedes usar celdaUsuario.dataset.coincidencia para rastrear las coincidencias
        }
        
        else{
            console.log("Nada");
        }
    });
}

 //se empiezan a comparar las tablas del bot
 const cantidadDeCeldasBot = 27;

 function comprobarCartonBot(numeroAleatorio){
 // Recorrer un bucle para generar los eventos de click para cada celda
 for (let i = 0; i < cantidadDeCeldasBot; i++) {
     const celdaBot = document.getElementById(`celdaBot_${i}`);
     
     
     if(celdaBot.textContent == 'X'){
         celdaBot.dataset.coincidencia = "true";
     }

        if (celdaBot.textContent == numeroAleatorio) {
            console.log("Número coincidente de prueba " + numeroAleatorio);
            celdaBot.dataset.coincidencia = "true"; 
        }
     
 }
}
const botonFila = document.getElementById("fila")
const botonBingo = document.getElementById("cantarBingo")

botonFila.addEventListener("click", function () {
    if (filaCantada === false) {

        const mensajeContainer = document.getElementById("mensajeContainer");
        mensajeContainer.innerHTML = "";

        const fila1Coincide = Array.from({ length: 9 }, (_, i) => {
            const celdaUsuario = document.getElementById(`celdaUsuario_${i}`);
            return celdaUsuario.dataset.coincidencia === "true";
        }).every(coincidencia => coincidencia);
    
        const fila2Coincide = Array.from({ length: 9 }, (_, i) => {
            const celdaUsuario = document.getElementById(`celdaUsuario_${i + 9}`);
            return celdaUsuario.dataset.coincidencia === "true";
        }).every(coincidencia => coincidencia);
    
        const fila3Coincide = Array.from({ length: 9 }, (_, i) => {
            const celdaUsuario = document.getElementById(`celdaUsuario_${i + 18}`);
            return celdaUsuario.dataset.coincidencia === "true";
        }).every(coincidencia => coincidencia);

    
        if (fila1Coincide || fila2Coincide || fila3Coincide) {
            const mensaje = document.createElement("p");
            mensaje.classList.add("ganaste");
            mensaje.textContent="!LINEA DEL USUARIO!";
            mensajeContainer.appendChild(mensaje);
            // Deshabilitar el botón de "fila" después de cantar "LÍNEA"
            botonFila.disabled = true;
            filaCantada = true
                updateUserPoints(document.querySelector(".bet-input").value/4)

            setTimeout(function () {
                mensaje.classList.remove("ganaste");
                mensajeContainer.removeChild(mensaje);
            }, 3000)
        } else {
            const mensaje = document.createElement("p")
            mensaje.classList.add("perdiste");
            mensaje.textContent="!NO HAY LINEA EN EL CARTON!";
            mensajeContainer.appendChild(mensaje);

            setTimeout(function () {
                mensaje.classList.remove("perdiste");
                mensajeContainer.removeChild(mensaje);
            }, 2000);
        }
        
    }
})

botonBingo.addEventListener("click", function (){
    if(bingoCantado == false){
        const bingoCoincide = Array.from({length: 27}, (_,i)=>{
        const celdaUsuario = document.getElementById(`celdaUsuario_${i}`)
        return celdaUsuario.dataset.coincidencia === "true";
    }).every(coincidencia => coincidencia)

    if(bingoCoincide){

        const mensaje = document.createElement("p")
        mensaje.classList.add("ganaste");
        mensaje.textContent="!BINGO DEL USUARIO!";
        mensajeContainer.appendChild(mensaje);

        botonBingo.disabled = true;
        bingoCantado = true;
        updateUserPoints(document.querySelector(".bet-input").value)

        setTimeout(function () {
            mensaje.classList.remove("ganaste");
            mensajeContainer.removeChild(mensaje);
        }, 3000);
    }
    else{
        const mensaje = document.createElement("p");
        mensaje.classList.add("perdiste");
        mensaje.textContent="!NO HAY BINGO!";
        mensajeContainer.appendChild(mensaje);

        setTimeout(function () {
            mensaje.classList.remove("perdiste");
            mensajeContainer.removeChild(mensaje);
                
        }, 2000);
    }
}
})
    
    // Asocia la función generarNumeroAleatorio al evento click del botón
    document.getElementById("generarNumero").addEventListener("click", generarNumeroAleatorio);

// Function to update user points using fetch
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
      const id = user.id;
      const points = await getUserPoints(id);
      user = { id, points };
      localStorage.setItem('user', JSON.stringify(user));
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

actualizarPuntos();
async function actualizarPuntos() {
  try {
    const puntos = await getUserPoints(user.id);
    document.getElementById("ptstotales__text").textContent = 'Puntos: ' + puntos;
  } catch (error) {
    console.error("Error al obtener los puntos:", error);
  }
}
