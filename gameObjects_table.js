import {game, printMessage} from "./game.js";
import {
    PLAYER, PLAYER_OPTION,
    WINDOW_WIDTH, WINDOW_HEIGHT,
    SPRITE_HEIGHT, SPRITE_SCALE_Y
} from "./constants.js";
import {Wall, Discards} from "./gameObjects.js"
import {Player} from "./gameObjects_player.js"

// PRIVATE CONSTANTS


// PRIVATE GLOBALS

const gPlayerInfo = [
    // Player 0  (human, bottom of screen)
    {
        id: PLAYER.BOTTOM,
        x: 200,
        y: 600,
        angle: 0,
        rectX: 0,
        rectY: 600 - (SPRITE_HEIGHT / 2),
        rectWidth: WINDOW_WIDTH,
        rectHeight: SPRITE_HEIGHT
    },
    // Player 1  (computer, right)
    {
        id: PLAYER.RIGHT,
        x: 1000,
        y: 50,
        angle: 270,
        rectX: 1000 - (SPRITE_HEIGHT * SPRITE_SCALE_Y / 2),
        rectY: 0,
        rectWidth: SPRITE_HEIGHT * SPRITE_SCALE_Y,
        rectHeight: WINDOW_HEIGHT
    },
    // Player 2  (computer, top)
    {
        id: PLAYER.TOP,
        x: 300,
        y: 50,
        angle: 180,
        rectX: 0,
        rectY: 50 - (SPRITE_HEIGHT * SPRITE_SCALE_Y / 2),
        rectWidth: WINDOW_WIDTH,
        rectHeight: SPRITE_HEIGHT * SPRITE_SCALE_Y
    },
    // Player 3  (computer, left)
    {
        id: PLAYER.LEFT,
        x: 50,
        y: 50,
        angle: 90,
        rectX: 50 - (SPRITE_HEIGHT * SPRITE_SCALE_Y / 2),
        rectY: 0,
        rectWidth: SPRITE_HEIGHT * SPRITE_SCALE_Y,
        rectHeight: WINDOW_HEIGHT
    }
];


export class Table {
    constructor() {
        this.wall = new Wall();
        this.discards = new Discards();

        this.boxes = [];
        for (let i = 0; i < 4; i++) {
            this.boxes[i] = null;
        }

        // Create players
        this.players = [];
        for (let i = 0; i < 4; i++) {
            this.players[i] = new Player(gPlayerInfo[i]);
        }

        this.player02CourtesyVote = 0;
        this.player13CourtesyVote = 0;
    }

    create() {

        for (let i = 0; i < 4; i++) {
            const graphics = game.add.graphics(0, 0);
            graphics.beginFill(0x8FBF00);
            graphics.drawRect(gPlayerInfo[i].rectX, gPlayerInfo[i].rectY, gPlayerInfo[i].rectWidth, gPlayerInfo[i].rectHeight);
            graphics.endFill();
            graphics.visible = false;
            this.boxes[i] = graphics;
        }

        this.wall.create();
    }

    reset() {
        // Reset table - remove tiles from players hands/ discard pile and put back into wall
        for (let i = 0; i < 4; i++) {
            while (this.players[i].hand.hiddenTileArray.length) {
                this.wall.insert(this.players[i].hand.remove(this.players[i].hand.hiddenTileArray[0]));
            }
            while (this.players[i].hand.exposedTileArray.length) {
                this.wall.insert(this.players[i].hand.removeExposed(this.players[i].hand.exposedTileArray[0]));
            }
        }

        while (this.discards.tileArray.length) {
            this.wall.insert(this.discards.tileArray.pop());
        }

        // Verify there are 152 tiles in wall
        if (this.wall.tileArray.length !== 152) {
            printMessage("ERROR - table.reset() - total tile count is not 152. Tile count = " + this.wall.tileArray.length + "\n");
        }
    }

    switchPlayer(player) {
        for (let i = 0; i < 4; i++) {
            this.boxes[i].visible = false;
        }

        this.boxes[player].visible = true;
    }

    deal() {
        // Shuffle tiles
        this.wall.shuffle();

        // Deal tiles to players
        for (let i = 0; i < 4; i++) {
            for (let j = 0; j < 13; j++) {
                const tile = this.wall.remove();
                this.players[i].hand.insert(tile);
            }
        }

        // Dealer starts with extra tile
        const tile = this.wall.remove();
        this.players[0].hand.insert(tile);

        // Show all players hands
        for (let i = 0; i < 4; i++) {
            this.players[i].showHand();
        }
    }

