import {Tile} from "../gameObjects.js";
import {Hand} from "../gameObjects_hand.js";
import {SUIT, DRAGON, WIND, VNUMBER} from "../constants.js";
import {hands2017} from "./hands2017.js";
import {hands2468} from "./hands2468.js";
import {handsLikeNumbers} from "./handsLikeNumbers.js";
import {handsLucky13} from "./handsLucky13.js";
import {handsQuints} from "./handsQuints.js";
import {handsConsecutive} from "./handsConsecutive.js";
import {hands13579} from "./hands13579.js";
import {handsWindsDragons} from "./handsWindsDragons.js";
import {hands369} from "./hands369.js";
import {handsSinglesPairs} from "./handsSinglesPairs.js";
import {CardTest} from "./card_test.js";


// PRIVATE CONSTANTS
const validHandGroups2017 = [
    hands2017,
    hands2468,
    handsLikeNumbers,
    handsLucky13,
    handsQuints,
    handsConsecutive,
    hands13579,
    handsWindsDragons,
    hands369,
    handsSinglesPairs
];

// PRIVATE GLOBALS
const debug = 1;
const trace = 0;

// Currently support 2017 card

export class Card {
    constructor() {
        this.year = "2017";
        this.validHandGroups = validHandGroups2017;

        // Debug only
        if (0) {
            const cardTest = new CardTest(this);
            cardTest.test();
        }
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

        // Validate number of tiles
        info.tileCount = test.length;

        if (info.tileCount !== 14) {
            return info;
        }

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

        // Compare against all possible hands
        let found = false;

        outerLoop:
        for (const group of this.validHandGroups) {
            // Validate hand
            for (const validHand of group) {

                this.debugTrace("Match hand: " + validHand.description + "\n");

                if (this.matchHand(test, info, validHand)) {
                    this.debugTrace("Match hand: found match\n");
                    found = true;
                    break outerLoop;
                } else {
                    this.debugTrace("Match hand: no match\n");
                }
            }
        }

        if (found) {
            info.valid = true;
        }


        return info;
    }

    matchHand(test, info, validHand) {
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

        // Iterate over permutations of virtual suits
        for (const vsuitArray of permArray) {

            this.debugTrace("VsuitArray = " + vsuitArray + "\n");

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

            this.debugTrace("Component index: " + compIndex + "\n");

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

            } while (found && count < comp.count);

            if (count === comp.count) {
                this.debugTrace("Component Match: yes\n");
            } else {
                this.debugTrace("Component Match: no\n");
                match = false;
                break;
            }

            compIndex++;
        }

        return match;
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

