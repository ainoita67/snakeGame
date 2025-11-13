function empezarjuego(){
    let juego = new Juego(20);
    let boton = document.getElementById("boton");
    boton.classList.add("invisible");

    
}
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}