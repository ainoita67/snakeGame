// Clase Juego
class Juego {
    constructor(tamanyo = 20){
        this.perdidio = false;
        this.ganado = false;
        this.tamanyo = tamanyo;
        this.creartablero(tamanyo);
        
        let comida = new Comida(10,17);
        let serpiente = new Serpiente();

        document.addEventListener("keydown", (event) => {
            switch (event.key) {
                case "ArrowUp":
                    serpiente.direccion = "arriba";
                    break;
                case "ArrowDown":
                    serpiente.direccion = "abajo";
                    break;
                case "ArrowLeft":
                    serpiente.direccion = "izquierda";
                    break;
                case "ArrowRight":
                    serpiente.direccion = "derecha";
                    break;
            }
            });

        const intervalo = setInterval(() => {
            serpiente.mover();
            serpiente.comer();
            if (serpiente.comer()) {
                let posAleatoria;
                do{
                   posAleatoria = comida.generarPosicionAleatoria(tamanyo);
                }
                while (!comida.dibujar(posAleatoria[0] , posAleatoria[1]));
            }
            serpiente.dibujar();

            if (!serpiente.viva) {
                clearInterval(intervalo);
                alert("Has perdido. Puntos: " + (serpiente.posX.length - 4));
                window.location.href = "index.html";
            }
        }, 300);
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
            celda.id = `${j}-${i}`;
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
        this.posX = [2, 3, 4, 5];
        this.posY = [10, 10, 10, 10];
        this.direccion = "derecha";
        this.crecer = false;
        this.viva = true;
        this.dibujar();
    }

    mover() {
        // Añadimos las coordenadas según la dirección
        switch (this.direccion) {
            case "arriba":
                this.posX.push(this.posX[this.posX.length - 1]);
                this.posY.push(this.posY[this.posY.length - 1] - 1);
            break;
            case "abajo":
                this.posX.push(this.posX[this.posX.length - 1]);
                this.posY.push(this.posY[this.posY.length - 1] + 1);
            break;
            case "izquierda":
                this.posX.push(this.posX[this.posX.length - 1] - 1);
                this.posY.push(this.posY[this.posY.length - 1]);
            break;
            case "derecha":
                this.posX.push(this.posX[this.posX.length - 1] + 1);
                this.posY.push(this.posY[this.posY.length - 1]);
            break;
        }

        // Si no debe crecer, recorta los arrays para mantener la longitud actual
        if (!this.crecer) {
            this.posX.shift();
            this.posY.shift();
        } else {
            this.crecer = false;
        }

        // Comprobamos que la serpiente siga viva
        if (this.chocaConparedes() || this.chocaConsigoMisma()) {
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
        const cabezaX = this.posX[this.posX.length - 1];
        const cabezaY = this.posY[this.posY.length - 1];

        // fuera de los límites
        return (
            cabezaX < 0 ||
            cabezaX > tamanioTablero ||
            cabezaY < 0 ||
            cabezaY > tamanioTablero
        );
    }

    // Comprueba si la cabeza choca con su propio cuerpo
    chocaConsigoMisma() {
        let posicion = this.posX[this.posX.length - 1] + "-" + this.posY[this.posY.length - 1];
        let celda = document.getElementById(posicion);
        if (celda.classList.contains("cuerpo")) {
            return true;
        }
        return false;
    }

    // Comprueba si la serpiente come la comida
    comer(comida) {
        let posicionCabeza = this.posX[this.posX.length - 1] + "-" + this.posY[this.posY.length - 1];
        let celdaCabeza = document.getElementById(posicionCabeza);
        if (celdaCabeza.classList.contains("comida")) {
            this.crecer = true;
            return true;
        }        
    }

    // Dibuja la serpiente en el tablero (DOM)
    dibujar() {
        // Pintamos la cabeza
        let posCabeza = this.posX[this.posX.length - 1] + "-" + this.posY[this.posY.length - 1];
        let celdaCabeza = document.getElementById(posCabeza);

        celdaCabeza.classList.remove("vacio");
        celdaCabeza.classList.remove("comida");
        celdaCabeza.classList.add("cabeza");
        
        // Pintamos el cuerpo
        let posCuerpo = this.posX[this.posX.length - 2] + "-" + this.posY[this.posY.length - 2];
        let celdaCuerpo = document.getElementById(posCuerpo);

        celdaCuerpo.classList.remove("cabeza");
        celdaCuerpo.classList.add("cuerpo");
        
        // Pintamos la cola
        let posCola = this.posX[0] + "-" + this.posY[0];
        let celdaCola = document.getElementById(posCola);
        celdaCola.classList = '';
        celdaCola.classList.add("vacio");
    }
}


// Clase Comida
class Comida {
    constructor(y = 10, x = 17) {
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
        if (celda.classList.contains("vacio")) {
            celda.classList.remove("vacio");
            celda.classList.add("comida");
            this.x = x;
            this.y = y;
            return true;
        } else{
            return false;
        }
    }

}
