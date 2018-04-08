import {WINDOW_WIDTH, WINDOW_HEIGHT} from "./constants.js";
import {GameLogic} from "./gameLogic.js";
import {Table} from "./gameObjects_table.js";

// GLOBALS
export let game = null;
let gTable = null;
export let gGameLogic = null;

// INIT
function init() {
    game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, "",
        {
            preload,
            create,
            update
        }
    );
}

init();

// PHASER.IO
function preload() {
    game.load.atlasJSONHash("tiles", "assets/tiles.png", "assets/tiles.json");
}

function create() {

    // Create game objects
    gTable = new Table();
    gGameLogic = new GameLogic(gTable);

    // Background
    game.stage.backgroundColor = "rgb(0, 128, 0)";

    // Create sprites etc
    gGameLogic.create();
    gTable.create();

    // Init game logic
    gGameLogic.init();

}

function update() {
}

// Utility funtions

// Print to message window
export function printMessage(str) {
    const textArea = window.document.getElementById("messages");
    textArea.value += str;
    textArea.scrollTop = textArea.scrollHeight;
}

// Print to info window
export function printInfo(str) {
    const textArea = window.document.getElementById("info");
    textArea.value = str;
}
