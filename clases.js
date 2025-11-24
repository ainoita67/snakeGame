// Clase Juego
class Juego {
    constructor(tamanyo = 20, velocidad = 150, velocidadFruta = 5000){
        this.perdidio = false;
        this.ganado = false;
        this.tamanyo = tamanyo;
        this.velocidad = velocidad;
        this.velocidadFruta = velocidadFruta;
        this.creartablero();
        
        //Posicion inical de la comida y para cada tamaño de tablero
        let comidax;
        let inicioy; //se generan eln la misma y la comida y la serpiente
        if (tamanyo <= 10){
            comidax = 8;
            inicioy = 5;
        } else if (tamanyo <= 15){
            comidax = 12;
            inicioy = 8;
        } else if (tamanyo > 15){
            comidax = 17;
            inicioy = 10;
        }

        let comida = new Comida(comidax,inicioy);
        let serpiente = new Serpiente(tamanyo, inicioy);

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

        // Intervalo para generar comida cada 6 segundos
        let tIntervaloComida = this.velocidadFruta;
        
        // Guardamos el id del intervalo
        let intervaloComida = null;

        function generarComida() {
            let posAleatoria;
            do {
                posAleatoria = comida.generarPosicionAleatoria(tamanyo);
            } while (!comida.dibujar(posAleatoria[0], posAleatoria[1]));
            
            // Guardamos la posición de la comida
            comida.x = posAleatoria[0];
            comida.y = posAleatoria[1];
        }

        function reiniciarIntervaloComida() {
            // Detener intervalo actual
            if (intervaloComida) {
                clearInterval(intervaloComida);
            }
            // Generamos uno nuevo
            intervaloComida = setInterval(() => {
                // Limpiamos primero la comida anterior
                let posicion = comida.x + "-" + comida.y;
                let celda = document.getElementById(posicion);
                celda.classList = '';
                celda.classList.add("vacio");

                // Generamos la comida
                generarComida();
            }, tIntervaloComida);
        }

        reiniciarIntervaloComida();

        const intervalo = setInterval(() => {
            serpiente.girar = true;
            serpiente.mover();
            if (!serpiente.viva) {
                clearInterval(intervalo);
                alert("Has perdido. Puntos: " + (serpiente.posX.length - 4));
                window.location.reload(true);
            }

            // Si la serpiente come, generar comida nueva inmediatamente
            if (serpiente.comer()) {
                generarComida();

                reiniciarIntervaloComida();
            }

            serpiente.dibujar();

        }, velocidad);
    }

    creartablero(){
        console.log(this.tamanyo);
        const body = document.getElementsByTagName("body")[0];
        //crear el tablero dentro del body
        const tablero = document.createElement("div");
        tablero.id = "tablero";
        tablero.style.gridTemplateColumns = `repeat(${this.tamanyo}, 1fr)`;
        tablero.style.gridTemplateRows = `repeat(${this.tamanyo}, 1fr)`;
        body.appendChild(tablero);
        //crear las 400 celdas con clase "x-y"
        for (let i = 1; i <= this.tamanyo; i++) {
            for (let j = 1; j <= this.tamanyo; j++) {
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
    constructor(tamanyo = 20, inicioy = 10) {
        // La serpiente empieza con longitud 3
        this.posX = [2, 3, 4, 5];
        this.posY = [inicioy, inicioy, inicioy, inicioy];
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
    comer() {
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

        celdaCabeza.className = '';
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
        celdaFin.className = '';
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
        return numComida;x
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
