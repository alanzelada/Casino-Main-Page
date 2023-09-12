document.getElementById("button").addEventListener("click", function(event) {
    event.preventDefault(); // Evitar el envío del formulario
    var username = document.getElementById("username").value;
    var puntos = document.getElementById("puntos").value;
    
    var resultado = document.getElementById("resultado");
    resultado.textContent = "Nombre: " + username + ", Puntos: " + puntos;
    window.location.href = "index.html";
  });
  
  


