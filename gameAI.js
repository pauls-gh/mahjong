import {game, printMessage, printInfo} from "./game.js";
import {STATE, PLAYER_OPTION, PLAYER, SUIT, DRAGON, WIND} from "./constants.js";
import {gGameLogic} from "./game.js";
import {Card} from "./card/card.js";
import {Tile} from "./gameObjects.js";
import {Hand} from "./gameObjects_hand.js";

// PRIVATE CONSTANTS


// PRIVATE GLOBALS
// TBD

class PlayerAI {
    constructor() {
    }    
}

export class GameAI {
    constructor() {
        this.players = [];

        // Ignore player 0 (user)
        for (let i = 0; i < 4; i++) {
            this.players[i] = new PlayerAI();
        }
    }
}
