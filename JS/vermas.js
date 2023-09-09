const caja = document.getElementById("mensaje-fixed");

window.addEventListener("scroll", function() {
  const scrollY = window.scrollY;
  const pScroll = 300; 

  if (scrollY >= pScroll) {
    caja.style.display = "none";
  } else {
    caja.style.display = "block";
  }
});

const cajaCaramelos = document.querySelector(".caramelos");
const cajaCaramelosInfo = document.getElementById("caramelos_info");

cajaCaramelos.addEventListener("mouseenter", function() {
    cajaCaramelosInfo.style.display = "flex";
});

cajaCaramelos.addEventListener("mouseleave", function() {
    cajaCaramelosInfo.style.display = "none";
});



