import {gGameLogic} from "./game.js";
import {STATE, PLAYER_OPTION, PLAYER, SUIT, DRAGON, WIND} from "./constants.js";
import {Tile} from "./gameObjects.js";

// PRIVATE CONSTANTS
const debug = 1;
const trace = 0;

// PRIVATE GLOBALS

export class GameAI {
    constructor(card) {
        this.card = card;
        this.players = [];
    }

    // Rank (hidden) tiles
    // Input
    //  - hand (must be 14 tiles)
    //  - rankCardHands - array (unsorted) of ranked hands
    // Output
    //  - sorted array of {hidden tile, rank}  (<=13 elements). least relevant => most relevant
    rankTiles14(hand, rankCardHands) {
        const tileRankArray = [];

        // Rank only the hidden tiles
        const test = hand.getHiddenTileArray();

        // For each tile
        for (let i = 0; i < test.length; i++) {
            const tile = test[i];

            // Make copy of hand
            const copyHand = hand.dupHand();

            // Replace tile with a bogus non-matchable tile
            copyHand.hiddenTileSet.tileArray.splice(i, 1);
            copyHand.hiddenTileSet.tileArray.push(new Tile(-1, -1));

            // Get card rank array of copyHand
            const copyHandRankArray = this.card.rankHandArray14(copyHand);
            let rank = 0;

            // Compute rank for this tile
            // - compare delta in testRankArray and rankCardHands
            // - don't discard tiles that would cause large negative deltas
            for (let j = 0; j < rankCardHands.length; j++) {
                rank += (copyHandRankArray[j].rank - rankCardHands[j].rank);
            }

            const tileRank = {
                tile,
                rank
            }

            tileRankArray.push(tileRank);
        }

        // Sort  (higher => lower). We want to discard tiles that have the least negative impact.
        tileRankArray.sort((a, b) => b.rank - a.rank);

        return tileRankArray;
    }

    printTileRankArray(tileRankArray, elemCount) {
        this.debugPrint("Tile Rank Info\n");

        let count = tileRankArray.length;
        if (elemCount) {
            count = Math.min(elemCount, count);
        }
        for (let i = 0; i < count; i++) {
            const rankInfo = tileRankArray[i];
            this.debugPrint("Tile = " + rankInfo.tile.getText() + "\n");
            this.debugPrint("Rank = " + rankInfo.rank + "\n");
        }
    }

    // Return true if hand is modified by swapping jokers
    exchangeTilesForJokers(hand) {
        const exposedJokerArray = gGameLogic.table.getExposedJokerArray();
        const rankCardHands = this.card.rankHandArray14(hand);
        const modified = false;
        const bestRank = 0;
        const bestTile = null;

        const test = hand.getHiddenTileArray();
        for (const tile of test) {

            let jokerFound = false;

            // Does this tile have an exchangeable joker?
            for (const uniqueTile of exposedJokerArray) {
                if (tile.suit === uniqueTile.suit && tile.number === uniqueTile.number) {
                    jokerFound = true;
                    break;
                }
            }

            if (!jokerFound) {
                break;
            }
            // Rank hand with a joker replacing the tile
            const jokerHandTileArray = hand.getTileArray();

            for (const temp of test) {
                if (temp !== tile) {
                    copyTest.push(temp);
                }
            }

            copyTest.push(new Tile(SUIT.JOKER, 0));

            const validInfo = this.validateHand(test, hand.isAllHidden());
            const testRankArray = this.card.rankHandArray14(copyHand);


        }

        return modified;
    }

    // Player AI
    // Just picked a new tile from wall.  Hand has 14 tiles.
    // - Check for Mahjong
    // - Exchange for jokers (if possible and it would improve hand)
    // - Mahjong (if possible)
    // - Otherwise, select tile to discard
    //
    // Return
    //    {playerOption, tileArray}
    chooseDiscard(currPlayer) {

        // Just picked new tile from wall. Hand will contain 14 tiles.
        const hand = gGameLogic.table.players[currPlayer].hand;

        // Check for mahjong
        let validInfo = this.card.validateHand14(hand);

        if (validInfo.valid) {
            // Mahjong!
            return {
                playerOption: PLAYER_OPTION.MAHJONG,
                tileArray: null
            };
        }

        // Exchange jokers (if possible and it improves hand)

        const modified = false;
        do {
            // PS TEST modified = this.exchangeTilesForJokers(hand);

            if (modified) {
                // Check for mahjong again
                validInfo = this.card.validateHand14(hand);

                if (validInfo.valid) {
                    // Mahjong!
                    return {
                        playerOption: PLAYER_OPTION.MAHJONG,
                        tileArray: null
                    };
                }
            }
        } while (modified);

        // Choose tile to discard
        const rankCardHands = this.card.rankHandArray14(hand);
        const tileRankArray = this.rankTiles14(hand, rankCardHands);
        const discardTile = tileRankArray[0].tile;

        // Remove tile from player's hidden tiles
        gGameLogic.table.players[currPlayer].hand.removeHidden(discardTile);
        gGameLogic.table.players[currPlayer].hand.sortSuitHidden();

        if (debug) {
            this.debugPrint("****************")
            this.card.sortRankArray(rankCardHands);
            this.card.printRankArray(rankCardHands, 3);
            this.printTileRankArray(tileRankArray, 3);
        }

        return {
            playerOption: PLAYER_OPTION.DISCARD_TILE,
            tileArray: [discardTile]
        };
    }

    debugPrint(str) {
        if (debug) {
            console.log(str);
        }
    }

    debugTrace(str) {
        if (trace) {
            console.log(str);
        }
    }

}
