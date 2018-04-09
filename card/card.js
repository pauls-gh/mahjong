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
    }

    printValidationInfo(info) {
        if (!debug) {
            return;
        }
        this.debugPrint("valid = " + info.valid + "\n");
        this.debugPrint("tileCount = " + info.tileCount + "\n");
        this.debugPrint("minNum = " + info.minNum + "\n");
        let suitStr = "";
        for (const suit of info.suits) {
            suitStr += suit + ", ";
        }
        this.debugPrint("suit(s) = " + suitStr + "\n");
    }

    validateHand14(hand) {
        // Consolidate hand (14 tiles) to test array
        const test = [];

        for (const tile of hand.hiddenTileArray) {
            test.push(tile);
        }

        for (const tile of hand.exposedTileArray) {
            test.push(tile);
        }

        return this.validateHand(test);
    }

    validateHand13(hand, singleTile) {
        // Consolidate hand + singleTile to test array
        const test = [];

        for (const tile of hand.hiddenTileArray) {
            test.push(tile);
        }

        for (const tile of hand.exposedTileArray) {
            test.push(tile);
        }

        if (singleTile) {
            test.push(singleTile);
        }

        return this.validateHand(test);
    }

    // Input - tile array of length 14
    // Output - validation info object
    validateHand(test) {
        // Validation info
        const info = {
            valid: false,
            tileCount: 0,
            minNum: 9999,
            suits: []
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

    // Create various hands and test against the valid hands described in the card
    test() {

        {

            // 222 0000 111 7777 (2 suits)
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.CHAR, 2));
            hand.insert(new Tile(SUIT.CHAR, 2));
            hand.insert(new Tile(SUIT.CHAR, 2));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.BAM, 1));
            hand.insert(new Tile(SUIT.BAM, 1));
            hand.insert(new Tile(SUIT.BAM, 1));
            hand.insert(new Tile(SUIT.BAM, 7));
            hand.insert(new Tile(SUIT.BAM, 7));
            hand.insert(new Tile(SUIT.BAM, 7));

            const singleTile = new Tile(SUIT.BAM, 7);

            this.debugPrint("222 0000 111 7777 (2 suits)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // 222 0000 111 7777 (2 suits)
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.CHAR, 2));
            hand.insert(new Tile(SUIT.CHAR, 2));
            hand.insert(new Tile(SUIT.CHAR, 2));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.DOT, 1));
            hand.insert(new Tile(SUIT.DOT, 1));
            hand.insert(new Tile(SUIT.DOT, 1));
            hand.insert(new Tile(SUIT.DOT, 7));
            hand.insert(new Tile(SUIT.DOT, 7));
            hand.insert(new Tile(SUIT.DOT, 7));

            const singleTile = new Tile(SUIT.DOT, 7);

            this.debugPrint("222 0000 111 7777 (2 suits)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // FF DDDD 2017 DDDD (2 or 3 suits)  2 suits
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.CHAR, 2));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.CHAR, 1));
            hand.insert(new Tile(SUIT.CHAR, 7));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.GREEN);

            this.debugPrint("FF DDDD 2017 DDDD (2 or 3 suits)  2 suits\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // FF DDDD 2017 DDDD (2 or 3 suits)  3 suits
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DOT, 2));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.DOT, 1));
            hand.insert(new Tile(SUIT.DOT, 7));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.GREEN);

            this.debugPrint("FF DDDD 2017 DDDD (2 or 3 suits)  3 suits\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // FF DDDD 2017 DDDD (2 or 3 suits)  3 suits
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.JOKER, 0));
            hand.insert(new Tile(SUIT.DOT, 2));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.DOT, 1));
            hand.insert(new Tile(SUIT.DOT, 7));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insert(new Tile(SUIT.JOKER, 0));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.GREEN);

            this.debugPrint("FF DDDD 2017 DDDD (2 or 3 suits)  3 suits, using jokers\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // FFFF 2 44 666 8888 (1 suit)
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.DOT, 2));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 6));
            hand.insert(new Tile(SUIT.DOT, 6));
            hand.insert(new Tile(SUIT.DOT, 6));
            hand.insert(new Tile(SUIT.DOT, 8));
            hand.insert(new Tile(SUIT.DOT, 8));
            hand.insert(new Tile(SUIT.DOT, 8));

            const singleTile = new Tile(SUIT.DOT, 8);

            this.debugPrint("FFFF 2 44 666 8888 (1 suit)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }


        {

            // 22 44 666 8888 DDDD (3 suits)
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.DOT, 2));
            hand.insert(new Tile(SUIT.DOT, 2));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.BAM, 6));
            hand.insert(new Tile(SUIT.BAM, 6));
            hand.insert(new Tile(SUIT.BAM, 6));
            hand.insert(new Tile(SUIT.BAM, 8));
            hand.insert(new Tile(SUIT.BAM, 8));
            hand.insert(new Tile(SUIT.BAM, 8));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.RED);

            this.debugPrint("22 44 666 8888 DDDD (3 suits)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // FF 1111 DDDD 1111 (3 suits, like numbers)
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));

            hand.insert(new Tile(SUIT.BAM, 4));
            hand.insert(new Tile(SUIT.BAM, 4));
            hand.insert(new Tile(SUIT.BAM, 4));
            hand.insert(new Tile(SUIT.BAM, 4));

            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.RED);

            this.debugPrint("FF 1111 DDDD 1111 (3 suits, like numbers)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }


        {

            // FFFF 4444 9999 13 (1 suit, lucky 13)
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));

            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));

            hand.insert(new Tile(SUIT.DOT, 9));
            hand.insert(new Tile(SUIT.DOT, 9));
            hand.insert(new Tile(SUIT.DOT, 9));
            hand.insert(new Tile(SUIT.DOT, 9));

            hand.insert(new Tile(SUIT.DOT, 1));

            const singleTile = new Tile(SUIT.DOT, 3);

            this.debugPrint("FFFF 4444 9999 13 (1 suit, lucky 13)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // FFFF 4444 9999 13 (3 suit, lucky 13)
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));

            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));

            hand.insert(new Tile(SUIT.CHAR, 9));
            hand.insert(new Tile(SUIT.CHAR, 9));
            hand.insert(new Tile(SUIT.CHAR, 9));
            hand.insert(new Tile(SUIT.CHAR, 9));

            hand.insert(new Tile(SUIT.BAM, 1));

            const singleTile = new Tile(SUIT.BAM, 3);

            this.debugPrint("FFFF 4444 9999 13 (3 suit, lucky 13)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // NNNNN DDDD 11111 (quints, any wind, any dragon, any number/suit)
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.BAM, 3));
            hand.insert(new Tile(SUIT.BAM, 3));
            hand.insert(new Tile(SUIT.BAM, 3));
            hand.insert(new Tile(SUIT.BAM, 3));

            const singleTile = new Tile(SUIT.BAM, 3);

            this.debugPrint("NNNNN DDDD 11111 (quints, any wind, any dragon, any number/suit)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // NNNNN DDDD 11111 (quints, any wind, any dragon, any number/suit)
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.WIND, WIND.EAST));
            hand.insert(new Tile(SUIT.WIND, WIND.EAST));
            hand.insert(new Tile(SUIT.WIND, WIND.EAST));
            hand.insert(new Tile(SUIT.WIND, WIND.EAST));
            hand.insert(new Tile(SUIT.WIND, WIND.EAST));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.CHAR, 7));
            hand.insert(new Tile(SUIT.CHAR, 7));
            hand.insert(new Tile(SUIT.CHAR, 7));
            hand.insert(new Tile(SUIT.CHAR, 7));

            const singleTile = new Tile(SUIT.CHAR, 7);

            this.debugPrint("NNNNN DDDD 11111 (quints, any wind, any dragon, any number/suit)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // FF 11111 22 33333 11111 (1 suit, 3 consecutive numbers)
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));

            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));

            hand.insert(new Tile(SUIT.CHAR, 4));
            hand.insert(new Tile(SUIT.CHAR, 4));

            hand.insert(new Tile(SUIT.CHAR, 5));
            hand.insert(new Tile(SUIT.CHAR, 5));
            hand.insert(new Tile(SUIT.CHAR, 5));
            hand.insert(new Tile(SUIT.CHAR, 5));

            const singleTile = new Tile(SUIT.CHAR, 5);

            this.debugPrint("FF 11111 22 33333 11111 (1 suit, 3 consecutive numbers)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // FF 1111 2222 3333 (3 suit, 3 consecutive numbers)
            const hand = new Hand(false);
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));

            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));

            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));

            hand.insert(new Tile(SUIT.BAM, 5));
            hand.insert(new Tile(SUIT.BAM, 5));
            hand.insert(new Tile(SUIT.BAM, 5));

            const singleTile = new Tile(SUIT.BAM, 5);

            this.debugPrint("FF 1111 2222 3333 (3 suit, 3 consecutive numbers)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // 11 22 111 222 3333 (3 suit, 3 consecutive numbers)
            const hand = new Hand(false);

            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 4));
            hand.insert(new Tile(SUIT.CHAR, 4));

            hand.insert(new Tile(SUIT.DOT, 3));
            hand.insert(new Tile(SUIT.DOT, 3));
            hand.insert(new Tile(SUIT.DOT, 3));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));
            hand.insert(new Tile(SUIT.DOT, 4));

            hand.insert(new Tile(SUIT.BAM, 5));
            hand.insert(new Tile(SUIT.BAM, 5));
            hand.insert(new Tile(SUIT.BAM, 5));

            const singleTile = new Tile(SUIT.BAM, 5);

            this.debugPrint("11 22 111 222 3333 (3 suit, 3 consecutive numbers)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // 111 22 333 DDD DDD (3 consecutive numbers, 3 suits)
            const hand = new Hand(false);

            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 4));
            hand.insert(new Tile(SUIT.CHAR, 4));
            hand.insert(new Tile(SUIT.CHAR, 5));
            hand.insert(new Tile(SUIT.CHAR, 5));
            hand.insert(new Tile(SUIT.CHAR, 5));

            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));

            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.WHITE);

            this.debugPrint("111 22 333 DDD DDD (3 consecutive numbers, 3 suits)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // NNNN EEEE WWWW SS
            const hand = new Hand(false);

            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));

            hand.insert(new Tile(SUIT.WIND, WIND.WEST));
            hand.insert(new Tile(SUIT.WIND, WIND.WEST));
            hand.insert(new Tile(SUIT.WIND, WIND.WEST));
            hand.insert(new Tile(SUIT.WIND, WIND.WEST));

            hand.insert(new Tile(SUIT.WIND, WIND.EAST));
            hand.insert(new Tile(SUIT.WIND, WIND.EAST));
            hand.insert(new Tile(SUIT.WIND, WIND.EAST));
            hand.insert(new Tile(SUIT.WIND, WIND.EAST));

            hand.insert(new Tile(SUIT.WIND, WIND.SOUTH));
            const singleTile = new Tile(SUIT.WIND, WIND.SOUTH);

            this.debugPrint("NNNN EEEE WWWW SS\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // NNNN DD DD DD SSSS (3 suits)
            const hand = new Hand(false);

            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insert(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insert(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insert(new Tile(SUIT.WIND, WIND.SOUTH));

            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.WHITE);

            this.debugPrint(" NNNN DD DD DD SSSS (3 suits)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }


        {

            // 11 NNN 11 SSS 1111  (3 suits, any like odds)
            const hand = new Hand(false);

            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insert(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insert(new Tile(SUIT.WIND, WIND.SOUTH));

            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.DOT, 3));
            hand.insert(new Tile(SUIT.DOT, 3));
            hand.insert(new Tile(SUIT.BAM, 3));
            const singleTile = new Tile(SUIT.BAM, 3);

            this.debugPrint("11 NNN 11 SSS 1111  (3 suits, any like odds) \n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // NN EE WW SS 11 11 11 (3 suits, like numbers)
            const hand = new Hand(false);

            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insert(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insert(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insert(new Tile(SUIT.WIND, WIND.WEST));
            hand.insert(new Tile(SUIT.WIND, WIND.WEST));
            hand.insert(new Tile(SUIT.WIND, WIND.EAST));
            hand.insert(new Tile(SUIT.WIND, WIND.EAST));

            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.DOT, 3));
            hand.insert(new Tile(SUIT.DOT, 3));
            hand.insert(new Tile(SUIT.BAM, 3));
            const singleTile = new Tile(SUIT.BAM, 3);

            this.debugPrint("NN EE WW SS 11 11 11 (3 suits, like numbers) \n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // 11 22 33 44 55 66 77 (any 7 consecutive numbers in 1 suit)
            const hand = new Hand(false);


            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 4));
            hand.insert(new Tile(SUIT.CHAR, 4));
            hand.insert(new Tile(SUIT.CHAR, 5));
            hand.insert(new Tile(SUIT.CHAR, 5));
            hand.insert(new Tile(SUIT.CHAR, 6));
            hand.insert(new Tile(SUIT.CHAR, 6));
            hand.insert(new Tile(SUIT.CHAR, 7));
            hand.insert(new Tile(SUIT.CHAR, 7));
            hand.insert(new Tile(SUIT.CHAR, 8));
            hand.insert(new Tile(SUIT.CHAR, 8));
            hand.insert(new Tile(SUIT.CHAR, 9));
            const singleTile = new Tile(SUIT.CHAR, 9);

            this.debugPrint("11 22 33 44 55 66 77 (any 7 consecutive numbers in 1 suit) \n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // 11 33 55 77 99 11 11 (3 suits, like odd pairs in opposite 2 suits)
            const hand = new Hand(false);


            hand.insert(new Tile(SUIT.CHAR, 1));
            hand.insert(new Tile(SUIT.CHAR, 1));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 3));
            hand.insert(new Tile(SUIT.CHAR, 5));
            hand.insert(new Tile(SUIT.CHAR, 5));
            hand.insert(new Tile(SUIT.CHAR, 7));
            hand.insert(new Tile(SUIT.CHAR, 7));
            hand.insert(new Tile(SUIT.CHAR, 9));
            hand.insert(new Tile(SUIT.CHAR, 9));

            hand.insert(new Tile(SUIT.DOT, 3));
            hand.insert(new Tile(SUIT.DOT, 3));
            hand.insert(new Tile(SUIT.BAM, 3));
            const singleTile = new Tile(SUIT.BAM, 3);

            this.debugPrint("11 33 55 77 99 11 11 (3 suits, like odd pairs in opposite 2 suits)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }

        {

            // FF 2017 DD 2017 DD  (bams and craks only)
            const hand = new Hand(false);


            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.FLOWER, 0));
            hand.insert(new Tile(SUIT.CHAR, 2));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.CHAR, 1));
            hand.insert(new Tile(SUIT.CHAR, 7));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.RED));

            hand.insert(new Tile(SUIT.BAM, 2));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insert(new Tile(SUIT.BAM, 1));
            hand.insert(new Tile(SUIT.BAM, 7));
            hand.insert(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            const singleTile = new Tile(SUIT.DRAGON, DRAGON.GREEN);

            this.debugPrint("FF 2017 DD 2017 DD  (bams and craks only)\n");

            const validationInfo = this.validateHand(hand, singleTile);
            this.printValidationInfo(validationInfo);

        }


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

