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
        this.posCabezaX = [8, 9, 10];
        this.posCabezaY = [8, 9, 10];
        this.direccion = "derecha";
        this.crecer = false;
        this.viva = true;
    }

    mover() {
        // Añadimos las coordenadas según la dirección
        switch (this.direccion) {
            case "arriba":
                this.posCabezaX.push(this.posCabezaX[this.posCabezaX.length - 1]);
                this.posCabezaY.push(this.posCabezaY[this.posCabezaY.length - 1] - 1);
            break;
            case "abajo":
                this.posCabezaX.push(this.posCabezaX[this.posCabezaX.length - 1]);
                this.posCabezaY.push(this.posCabezaY[this.posCabezaY.length - 1] + 1);
            break;
            case "izquierda":
                this.posCabezaX.push(this.posCabezaX[this.posCabezaX.length - 1] - 1);
                this.posCabezaY.push(this.posCabezaY[this.posCabezaY.length - 1]);
            break;
            case "derecha":
                this.posCabezaX.push(this.posCabezaX[this.posCabezaX.length - 1] + 1);
                this.posCabezaY.push(this.posCabezaY[this.posCabezaY.length - 1]);
            break;
        }

        // Si no debe crecer, recorta los arrays para mantener la longitud actual
        if (!this.crecer) {
            while (this.posCabezaX.length > this.longitud) {
                this.posCabezaX.shift();
                this.posCabezaY.shift();
            }
        } else {
            this.crecer = false;
        }

        // Comprobamos que la serpiente siga viva
        if (this.chocaConparedes() || this.chocaConsigoMisma) {
            this.viva = false;
        }
    }   

    // Cambia la dirección de movimiento (evita girar 180°)
    cambiarDireccion(nuevaDireccion) {
        const opuestos = {
            arriba: "abajo",
            abajo: "arriba",
            izquierda: "derecha",
            derecha: "izquierda"
        };

        // Solo cambia si no es la dirección opuesta
        if (opuestos[this.direccion] !== nuevaDireccion) {
            this.direccion = nuevaDireccion;
        }
    }

    // Comprueba si la cabeza choca con las paredes
    chocaConparedes() {
        const tamanioTablero = 20;
        const cabezaX = this.posCabezaX[this.posCabezaX.length - 1];
        const cabezaY = this.posCabezaY[this.posCabezaY.length - 1];

        // fuera de los límites
        return (
            cabezaX < 0 ||
            cabezaX >= tamanioTablero ||
            cabezaY < 0 ||
            cabezaY >= tamanioTablero
        );
    }

    // Comprueba si la cabeza choca con su propio cuerpo
    chocaConsigoMisma() {
        let posicion = this.posCabezaX[this.posCabezaX.length - 1] + "-" + this.posCabezaY[this.posCabezaY.length - 1];
        let celda = document.getElementById(posicion);
        if (celda.classList.contains("cuerpo")) {
            return true;
        }
        return false;
    }

    // Comprueba si la serpiente come la comida
    comer(comida) {
        let posicion = this.posCabezaX[this.posCabezaX.length - 1] + "-" + this.posCabezaY[this.posCabezaY.length - 1];
        let celda = document.getElementById(posicion);
        if (celda.classList.contains("comida")) {
            this.crecer = true;
        }
        this.crecer = false;
    }

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
