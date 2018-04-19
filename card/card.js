import {debugPrint, debugTrace, gdebug} from "../game.js";
import {Tile} from "../gameObjects.js";
import {Hand} from "../gameObjects_hand.js";
import {SUIT, DRAGON, WIND, VNUMBER} from "../constants.js";
import {CardTest2017} from "./2017/card_test.js";
import {CardTest2018} from "./2018/card_test.js";
import {validHandGroups2017} from "./2017/card2017.js"
import {validHandGroups2018} from "./2018/card2018.js"

// PRIVATE CONSTANTS

// PRIVATE GLOBALS


// Currently support 2017 and 2018 card

export class Card {
    constructor() {
        this.year = "2018";
        this.validHandGroups = validHandGroups2018;

        // Debug only
        if (0) {
            const cardTest = new CardTest2018(this);
            cardTest.test();
        }

        // Debug only
        if (0) {
            for (const group of this.validHandGroups) {
                for (const validHand of group.hands) {
                    const hand = this.generateHand(validHand.description);
                    if (!this.validateHand14(hand)) {
                        console.log("ERROR - generateHand produced invalid hand\n");
                    }
                }
            }  
        }
    }

    generateHand(handDescription, numTiles) {
        const vsuitArray = [SUIT.CHAR, SUIT.BAM, SUIT.DOT];
        const hand = new Hand(false);
        let foundHand = null;
        let insertCount = 0;

        if (!numTiles) {
            numTiles = 14;
        }

        // Find matching hand description
        outerLoop:
        for (const group of this.validHandGroups) {
            for (const validHand of group.hands) {
                if (validHand.description.valueOf() === handDescription.valueOf()) {
                    foundHand = validHand;
                    break outerLoop;
                }
            }
        }

        if (!foundHand) {
            return hand;
        }

        outerLoop2:
        for (const comp of foundHand.components) {
            let suit = comp.suit;
            let number = comp.number;

            let minNum = 1;
            if (hand.even) {
                minNum = 2;
            }
            // Translate virtual suit to real suit using vsuitArray
            if (suit >= SUIT.VSUIT1_DRAGON) {
                number = vsuitArray[suit - SUIT.VSUIT1_DRAGON];
                suit = SUIT.DRAGON;
            } else if (suit >= SUIT.VSUIT1) {
                // VSUIT
                suit = vsuitArray[suit - SUIT.VSUIT1];

                //  VNUMBER
                if (number > 9) {
                    number = minNum + number - VNUMBER.CONSECUTIVE1;
                }
            }

            for (let i = 0; i < comp.count; i++) {
                hand.insertHidden(new Tile(suit, number));
                insertCount++;
                if (insertCount === numTiles) {
                    break outerLoop2;
                }
            }
        }

        return hand;
    }

    validateHand14(hand) {
        // Consolidate hand (14 tiles) to test array
        const test = hand.getTileArray();

        return this.validateHand(test, hand.isAllHidden());
    }

    validateHand13(hand, singleTile) {
        // Consolidate hand + singleTile to test array
        const test = hand.getTileArray();

        if (singleTile) {
            test.push(singleTile);
        }

        return this.validateHand(test, hand.isAllHidden());
    }

    // Input - tile array of length 14, allHidden
    // Output - validation info object
    validateHand(test, allHidden) {
        // Validation info
        const info = {
            valid: false,
            tileCount: 0,
            minNum: 9999,
            suits: [],
            allHidden
        };

        // Determine all suits  (dragons will be translated to char, bam, dot)
        for (const tile of test) {
            let suit = tile.suit;
            if (suit === SUIT.DRAGON) {
                suit = tile.number;
            }
            if (info.suits.indexOf(suit) === -1) {
                info.suits.push(suit);
            }
        }

        // Determine tile with smallest number
        let minNum = 9999;
        for (const tile of test) {
            if (tile.suit === SUIT.CHAR || tile.suit === SUIT.BAM || tile.suit === SUIT.DOT) {
                if (tile.number < minNum) {
                    minNum = tile.number;
                }
            }
        }
        info.minNum = minNum;

        // Validate number of tiles
        info.tileCount = test.length;

        if (info.tileCount !== 14) {
            return info;
        }

        // Compare against all possible hands
        let found = false;

        outerLoop:
        for (const group of this.validHandGroups) {

            // Validate hand
            for (const validHand of group.hands) {

                debugTrace("Match hand: " + validHand.description + "\n");

                if (this.matchHand(test, info, group, validHand)) {
                    debugTrace("Match hand: found match\n");
                    found = true;
                    break outerLoop;
                } else {
                    debugTrace("Match hand: no match\n");
                }
            }

        }

        if (found) {
            info.valid = true;
        }

        return info;
    }

