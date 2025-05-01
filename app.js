// TODO: mostrar juego de dados al hablar con el mago

// Inicializar la aplicación PixiJS
const app = new PIXI.Application({
    width: 800,
    height: 600,
    backgroundColor: 0x1099bb,
});
document.body.appendChild(app.view);

// Datos de las diapositivas (con nombres de NPCs, páginas de texto y enlaces)
const slides = [
    { 
        title: "Introducción", 
        pages: [
            "¡Bienvenidos al mundo de los video juegos!\nHoy hablaremos de PixiJS.",
            "PixiJS es una biblioteca de JavaScript para crear gráficos 2D rápidos y renderizados en WebGL o Canvas, ideal para juegos y aplicaciones interactivas.",
            "PixiJS es ideal para diseño de juegos por su rendimiento rápido en 2D, soporte WebGL/Canvas, facilidad de uso y amplia personalización.",
            "Además, cuenta con una comunidad activa y muchos recursos disponibles.",
            "La programación de juegos combina diseño, gráficos, física, IA y lógica para crear experiencias interactivas en videojuegos.",
            "Los desarrolladores de juegos deben dominar lenguajes de programación, motores de juego y herramientas de diseño.",
            "Para empezar, puedes explorar recursos como la documentación de PixiJS y la hoja de ruta para desarrolladores de juegos.",
            "También puedes consultar la wiki de diseño de juegos para obtener más información sobre los conceptos y técnicas utilizados en el desarrollo de juegos.",
            "¡Espero que disfruten la presentación y aprendan algo nuevo!",
        ], 
        portrait: "portrait1", 
        name: "Caballero", 
        link: ["https://pixijs.com/", "https://roadmap.sh/game-developer", "https://rosacarbo.notion.site/Game-design-wiki-6902c5dc9d1242c9a70822f13e6c76b3"],
        linkText: ["PixiJS", "roadmap/gameDev", "Game design wiki"]
    },
    { 
        title: "Los secretos del Mago",
        text: "¡Bienvenido al minijuego de dados!\nTira los dados y compite contra el Mago.",
        pages: [
            "Has ganado el minijuego de dados.\n¡Felicidades!",
            "Un videojuego es atractivo por su jugabilidad, gráficos, narrativa, desafíos, interacción y la experiencia inmersiva que ofrece al jugador.",
            "La jugabilidad se refiere a la forma en que los jugadores interactúan con el juego, incluyendo mecánicas, controles y objetivos.",
            "Los gráficos son la representación visual del juego, incluyendo personajes, entornos y efectos especiales.",
            "La narrativa es la historia que se cuenta en el juego, incluyendo personajes, tramas y diálogos.",
            "Los desafíos son obstáculos que los jugadores deben superar, incluyendo enemigos, acertijos y niveles difíciles.",
            "La interacción se refiere a la forma en que los jugadores interactúan entre sí y con el entorno del juego.",
            "La experiencia inmersiva es la sensación de estar dentro del juego, incluyendo sonido, música y efectos visuales.",
            "La combinación de estos elementos crea una experiencia de juego atractiva y memorable.",
        ], 
        portrait: "portrait2", 
        name: "Mago", 
        isDiceGame: true // Indicador para el juego de dados
    },
    { 
        title: "Consejos",  
        pages: [
            "Este juego fue creado para mostrar las capacidades de PixiJS.\nEspero que lo hayas disfrutado.",
            "Empieza con lenguajes como JavaScript o Python, usa motores como Unity o Godot, practica lógica, aprende diseño 2D/3D y crea proyectos simples.",
            "Recuerda que la práctica es clave para mejorar tus habilidades de programación y diseño.",
            "Puedes encontrar más recursos y tutoriales en los siguientes enlaces.",
            "¡Nos vemos en la próxima aventura!"
        ], 
        portrait: "portrait3", 
        name: "Aldeano",
        link: ["https://pixijs.com/8.x/tutorials", "https://opengameart.org", "https://kenney.nl/"],
        linkText: ["PixiJS tutoriales", "Explora OpenGameArt", "Kenney.nl"]
    },
];

