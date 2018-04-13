import {game, printMessage} from "./game.js";
import {
    PLAYER, PLAYER_OPTION, SUIT,
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
            this.players[i].hand.reset(this.wall);
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

    deal(initPlayer0Hand) {
        // Shuffle tiles
        this.wall.shuffle();

        // Player 0 (user, dealer, 14 tiles)
        for (let j = 0; j < 14; j++) {
            let tile = null;
            if (initPlayer0Hand.getLength()) {
                // Init Player 0 hand with given tiles
                // This is useful for testing / training mode
                const findTile = initPlayer0Hand.hiddenTileSet.tileArray.pop();
                tile = this.wall.findAndRemove(findTile);
            } else {
                tile = this.wall.remove();
            }
            this.players[0].hand.insertHidden(tile);
        }

        // Deal tiles to players 1 - 3
        for (let i = 1; i < 4; i++) {
            for (let j = 0; j < 13; j++) {
                const tile = this.wall.remove();
                this.players[i].hand.insertHidden(tile);
            }
        }

        // Show all players hands
        for (let i = 0; i < 4; i++) {
            this.players[i].hand.sortSuitHidden();
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
            this.players[winningPlayer].hand.insertHidden(discardTile);
        } else {
            // Expose winner's (discard+exposure) tiles

            // Adjust hand - remove tile from hidden and insert to exposed
            for (const tile of claimArray[winningPlayer].tileArray) {
                this.players[winningPlayer].hand.removeHidden(tile);
            }

            // Make new copy of claimArray
            let exposeTileArray = [];
            exposeTileArray = exposeTileArray.concat(claimArray[winningPlayer].tileArray);
            exposeTileArray.push(discardTile);
            this.players[winningPlayer].hand.insertExposed(exposeTileArray);
        }

        this.players[winningPlayer].showHand();

        return {
            playerOption: searchOption,
            winningPlayer
        };
    }

    // Handle Exchange Joker button
    // This will only be called if
    // 1. User (player 0) has one tile selected
    // 2. Player 0-3 has one joker selected in an exposure and tile is a match for that exposure.
    exchangeUserSelectedTileForExposedJoker() {

        // Get user's selected tile (also reset's selection of any tiles in hiddenTileArray)
        const selectedTile = this.players[PLAYER.BOTTOM].hand.removeDiscard();
        const text = selectedTile.getText();
        printMessage("Player 0 exchanged " + text + " for joker\n");
        
        // Find player and exposed tileSet which has the selected joker
        for (let i = 0; i < 4; i++) {
            for (const tileset of this.players[i].hand.exposedTileSetArray) {
                if (tileset.getSelectionCount() === 1) {
                    // Get selected joker
                    const selectionArray = tileset.getSelection();
                    const joker = selectionArray[0];
                    tileset.resetSelection();

                    // Remove joker from exposure and place into hidden hand
                    tileset.remove(joker);
                    this.players[PLAYER.BOTTOM].hand.insertHidden(joker);

                    // Put player 0's tile into exposure (replacing the joker).  Don't need to add input handler, so add directly to tileset.
                    tileset.insert(selectedTile);
                    break;
                }
            }
        }

        // Show all players hands
        for (let i = 0; i < 4; i++) {
            this.players[i].showHand();
        }
    }


    // Search all player's exposed tilesets containing joker(s) 
    // Return array of unique tiles that can be swapped for jokers
    getExposedJokerArray() {
        const tileArray = [];

        for (let i = 0; i < 4; i++) {
            for (const tileset of this.players[i].hand.exposedTileSetArray) {

                // Find unique tile in pong/kong/quint (i.e. non-joker)
                let uniqueTile = null;
                for (const tile of tileset.tileArray) {
                    if (tile.suit !== SUIT.JOKER) {
                        uniqueTile = tile;
                        break;
                    }
                }

                // For each joker in pong/kong/quint, return the unique tile
                if (uniqueTile) {
                    for (const tile of tileset.tileArray) {
                        if (tile.suit === SUIT.JOKER) {
                            tileArray.push(uniqueTile);
                        } 
                    }
                }
            }
        }

        return tileArray;
    }
}