    matchHand(test, info, handGroup, validHand) {
        let match = false;

        if (validHand.concealed && !info.allHidden) {
            return false;
        }

        // Number of suits (char,dot,bam,flower,dragon, wind, joker) must be >= number of vsuits
        if (info.suits.length < validHand.vsuitCount) {
            return false;
        }

        // Make sure odd/even hand has minNum set appropriately
        if (info.minNum !== 9999) {
            if (validHand.even && (info.minNum & 0x1)) {
                return false;
            }

            if (validHand.odd && !(info.minNum & 0x1)) {
                return false;
            }
        }

        // Generate permutations of VSUIT1, VSUIT2, VSUIT3
        const permVsuit0 = [[-1, -1, -1]];

        const permVsuit1 = [
            [SUIT.CHAR, -1, -1],
            [SUIT.BAM, -1, -1],
            [SUIT.DOT, -1, -1]
        ];

        const permVsuit2 = [
            [SUIT.CHAR, SUIT.BAM, -1],
            [SUIT.CHAR, SUIT.DOT, -1],
            [SUIT.BAM, SUIT.CHAR, -1],
            [SUIT.BAM, SUIT.DOT, -1],
            [SUIT.DOT, SUIT.CHAR, -1],
            [SUIT.DOT, SUIT.BAM, -1]
        ];

        const permVsuit3 = [
            [SUIT.CHAR, SUIT.BAM, SUIT.DOT],
            [SUIT.CHAR, SUIT.DOT, SUIT.BAM],
            [SUIT.BAM, SUIT.CHAR, SUIT.DOT],
            [SUIT.BAM, SUIT.DOT, SUIT.CHAR],
            [SUIT.DOT, SUIT.CHAR, SUIT.BAM],
            [SUIT.DOT, SUIT.BAM, SUIT.CHAR]
        ];

        let permArray = null;
        switch (validHand.vsuitCount) {
        case 1:
            permArray = permVsuit1;
            break;
        case 2:
            permArray = permVsuit2;
            break;
        case 3:
            permArray = permVsuit3;
            break;
        default:
            // No virtual suits used
            permArray = permVsuit0;
            break;
        }

        // Iterate over permutations of virtual suits
        for (const vsuitArray of permArray) {

            debugTrace("VsuitArray = " + vsuitArray + "\n");

            // Validate components of hand
            match = this.matchComponents(test, info, validHand, vsuitArray);

            if (match) {
                break;
            }
        }

        return match;
    }