// Cargar las imágenes estáticas
async function loadAssets() {
    try {
        const assets = await PIXI.Assets.load([
            { alias: "character", src: "assets/character.png" }, // Personaje principal: 32x32
            { alias: "npc1", src: "assets/npc1.png" }, // NPC 1: 32x32
            { alias: "npc2", src: "assets/npc2.png" }, // NPC 2: 32x32
            { alias: "npc3", src: "assets/npc3.png" }, // NPC 3: 32x32
            { alias: "portrait1", src: "assets/portrait1.png" }, // Portrait 1: 64x64
            { alias: "portrait2", src: "assets/portrait2.png" }, // Portrait 2: 64x64
            { alias: "portrait3", src: "assets/portrait3.png" }, // Portrait 3: 64x64
            { alias: "tileset", src: "assets/tileset.png" }, // Tileset para el fondo
            { alias: "draggable", src: "assets/draggable.png" }, // Sprite para el objeto draggable
        ]);

        console.log(`Character Dimensions: ${assets.character.width}x${assets.character.height}`);
        console.log(`NPC1 Dimensions: ${assets.npc1.width}x${assets.npc1.height}`);
        console.log(`NPC2 Dimensions: ${assets.npc2.width}x${assets.npc2.height}`);
        console.log(`NPC3 Dimensions: ${assets.npc3.width}x${assets.npc3.height}`);
        console.log(`Portrait1 Dimensions: ${assets.portrait1.width}x${assets.portrait1.height}`);
        console.log(`Portrait2 Dimensions: ${assets.portrait2.width}x${assets.portrait2.height}`);
        console.log(`Portrait3 Dimensions: ${assets.portrait3.width}x${assets.portrait3.height}`);
        console.log(`Tileset Dimensions: ${assets.tileset.width}x${assets.tileset.height}`);
        console.log(`Draggable Dimensions: ${assets.draggable.width}x${assets.draggable.height}`);

        setup();
    } catch (error) {
        console.error("Error loading assets:", error);
        setupWithPlaceholder();
    }
}

loadAssets();

function setupWithPlaceholder() {
    console.warn("Using placeholders due to loading error");

    const textures = {
        character: createPlaceholderTexture(0xff0000), // Rojo para el personaje principal
        npc1: createPlaceholderTexture(0xffa500), // Naranja
        npc2: createPlaceholderTexture(0x800080), // Púrpura
        npc3: createPlaceholderTexture(0x00ffff), // Cian
        portrait1: createPlaceholderTexture(0xff0000), // Rojo
        portrait2: createPlaceholderTexture(0x00ff00), // Verde
        portrait3: createPlaceholderTexture(0x0000ff), // Azul
        tileset: createPlaceholderTexture(0x00ff00), // Verde para el tileset
        draggable: createPlaceholderTexture(0xff6347), // Rojo tomate para el objeto draggable
    };

    function createPlaceholderTexture(color) {
        const graphics = new PIXI.Graphics();
        graphics.beginFill(color);
        const size = color === 0xff0000 || color === 0xffa500 || color === 0x800080 || color === 0x00ffff ? 32 : (color === 0x00ff00 ? 32 : 64); // 32x32 para personajes y tileset, 64x64 para portraits
        graphics.drawRect(0, 0, size, size);
        graphics.endFill();
        return app.renderer.generateTexture(graphics);
    }

    proceedWithSetup(textures);
}

function setup() {
    const textures = {
        character: PIXI.Assets.get("character"),
        npc1: PIXI.Assets.get("npc1"),
        npc2: PIXI.Assets.get("npc2"),
        npc3: PIXI.Assets.get("npc3"),
        portrait1: PIXI.Assets.get("portrait1"),
        portrait2: PIXI.Assets.get("portrait2"),
        portrait3: PIXI.Assets.get("portrait3"),
        tileset: PIXI.Assets.get("tileset"),
        draggable: PIXI.Assets.get("draggable"),
    };

    proceedWithSetup(textures);
}