    charlestonPass(player) {
        const charlestonPassArray = [];

        // Remove 3 cards for player 0, 1, 2, 3
        for (let i = 0; i < 4; i++) {
            charlestonPassArray[i] = this.players[i].hand.removeCharlestonPass();
        }

        const delta = player - PLAYER.BOTTOM;

        // Insert 3 cards from player 0-3 to the appropriate player
        for (let i = 0; i < 4; i++) {
            const from = i;
            let to = i + delta;
            if (to > 3) {
                to -= 4;
            }
            this.players[to].hand.insertCharlestonPass(charlestonPassArray[from]);
        }

        // Show all players hands
        for (let i = 0; i < 4; i++) {
            this.players[i].showHand();
        }
    }

    courtesyVote(player0CourtesyVote) {

        const player1CourtesyVote = this.players[1].hand.courtesyVote();
        const player2CourtesyVote = this.players[2].hand.courtesyVote();
        const player3CourtesyVote = this.players[3].hand.courtesyVote();

        // Calculate actual courtesy count using voting from each player
        this.player02CourtesyVote = Math.min(player0CourtesyVote, player2CourtesyVote);
        this.player13CourtesyVote = Math.min(player1CourtesyVote, player3CourtesyVote);
    }

    courtesyPass() {
        const courtesyPassArray = [];

        // Remove tiles (0-3) selected by human player
        courtesyPassArray[PLAYER.BOTTOM] = this.players[PLAYER.BOTTOM].hand.removeCourtesyPass(this.player02CourtesyVote);
        courtesyPassArray[PLAYER.TOP] = this.players[PLAYER.TOP].hand.removeCourtesyPass(this.player02CourtesyVote);

        // Remove courtesy left/right players
        courtesyPassArray[PLAYER.LEFT] = this.players[PLAYER.LEFT].hand.removeCourtesyPass(this.player13CourtesyVote);
        courtesyPassArray[PLAYER.RIGHT] = this.players[PLAYER.RIGHT].hand.removeCourtesyPass(this.player13CourtesyVote);

        // Delta = player opposite
        const delta = 2;

        // Insert courtesy cards from player 0-3 to the appropriate player
        for (let i = 0; i < 4; i++) {
            const from = i;
            let to = i + delta;
            if (to > 3) {
                to -= 4;
            }
            this.players[to].hand.insertCourtesyPass(courtesyPassArray[from]);
        }

        // Show all players hands
        for (let i = 0; i < 4; i++) {
            this.players[i].showHand();
        }
    }

    // Return
    //      - playerOption  (discard, exposure, mahjong )
    //      - winningPlayer (valid only for exposure, mahjong)
    processClaimArray(currPlayer, claimArray, discardTile) {
        let numDiscard = 0;
        let numExposure = 0;
        let numMahjong = 0;

        // Count types of claims
        for (let i = 0; i < 4; i++) {
            switch (claimArray[i].playerOption) {
            case PLAYER_OPTION.EXPOSE_TILES:
                numExposure++;
                break;
            case PLAYER_OPTION.DISCARD_TILE:
                numDiscard++;
                break;
            case PLAYER_OPTION.MAHJONG:
                numMahjong++;
                break;
            default:
                printMessage("ERROR - processClaimArray. Unknown claim type\n");
                break;
            }
        }

        if (numDiscard === 4) {
            // If no-one wants the discard, add to discard pile
            this.discards.insertDiscard(discardTile);
            this.discards.showDiscards();

            return {
                playerOption: PLAYER_OPTION.DISCARD_TILE,
                winningPlayer: 0
            };
        }


        // Mahjong takes priority over exposure (pong/kong/quints)
        let searchOption = PLAYER_OPTION.EXPOSE_TILES;

        if (numMahjong) {
            searchOption = PLAYER_OPTION.MAHJONG;
        }

        let winningPlayer = currPlayer;

        // Determine winner
        // Tie breaking - first player counterclockwise from player who discarded tile

        for (let i = 0; i < 3; i++) {
            winningPlayer++;
            if (winningPlayer > 3) {
                winningPlayer = 0;
            }

            if (claimArray[winningPlayer].playerOption === searchOption) {
                break;
            }
        }

        if (searchOption === PLAYER_OPTION.MAHJONG) {
            // Move discard to winner's hand
            this.players[winningPlayer].hand.insert(discardTile);
        } else {
            // Expose winner's (discard+exposure) tiles

            // Adjust hand - remove tile from hidden and insert to exposed
            for (const tile of claimArray[winningPlayer].tileArray) {
                this.players[winningPlayer].hand.remove(tile);
            }
            this.players[winningPlayer].hand.insertExposed(claimArray[winningPlayer].tileArray);

            // Add discarded tile to winner's exposed hand
            this.players[winningPlayer].hand.insertExposed([discardTile]);
        }

        this.players[winningPlayer].showHand();
        
        return {
            playerOption: searchOption,
            winningPlayer
        };
    }
}
