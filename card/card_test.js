import {Tile} from "../gameObjects.js";
import {Hand} from "../gameObjects_hand.js";
import {Card} from "./card.js";
import {SUIT, DRAGON, WIND, VNUMBER} from "../constants.js";

// PRIVATE GLOBALS
const debug = 1;
const trace = 0;

// Currently support 2017 card

export class CardTest {
    constructor(card) {
        this.card = card;
    }

    // Create various hands and test against the valid hands described in the card
    test() {

        {

            // 222 0000 111 7777 (2 suits)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.BAM, 1));
            hand.insertHidden(new Tile(SUIT.BAM, 1));
            hand.insertHidden(new Tile(SUIT.BAM, 1));
            hand.insertHidden(new Tile(SUIT.BAM, 7));
            hand.insertHidden(new Tile(SUIT.BAM, 7));
            hand.insertHidden(new Tile(SUIT.BAM, 7));

            const singleTile = new Tile(SUIT.BAM, 7);

            this.debugPrint("222 0000 111 7777 (2 suits)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // 222 0000 111 7777 (2 suits)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DOT, 1));
            hand.insertHidden(new Tile(SUIT.DOT, 1));
            hand.insertHidden(new Tile(SUIT.DOT, 1));
            hand.insertHidden(new Tile(SUIT.DOT, 7));
            hand.insertHidden(new Tile(SUIT.DOT, 7));
            hand.insertHidden(new Tile(SUIT.DOT, 7));

            const singleTile = new Tile(SUIT.DOT, 7);

            this.debugPrint("222 0000 111 7777 (2 suits)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // FF DDDD 2017 DDDD (2 or 3 suits)  2 suits
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.CHAR, 1));
            hand.insertHidden(new Tile(SUIT.CHAR, 7));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.GREEN);

            this.debugPrint("FF DDDD 2017 DDDD (2 or 3 suits)  2 suits\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // FF DDDD 2017 DDDD (2 or 3 suits)  3 suits
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DOT, 2));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DOT, 1));
            hand.insertHidden(new Tile(SUIT.DOT, 7));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.GREEN);

            this.debugPrint("FF DDDD 2017 DDDD (2 or 3 suits)  3 suits\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // FF DDDD 2017 DDDD (2 or 3 suits)  3 suits
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.JOKER, 0));
            hand.insertHidden(new Tile(SUIT.DOT, 2));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DOT, 1));
            hand.insertHidden(new Tile(SUIT.DOT, 7));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insertHidden(new Tile(SUIT.JOKER, 0));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.GREEN);

            this.debugPrint("FF DDDD 2017 DDDD (2 or 3 suits)  3 suits, using jokers\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // FFFF 2 44 666 8888 (1 suit)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.DOT, 2));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 6));
            hand.insertHidden(new Tile(SUIT.DOT, 6));
            hand.insertHidden(new Tile(SUIT.DOT, 6));
            hand.insertHidden(new Tile(SUIT.DOT, 8));
            hand.insertHidden(new Tile(SUIT.DOT, 8));
            hand.insertHidden(new Tile(SUIT.DOT, 8));

            const singleTile = new Tile(SUIT.DOT, 8);

            this.debugPrint("FFFF 2 44 666 8888 (1 suit)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }


        {

            // 22 44 666 8888 DDDD (3 suits)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.DOT, 2));
            hand.insertHidden(new Tile(SUIT.DOT, 2));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.BAM, 6));
            hand.insertHidden(new Tile(SUIT.BAM, 6));
            hand.insertHidden(new Tile(SUIT.BAM, 6));
            hand.insertHidden(new Tile(SUIT.BAM, 8));
            hand.insertHidden(new Tile(SUIT.BAM, 8));
            hand.insertHidden(new Tile(SUIT.BAM, 8));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.RED);

            this.debugPrint("22 44 666 8888 DDDD (3 suits)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // FF 1111 DDDD 1111 (3 suits, like numbers)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));

            hand.insertHidden(new Tile(SUIT.BAM, 4));
            hand.insertHidden(new Tile(SUIT.BAM, 4));
            hand.insertHidden(new Tile(SUIT.BAM, 4));
            hand.insertHidden(new Tile(SUIT.BAM, 4));

            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.RED);

            this.debugPrint("FF 1111 DDDD 1111 (3 suits, like numbers)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }


        {

            // FFFF 4444 9999 13 (1 suit, lucky 13)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));

            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));

            hand.insertHidden(new Tile(SUIT.DOT, 9));
            hand.insertHidden(new Tile(SUIT.DOT, 9));
            hand.insertHidden(new Tile(SUIT.DOT, 9));
            hand.insertHidden(new Tile(SUIT.DOT, 9));

            hand.insertHidden(new Tile(SUIT.DOT, 1));

            const singleTile = new Tile(SUIT.DOT, 3);

            this.debugPrint("FFFF 4444 9999 13 (1 suit, lucky 13)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // FFFF 4444 9999 13 (3 suit, lucky 13)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));

            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));

            hand.insertHidden(new Tile(SUIT.CHAR, 9));
            hand.insertHidden(new Tile(SUIT.CHAR, 9));
            hand.insertHidden(new Tile(SUIT.CHAR, 9));
            hand.insertHidden(new Tile(SUIT.CHAR, 9));

            hand.insertHidden(new Tile(SUIT.BAM, 1));

            const singleTile = new Tile(SUIT.BAM, 3);

            this.debugPrint("FFFF 4444 9999 13 (3 suit, lucky 13)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // NNNNN DDDD 11111 (quints, any wind, any dragon, any number/suit)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.BAM, 3));
            hand.insertHidden(new Tile(SUIT.BAM, 3));
            hand.insertHidden(new Tile(SUIT.BAM, 3));
            hand.insertHidden(new Tile(SUIT.BAM, 3));

            const singleTile = new Tile(SUIT.BAM, 3);

            this.debugPrint("NNNNN DDDD 11111 (quints, any wind, any dragon, any number/suit)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // NNNNN DDDD 11111 (quints, any wind, any dragon, any number/suit)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.CHAR, 7));
            hand.insertHidden(new Tile(SUIT.CHAR, 7));
            hand.insertHidden(new Tile(SUIT.CHAR, 7));
            hand.insertHidden(new Tile(SUIT.CHAR, 7));

            const singleTile = new Tile(SUIT.CHAR, 7);

            this.debugPrint("NNNNN DDDD 11111 (quints, any wind, any dragon, any number/suit)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // FF 11111 22 33333 (1 suit, 3 consecutive numbers)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));

            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));

            hand.insertHidden(new Tile(SUIT.CHAR, 4));
            hand.insertHidden(new Tile(SUIT.CHAR, 4));

            hand.insertHidden(new Tile(SUIT.CHAR, 5));
            hand.insertHidden(new Tile(SUIT.CHAR, 5));
            hand.insertHidden(new Tile(SUIT.CHAR, 5));
            hand.insertHidden(new Tile(SUIT.CHAR, 5));

            const singleTile = new Tile(SUIT.CHAR, 5);

            this.debugPrint("FF 11111 22 33333 (1 suit, 3 consecutive numbers)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // FF 1111 2222 3333 (3 suit, 3 consecutive numbers)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));

            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));

            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));

            hand.insertHidden(new Tile(SUIT.BAM, 5));
            hand.insertHidden(new Tile(SUIT.BAM, 5));
            hand.insertHidden(new Tile(SUIT.BAM, 5));

            const singleTile = new Tile(SUIT.BAM, 5);

            this.debugPrint("FF 1111 2222 3333 (3 suit, 3 consecutive numbers)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // 11 22 111 222 3333 (3 suit, 3 consecutive numbers)
            const hand = new Hand(false);

            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 4));
            hand.insertHidden(new Tile(SUIT.CHAR, 4));

            hand.insertHidden(new Tile(SUIT.DOT, 3));
            hand.insertHidden(new Tile(SUIT.DOT, 3));
            hand.insertHidden(new Tile(SUIT.DOT, 3));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));

            hand.insertHidden(new Tile(SUIT.BAM, 5));
            hand.insertHidden(new Tile(SUIT.BAM, 5));
            hand.insertHidden(new Tile(SUIT.BAM, 5));

            const singleTile = new Tile(SUIT.BAM, 5);

            this.debugPrint("11 22 111 222 3333 (3 suit, 3 consecutive numbers)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // 111 22 333 DDD DDD (3 consecutive numbers, 3 suits)
            const hand = new Hand(false);

            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 4));
            hand.insertHidden(new Tile(SUIT.CHAR, 4));
            hand.insertHidden(new Tile(SUIT.CHAR, 5));
            hand.insertHidden(new Tile(SUIT.CHAR, 5));
            hand.insertHidden(new Tile(SUIT.CHAR, 5));

            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));

            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.WHITE);

            this.debugPrint("111 22 333 DDD DDD (3 consecutive numbers, 3 suits)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // NNNN EEEE WWWW SS
            const hand = new Hand(false);

            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));

            hand.insertHidden(new Tile(SUIT.WIND, WIND.WEST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.WEST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.WEST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.WEST));

            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));

            hand.insertHidden(new Tile(SUIT.WIND, WIND.SOUTH));
            const singleTile = new Tile(SUIT.WIND, WIND.SOUTH);

            this.debugPrint("NNNN EEEE WWWW SS\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // NNNN DD DD DD SSSS (3 suits)
            const hand = new Hand(false);

            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.SOUTH));

            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));

            const singleTile = new Tile(SUIT.DRAGON, DRAGON.WHITE);

            this.debugPrint(" NNNN DD DD DD SSSS (3 suits)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }


        {

            // 11 NNN 11 SSS 1111  (3 suits, any like odds)
            const hand = new Hand(false);

            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.SOUTH));

            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.DOT, 3));
            hand.insertHidden(new Tile(SUIT.DOT, 3));
            hand.insertHidden(new Tile(SUIT.BAM, 3));
            const singleTile = new Tile(SUIT.BAM, 3);

            this.debugPrint("11 NNN 11 SSS 1111  (3 suits, any like odds) \n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // NN EE WW SS 11 11 11 (3 suits, like numbers)
            const hand = new Hand(false);

            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.WEST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.WEST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));

            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.DOT, 3));
            hand.insertHidden(new Tile(SUIT.DOT, 3));
            hand.insertHidden(new Tile(SUIT.BAM, 3));
            const singleTile = new Tile(SUIT.BAM, 3);

            this.debugPrint("NN EE WW SS 11 11 11 (3 suits, like numbers) \n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // 11 22 33 44 55 66 77 (any 7 consecutive numbers in 1 suit)
            const hand = new Hand(false);


            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 4));
            hand.insertHidden(new Tile(SUIT.CHAR, 4));
            hand.insertHidden(new Tile(SUIT.CHAR, 5));
            hand.insertHidden(new Tile(SUIT.CHAR, 5));
            hand.insertHidden(new Tile(SUIT.CHAR, 6));
            hand.insertHidden(new Tile(SUIT.CHAR, 6));
            hand.insertHidden(new Tile(SUIT.CHAR, 7));
            hand.insertHidden(new Tile(SUIT.CHAR, 7));
            hand.insertHidden(new Tile(SUIT.CHAR, 8));
            hand.insertHidden(new Tile(SUIT.CHAR, 8));
            hand.insertHidden(new Tile(SUIT.CHAR, 9));
            const singleTile = new Tile(SUIT.CHAR, 9);

            this.debugPrint("11 22 33 44 55 66 77 (any 7 consecutive numbers in 1 suit) \n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // 11 33 55 77 99 11 11 (3 suits, like odd pairs in opposite 2 suits)
            const hand = new Hand(false);


            hand.insertHidden(new Tile(SUIT.CHAR, 1));
            hand.insertHidden(new Tile(SUIT.CHAR, 1));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 3));
            hand.insertHidden(new Tile(SUIT.CHAR, 5));
            hand.insertHidden(new Tile(SUIT.CHAR, 5));
            hand.insertHidden(new Tile(SUIT.CHAR, 7));
            hand.insertHidden(new Tile(SUIT.CHAR, 7));
            hand.insertHidden(new Tile(SUIT.CHAR, 9));
            hand.insertHidden(new Tile(SUIT.CHAR, 9));

            hand.insertHidden(new Tile(SUIT.DOT, 3));
            hand.insertHidden(new Tile(SUIT.DOT, 3));
            hand.insertHidden(new Tile(SUIT.BAM, 3));
            const singleTile = new Tile(SUIT.BAM, 3);

            this.debugPrint("11 33 55 77 99 11 11 (3 suits, like odd pairs in opposite 2 suits)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

        }

        {

            // FF 2017 DD 2017 DD  (bams and craks only)
            const hand = new Hand(false);


            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.CHAR, 1));
            hand.insertHidden(new Tile(SUIT.CHAR, 7));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));

            hand.insertHidden(new Tile(SUIT.BAM, 2));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.BAM, 1));
            hand.insertHidden(new Tile(SUIT.BAM, 7));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.GREEN));
            const singleTile = new Tile(SUIT.DRAGON, DRAGON.GREEN);

            this.debugPrint("FF 2017 DD 2017 DD  (bams and craks only)\n");

            const validationInfo = this.card.validateHand13(hand, singleTile);
            this.this.card.printValidationInfo(validationInfo);

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

