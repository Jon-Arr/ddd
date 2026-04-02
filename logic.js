//****************** INTRO MISIONES
const introMisiones = {
    "Novato 1": "El rocío de la mañana aún brilla sobre las hojas del Bosque Susurrante. La Maga y el Caballero avanzan por un sendero flanqueado por flores que emiten un suave tintineo plateado. De pronto, un gemido agudo rompe la calma: entre las raíces de un Sauce Anciano, una pequeña criatura con alas de mariposa y pelaje de nube lucha por liberarse de unas enredaderas que parecen moverse con voluntad propia.",

    "Novato 2": "El Gran Salón del Palacio de Cristal está iluminado por mil velas flotantes. La música de los laúdes llena el aire mientras nobles enmascarados giran en el centro. Sin embargo, algo está mal: las sombras de los invitados no coinciden con sus movimientos. La Maga nota un brillo frío en las paredes, mientras el Caballero siente que su mano, entrelazada con la de su pareja, es lo único real en este salón de ilusiones.",

    "Novato 3": "El laboratorio está saturado de un olor a fresas y azufre. Calderos de cobre burbujean con colores imposibles mientras pergaminos vuelan de un lado a otro. La Maga intenta estabilizar una mezcla que brilla con un rosa neón, pero una chispa salta hacia el Caballero. Si no logran contener la reacción mágica, todo el reino podría estallar en una carcajada eterna y caótica.",

    "Intermedio 4": "Están en una sala donde el suelo, el techo y las paredes son espejos perfectos. No hay salida aparente, solo infinitos reflejos de la Maga y el Caballero. Pero los reflejos empiezan a actuar de forma extraña: muestran momentos del futuro o secretos del pasado. Para avanzar, no deben confiar en lo que ven, sino en lo que sienten el uno por el otro.",

    "Intermedio 5": "Una niebla espesa y fría envuelve los muros de piedra del Laberinto Eterno. El viento sopla entre los pasillos trayendo ecos de voces que parecen conocer los nombres de los héroes. El Caballero desenvaina su espada al sentir que los muros cambian de posición a sus espaldas, mientras la Maga percibe que la magia del laberinto se alimenta de sus dudas.",

    "Intermedio 6": "Dentro de la Gran Catedral de Obsidiana, el aire es cálido y huele a incienso antiguo. El enorme Dragón Dorado espera frente al altar, pero no hay novia. Los invitados son criaturas de fuego y escamas que guardan un silencio sepulcral. La Maga y el Caballero deben encontrar el Regalo de Bodas perdido antes de que el dragón pierda la paciencia."
};

//****************** DADOS LOGICA (Conectada a la IA)
function rollDice(sides) {
    // 1. Obtener el elemento de audio
    const sonido = document.getElementById('audio-dados');

    // 2. Reproducir el sonido (reiniciándolo si ya estaba sonando)
    if (sonido) {
        sonido.currentTime = 0;
        sonido.play().catch(error => console.log("El navegador bloqueó el audio inicial:", error));
    }

    const resultElement = document.getElementById('result');
    const typeElement = document.getElementById('dice-type');

    let counter = 0;
    const interval = setInterval(() => {
        resultElement.innerText = Math.floor(Math.random() * sides) + 1;
        counter++;
        if (counter > 10) {
            clearInterval(interval);
            const finalRoll = Math.floor(Math.random() * sides) + 1;
            resultElement.innerText = finalRoll;
            typeElement.innerText = "Lanzaste un d" + sides;

            if (sides === 20 && finalRoll === 20) {
                resultElement.classList.add('critical');
            } else {
                resultElement.classList.remove('critical');
            }

            // AVISO AUTOMÁTICO A LA IA
            hablarConNarrador(`He lanzado un d${sides} y el resultado es un ${finalRoll}.`);
        }
    }, 50);
}