    matchComponents(test, info, validHand, vsuitArray) {
        let match = true;

        // Make copy of test array
        const testCopy = [];
        for (const tile of test) {
            testCopy.push(tile);
        }

        let compIndex = 0;

        for (const comp of validHand.components) {
            let count = 0;
            let compSuit = comp.suit;
            let compNum = comp.number;

            debugTrace("Component index: " + compIndex + "\n");

            // Translate virtual suit to real suit using vsuitArray
            if (compSuit >= SUIT.VSUIT1_DRAGON) {
                compNum = vsuitArray[compSuit - SUIT.VSUIT1_DRAGON];
                compSuit = SUIT.DRAGON;
            } else if (compSuit >= SUIT.VSUIT1) {
                // VSUIT
                compSuit = vsuitArray[compSuit - SUIT.VSUIT1];

                //  VNUMBER
                if (compNum > 9) {
                    compNum = info.minNum + compNum - VNUMBER.CONSECUTIVE1;
                }
            }
            // Search testCopy for tiles that match components
            let found = false;
            do {
                found = false;
                for (const tile of testCopy) {
                    if (tile.suit === compSuit && tile.number === compNum) {
                        // Found tile match
                        found = true;
                        // Remove tile from testCopy array
                        const index = testCopy.indexOf(tile);
                        testCopy.splice(index, 1);

                        count++;
                        break;
                    }
                }

                if (!found && (comp.count > 2)) {
                    // Tile not found, use joker if possible
                    // - component count > 2 (i.e. no single or pair)

                    for (const tile of testCopy) {
                        if (tile.suit === SUIT.JOKER) {
                            // Found tile match
                            found = true;
                            // Remove tile from testCopy array
                            const index = testCopy.indexOf(tile);
                            testCopy.splice(index, 1);

                            count++;
                            break;
                        }
                    }
                }

            } while (found && (count < comp.count));

            if (count === comp.count) {
                debugTrace("Component Match: yes\n");
            } else {
                debugTrace("Component Match: no\n");
                match = false;
                break;
            }

            compIndex++;
        }

        return match;
    }

    printValidationInfo(info) {
        if (!gdebug) {
            return;
        }
        debugPrint("valid = " + info.valid + "\n");
        debugPrint("tileCount = " + info.tileCount + "\n");
        debugPrint("minNum = " + info.minNum + "\n");
        let suitStr = "";
        for (const suit of info.suits) {
            suitStr += suit + ", ";
        }
        debugPrint("suit(s) = " + suitStr + "\n");
    }

    // Given hand (must be 14 tiles), rank against all card hands
    // Output:  rankCardHands array of rankInfo, NOT sorted by rank.  Inorder by group/hands.
    rankHandArray14(hand) {
        const rankCardHands = [];

        for (const group of this.validHandGroups) {
            for (const validHand of group.hands) {
                // Add new Rank info for this validHand
                const rankInfo = {
                    group,
                    hand: validHand,
                    rank: 0,
                    componentInfoArray: []
                };
                rankCardHands.push(rankInfo);

                this.rankHand(hand, rankInfo, validHand);
            }
        }

        return rankCardHands;
    }


