# PixiJS Interactive Game

Este es un proyecto sencillo desarrollado con **PixiJS**, una biblioteca de JavaScript para crear gráficos 2D rápidos y renderizados en WebGL o Canvas. El proyecto incluye un personaje principal, NPCs con movimiento aleatorio, un minijuego de dados y un sistema de diálogo interactivo.

## Características

- **Personaje principal**: Controlable con las teclas de flecha o `W`, `A`, `S`, `D`.
- **NPCs**: Se mueven de manera aleatoria dentro de un rango de 20px desde su posición inicial.
- **Sistema de diálogo**: Cada NPC tiene un diálogo único con soporte para paginación.
- **Minijuego de dados**: Al interactuar con el mago, se inicia un juego de dados. Si el jugador gana, se desbloquea el contenido adicional del mago.
- **Objeto draggable**: Un objeto interactivo que se puede arrastrar y mover por la pantalla.
- **Colisiones**: Detección de colisiones con el objeto draggable.

## Controles

- **Movimiento del personaje**:
  - Flechas del teclado (`↑`, `↓`, `←`, `→`) o teclas `W`, `A`, `S`, `D`.
- **Interacción con NPCs**:
  - Acércate a un NPC para iniciar un diálogo.
- **Minijuego de dados**:
  - Haz clic en el botón "Tirar Dados" para jugar contra el mago.
- **Objeto draggable**:
  - Haz clic y arrastra el objeto para moverlo.

## Requisitos

- **Node.js** (opcional, si deseas usar un servidor local para probar el proyecto).
- Un navegador moderno compatible con WebGL.

## Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/8khan/node-pixijs-101
   cd tu-repositorio
   ```

2. Abre el archivo `index.html` en tu navegador o utiliza un servidor local para ejecutarlo:
   ```bash
   npx serve .
   ```

## Ver el sitio en línea

Puedes probar el proyecto directamente en tu navegador utilizando el siguiente enlace:

[https://8khan.github.io/node-pixijs-101/](https://8khan.github.io/node-pixijs-101/)

## Estructura del proyecto

```
pixijs/
├── assets/                # Recursos gráficos (sprites, tilesets, etc.)
├── app.js                 # Lógica principal del juego
├── index.html             # Archivo HTML principal
├── style.css              # Estilos opcionales
└── README.md              # Documentación del proyecto
```

## Funcionalidades principales

### Sistema de diálogo
- Cada NPC tiene un conjunto de páginas de texto que se pueden navegar con los botones "Anterior" y "Siguiente".
- El diálogo se reinicia al dejar de interactuar con el NPC.

### Minijuego de dados
- Al interactuar con el mago, se inicia un juego de dados.
- Si el jugador gana, se desbloquea el contenido adicional del mago.

### Movimiento de NPCs
- Los NPCs se mueven de manera aleatoria dentro de un rango de 20px desde su posición inicial.
- Se detienen y hacen pausas aleatorias antes de moverse nuevamente.

### Objeto draggable
- Un objeto interactivo que se puede mover arrastrándolo con el mouse.
- Detecta colisiones con el personaje principal.

## Licencia

Este proyecto está licenciado bajo la **MIT License**. Consulta el archivo `LICENSE` para más detalles.

## Créditos

- **PixiJS**: Biblioteca utilizada para renderizar gráficos 2D.
- **Assets**: https://kenney.nl/assets/tiny-dungeon

## Contribuciones

¡Las contribuciones son bienvenidas! Si deseas mejorar este proyecto, por favor abre un issue o envía un pull request.