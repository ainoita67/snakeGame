function empezarjuego(){
    const datos = recogerDatos();

    let tamTablero;
    switch (datos.tablero){
        case 1:
            tamTablero = 10;
            break;
        case 2:
            tamTablero = 15;
            break;
        case 3:
            tamTablero = 20;
            break;
    }

    let velocidad;
    switch (datos.velocidad){
        case 1:
            velocidad = 300;
            break;
        case 2:
            velocidad = 200;
            break;
        case 3:
            velocidad = 100;
            break;
    }

    let velocidadFruta;
    switch (datos.velocidadFruta){
        case 1:
            velocidadFruta = 8000;
            break;
        case 2:
            velocidadFruta = 6000;
            break;
        case 3:
            velocidadFruta = 4000;
            break;
    }

    let juego = new Juego(tamTablero, velocidad, velocidadFruta);
    let boton = document.getElementById("boton");
    boton.classList.add("invisible");
    let formulario = document.getElementById("formulario");
    formulario.classList.add("invisible");
    
}

function recogerDatos() {
    // Tablero
    const tableroSeleccionado = document.querySelector('input[name="tablero"]:checked');
    const tablero = tableroSeleccionado ? Number(tableroSeleccionado.value) : 2;

    // Velocidad
    const velocidadSeleccionada = document.querySelector('input[name="velocidad"]:checked');
    const velocidad = velocidadSeleccionada ? Number(velocidadSeleccionada.value) : 2;

    // Velocidad fruta
    const velocidadFrutaSeleccionada = document.querySelector('input[name="velocidadFruta"]:checked');
    const velocidadFruta = velocidadFrutaSeleccionada ? Number(velocidadFrutaSeleccionada.value) : 2;


    return { tablero, velocidad, velocidadFruta};
}
