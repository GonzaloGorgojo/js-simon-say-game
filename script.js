$botonComenzar = document.querySelector('#botonComenzar');
$botonesJuego = document.querySelectorAll('.botonesJuego');
$mensajeTurnos = document.querySelector('#mensajeTurnos');
$ronda = document.querySelector('#ronda');
$puntaje = document.querySelector('#puntaje');

let memoriaMaquina = [];
let memoriaUsuario = [];
let ronda = 0;

$botonComenzar.onclick = function () {
    limpiarmemoria();
    cambiarmensaje('Turno de la Maquina, espere su turno por favor');
    comenzarJuego();
    $botonComenzar.disabled = true;
}

function limpiarmemoria() {
    memoriaMaquina = [];
    memoriaUsuario = [];
    ronda = 0;
}

function cambiarmensaje(estado) {
    $mensajeTurnos.textContent = estado;
}

function comenzarJuego() {
    bloquearUsuario();
    const nuevoBoton = obtenerBotonAleatorio();
    memoriaMaquina.push(nuevoBoton);

    memoriaMaquina.forEach(function ($boton, i) {
        const TIEMPO_MAQUINA = (i + 1) * 1000;
        setTimeout(function () {
            mostrarBoton($boton);
        }, TIEMPO_MAQUINA);
    });

    const TIEMPO_DESBLOQUEO = (memoriaMaquina.length + 1) * 1000;
    setTimeout(function () {
        cambiarmensaje('Es su Turno, presione los mismos cuadros que mostro la maquina');
        desbloquearUsuario();
    }, TIEMPO_DESBLOQUEO);

    memoriaUsuario = [];
    ronda++;
    $ronda.textContent = ronda;
}

function bloquearUsuario() {
    $botonesJuego.forEach(function ($boton) {
        $boton.onclick = function () {
        };
    });
}

function obtenerBotonAleatorio() {
    const BOTON_ALEATORIO = Math.floor(Math.random() * $botonesJuego.length)
    return $botonesJuego[BOTON_ALEATORIO];
}

function mostrarBoton($boton) {
    $boton.style.opacity = 1;
    setTimeout(function () {
        $boton.style.opacity = 0.5;
    }, 500);
}

function desbloquearUsuario() {
    $botonesJuego.forEach(function ($boton) {
        $boton.onclick = turnoUsuario;
    });
}

function turnoUsuario(e) {
    const $boton = e.target;
    mostrarBoton($boton);
    memoriaUsuario.push($boton);

    const $botonMaquina = memoriaMaquina[memoriaUsuario.length - 1];
    if ($boton.id !== $botonMaquina.id) {
        perder();
        return;
    }
    if (memoriaUsuario.length === memoriaMaquina.length) {
        bloquearUsuario();
        setTimeout(comenzarJuego, 1000);
        cambiarmensaje('Turno de la Maquina, espere su turno por favor');
    }
}

function perder() {
    bloquearUsuario();
    alert('Perdiste');
    puntajeMaximo();
    $ronda.textContent = 0;
    $botonComenzar.disabled = false;
}

function puntajeMaximo() {
    if (ronda > $puntaje.value) {
        $puntaje.value = ronda;
    } else {
        $puntaje.value = $puntaje.value
    }
}
