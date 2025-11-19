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
                    if (serpiente.girar) {
                        serpiente.cambiarDireccion("arriba");
                        serpiente.girar = false;
                    }
                    break;
                case "ArrowDown":
                    if (serpiente.girar) {
                        serpiente.cambiarDireccion("abajo");    
                        serpiente.girar = false;
                    }
                    break;
                case "ArrowLeft":
                    if (serpiente.girar) {
                        serpiente.cambiarDireccion("izquierda");
                        serpiente.girar = false;
                    }
                    break;
                case "ArrowRight":
                    if (serpiente.girar) {
                        serpiente.cambiarDireccion("derecha");
                        serpiente.girar = false;
                    }
                    break;
            }

        });

        const intervalo = setInterval(() => {
            serpiente.girar = true;
            serpiente.mover();
            if (!serpiente.viva) {
                clearInterval(intervalo);
                alert("Has perdido. Puntos: " + (serpiente.posX.length - 4));
                window.location.reload(true);
            }

            serpiente.comer();
            if (serpiente.comer()) {
                let posAleatoria;
                do{
                   posAleatoria = comida.generarPosicionAleatoria(tamanyo);
                }
                while (!comida.dibujar(posAleatoria[0] , posAleatoria[1]));
            }

            serpiente.dibujar();

        }, 150);
    }

    creartablero(tamanyo){
        const body = document.getElementsByTagName("body")[0];
        //crear el tablero dentro del body
        const tablero = document.createElement("div");
        tablero.id = "tablero";
        body.appendChild(tablero);
        //crear las 400 celdas con clase "x-y"
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
    constructor(tamanyo = 20) {
        // La serpiente empieza con longitud 3
        this.posX = [2, 3, 4, 5];
        this.posY = [10, 10, 10, 10];
        this.direccion = "derecha";
        this.crecer = false;
        this.viva = true;
        this.girar = true;
        this.tamanyoTablero = tamanyo;
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
        const cabezaX = this.posX[this.posX.length - 1];
        const cabezaY = this.posY[this.posY.length - 1];

        // fuera de los límites
        return (
            cabezaX < 1 ||
            cabezaX > this.tamanyoTablero ||
            cabezaY < 1 ||
            cabezaY > this.tamanyoTablero
        );
    }

    // Comprueba si la cabeza choca con su propio cuerpo
    chocaConsigoMisma() {
        let posicion = this.posX[this.posX.length - 1] + "-" + this.posY[this.posY.length - 1];
        let celda = document.getElementById(posicion);
        if (celda.classList.contains("cuerpo") || celda.classList.contains("cola")) {
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
        //guarda en que angulo rotar la cabeza para que apunte en la direccion que lleva la serpiente
        let angulo;
        switch (this.direccion) {
            case "arriba":
                angulo = -90;
            break;
            case "abajo":
                angulo = 90;
            break;
            case "izquierda":
                angulo = 180;
            break;
            case "derecha":
                angulo = 0
            break;
        }

        // Pintamos la cabeza
        let posCabeza = this.posX[this.posX.length - 1] + "-" + this.posY[this.posY.length - 1];
        let celdaCabeza = document.getElementById(posCabeza);

        celdaCabeza.classList = '';
        celdaCabeza.classList.add("cabeza");
            //añadir estilos a la cabeza para que se rote
        celdaCabeza.style.setProperty("transform", "rotate(" +  angulo + "deg)");
        
        // Pintamos el cuerpo
        let posCuerpo = this.posX[this.posX.length - 2] + "-" + this.posY[this.posY.length - 2];
        let celdaCuerpo = document.getElementById(posCuerpo);

        celdaCuerpo.classList.remove("cabeza");
        celdaCuerpo.classList.add("cuerpo");

        // Pintamos el cola
            //coje el elemento anterior a la cola (cuerpo) para usar los mismos estilos (rotacion) que el
        let posCola_1 = this.posX[2] + "-" + this.posY[2];
        let celdaCola_1 = document.getElementById(posCola_1);

        let posCola = this.posX[1] + "-" + this.posY[1];
        let celdaCola = document.getElementById(posCola);
        celdaCola.classList.remove("cuerpo");
        celdaCola.classList.add("cola");
            //añade rotacion a al cola
        celdaCola.style.setProperty("transform", celdaCola_1.style.transform);
        
        // Vacia la celda detras de la serpiente
        let posFin = this.posX[0] + "-" + this.posY[0];
        let celdaFin = document.getElementById(posFin);
        celdaFin.classList = '';
        celdaFin.classList.add("vacio");
            //elimina rotacion
        celdaFin.style.removeProperty("transform");

    }
}


// Clase Comida
class Comida {
    constructor(x = 17, y = 10) {
        this.x = x;
        this.y = y;
        this.dibujar(x,y);
    }

    // devuelve array con posicion aleatoria para la comida
    generarPosicionAleatoria(tamanioTablero) {
        let x = Math.floor(Math.random() * (tamanioTablero )) + 1;
        let y = Math.floor(Math.random() * (tamanioTablero )) + 1;
        return [x, y];
    }

    // devuelve un número de comida. Siendo 1 manzana, 2 platano y 3 fresa.
    generarComidaAleatoria() {
        let numComida = Math.floor(Math.random() * 3) + 1;
        return numComida;
    }

    dibujar(x,y) {
        // posicion en la que queremos dibujar la comidoa. Ejemplo: 12-17. Es uno de los id de los divs que componen el tablero
        let posicion = x + "-" + y;
        // se guarda la celda(div) con el id que buscamos para poder modificarla
        let celda = document.getElementById(posicion);
        if (celda.classList.contains("vacio")) {
            celda.classList.remove("vacio");

            let num = this.generarComidaAleatoria();
            let clase = "comida" + num;
            celda.classList.add(clase);
            celda.classList.add("comida");

            this.x = x;
            this.y = y;
            return true;
        } else{
            return false;
        }
    }

}