//****************** EVENTOS LOGICA (Unificada y con Filtro)
const events = [
    // --- AVENTURA 1: El Rescate del Cachorro Alado ---
    { adventure: "Novato 1", type: "Misterio", title: "Susurro del Viento", desc: "La Maga siente una presencia invisible. Tiren d20 de Percepción." },
    { adventure: "Novato 1", type: "Romance", title: "Refugio del Frío", desc: "La lluvia arrecia. Deben compartir la capa del Caballero para no enfermar. Momento de cercanía." },
    { adventure: "Novato 1", type: "Comedia", title: "El Estornudo Mágico", desc: "El cachorro estornuda una chispa. El pelo del Caballero se vuelve azul brillante por 1 hora." },
    { adventure: "Novato 1", type: "Misterio", title: "Rastros de Plata", desc: "Encuentran plumas brillantes que apuntan hacia un camino oculto. ¿Las siguen?" },
    { adventure: "Novato 1", type: "Romance", title: "Promesa en el Bosque", desc: "Un momento de calma bajo un árbol milenario. Intercambien una palabra de aliento." },

    // --- AVENTURA 2: El Baile de las Sombras Gemelas ---
    { adventure: "Novato 2", type: "Romance", title: "Paso en Falso", desc: "El Caballero tropieza al bailar. ¡Un momento íntimo o divertido!" },
    { adventure: "Novato 2", type: "Misterio", title: "El Reflejo Infiel", desc: "La sombra de la Maga no sigue sus movimientos. Parece señalar a un invitado sospechoso." },
    { adventure: "Novato 2", type: "Comedia", title: "Bebida Burbujeante", desc: "Prueban un elixir del banquete. ¡Ahora solo pueden hablar susurrando muy agudo!" },
    { adventure: "Novato 2", type: "Romance", title: "Mirada Cómplice", desc: "La música se detiene, pero ustedes no. Tiren d20 de Carisma para impresionar a la corte." },
    { adventure: "Novato 2", type: "Misterio", title: "Máscara Caída", desc: "Encuentran una máscara en el suelo que desprende un aura oscura. Alguien no es quien dice ser." },

    // --- AVENTURA 3: La Pócima de la Risa ---
    { adventure: "Novato 3", type: "Comedia", title: "Efecto Secundario", desc: "¡Un ingrediente explota! Uno de los dos flota o rima por 10 min." },
    { adventure: "Novato 3", type: "Misterio", title: "El Caldero Parlante", desc: "La poción empieza a dar consejos amorosos (muy malos). ¿Escuchan lo que dice?" },
    { adventure: "Novato 3", type: "Romance", title: "Manos Manchadas", desc: "Se ensucian con mermelada mágica. El intento de limpiarse se vuelve un momento dulce." },
    { adventure: "Novato 3", type: "Comedia", title: "Canto de Rana", desc: "Un error en la mezcla hace que el Caballero croe cada vez que intenta decir 'Te quiero'." },
    { adventure: "Novato 3", type: "Misterio", title: "Humo Revelador", desc: "El vapor de la poción forma la cara del villano. Tiren Inteligencia para reconocerlo." },

    // --- AVENTURA 4: El Juicio de los Espejos ---
    { adventure: "Intermedio 4", type: "Romance", title: "Reflejo del Deseo", desc: "El espejo muestra lo que más admiran del otro. ¡Momento de rol!" },
    { adventure: "Intermedio 4", type: "Misterio", title: "El Doble Oscuro", desc: "Tu reflejo intenta salir del espejo. Tiren Iniciativa para evitar que robe un objeto valioso." },
    { adventure: "Intermedio 4", type: "Comedia", title: "Cambio de Roles", desc: "Por un minuto, sus voces se intercambian. ¡La Maga suena como el Caballero y viceversa!" },
    { adventure: "Intermedio 4", type: "Romance", title: "Verdad Desnuda", desc: "El espejo les obliga a decir algo que nunca se han atrevido a confesar." },
    { adventure: "Intermedio 4", type: "Misterio", title: "Cristal Roto", desc: "Un espejo se quiebra solo. El camino se divide en dos dimensiones. ¿Cuál eligen?" },

    // --- AVENTURA 5: El Laberinto de los Suspiros ---
    { adventure: "Intermedio 5", type: "Misterio", title: "Eco del Pasado", desc: "Una voz secreta resuena... ¡Revela un secreto del pasado!" },
    { adventure: "Intermedio 5", type: "Romance", title: "Manos Unidas", desc: "La niebla es tan espesa que solo pueden avanzar si no se sueltan. Si se sueltan, se pierden." },
    { adventure: "Intermedio 5", type: "Comedia", title: "Paredes Movibles", desc: "El laberinto los encierra en un espacio muy pequeño. ¡Están demasiado apretados!" },
    { adventure: "Intermedio 5", type: "Misterio", title: "La Estatua Llorosa", desc: "Una estatua de piedra pide un sacrificio de un recuerdo feliz para dejarlos pasar." },
    { adventure: "Intermedio 5", type: "Romance", title: "Descanso en el Centro", desc: "Encuentran un jardín hermoso. Es el lugar perfecto para recuperar HP y compartir un momento." },

    // --- AVENTURA 6: La Boda del Dragón ---
    { adventure: "Intermedio 6", type: "Comedia", title: "Invitado Inesperado", desc: "¡Un bardo borracho los confunde con los novios! Escapen cantando." },
    { adventure: "Intermedio 6", type: "Misterio", title: "El Regalo Maldito", desc: "Abren un cofre de bodas y sale un gas que les hace olvidar sus nombres por un momento." },
    { adventure: "Intermedio 6", type: "Romance", title: "Votos Improvisados", desc: "Para pasar desapercibidos, deben fingir que se casan. Digan sus votos ahora." },
    { adventure: "Intermedio 6", type: "Comedia", title: "Fuego Fatuo", desc: "El dragón lanza una llamarada de confeti por error. ¡Todo el equipo brilla!" },
    { adventure: "Intermedio 6", type: "Misterio", title: "El Padrino Traidor", desc: "Descubren que el padrino del dragón es en realidad un cazador disfrazado. ¿Intervienen?" }
];