function proceedWithSetup(textures) {
    // Crear el mapa con tileset
    const map = new PIXI.TilingSprite(textures.tileset, 800, 600);
    map.tileScale.set(1, 1); // Escala del tile (ajusta si el tileset no es 32x32)
    app.stage.addChild(map);

    // Crear el personaje principal (estático, escalado)
    const character = new PIXI.Sprite(textures.character);
    character.width = 48; // Escalar de 32 a 48 píxeles (1.5x)
    character.height = 48; // Escalar de 32 a 48 píxeles (1.5x)
    character.x = 400;
    character.y = 300;
    character.anchor.set(0.5);

    // Sombra para el personaje principal
    const characterShadow = new PIXI.Graphics();
    characterShadow.beginFill(0x000000, 0.3);
    characterShadow.drawEllipse(0, 0, 24, 12); // Tamaño de la sombra ajustado al sprite escalado
    characterShadow.endFill();
    characterShadow.x = character.x;
    characterShadow.y = character.y + 24;

    // Agregar sombra y luego el personaje al escenario
    app.stage.addChild(characterShadow);
    app.stage.addChild(character);

    // Inicializar NPCs con el flag `hasWonDiceGame`
    const npcs = [
        { x: 200, y: 200, slideIndex: 0, texture: "npc1", currentPage: 0, name: "Caballero" },
        { x: 400, y: 200, slideIndex: 1, texture: "npc2", name: "Mago", isDiceGame: true, hasWonDiceGame: false },
        { x: 600, y: 200, slideIndex: 2, texture: "npc3", currentPage: 0, name: "Aldeano" },
    ];

    const npcSprites = [];
    npcs.forEach((npc, index) => {
        const sprite = new PIXI.Sprite(textures[npc.texture]);
        sprite.width = 48; // Escalar de 32 a 48 píxeles (1.5x)
        sprite.height = 48; // Escalar de 32 a 48 píxeles (1.5x)
        sprite.x = npc.x;
        sprite.y = npc.y;
        sprite.anchor.set(0.5);
        sprite.baseTint = 0xffffff;
        sprite.originX = npc.x; // Guardar posición inicial
        sprite.originY = npc.y;
        sprite.targetX = npc.x; // Posición objetivo para el movimiento
        sprite.targetY = npc.y;
        sprite.isMoving = false; // Estado de movimiento
        sprite.isPaused = false; // Estado de pausa
        sprite.pauseDuration = 0; // Duración de la pausa
        sprite.timeSincePause = 0; // Tiempo transcurrido desde la pausa
        sprite.speed = 0.5; // Velocidad de movimiento (píxeles por frame)

        // Sombra para el NPC
        const shadow = new PIXI.Graphics();
        shadow.beginFill(0x000000, 0.3);
        shadow.drawEllipse(0, 0, 24, 12);
        shadow.endFill();
        shadow.x = sprite.x;
        shadow.y = sprite.y + 24;

        // Agregar sombra y luego el NPC al escenario
        app.stage.addChild(shadow);
        app.stage.addChild(sprite);

        sprite.shadow = shadow; // Asignar sombra al sprite para actualizar su posición
        npcSprites.push(sprite);

        // Iniciar el movimiento aleatorio
        setNewRandomTarget(sprite);
    });

    // Crear un objeto draggable (arrastrable)
    const draggableObject = new PIXI.Sprite(textures.draggable);
    draggableObject.width = 48; // Ajustar tamaño del sprite
    draggableObject.height = 48;
    draggableObject.x = 400; // Posición inicial
    draggableObject.y = 300;
    draggableObject.anchor.set(0.5); // Centrar el punto de anclaje
    draggableObject.interactive = true; // Hacer el objeto interactivo
    draggableObject.buttonMode = true;

    // Crear sombra para el objeto draggable
    const draggableShadow = new PIXI.Graphics();
    draggableShadow.beginFill(0x000000, 0.3); // Sombra negra con opacidad
    draggableShadow.drawEllipse(0, 0, 24, 12); // Tamaño de la sombra
    draggableShadow.endFill();
    draggableShadow.x = draggableObject.x;
    draggableShadow.y = draggableObject.y + 24;

    // Agregar sombra y luego el objeto draggable al escenario
    app.stage.addChild(draggableShadow);
    app.stage.addChild(draggableObject);

    // Función para establecer un nuevo objetivo aleatorio dentro de ±20 píxeles
    function setNewRandomTarget(sprite) {
        if (sprite.isPaused) return; // No establecer nuevo objetivo si está pausado

        const range = 20; // Rango de ±20 píxeles
        sprite.targetX = sprite.originX + (Math.random() * range * 2 - range);
        sprite.targetY = sprite.originY + (Math.random() * range * 2 - range);
        sprite.isMoving = true;
    }

    // Función para tirar un dado (número aleatorio entre 1 y 6)
    function rollDice() {
        return Math.floor(Math.random() * 6) + 1;
    }

    // Cuadro de texto para las diapositivas
    const slideContainer = new PIXI.Container();
    const slideBackground = new PIXI.Graphics();
    slideBackground.beginFill(0x000000, 0.8);
    slideBackground.drawRect(50, 100, 700, 400);
    slideBackground.endFill();

    const slidePortrait = new PIXI.Sprite();
    slidePortrait.x = 80;
    slidePortrait.y = 120;
    slidePortrait.width = 64;
    slidePortrait.height = 64;

    const slideTitle = new PIXI.Text("", { fill: 0xffffff, fontSize: 32 });
    const slideText = new PIXI.Text("", { fill: 0xffffff, fontSize: 24, wordWrap: true, wordWrapWidth: 580 });
    slideTitle.x = 160;
    slideTitle.y = 120;
    slideText.x = 160;
    slideText.y = 180;

    // Contenedor para los enlaces (soporte para múltiples enlaces)
    const slideLinksContainer = new PIXI.Container();
    slideLinksContainer.x = 160;
    slideLinksContainer.y = 300; // Posición inicial de los enlaces
    slideContainer.addChild(slideLinksContainer);

    // Indicador de página
    const pageIndicator = new PIXI.Text("", { fill: 0xffffff, fontSize: 20 });
    pageIndicator.x = 160;
    pageIndicator.y = 450;
    slideContainer.addChild(pageIndicator);

    // Función para actualizar los enlaces
    function updateSlideLinks(links, linkTexts) {
        slideLinksContainer.removeChildren(); // Limpiar enlaces anteriores

        if (Array.isArray(links) && Array.isArray(linkTexts)) {
            links.forEach((link, index) => {
                const linkText = linkTexts[index] || "Enlace"; // Texto predeterminado si falta

                // Crear fondo del botón
                const buttonBackground = new PIXI.Graphics();
                buttonBackground.beginFill(0x1e90ff); // Azul brillante
                buttonBackground.drawRoundedRect(0, 0, 300, 40, 10); // Botón de 300x40 con bordes redondeados
                buttonBackground.endFill();
                buttonBackground.y = index * 50; // Separar botones verticalmente
                buttonBackground.interactive = true;
                buttonBackground.buttonMode = true;

                // Agregar sombra al botón
                const shadow = new PIXI.Graphics();
                shadow.beginFill(0x000000, 0.3); // Sombra negra con opacidad
                shadow.drawRoundedRect(5, 5, 300, 40, 10); // Sombra desplazada
                shadow.endFill();
                shadow.y = buttonBackground.y;

                // Crear texto del botón
                const buttonText = new PIXI.Text(linkText, {
                    fill: 0xffffff, // Blanco
                    fontSize: 18,
                    fontWeight: "bold",
                });
                buttonText.x = 20; // Margen izquierdo
                buttonText.y = 10; // Centrar verticalmente

                // Cambiar color y escala al pasar el cursor
                buttonBackground.on("pointerover", () => {
                    buttonBackground.tint = 0x87cefa; // Azul más claro
                    buttonBackground.scale.set(1.05); // Aumentar tamaño
                });
                buttonBackground.on("pointerout", () => {
                    buttonBackground.tint = 0xffffff; // Restaurar color original
                    buttonBackground.scale.set(1); // Restaurar tamaño
                });

                // Abrir enlace al hacer clic
                buttonBackground.on("pointerdown", () => {
                    window.open(link, "_blank"); // Abrir enlace en una nueva pestaña
                });

                // Agregar sombra y botón al contenedor
                slideLinksContainer.addChild(shadow, buttonBackground);
                buttonBackground.addChild(buttonText);
            });
        } else if (links && linkTexts) {
            // Manejar caso de un solo enlace (no es un arreglo)
            const buttonBackground = new PIXI.Graphics();
            buttonBackground.beginFill(0x1e90ff);
            buttonBackground.drawRoundedRect(0, 0, 300, 40, 10);
            buttonBackground.endFill();
            buttonBackground.interactive = true;
            buttonBackground.buttonMode = true;

            // Agregar sombra al botón
            const shadow = new PIXI.Graphics();
            shadow.beginFill(0x000000, 0.3);
            shadow.drawRoundedRect(5, 5, 300, 40, 10);
            shadow.endFill();

            // Crear texto del botón
            const buttonText = new PIXI.Text(linkTexts, {
                fill: 0xffffff,
                fontSize: 18,
                fontWeight: "bold",
            });
            buttonText.x = 20;
            buttonText.y = 10;

            // Cambiar color y escala al pasar el cursor
            buttonBackground.on("pointerover", () => {
                buttonBackground.tint = 0x87cefa;
                buttonBackground.scale.set(1.05);
            });
            buttonBackground.on("pointerout", () => {
                buttonBackground.tint = 0xffffff;
                buttonBackground.scale.set(1);
            });

            // Abrir enlace al hacer clic
            buttonBackground.on("pointerdown", () => {
                window.open(links, "_blank");
            });

            // Agregar sombra y botón al contenedor
            slideLinksContainer.addChild(shadow, buttonBackground);
            buttonBackground.addChild(buttonText);
        }
    }

    // Función para actualizar el indicador de página
    function updatePageIndicator() {
        if (activeNpc && slides[activeNpc.slideIndex].pages) {
            const currentPage = activeNpc.currentPage + 1; // Índice a base 1
            const totalPages = slides[activeNpc.slideIndex].pages.length;
            pageIndicator.text = `Página ${currentPage} de ${totalPages}`;
        } else {
            pageIndicator.text = "";
        }
    }

    // Elementos para el juego de dados
    const diceResult = new PIXI.Text("", { fill: 0xffffff, fontSize: 24 });
    diceResult.x = 160;
    diceResult.y = 240;
    diceResult.visible = false;

    // Crear botón "Tirar Dados" con estilo
    const rollButtonContainer = new PIXI.Container();
    rollButtonContainer.x = 160;
    rollButtonContainer.y = 300;
    rollButtonContainer.visible = false;

    // Fondo del botón
    const rollButtonBackground = new PIXI.Graphics();
    rollButtonBackground.beginFill(0x1e90ff); // Azul brillante
    rollButtonBackground.drawRoundedRect(0, 0, 300, 40, 10); // Botón de 300x40 con bordes redondeados
    rollButtonBackground.endFill();
    rollButtonBackground.interactive = true;
    rollButtonBackground.buttonMode = true;

    // Sombra del botón
    const rollButtonShadow = new PIXI.Graphics();
    rollButtonShadow.beginFill(0x000000, 0.3); // Sombra negra con opacidad
    rollButtonShadow.drawRoundedRect(5, 5, 300, 40, 10); // Sombra desplazada
    rollButtonShadow.endFill();

    // Texto del botón
    const rollButtonText = new PIXI.Text("Tirar Dados", {
        fill: 0xffffff, // Blanco
        fontSize: 18,
        fontWeight: "bold",
    });
    rollButtonText.x = 20; // Margen izquierdo
    rollButtonText.y = 10; // Centrar verticalmente

    // Efectos de hover
    rollButtonBackground.on("pointerover", () => {
        rollButtonBackground.tint = 0x87cefa; // Azul más claro
        rollButtonBackground.scale.set(1.05); // Aumentar tamaño
    });
    rollButtonBackground.on("pointerout", () => {
        rollButtonBackground.tint = 0xffffff; // Restaurar color original
        rollButtonBackground.scale.set(1); // Restaurar tamaño
    });

    // Acción al hacer clic en el botón "Tirar Dados"
    rollButtonBackground.on("pointerdown", () => {
        // Tirar los dados
        const playerRoll = rollDice();
        const npcRoll = rollDice();
        let resultText = `Tu dado: ${playerRoll} | Dado del Mago: ${npcRoll}\n`;

        // Determinar el ganador
        if (playerRoll > npcRoll) {
            resultText += "¡Ganaste!";
            if (activeNpc && activeNpc.isDiceGame) {
                activeNpc.hasWonDiceGame = true; // Actualizar el flag al ganar
                activeNpc.currentPage = 0; // Reiniciar al inicio de las páginas
                updatePageIndicator(); // Actualizar el indicador de página
                updateButtonVisibility(); // Actualizar visibilidad de los botones
                slideText.text = slides[activeNpc.slideIndex].pages[activeNpc.currentPage];
                slideLinksContainer.visible = false;
                diceResult.visible = false;
                rollButtonContainer.visible = false;
                prevButton.visible = true; // Mostrar botones de navegación
                nextButton.visible = true;
            }
        } else if (npcRoll > playerRoll) {
            resultText += "¡El Mago ganó!";
        } else {
            resultText += "¡Empate!";
        }

        diceResult.text = resultText;
    });

    // Agregar sombra, fondo y texto al contenedor del botón
    rollButtonContainer.addChild(rollButtonShadow, rollButtonBackground, rollButtonText);

    // Declarar los botones antes de usarlos
    const prevButton = new PIXI.Text("Anterior", { fill: 0xffffff, fontSize: 20 });
    prevButton.x = 500;
    prevButton.y = 450;
    prevButton.interactive = true;
    prevButton.buttonMode = true;
    prevButton.visible = false;
    prevButton.on("pointerdown", () => {
        if (activeNpc && activeNpc.currentPage > 0) {
            activeNpc.currentPage--; // Decrementar la página actual
            slideText.text = slides[activeNpc.slideIndex].pages[activeNpc.currentPage]; // Actualizar el texto
            updateButtonVisibility(); // Actualizar visibilidad de los botones
            updatePageIndicator(); // Actualizar el indicador de página
        }
    });

    const nextButton = new PIXI.Text("Siguiente", { fill: 0xffffff, fontSize: 20 });
    nextButton.x = 600;
    nextButton.y = 450;
    nextButton.interactive = true;
    nextButton.buttonMode = true;
    nextButton.visible = false;
    nextButton.on("pointerdown", () => {
        if (activeNpc && activeNpc.currentPage < slides[activeNpc.slideIndex].pages.length - 1) {
            activeNpc.currentPage++; // Incrementar la página actual
            slideText.text = slides[activeNpc.slideIndex].pages[activeNpc.currentPage]; // Actualizar el texto
            updateButtonVisibility(); // Actualizar visibilidad de los botones
            updatePageIndicator(); // Actualizar el indicador de página
        }
    });

    // Asegúrate de agregar los botones al contenedor después de declararlos
    slideContainer.addChild(
        slideBackground, // El fondo debe ser el primer elemento
        slidePortrait,   // Luego el retrato
        slideTitle,      // Título de la diapositiva
        slideText,       // Texto principal
        slideLinksContainer, // Contenedor de enlaces (debe estar encima del fondo)
        pageIndicator,   // Indicador de página (debe estar encima del fondo)
        diceResult,      // Resultado del juego de dados
        prevButton,      // Botón de página anterior
        nextButton,      // Botón de página siguiente
        rollButtonContainer // Botón "Tirar Dados" (debe estar encima de todo lo demás)
    );

    slideContainer.visible = false;
    slideContainer.alpha = 0;
    app.stage.addChild(slideContainer);

    // Asegurarse de que el cuadro de diálogo y sus elementos estén al frente
    function bringDialogToFront() {
        app.stage.removeChild(slideContainer); // Eliminar temporalmente el contenedor
        app.stage.addChild(slideContainer); // Volver a agregarlo para que esté al frente
    }

    // Variables para manejar el arrastre
    let isDragging = false;
    let dragOffset = { x: 0, y: 0 };

    // Eventos para el drag and drop
    draggableObject.on("pointerdown", (event) => {
        isDragging = true;
        const position = event.data.getLocalPosition(draggableObject.parent);
        dragOffset.x = position.x - draggableObject.x;
        dragOffset.y = position.y - draggableObject.y;
    });

    draggableObject.on("pointermove", (event) => {
        if (isDragging) {
            const position = event.data.getLocalPosition(draggableObject.parent);
            draggableObject.x = position.x - dragOffset.x;
            draggableObject.y = position.y - dragOffset.y;

            // Actualizar la posición de la sombra
            draggableShadow.x = draggableObject.x;
            draggableShadow.y = draggableObject.y + 24;
        }
    });

    draggableObject.on("pointerup", () => {
        isDragging = false;
    });

    draggableObject.on("pointerupoutside", () => {
        isDragging = false;
    });

    // Función para mover el objeto draggable a una posición aleatoria
    function moveDraggableToRandomPosition() {
        const padding = 48; // Evitar que aparezca en los bordes
        draggableObject.x = Math.random() * (app.screen.width - 2 * padding) + padding;
        draggableObject.y = Math.random() * (app.screen.height - 2 * padding) + padding;

        // Actualizar la posición de la sombra
        draggableShadow.x = draggableObject.x;
        draggableShadow.y = draggableObject.y + 24;
    }

    // Función para actualizar la visibilidad y estado de los botones
    function updateButtonVisibility() {
        if (!activeNpc || !slides[activeNpc.slideIndex].pages) {
            prevButton.visible = false;
            nextButton.visible = false;
            return;
        }

        prevButton.visible = true;
        nextButton.visible = true;

        // Deshabilitar botones según la página actual
        if (activeNpc.currentPage === 0) {
            prevButton.alpha = 0.5;
            prevButton.interactive = false;
        } else {
            prevButton.alpha = 1;
            prevButton.interactive = true;
        }

        if (activeNpc.currentPage === slides[activeNpc.slideIndex].pages.length - 1) {
            nextButton.alpha = 0.5;
            nextButton.interactive = false;
        } else {
            nextButton.alpha = 1;
            nextButton.interactive = true;
        }
    }

    // Movimiento del personaje
    const keys = {};
    window.addEventListener("keydown", (e) => { keys[e.code] = true; });
    window.addEventListener("keyup", (e) => { keys[e.code] = false; });

    let speed = 7; // Velocidad ajustada
    let activeNpc = null;

    // Verificar si hay un NPC cercano y asignar a activeNpc
    app.ticker.add(() => {
        let nearNpc = null;
        npcSprites.forEach((sprite, index) => {
            const dx = character.x - sprite.x;
            const dy = character.y - sprite.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < 70) { // Rango de interacción ajustado
                nearNpc = npcs[index];
            }
        });

        if (nearNpc && nearNpc !== activeNpc) {
            activeNpc = nearNpc;

            // Inicializar currentPage si no está definido
            if (activeNpc.currentPage === undefined) {
                activeNpc.currentPage = 0;
            }

            // Mostrar el contenedor del diálogo
            slideContainer.visible = true;
            slideContainer.alpha = 1; // Asegurarse de que sea completamente visible
            slideTitle.text = `${slides[nearNpc.slideIndex].name}: ${slides[nearNpc.slideIndex].title}`; // Mostrar nombre del NPC

            if (activeNpc.isDiceGame && !activeNpc.hasWonDiceGame) {
                // Mostrar el minijuego de dados si no se ha ganado
                slideText.text = slides[activeNpc.slideIndex].text || "¡Bienvenido al minijuego!";
                slideLinksContainer.visible = false;
                diceResult.visible = true;
                rollButtonContainer.visible = true;
                prevButton.visible = false;
                nextButton.visible = false;
            } else if (slides[nearNpc.slideIndex].pages) {
                // Mostrar las páginas si el minijuego ya se ganó
                slideText.text = slides[nearNpc.slideIndex].pages[activeNpc.currentPage];
                const links = slides[nearNpc.slideIndex].link;
                const linkTexts = slides[nearNpc.slideIndex].linkText;
                updateSlideLinks(links, linkTexts); // Actualizar enlaces
                slideLinksContainer.visible = true;
                diceResult.visible = false;
                rollButtonContainer.visible = false;

                updatePageIndicator(); // Actualizar indicador de página
                updateButtonVisibility(); // Actualizar visibilidad de los botones
            } else {
                console.warn("El NPC no tiene contenido en 'pages'.");
            }

            slidePortrait.texture = textures[slides[nearNpc.slideIndex].portrait];
            bringDialogToFront(); // Asegurarse de que el cuadro de diálogo esté al frente
        } else if (!nearNpc && activeNpc) {
            // Reiniciar el contador de páginas al dejar de hablar con el NPC
            activeNpc.currentPage = 0;

            activeNpc = null;

            // Ocultar el contenedor del diálogo
            slideContainer.visible = false;
            slideContainer.alpha = 0;
        }
    });

    app.ticker.add((delta) => {
        // Movimiento del personaje principal (sin animación)
        if (keys["ArrowUp"] || keys["KeyW"]) {
            character.y -= speed;
        }
        if (keys["ArrowDown"] || keys["KeyS"]) {
            character.y += speed;
        }
        if (keys["ArrowLeft"] || keys["KeyA"]) {
            character.x -= speed;
        }
        if (keys["ArrowRight"] || keys["KeyD"]) {
            character.x += speed;
        }

        character.x = Math.max(24, Math.min(776, character.x)); // Límites ajustados para el tamaño escalado (48/2 = 24)
        character.y = Math.max(24, Math.min(576, character.y));

        // Actualizar posición de la sombra del personaje principal
        characterShadow.x = character.x;
        characterShadow.y = character.y + 24;

        // Verificar proximidad con NPCs (sin colisión)
        npcSprites.forEach((sprite, index) => {
            const dx = character.x - sprite.x;
            const dy = character.y - sprite.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            const interactionDistance = 70; // Distancia para interacción

            if (distance < interactionDistance) {
                // Cambiar el color del NPC al acercarse
                sprite.tint = 0xcccccc;
            } else {
                // Restaurar el color original del NPC
                sprite.tint = sprite.baseTint;
            }

            // Actualizar posición de la sombra del NPC
            sprite.shadow.x = sprite.x;
            sprite.shadow.y = sprite.y + 24;
        });

        // Verificar colisión con el objeto draggable
        const dxDraggable = character.x - draggableObject.x;
        const dyDraggable = character.y - draggableObject.y;
        const distanceDraggable = Math.sqrt(dxDraggable * dxDraggable + dyDraggable * dyDraggable);
        const collisionDistanceDraggable = 48; // Radio de colisión (ajustado al tamaño del sprite draggable)

        if (distanceDraggable < collisionDistanceDraggable) {
            console.log("Colisión con el objeto draggable");
            // Reaccionar a la colisión (por ejemplo, mover el objeto a una posición aleatoria)
            moveDraggableToRandomPosition();
        }
    });

    // Función para actualizar la posición de los NPCs
    function updateNpcMovement(delta) {
        npcSprites.forEach((sprite) => {
            if (sprite.isMoving) {
                const dx = sprite.targetX - sprite.x;
                const dy = sprite.targetY - sprite.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 1) {
                    // Si el NPC alcanza su objetivo, detener el movimiento y pausar
                    sprite.isMoving = false;
                    sprite.isPaused = true;
                    sprite.pauseDuration = Math.random() * 100 + 50; // Pausa aleatoria entre 50 y 150 frames
                    sprite.timeSincePause = 0;
                } else {
                    // Mover el NPC hacia su objetivo
                    const angle = Math.atan2(dy, dx);
                    sprite.x += Math.cos(angle) * sprite.speed * delta;
                    sprite.y += Math.sin(angle) * sprite.speed * delta;

                    // Actualizar la posición de la sombra
                    sprite.shadow.x = sprite.x;
                    sprite.shadow.y = sprite.y + 24;
                }
            } else if (sprite.isPaused) {
                // Incrementar el tiempo de pausa
                sprite.timeSincePause += delta;
                if (sprite.timeSincePause >= sprite.pauseDuration) {
                    sprite.isPaused = false;
                    setNewRandomTarget(sprite); // Establecer un nuevo objetivo
                }
            }
        });
    }

    // Agregar la lógica de movimiento de los NPCs al ticker de PixiJS
    app.ticker.add((delta) => {
        updateNpcMovement(delta);
    });
}