var dealerSum = 0;
var yourSum = 0;
var dealerAceCount = 0;
var yourAceCount = 0; 
var apuesta = 0;
var dineroUsuario2 = localStorage.getItem("keyApuesta");
var dineroUsuario = parseInt(dineroUsuario2)
var haApostado = false;
var username;
var hidden;
var deck;

var canHit = true; //allows the player (you) to draw while yourSum <= 21

window.onload = function() {
    buildDeck();
    shuffleDeck();
    startGame();

}

function buildDeck() {
    let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for (let i = 0; i < types.length; i++) {
        for (let j = 0; j < values.length; j++) {
            deck.push(values[j] + "-" + types[i]); //A-C -> K-C, A-D -> K-D
        }
    }
    // console.log(deck);
}

function shuffleDeck() {
    for (let i = 0; i < deck.length; i++) {
        let j = Math.floor(Math.random() * deck.length); // (0-1) * 52 => (0-51.9999)
        let temp = deck[i];
        deck[i] = deck[j];
        deck[j] = temp;
    }
    console.log(deck);
}

function startGame() {
    hidden = deck.pop();
    dealerSum += getValue(hidden);
    dealerAceCount += checkAce(hidden);
    // console.log(hidden);
    // console.log(dealerSum);
    
    while (dealerSum < 17) {
        //<img src="./cards/4-C.png">
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        dealerSum += getValue(card);
        dealerAceCount += checkAce(card);
        document.getElementById("dealer-cards").append(cardImg);
    }
    console.log(dealerSum);

    for (let i = 0; i < 2; i++) {
        let cardImg = document.createElement("img");
        let card = deck.pop();
        cardImg.src = "./cards/" + card + ".png";
        yourSum += getValue(card);
        yourAceCount += checkAce(card);
        document.getElementById("your-cards").append(cardImg);
    }

    console.log(yourSum);
    console.log(dineroUsuario);
    document.getElementById("hit").addEventListener("click", hit);
    document.getElementById("stay").addEventListener("click", stay);
    document.getElementById("dineros").innerText = "Dinero del jugador: " + dineroUsuario;

}


function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.createElement("img");
    let card = deck.pop();
    cardImg.src = "./cards/" + card + ".png";
    yourSum += getValue(card);
    yourAceCount += checkAce(card);
    document.getElementById("your-cards").append(cardImg);

    if (reduceAce(yourSum, yourAceCount) > 21) { //A, J, 8 -> 1 + 10 + 8
        canHit = false;
    }

}

function stay() {
    dealerSum = reduceAce(dealerSum, dealerAceCount);
    yourSum = reduceAce(yourSum, yourAceCount);
    document.getElementById('puntos1').innerHTML = yourSum;
    document.getElementById('puntos2').innerHTML = dealerSum;

    canHit = false;
    document.getElementById("hidden").src = "./cards/" + hidden + ".png";

    let message = "";
    document.getElementById("hit").style.display = "none";
    document.getElementById("stay").style.display = "none";
    document.getElementById("final").style.display = "flex";
    if (yourSum > 21 && yourSum > dealerSum || yourSum < dealerSum && dealerSum <= 21 || yourSum == dealerSum && yourSum > 21) {
        document.getElementById("mensajeFin").innerHTML = "¡Has perdido!";
        dineroUsuario -= parseInt(apuesta);
    }
    else if (dealerSum > 21 && yourSum < dealerSum || yourSum > dealerSum && yourSum <=21) {
        document.getElementById("mensajeFin").innerHTML = "¡Has ganado!";
        dineroUsuario = parseInt(dineroUsuario) + parseInt(apuesta*2);
    }
    
    else if (yourSum == dealerSum && yourSum <= 21) {
        document.getElementById("mensajeFin").innerHTML = "¡Empate!";
    }

    document.getElementById("dealer-sum").innerText = dealerSum;
    document.getElementById("your-sum").innerText = yourSum;
    document.getElementById("results").innerText = message;
    localStorage.setItem("keyApuesta",dineroUsuario);
    console.log(dineroUsuario);
    console.log(typeof dineroUsuario);
    console.log(apuesta);
}

function getValue(card) {
    let data = card.split("-"); // "4-C" -> ["4", "C"]
    let value = data[0];

    if (isNaN(value)) { //A J Q K
        if (value == "A") {
            return 11;
        }
        return 10;
    }
    return parseInt(value);
}

function checkAce(card) {
    if (card[0] == "A") {
        return 1;
    }
    return 0;
}

function reduceAce(playerSum, playerAceCount) {
    while (playerSum > 21 && playerAceCount > 0) {
        playerSum -= 10;
        playerAceCount -= 1;
    }
    return playerSum;
}

function placeBet() {
    if (haApostado) {
        return; // El jugador ya ha apostado, no permitir más apuestas.
    }

    var betInput = document.getElementById("bet-input");
    var betAmount = parseInt(betInput.value);
    
    if (betAmount > 0 && betAmount <= dineroUsuario) {
        apuesta = betAmount;
        dineroUsuario -= apuesta;
        document.getElementById("dineros").innerText = "Dinero del jugador: " + dineroUsuario;
        betInput.value = "";
        document.getElementById("cantidadApuesta").innerText = "Apuesta: " + apuesta;
        
        // Bloquear el botón de apuesta después de realizar una apuesta.
        haApostado = true;
        document.getElementById("place-bet").disabled = true;
    } else {
        alert("Ingrese una cantidad válida para apostar.");
    }
}


function updateUserPoints(betInput) {
    const apiUrl = "http://your-api-url/api.php";
    const requestOptions = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        points: betInput,
      }),
    };
  
    fetch(apiUrl, requestOptions)
      .then((response) => {
        if (response.ok) {
          // Points updated successfully
          console.log("Points updated successfully");
        } else {
          // Handle the error here
          console.error("Error updating points");
        }
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Error updating points:", error);
      });
  }
  
  function getUserPoints(username) {
    const apiUrl = `http://your-api-url/api.php?username=${username}`;
  
    fetch(apiUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          // Handle the error here
          console.error("Error getting user points");
          return Promise.reject("Error getting user points");
        }
      })
      .then((data) => {
        dineroUsuario = data.points;
      })
      .catch((error) => {
        // Handle network or other errors
        console.error("Error getting user points:", error);
      });
  }