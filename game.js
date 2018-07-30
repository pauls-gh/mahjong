import {WINDOW_WIDTH, WINDOW_HEIGHT} from "./constants.js";
import {GameLogic} from "./gameLogic.js";
import {Table} from "./gameObjects_table.js";

// GLOBALS
export let game = null;
let gTable = null;
export let gGameLogic = null;

// INIT
function init() {
    game = new Phaser.Game(WINDOW_WIDTH, WINDOW_HEIGHT, Phaser.AUTO, "gamediv",
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
    game.load.image("back", "assets/back.png");

    // Scale game canvas
    game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
    game.scale.pageAlignHorizontally = true;
    game.scale.pageAlignVertically = true;
    game.scale.setResizeCallback(resizeCallback, null);
}

function resizeCallback() {
    let s = document.getElementById("uicenterdiv");
    let left = 400 * game.scale.scaleFactorInversed .x;
    let top = 450  * game.scale.scaleFactorInversed .y;
    uicenterdiv.style.left = left + "px";
    uicenterdiv.style.top = top + "px";
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

export const gdebug = 1;
export const gtrace = 0;

export function debugPrint(str) {
    if (gdebug) {
        console.log(str);
    }
}

export function debugTrace(str) {
    if (gtrace) {
        console.log(str);
    }
}

