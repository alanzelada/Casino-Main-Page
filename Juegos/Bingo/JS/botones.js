// para abrir el modal
function openModal() {
    document.getElementById("myModal").style.display = "flex";
    document.getElementById("myModal").classList.add("modal-active");
  }

  // para cerrar el modal
  function closeModal() {
    document.getElementById("myModal").style.display = "none";
    document.getElementById("myModal").classList.remove("modal-active");
  }

  function openBet() {
    document.getElementById("myBetModal").style.display = "flex";
    document.getElementById("myBetModal").classList.add("modal-active");
  }

  // Función para cerrar el modal
  async function closeBet() {
    if(parseInt(document.querySelector(".bet-input").value) > parseInt(await getUserPoints(user.id))){
      alert("No puedes apostar tanto");
      return;
    }
    document.getElementById("myBetModal").style.display = "none";
    document.getElementById("myBetModal").classList.remove("modal-active");
  }