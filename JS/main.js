let user;
var loggedIn = false;
const storedUser = JSON.parse(localStorage.getItem('user'));

if (storedUser) {
  user = storedUser;
}

const loginDiv = document.querySelector(".login");
const userDiv = document.querySelector(".user__data");
const loginForm = document.getElementById("form-ingreso");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  id = document.querySelector(".id-input").value;
  
  try {
    const points = await getUserPoints(id);
    if (points == null) {
      alert("ID incorrecto");
      return;
    }
    // ID exists, you can proceed with the login
    alert("Login successful!");

    loggedIn = true;

    user = { id, points };
    localStorage.setItem('user', JSON.stringify(user));
    loginDiv.style.display = "none";
    userDiv.style.display = "block";
    document.querySelector(".login-form").classList.toggle("active");
    document.querySelector(".username").textContent = user.id;
    document.querySelector(".points").textContent = user.points;
    loggedIn = true;
  } 
  catch (error) {
    console.error(error);
    alert("Error fetching user data.");
  }
});

loginDiv.addEventListener("click", () => {
  document.querySelector(".login-form").classList.toggle("active");
});  
document.querySelector(".username").addEventListener("click",()=>{
  document.querySelector(".login-form").classList.toggle("active");
});
 
if (user == null) {
  loginDiv.style.display = "block";
  userDiv.style.display = "none";
}
else{
  loginDiv.style.display = "none";
  userDiv.style.display = "block";
  document.querySelector(".username").textContent = user.id;
  document.querySelector(".points").textContent = user.points;
  loggedIn = true;
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

function checkLogIn(element) {
  if (loggedIn === false) {
    let gameName = document.querySelector('#'+element.id+' div h2').textContent;
    alert(`¡Ingresa con tu usuario para poder jugar a "${gameName}"!`);
    document.querySelector(".login-form").style.display = 'block';
  }
  else if(loggedIn === true){
    switch(element.id){
      case 'game1':{
        window.location.href = "Juegos/Slots/index.html";
        break;
      }
      case 'game2':{
        window.location.href = "Juegos/Bingo/index.html";
        break;
      }
      case 'game3':{
        window.location.href = "Juegos/Dados/index.html";
        break;
      }
      case 'game4':{
        window.location.href = "Juegos/Ruleta/index.html";
        break;
      }
      case 'game5':{
        window.location.href = "Juegos/RascaYGana/index.html";
        break;
      }
      case 'game6':{
        window.location.href = "Juegos/Blackjack/index.html";
        break;
      }
      case 'game7':{
        window.location.href = "Juegos/Vasos/index.html";
        break;
      }
      case 'game8':{
        window.location.href = "Juegos/CartaMayor/index.html";
        break;
      }
    }
  }
}