    // Compute rank for test (tile array) against validHand (Card Hand)
    // Input
    //  - test        - tile array of test hand
    //  - rankInfo    - rankInfo for test hand
    //  - validHand   - card hand
    rankHand(hand, rankInfo, validHand) {

        // Rank is 0 if test hand has exposures and validHand is required to be concealed
        if (validHand.concealed && !hand.isAllHidden()) {
            rankInfo.rank = 0;

            return;
        }

        // Generate permutations of VSUIT1, VSUIT2, VSUIT3
        const permVsuit0 = [[-1, -1, -1]];

        const permVsuit1 = [
            [SUIT.CHAR, -1, -1],
            [SUIT.BAM, -1, -1],
            [SUIT.DOT, -1, -1]
        ];

        const permVsuit2 = [
            [SUIT.CHAR, SUIT.BAM, -1],
            [SUIT.CHAR, SUIT.DOT, -1],
            [SUIT.BAM, SUIT.CHAR, -1],
            [SUIT.BAM, SUIT.DOT, -1],
            [SUIT.DOT, SUIT.CHAR, -1],
            [SUIT.DOT, SUIT.BAM, -1]
        ];

        const permVsuit3 = [
            [SUIT.CHAR, SUIT.BAM, SUIT.DOT],
            [SUIT.CHAR, SUIT.DOT, SUIT.BAM],
            [SUIT.BAM, SUIT.CHAR, SUIT.DOT],
            [SUIT.BAM, SUIT.DOT], SUIT.CHAR,
            [SUIT.DOT, SUIT.CHAR, SUIT.BAM],
            [SUIT.DOT, SUIT.BAM, SUIT.CHAR]
        ];

        let permArray = null;
        switch (validHand.vsuitCount) {
        case 1:
            permArray = permVsuit1;
            break;
        case 2:
            permArray = permVsuit2;
            break;
        case 3:
            permArray = permVsuit3;
            break;
        default:
            // No virtual suits used
            permArray = permVsuit0;
            break;
        }

        // Determine if virtual number are used by any components
        let bVirtualNumbers = false;
        for (const comp of validHand.components) {
            if (comp.number > 9) {
                bVirtualNumbers = true;
                break;
            }
        }

        let start = 1;
        let end = 1;
        let delta = 1;

        if (bVirtualNumbers) {
            end = 9;
            if (validHand.odd) {
                start = 1;
                end = 9;
                delta = 2;
            } else if (validHand.even) {
                start = 2;
                end = 8;
                delta = 2;
            }
        }

        // Iterate over all potential starting numbers for CONSECUTIVE1
        for (let minNum = start; minNum <= end; minNum += delta) {
            // Iterate over permutations of virtual suits
            for (const vsuitArray of permArray) {
                // Group tiles into matching components
                const componentInfoArray = this.rankFormComponents(hand, minNum, validHand, vsuitArray);

                // Calculate ranking
                let rank = 0;
                for (const componentInfo of componentInfoArray) {
                    const comp = componentInfo.component;
                    const count = componentInfo.tileArray.length;

                    // Update rank based on number of matching tiles (count) with the component length (comp.count)
                    // Each component is worth 100 * comp.count / 14.
                    rank += (100 * comp.count / 14) * (count / comp.count);
                }

                // Use maximum rank of all permutations
                if (rank > rankInfo.rank) {
                    rankInfo.rank = rank;
                    rankInfo.componentInfoArray = componentInfoArray;
                }
            }
        }
    }

    // Try to match given tile set with given component
    // Input - test (tile array of tile set, do not modify)
    // Return - matchInfo.match, matchInfo.tileArray, length of array = (0-n) tiles that match the component, where n = component size (in tiles)
    rankMatchComp(test, minNum, comp, vsuitArray) {
        let compSuit = comp.suit;
        let compNum = comp.number;
        const matchInfo = {
            match: false,
            tileArray: []
        };

        if (test.length === 0) {
            return matchInfo;
        }

        // Translate virtual suit to real suit using vsuitArray
        if (compSuit >= SUIT.VSUIT1_DRAGON) {
            compNum = vsuitArray[compSuit - SUIT.VSUIT1_DRAGON];
            compSuit = SUIT.DRAGON;
        } else if (compSuit >= SUIT.VSUIT1) {
            // VSUIT
            compSuit = vsuitArray[compSuit - SUIT.VSUIT1];

            //  VNUMBER
            if (compNum > 9) {
                compNum = minNum + compNum - VNUMBER.CONSECUTIVE1;
            }
        }

        for (const tile of test) {
            let match = false;
            if (tile.suit === compSuit && tile.number === compNum) {
                match = true;
            } else if (tile.suit === SUIT.JOKER) {
                match = true;
            }

            if (match) {
                matchInfo.tileArray.push(tile);
                if (matchInfo.tileArray.length === comp.count) {
                    break;
                }
            }
        }

        if (test.length === comp.count && matchInfo.tileArray.length === comp.count) {
            // Perfect match
            matchInfo.match = true;
        }

        return matchInfo;
    }

