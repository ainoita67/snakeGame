// Clase Juego
class Juego {
    constructor(tamanyo = 20){
        this.perdidio = false;
        this.ganado = false;
        this.creartablero(tamanyo);
        
        let comida = new Comida(10,17);
    }

    creartablero(tamanyo){
        const body = document.getElementsByTagName("body")[0];
        //crear el tablero
        const tablero = document.createElement("div");
        tablero.id = "tablero";
        body.appendChild(tablero);
        //crear las 400 celdas
        for (let i = 1; i <= tamanyo; i++) {
            for (let j = 1; j <= tamanyo; j++) {
            const celda = document.createElement("div");
            celda.id = `${i}-${j}`;
            celda.classList.add("vacio");
            tablero.appendChild(celda);
            }
        }
    }
}

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
    constructor(x = 10, y = 17) {
        this.x = x;
        this.y = y;
        this.dibujar(x,y);
    }

    generarPosicionAleatoria(tamanioTablero) {
        let x = Math.floor(Math.random() * (tamanioTablero )) + 1;
        let y = Math.floor(Math.random() * (tamanioTablero )) + 1;
        return [x, y];
    }

    dibujar(x,y) {
        let posicion = x + "-" + y;
        let celda = document.getElementById(posicion);
        if (celda.classList.contains("cabeza") || celda.classList.contains("cuerpo")) {
            return false
        } else {
            celda.classList.remove("vacio");
            celda.classList.add("comida");
            this.x = x;
            this.y = y;
            return true;
        }
    }

}