function drawCard() {
    const selectedMission = document.getElementById('mission-select').value;
    const filteredEvents = events.filter(e => e.adventure === selectedMission);

    if (filteredEvents.length === 0) {
        alert("No hay eventos cargados para esta misión.");
        return;
    }

    const event = filteredEvents[Math.floor(Math.random() * filteredEvents.length)];

    document.getElementById('deck').style.display = 'none';
    const cardDisplay = document.getElementById('card-display');
    cardDisplay.style.display = 'block';

    document.getElementById('event-type').innerText = event.type;
    document.getElementById('event-title').innerText = event.title;
    document.getElementById('event-desc').innerText = event.desc;

    // AVISO AUTOMÁTICO A LA IA
    hablarConNarrador(`Ha salido la carta de evento: "${event.title}" (${event.type}). Descripción: ${event.desc}`);
}

function resetDeck() {
    document.getElementById('deck').style.display = 'flex';
    document.getElementById('card-display').style.display = 'none';
}

//****************** HABILIDADES LOGICA
function logSkill(skillName) {
    const log = document.getElementById('chat-output');
    log.innerHTML += `<div style="color: #4b0082;"><strong>Acción: </strong><em>${skillName}</em>.</div>`;
    log.scrollTop = log.scrollHeight;

    // AVISO AUTOMÁTICO A LA IA
    hablarConNarrador(`Uso la habilidad: ${skillName}.`);
}

//****************** TOOLTIPS LOGICA
// Función para inicializar los tooltips de habilidades
function configurarTooltips() {
    const iconos = document.querySelectorAll('.info-icon');

    iconos.forEach(icono => {
        icono.addEventListener('click', (e) => {
            // Evitamos que el clic cierre el menú si está dentro de uno
            e.stopPropagation();

            const tooltip = icono.querySelector('.tooltip');

            // Cerramos otros tooltips abiertos primero (opcional, para limpieza)
            document.querySelectorAll('.tooltip.active').forEach(t => {
                if (t !== tooltip) t.classList.remove('active');
            });

            // Alternamos el estado del actual
            tooltip.classList.toggle('active');
        });
    });

    // Cerrar el tooltip si haces clic en cualquier otra parte de la pantalla
    document.addEventListener('click', () => {
        document.querySelectorAll('.tooltip.active').forEach(t => {
            t.classList.remove('active');
        });
    });
}

// Recuerda llamar a configurarTooltips() cuando cargue la página
window.onload = () => {
    configurarTooltips();
    // ... tus otras funciones de inicio
};

//****************** IA LOGICA (Configurada con el Prompt Maestro)
const API_KEY = "AIzaSyCNAK4PPKy4Uo8w8BRPRoS6jfTDDmlmLF0";

