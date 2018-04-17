import {game, printMessage} from "./game.js";
import {
    PLAYER, PLAYER_OPTION, SUIT,
    WINDOW_WIDTH, WINDOW_HEIGHT,
    SPRITE_HEIGHT, SPRITE_SCALE
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
        y: 520,
        angle: 270,
        rectX: 1000 - (SPRITE_HEIGHT * SPRITE_SCALE / 2),
        rectY: 0,
        rectWidth: SPRITE_HEIGHT * SPRITE_SCALE,
        rectHeight: WINDOW_HEIGHT
    },
    // Player 2  (computer, top)
    {
        id: PLAYER.TOP,
        x: 750,
        y: 50,
        angle: 180,
        rectX: 0,
        rectY: 50 - (SPRITE_HEIGHT * SPRITE_SCALE / 2),
        rectWidth: WINDOW_WIDTH,
        rectHeight: SPRITE_HEIGHT * SPRITE_SCALE
    },
    // Player 3  (computer, left)
    {
        id: PLAYER.LEFT,
        x: 50,
        y: 50,
        angle: 90,
        rectX: 50 - (SPRITE_HEIGHT * SPRITE_SCALE / 2),
        rectY: 0,
        rectWidth: SPRITE_HEIGHT * SPRITE_SCALE,
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

    deal(initPlayerHandArray) {
        // Shuffle tiles
        this.wall.shuffle();

        // Deal player hands.
        // Use initPlayerHandArray to pre-populate  (useful for testing/training mode)
        // Note: pre-populate hand may be less than a full hand
        for (let player = 0; player < 4; player++) {
            const initPlayerHand = initPlayerHandArray[player];

            if (!initPlayerHand) {
                continue;
            }
            while (initPlayerHand.getLength()) {
                // Init Player  hand with given tiles
                // This is useful for testing / training mode
                const findTile = initPlayerHand.hiddenTileSet.tileArray.pop();
                const tile = this.wall.findAndRemove(findTile);
                this.players[player].hand.insertHidden(tile);
            }
        }

        // Deal remainder of tiles from wall
        for (let player = 0; player < 4; player++) {
            let handLength = 13;
            if (player === 0) {
                handLength = 14;
            }

            // Init hand may be < 13 (or 14).
            const numRemainingTiles = handLength - this.players[player].hand.getLength();
            for (let j = 0; j < numRemainingTiles; j++) {
                const tile = this.wall.remove();
                this.players[player].hand.insertHidden(tile);
            }
        }

        // Show all players hands
        for (let i = 0; i < 4; i++) {
            this.players[i].hand.sortSuitHidden();
            this.players[i].showHand();
        }
    }

    // Insert pass tile arrays into players hands.
    // Note - pass tiles have already been removed from the player's hand
    charlestonPass(player, charlestonPassArray) {
        const delta = player - PLAYER.BOTTOM;

        // Insert 3 cards from player 0-3 to the appropriate player
        for (let i = 0; i < 4; i++) {
            const from = i;
            let to = i + delta;
            if (to > 3) {
                to -= 4;
            }

            for (const tile of charlestonPassArray[from]) {
                this.players[to].hand.insertHidden(tile);
            }
        }

        // Show all players hands
        for (let i = 0; i < 4; i++) {
            if (i !== 0) {
                this.players[i].hand.sortSuitHidden();
            }
            this.players[i].showHand();
        }
    }

    courtesyVote(courtesyVoteArray) {

        // Calculate actual courtesy count using voting from each player
        this.player02CourtesyVote = Math.min(courtesyVoteArray[0], courtesyVoteArray[2]);
        this.player13CourtesyVote = Math.min(courtesyVoteArray[1], courtesyVoteArray[3]);
    }

    courtesyPass(courtesyPassArray) {
        // Delta = player opposite
        const delta = 2;

        // Insert courtesy cards from player 0-3 to the appropriate player
        for (let i = 0; i < 4; i++) {
            const from = i;
            let to = i + delta;
            if (to > 3) {
                to -= 4;
            }

            for (const tile of courtesyPassArray[from]) {
                this.players[to].hand.insertHidden(tile);
            }
        }

        // Show all players hands
        for (let i = 0; i < 4; i++) {
            if (i !== 0) {
                this.players[i].hand.sortSuitHidden();
            }
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
            // Note - one of these is the discarded tile and is not in the player's hand (i.e. removeHidden will fail on it)
            for (const tile of claimArray[winningPlayer].tileArray) {
                if (tile !== discardTile) {
                    this.players[winningPlayer].hand.removeHidden(tile);
                }
            }

            this.players[winningPlayer].hand.insertExposed(claimArray[winningPlayer].tileArray);
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

    // Swap given tile with an exposed joker
    // Input
    // - hand
    // - tile (contained in hand, known to match an exposed pong/kong/quint with joker)
    // Output
    // - replace tile with joker in hand
    // - exposed pong/kong/quint replace joker with tile
    exchangeJoker(currPlayer, hand, swapTile) {
        outerLoop:
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

                // If pong/kong/quint matches swapTile, exchange joker (if any)
                if (uniqueTile && (uniqueTile.suit === swapTile.suit) &&
                    (uniqueTile.number === swapTile.number)) {

                    for (const tile of tileset.tileArray) {
                        if (tile.suit === SUIT.JOKER) {
                            const text = swapTile.getText();
                            printMessage("Player " + currPlayer + " exchanged " + text + " for joker\n");

                            // Exchange swapTile
                            hand.removeHidden(swapTile);
                            tileset.insert(swapTile);

                            // Exchange joker
                            tileset.remove(tile);
                            hand.insertHidden(tile);

                            // Show all players hands
                            for (let k = 0; k < 4; k++) {
                                this.players[k].showHand();
                            }
                            break outerLoop;
                        }
                    }
                }
            }
        }

    }
}
