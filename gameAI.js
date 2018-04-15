import {gGameLogic} from "./game.js";
import {STATE, PLAYER_OPTION, PLAYER, SUIT, VNUMBER, DRAGON, WIND} from "./constants.js";
import {Tile} from "./gameObjects.js";

// PRIVATE CONSTANTS
const debug = 1;
const trace = 0;

// PRIVATE GLOBALS

export class GameAI {
    constructor(card, table) {
        this.card = card;
        this.table = table;
    }


    rankTiles13(hand) {
        // Add a bogus tile to make hand 14 tiles
        const copyHand = hand.dupHand();
        const invalidTile = new Tile(SUIT.INVALID, VNUMBER.INVALID);
        copyHand.insertHidden(invalidTile);

        // Rank tiles
        const tileRankArray = this.rankTiles14(copyHand);

        // Remove invalid tile
        for (let i = 0; i < tileRankArray.length; i++) {
            const rankInfo = tileRankArray[i];
            if (rankInfo.tile === invalidTile) {
                tileRankArray.splice(i, 1);
                break;
            }
        }

        return tileRankArray;
    }


    // Rank (hidden) tiles
    // Input
    //  - hand (must be 14 tiles)
    //  - rankCardHands - array (unsorted) of ranked hands
    // Output
    //  - sorted array of {hidden tile, rank}  (<=13 elements). least relevant => most relevant
    rankTiles14(hand) {
        const rankCardHands = this.card.rankHandArray14(hand);
        const tileRankArray = [];

        // Rank only the hidden tiles
        const test = hand.getHiddenTileArray();

        // For each tile
        for (let i = 0; i < test.length; i++) {
            const tile = test[i];

            // Make copy of hand
            const copyHand = hand.dupHand();

            // Replace tile with a bogus non-matchable tile
            copyHand.hiddenTileSet.tileArray[i] = new Tile(SUIT.INVALID, VNUMBER.INVALID);

            // Get card rank array of copyHand
            const copyHandRankArray = this.card.rankHandArray14(copyHand);
            let rank = 0;

            // Compute rank for this tile
            // - compare delta in testRankArray and rankCardHands
            // - don't discard tiles that would cause large negative deltas
            for (let j = 0; j < rankCardHands.length; j++) {
                let scale = 1.0;
                if (rankCardHands[j].rank > 50) {
                    // Weight high ranking hands more heavily
                    scale = rankCardHands[j].rank;
                }
                rank += (copyHandRankArray[j].rank - rankCardHands[j].rank) * scale;
            }

            const tileRank = {
                tile,
                rank
            }

            tileRankArray.push(tileRank);
        }

        // Sort  (higher => lower). We want to discard tiles that have the least negative impact.
        tileRankArray.sort((a, b) => b.rank - a.rank);

        // PS TEST
        if (debug) {
            this.debugPrint("****************");
            this.card.sortHandRankArray(rankCardHands);
            this.card.printHandRankArray(rankCardHands, 3);
            this.printTileRankArray(tileRankArray, 3);
        }

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
    exchangeTilesForJokers(currPlayer, hand) {
        const exposedJokerArray = this.table.getExposedJokerArray();
        const rankCardHands = this.card.rankHandArray14(hand);
        let bestRank = -100000;
        let bestTile = null;

        const test = hand.getHiddenTileArray();

        // For each tile
        for (let i = 0; i < test.length; i++) {
            const tile = test[i];
            let jokerFound = false;

            // Does this tile have an exchangeable joker?
            for (const uniqueTile of exposedJokerArray) {
                if (tile.suit === uniqueTile.suit && tile.number === uniqueTile.number) {
                    jokerFound = true;
                    break;
                }
            }

            if (!jokerFound) {
                continue;
            }

            // Rank hand with a joker replacing the tile
            // - make copy of hand
            // - replace tile with joker
            const copyHand = hand.dupHand();
            copyHand.hiddenTileSet.tileArray[i] = new Tile(SUIT.JOKER, 0);

            // Get card rank array of copyHand
            const copyHandRankArray = this.card.rankHandArray14(copyHand);
            let rank = 0;

            // Compute rank for this tile
            // - compare delta in testRankArray and rankCardHands
            // - don't discard tiles that would cause large negative deltas
            for (let j = 0; j < rankCardHands.length; j++) {
                rank += (copyHandRankArray[j].rank - rankCardHands[j].rank);
            }

            this.debugPrint("exchangeTilesForJokers.  Joker found for exchange. rank = " + rank + "\n");

            if (rank > bestRank) {
                bestRank = rank;
                bestTile = tile;
            }
        }

        if (bestTile && (bestRank > 0)) {
            this.debugPrint("exchangeTilesForJokers. bestRank = " + bestRank + "\n");

            // Hand improved with joker.  Make the exchange in the real hand.
            this.table.exchangeJoker(currPlayer, hand, bestTile);

            return true;
        }

        return false;
    }

    // Player AI
    // Just picked a new tile from wall (or completed exposure).  Hand has 14 tiles.
    // - Check for Mahjong
    // - Exchange for jokers (if possible and it would improve hand)
    // - Mahjong (if possible)
    // - Otherwise, select tile to discard
    //
    // Return
    //    {playerOption, tileArray}
    chooseDiscard(currPlayer) {

        // Just picked new tile from wall. Hand will contain 14 tiles.
        const hand = this.table.players[currPlayer].hand;

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

        let modified = false;
        do {
            modified = this.exchangeTilesForJokers(currPlayer, hand);

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
        const tileRankArray = this.rankTiles14(hand);
        const discardTile = tileRankArray[0].tile;

        // Remove tile from player's hidden tiles
        this.table.players[currPlayer].hand.removeHidden(discardTile);
        this.table.players[currPlayer].hand.sortSuitHidden();

        return {
            playerOption: PLAYER_OPTION.DISCARD_TILE,
            tileArray: [discardTile]
        };
    }

    // Test if this component is suitable for exposure
    //
    // Input: - compInfo.tileArray with discardTile as one of the tiles
    //        - compInfo.tileArray will not include jokers
    // Output: true - exposure ok (pong/kong/quint)
    validateComponentForExposure(player, compInfo, discardTile) {
        // Original hand (without discardTile added)
        const hand = this.table.players[player].hand;

        // Reject single/pairs components
        if (compInfo.component.count < 3) {
            return false;
        }

        // Correct length and jokerless?  (compInfo.tileArray will not include jokers)
        if (compInfo.tileArray.length === compInfo.component.count) {
            // Test to make sure we don't already have a pong/kong/quint of this size in our hand (hidden tiles only)
            let count = 0;
            const tileArray = hand.getHiddenTileArray();
            for (const tile of tileArray) {
                if (discardTile.suit === tile.suit && discardTile.number === tile.number) {
                    count++;
                }
            }
            if (count >= compInfo.component.count) {
                return false;
            }

            return true;
        }

        // At this point, we'll need jokers to complete the pong/kong/quint
        const jokerArray = hand.getHiddenJokers();

        if (!jokerArray.length) {
            return false;
        }

        const requiredJokers = compInfo.component.count - compInfo.tileArray.length;

        if (requiredJokers > jokerArray.length) {
            return false;
        }

        // Add jokers to component tile array
        for (let i = 0; i < requiredJokers; i++) {
            compInfo.tileArray.push(jokerArray[i]);
        }

        return true;
    }

    // Player AI
    // Someone discarded a tile, decide whether to claim it.  Hand has 13 tiles.
    // - Dup hand.  Form 14 card hand with discardTile
    // - Check for Mahjong
    // - Check for pong/kong/quint exposure with discardTile.
    // - Otherwise, return discard
    //
    // Return
    //    {playerOption, tileArray}
    claimDiscard(player, discardTile) {
        // Duplicate hand
        const copyHand = this.table.players[player].hand.dupHand();

        // Form 14 tile hand with discardTile
        copyHand.insertHidden(discardTile);

        // Check for mahjong
        const validInfo = this.card.validateHand14(copyHand);

        if (validInfo.valid) {
            // Mahjong!
            return {
                playerOption: PLAYER_OPTION.MAHJONG,
                tileArray: null
            };
        }

        // Check for pong/kong/quint
        const rankCardHands = this.card.rankHandArray14(copyHand);
        this.card.sortHandRankArray(rankCardHands);
        const rankInfo = rankCardHands[0];

        // Allow exposure if we have already exposed, or hand rank is greater than a certain level
        if (!copyHand.isAllHidden() || (!rankInfo.hand.concealed && rankInfo.rank > 55)) {

            // Find component with the discarded tile
            let compInfo = null;
            outerloop:
            for (const tempcompInfo of rankInfo.componentInfoArray) {
                for (const tile of tempcompInfo.tileArray) {
                    if (tile === discardTile) {
                        compInfo = tempcompInfo;
                        break outerloop;
                    }
                }
            }

            if (compInfo && this.validateComponentForExposure(player, compInfo, discardTile)) {
                // If it's part of a completed component => let's claim it for exposure
                return {
                    playerOption: PLAYER_OPTION.EXPOSE_TILES,
                    tileArray: compInfo.tileArray
                }
            }

        }

        // Do not claim discard
        return {
            playerOption: PLAYER_OPTION.DISCARD_TILE,
            tileArray: [discardTile]
        };
    }

    // Return 3 tiles to remove in Charleston
    charlestonPass(player) {
        const pass = [];

        // Player 1-3 will only have 13 tiles in their hands during the Charleston
        // Add a bogus tile to make 14.
        const tileRankArray = this.rankTiles13(this.table.players[player].hand)

        // Pass tiles
        for (let i = 0; i < 3; i++) {
            const rankInfo = tileRankArray[i];
            const tile = rankInfo.tile;

            pass.push(tile);

            // Remove tile from player's hand
            this.table.players[player].hand.removeHidden(tile);
        }

        return pass;
    }

    courtesyVote(player) {
        // Player 1-3 will only have 13 tiles in their hands during the courtesy
        // Add a bogus tile to make 14.
        const copyHand = this.table.players[player].hand.dupHand();
        const invalidTile = new Tile(SUIT.INVALID, VNUMBER.INVALID);
        copyHand.insertHidden(invalidTile);

        const rankCardHands = this.card.rankHandArray14(copyHand);
        this.card.sortHandRankArray(rankCardHands);
        const rankInfo = rankCardHands[0];
        const rank = rankInfo.rank;

        this.debugPrint("courtesyVote: Player " + player + ", rank = " + rank);
        this.card.printHandRankArray(rankCardHands, 1);

        if (rank < 50) {
            return 3;
        }
        if (rank < 60) {
            return 2;
        }
        if (rank < 70) {
            return 1;
        }

        return 0;
    }

    courtesyPass(player, maxCount) {
        // Player 1-3 will only have 13 tiles in their hands during the courtesy
        const tileRankArray = this.rankTiles13(this.table.players[player].hand);

        const pass = [];
        for (let i = 0; i < maxCount; i++) {
            const rankInfo = tileRankArray[i];
            const tile = rankInfo.tile;
            this.table.players[player].hand.removeHidden(tile);
            pass.push(tile);
        }

        return pass;
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