    rankFormComponents(hand, minNum, validHand, vsuitArray) {

        // Init ranking results  (return value)
        const componentInfoArray = [];
        for (const comp of validHand.components) {
            // Component Info - return actual tiles representing the component.
            // AI needs this for pong/kong/quint decisions
            const componentInfo = {
                component: comp,
                tileArray: []
            };
            componentInfoArray.push(componentInfo);
        }

        // Remaining components infos
        const remCompInfo = [];
        for (const componentInfo of componentInfoArray) {
            remCompInfo.push(componentInfo);
        }

        // To avoid errors in matching, match components to tiles in the following order:
        // 1. Exposed tiles (including exposed jokers)
        // 2. Hidden tiles (excluding jokers)
        // 3. Hidden Jokers

        // 1. Handle Exposed tilesets
        for (const tileSet of hand.exposedTileSetArray) {

            let matchInfo = null;
            for (const componentInfo of remCompInfo) {
                matchInfo = this.rankMatchComp(tileSet.tileArray, minNum, componentInfo.component, vsuitArray);
                if (matchInfo.match) {
                    // Exactly matching component
                    componentInfo.tileArray = matchInfo.tileArray;

                    // Remove this component from the remaining components array
                    const index = remCompInfo.indexOf(componentInfo);
                    if (index !== -1) {
                        remCompInfo.splice(index, 1);
                    }
                    break;
                }
            }

            if (!matchInfo.match) {
                // Exposures must match exactly to the component. Otherwise, we stop.
                return componentInfoArray;
            }
        }

        // Remaining hidden tiles
        const remHiddenTiles = hand.getHiddenTileArray();
        const remHiddenTilesWithoutJokers = [];
        const remHiddenJokers = [];

        for (const tile of remHiddenTiles) {
            if (tile.suit === SUIT.JOKER) {
                remHiddenJokers.push(tile);
            } else {
                remHiddenTilesWithoutJokers.push(tile);
            }
        }

        // 2. Handle Hidden tiles (without jokers)
        for (const componentInfo of remCompInfo) {
            const comp = componentInfo.component;
            const matchInfo = this.rankMatchComp(remHiddenTilesWithoutJokers, minNum, comp, vsuitArray);

            componentInfo.tileArray = matchInfo.tileArray;

            // Remove the tiles from the remaining tiles array
            for (const tile of matchInfo.tileArray) {
                const index = remHiddenTilesWithoutJokers.indexOf(tile);
                if (index !== -1) {
                    remHiddenTilesWithoutJokers.splice(index, 1);
                }
            }
        }

        // 3. Handle Hidden Jokers
        //    Add jokers to pong/kongs/quints (if needed)

        for (const joker of remHiddenJokers) {
            let comp2 = null;
            let comp1 = null;
            let compAny = null;
            for (const componentInfo of remCompInfo) {
                const delta = componentInfo.component.count - componentInfo.tileArray.length;
                if ((componentInfo.component.count >= 3) && delta) {
                    switch (delta) {
                    case 2:
                        comp2 = componentInfo;
                        break;
                    case 1:
                        comp1 = componentInfo;
                        break;
                    default:
                        compAny = componentInfo;
                        break;
                    }
                }
            }

            // Add joker
            if (comp1) {
                comp1.tileArray.push(joker);
            } else if (comp2) {
                comp2.tileArray.push(joker);
            } else if (compAny) {
                compAny.tileArray.push(joker);
            }
        }

        return componentInfoArray;
    }

    sortHandRankArray(rankCardHands) {
        rankCardHands.sort((a, b) => b.rank - a.rank);
    }

    printHandRankArray(rankCardHands, elemCount) {
        debugPrint("Hand Rank Info\n");

        let count = rankCardHands.length;
        if (elemCount) {
            count = Math.min(elemCount, count);
        }

        for (let i = 0; i < count; i++) {
            const rankInfo = rankCardHands[i];
            debugPrint("Group = " + rankInfo.group.groupDescription + "\n");
            debugPrint("Hand = " + rankInfo.hand.description + "\n");
            debugPrint("Rank = " + rankInfo.rank + "\n");

            // Components
            let str = "";
            for (const compInfo of rankInfo.componentInfoArray) {
                str += "[" + compInfo.component.count + "] ";
                for (const tile of compInfo.tileArray) {
                    str += tile.getText() + " ";
                }
            }
            debugPrint(str);
        }
    }
}

