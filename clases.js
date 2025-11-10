// Clase Juego
class Juego {}

// Clase Serpiente
class Serpiente {
    constructor() {
        // La serpiente empieza con longitud 3
        this.longitud = 3;
        this.posCabezaX = [10];
        this.posCabezaY = [10];
        this.direccion = "derecha";
        this.crecer = false;
    }

    mover() {
        // Añadimos las coordenadas según la dirección
        switch (this.direccion) {
            case "arriba":
                this.posCabezaX
            break;
            case "abajo":
            cabeza.y++;
            break;
            case "izquierda":
            cabeza.x--;
            break;
            case "derecha":
            cabeza.x++;
            break;
        }

        // Añadimos la nueva cabeza al principio del array
        this.cuerpo.unshift(cabeza);

        // Si no tiene que crecer, eliminamos la última celda
        if (!this.crecer) {
            this.cuerpo.pop();
        } else {
            this.crecer = false;
        }
    }

    // Cambia la dirección de movimiento (evita girar 180°)
    cambiarDireccion(nuevaDireccion) {}

    // Comprueba si la cabeza choca con las paredes
    chocaConparedes(tamañoTablero) {}

    // Comprueba si la cabeza choca con su propio cuerpo
    chocaConsigoMisma() {}

    // Comprueba si la serpiente come la comida
    comer(comida) {}

    // Dibuja la serpiente en el tablero (DOM)
    dibujar(tableroDOM) {}
}


// Clase Comida
class Comida {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    generarPosicionAleatoria(tamanioTablero, posicionesOcupadas) {

    }

    dibujar(tableroDOM) {

    }

}
