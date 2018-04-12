
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

        // Rank only the hidden tiles
        const test = hand.getHiddenTileArray();

        return this.rankTiles(test, validInfo, rankCardHands);
    }

    rankTiles13(hand, singleTile, rankCardHands) {
        const validInfo = this.card.validateHand13(hand, singleTile);

        // Rank only the hidden tiles
        // Consolidate hand + singleTile to test array
        const test = hand.getHiddenTileArray();
        if (singleTile) {
            test.push(singleTile);
        }

        return this.rankTiles(test, validInfo, rankCardHands);
    }

    // Rank tiles
    // Input
    //  - test (hidden tile array of <= 13 tiles)
    //  - validInfo
    //  - rankCardHands - array (unsorted) of ranked hands
    // Output
    //  - sorted array of tiles  (14 elements). least relevant => most relevant
    rankTiles(test, validInfo, rankCardHands) {
        const tileRankArray = [];

        // For each tile
        for (let i = 0; i < test.length; i++) {

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
            // - don't discard tiles that would cause large negative deltas
            for (let j = 0; j < rankCardHands.length; j++) {
                rank += (testRankArray[j].rank - rankCardHands[j].rank);
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

    // Player AI 
    // Just picked a new tile from wall.  Hand has 14 tiles.
    // - Exchange for jokers (if possible and it would improve hand)
    // - Mahjong (if possible)
    // - Otherwise, select tile to discard
    chooseDiscard(hand) {
        const rankCardHands = this.card.getRankArray14(hand);
        const tileRankArray = this.rankTiles14(hand, rankCardHands);


        if (debug) {
            this.debugPrint("****************")
            this.card.sortRankArray(rankCardHands); 
            this.card.printRankArray(rankCardHands, 3);
            this.printTileRankArray(tileRankArray, 3);
        };

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
