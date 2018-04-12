
// PRIVATE CONSTANTS
const debug = 1;
const trace = 0;

// PRIVATE GLOBALS

export class GameAI {
    constructor(card) {
        this.card = card;
        this.players = [];
    }

    rankTiles14(hand, rankCardHands) {
        const validInfo = this.card.validateHand14(hand);
        const test = hand.getTileArray();

        return this.rankTiles(test, validInfo, rankCardHands);
    }

    rankTiles13(hand, singleTile, rankCardHands) {
        const validInfo = this.card.validateHand13(hand, singleTile);

        // Consolidate hand + singleTile to test array
        const test = hand.getTileArray();
        if (singleTile) {
            test.push(singleTile);
        }

        return this.rankTiles(test, validInfo, rankCardHands);
    }

    // Rank tiles
    // Input
    //  - hand (13 tiles)
    //  - single tile
    //  - rankCardHands - array (unsorted) of ranked hands
    // Output
    //  - sorted array of tiles  (14 elements). Most relevant => least relevant
    rankTiles(test, validInfo, rankCardHands) {
        const tileRankArray = [];

        // For each tile
        for (let i = 0; i < 14; i++) {

            // Make copy of test array
            const copyTest = [];
            for (const tile of test) {
                copyTest.push(tile);
            }

            // Remove single tile at index i
            const tile = copyTest[i];
            copyTest.splice(i, 1);

            // Get card rank array of copyTest array (minus one tile)
            const testRankArray = this.card.getRankArray(copyTest, validInfo);
            let rank = 0;

            // Compute rank for this tile
            // - compare delta in testRankArray and rankCardHands
            for (let j = 0; j < rankCardHands.length; j++) {
                rank += (testRankArray[j].rank - rankCardHands[j].rank) * rankCardHands[j].rank;
            }

            const tileRank = {
                tile,
                rank
            }

            tileRankArray.push(tileRank);
        }

        // Sort  (higher => lower)
        tileRankArray.sort((a, b) => b.rank - a.rank);

        return tileRankArray;
    }

    printTileRankArray(tileRankArray) {
        this.debugPrint("Tile Rank Info\n");
        for (const rankInfo of tileRankArray) {
            this.debugPrint("Tile = " + rankInfo.tile.getText() + "\n");
            this.debugPrint("Rank = " + rankInfo.rank + "\n");
        }
    }

    // Player AI 
    // Just picked a new tile from wall.  Hand has 14 tiles.
    // - Exchange for jokers (if possible and it would improve hand)
    // - Mahjong (if possible)
    // - Otherwise, select tile to discard
    chooseDiscard(hand) {
        const rankCardHands = this.card.getRankArray14(hand);
        const tileRankArray = this.rankTiles14(hand, rankCardHands);

        this.printTileRankArray(tileRankArray);

        return tileRankArray[0].tile;
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