async function hablarConNarrador(mensajeUsuario) {
    // 1. Limpieza total de la API KEY para evitar espacios invisibles
    const cleanKey = API_KEY.trim();
    // const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${cleanKey}`;
    const url = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${cleanKey}`;

    const promptSistema = "Actúa como Dungeon Master para una Maga y un Caballero. Mezcla romance, misterio y comedia. ";

    try {
        const respuesta = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: promptSistema + mensajeUsuario }]
                }]
            })
        });

        const json = await respuesta.json();

        // if (json.candidates && json.candidates[0] && json.candidates[0].content) {
        //     const textoIA = json.candidates[0].content.parts[0].text;
        //     const log = document.getElementById('chat-output');
        //     log.innerHTML += `<div style="margin-bottom:10px; color:#4b2c20; background: #fdf5e6; padding: 10px; border-radius: 5px; border-left: 5px solid #d4af37;"><strong>Narrador:</strong> ${textoIA}</div>`;
        //     log.scrollTop = log.scrollHeight;
        // } else {
        //     console.error("Respuesta inesperada de Google:", json);
        //     throw new Error("La IA no pudo generar una respuesta.");
        // }

        if (json.candidates && json.candidates.length > 0) {
            const textoIA = json.candidates[0].content.parts[0].text;
            const log = document.getElementById('chat-output');
            log.innerHTML += `<div class="msg-narrador"><strong>Narrador:</strong> ${textoIA}</div>`;
            log.scrollTop = log.scrollHeight;
        } else {
            console.error("Respuesta vacía de la IA:", json);
        }

    } catch (error) {
        console.error("Error en la comunicación:", error);
        const log = document.getElementById('chat-output');
        log.innerHTML += `<div style="color:red; font-size: 0.8rem;">[Error: El narrador se ha quedado sin voz. Revisa tu conexión o API Key]</div>`;
    }
}

//******************* ENVIO DE ACCION MANUAL
function enviarAccion() {
    const input = document.getElementById('user-input');
    const mensaje = input.value.trim();

    if (mensaje !== "") {
        const log = document.getElementById('chat-output');
        log.innerHTML += `<div style="margin-bottom:10px; text-align: right; color: #2e4a39;"><strong>Tú:</strong> ${mensaje}</div>`;
        input.value = "";
        log.scrollTop = log.scrollHeight;
        hablarConNarrador(mensaje);
    }
}

// Escuchar tecla Enter
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('user-input').addEventListener('keypress', function (e) {
        if (e.key === 'Enter') enviarAccion();
    });
});


//******************BG AVENTURA

const backgrounds = {
    "Novato 1": "url('img/bosque.webp')",
    "Novato 2": "url('img/baile.webp')",
    "Novato 3": "url('img/alquimia.jpg')",
    "Intermedio 4": "url('img/espejos.jpg')",
    "Intermedio 5": "url('img/laberinto.jpg')",
    "Intermedio 6": "url('img/boda.jpg')"
};

function updateAdventureVisuals() {
    const mission = document.getElementById('mission-select').value;
    const body = document.body;

    // Diccionario de imágenes según la misión
    const imagenesFondo = {
        "Novato 1": "url('img/bosque.webp')",
        "Novato 2": "url('img/baile.webp')",
        "Novato 3": "url('img/alquimia.jpg')",
        "Intermedio 4": "url('img/espejos.jpg')",
        "Intermedio 5": "url('img/laberinto.jpg')",
        "Intermedio 6": "url('img/boda.jpg')"
    };

    // Aplicar la imagen
    if (imagenesFondo[mission]) {
        body.style.backgroundImage = imagenesFondo[mission];
        body.style.backgroundSize = "cover";
        body.style.backgroundPosition = "center";
        body.style.backgroundAttachment = "fixed"; // Para que no se mueva al hacer scroll
        body.style.backgroundRepeat = "no-repeat";
    } else {
        body.style.backgroundColor = "#f4ece1"; // Color por defecto si falla la imagen
        body.style.backgroundImage = "none";
    }
}

//******************GUARDADO Y CARGA

// Función para guardar en el almacenamiento local del dispositivo
function saveGame() {
    const gameState = {
        mision: document.getElementById('mission-select').value,
        hpMaga: document.querySelector('.card:nth-child(2) input').value,
        hpCaballero: document.querySelector('.card:nth-child(3) input').value,
        historial: document.getElementById('chat-output').innerHTML,
        fecha: new Date().toLocaleString()
    };

    // Convertimos el objeto a una cadena de texto (JSON)
    const dataStr = JSON.stringify(gameState, null, 2);
    const blob = new Blob([dataStr], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    // Creamos un link invisible para forzar la descarga
    const link = document.createElement("a");
    link.href = url;
    link.download = `Partida_DnD_${gameState.mision.replace(/ /g, "_")}.txt`;
    link.click();

    // Limpiamos la memoria
    URL.revokeObjectURL(url);
    alert("Archivo de partida generado. ¡Guárdalo bien!");
}

// Función que se ejecuta al presionar "Cargar Partida" en el menú
function loadGame() {
    const saved = localStorage.getItem('dd_duet_save');

    if (saved) {
        const data = JSON.parse(saved);

        // Restaurar valores en la interfaz
        document.getElementById('mission-select').value = data.mision;
        document.querySelector('.card:nth-child(2) input').value = data.hpMaga;
        document.querySelector('.card:nth-child(3) input').value = data.hpCaballero;
        document.getElementById('chat-output').innerHTML = data.historial;

        // Ocultar menú y actualizar visuales
        document.getElementById('main-menu').style.display = 'none';
        updateAdventureVisuals(); // Cambia el fondo según la misión cargada

        // Avisar al Narrador que hemos vuelto
        hablarConNarrador("He cargado una partida guardada en la misión: " + data.mision + ". Por favor, resume brevemente dónde nos quedamos.");
    } else {
        alert("No se encontró ninguna partida guardada en este dispositivo.");
    }
}

function importGame(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function (e) {
        try {
            const data = JSON.parse(e.target.result);

            // Restauramos todo en la interfaz
            document.getElementById('mission-select').value = data.mision;
            document.querySelector('.card:nth-child(2) input').value = data.hpMaga;
            document.querySelector('.card:nth-child(3) input').value = data.hpCaballero;
            document.getElementById('chat-output').innerHTML = data.historial;

            document.getElementById('main-menu').style.display = 'none';
            updateAdventureVisuals();

            hablarConNarrador("He vuelto a la partida usando un registro guardado. Estamos en: " + data.mision);
        } catch (err) {
            alert("Error: El archivo no es un registro de partida válido.");
        }
    };
    reader.readAsText(file);
}

// Función para iniciar una partida nueva desde el menú
function newGame() {
    const selectorMenu = document.getElementById('menu-mission-select');
    const misionID = selectorMenu.value; // Ejemplo: "Novato 1"
    const nombreVisible = selectorMenu.options[selectorMenu.selectedIndex].text;
    const musica = document.getElementById('musica-ambiental');

    if (musica) {
        musica.volume = 0.5; // Ajusta el volumen para que no tape los sonidos de dados
        musica.play().catch(error => {
            console.log("Esperando interacción para sonar:", error);
        });
    }

    // Sincronizar el selector de la interfaz principal
    document.getElementById('mission-select').value = misionID;

    // Cambiar visuales y ocultar menú
    document.getElementById('main-menu').style.display = 'none';
    updateAdventureVisuals();

    // OBTENER LA INTRODUCCIÓN AUTOMÁTICA
    const introNarrativa = introMisiones[misionID] || "Comenzamos una nueva aventura.";

    // CONSTRUIR EL MENSAJE PARA LA IA
    const mensajeParaIA = `SISTEMA: El usuario ha iniciado una partida nueva. 
    Misión: ${nombreVisible}. 
    Contexto inicial: ${introNarrativa} 
    Por favor, actúa como Dungeon Master e inicia la narración basándote en este contexto.`;

    // Enviar a la IA (esto no aparecerá en el chat como texto del usuario si lo manejas bien)
    hablarConNarrador(mensajeParaIA);
}

//******************* NENSAJE ESPECIAL

function agregarMensajeEspecial(texto, tipo) {
    const chat = document.getElementById('chat-output');
    const div = document.createElement('div');

    // Aplicamos la clase según el tipo: 'victoria', 'derrota' o 'narrador'
    div.className = `msg-${tipo}`;
    div.innerText = texto;

    chat.appendChild(div);
    chat.scrollTop = chat.scrollHeight; // Auto-scroll al final
}

// Ejemplo de uso al sacar un 20:
// agregarMensajeEspecial("¡CRÍTICO! El Caballero asesta un golpe devastador.", "victoria");


//******************* MUSICA

function ajustarVolumen(valor) {
    const musica = document.getElementById('musica-ambiental');
    const dados = document.getElementById('audio-dados');

    if (musica) musica.volume = valor;
    if (dados) dados.volume = valor;

    // Cambiar el icono si llega a 0
    const btn = document.getElementById('btn-mute');
    btn.innerText = valor == 0 ? "🔇" : "🔊";
}

function toggleMute() {
    const musica = document.getElementById('musica-ambiental');
    const slider = document.getElementById('volumen-slider');

    if (musica.muted) {
        musica.muted = false;
        document.getElementById('btn-mute').innerText = "🔊";
    } else {
        musica.muted = true;
        document.getElementById('btn-mute').innerText = "🔇";
    }
}