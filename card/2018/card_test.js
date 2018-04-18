import {debugPrint, debugTrace} from "../../game.js";
import {Tile} from "../../gameObjects.js";
import {Hand} from "../../gameObjects_hand.js";
import {Card} from "../card.js";
import {SUIT, DRAGON, WIND, VNUMBER} from "../../constants.js";

// PRIVATE GLOBALS


//  2018 card

export class CardTest2018 {
    constructor(card) {
        this.card = card;
    }

    // Create various hands and test against the valid hands described in the card
    test() {

        {

            // FF 2018 1111 1111 (3 suits, kongs 2)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));

            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.CHAR, 1));
            hand.insertHidden(new Tile(SUIT.CHAR, 8));

            hand.insertHidden(new Tile(SUIT.BAM, 2));
            hand.insertHidden(new Tile(SUIT.BAM, 2));
            hand.insertHidden(new Tile(SUIT.BAM, 2));
            hand.insertHidden(new Tile(SUIT.BAM, 2));

            hand.insertHidden(new Tile(SUIT.DOT, 2));
            hand.insertHidden(new Tile(SUIT.DOT, 2));
            hand.insertHidden(new Tile(SUIT.DOT, 2));
            hand.insertHidden(new Tile(SUIT.DOT, 2));

            debugPrint("FF 2018 1111 1111 (3 suits, kongs 2)\n");

            const validationInfo = this.card.validateHand14(hand);
            this.card.printValidationInfo(validationInfo);

        }


        {

            // 22 000 NEWS 111 88 (1 suit, concealed)
            const hand = new Hand(false);

            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.CHAR, 2));

            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));

            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.WEST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.SOUTH));

            hand.insertHidden(new Tile(SUIT.CHAR, 1));
            hand.insertHidden(new Tile(SUIT.CHAR, 1));
            hand.insertHidden(new Tile(SUIT.CHAR, 1));

            hand.insertHidden(new Tile(SUIT.CHAR, 8));
            hand.insertHidden(new Tile(SUIT.CHAR, 8));

            debugPrint("22 000 NEWS 111 88 (1 suit, concealed)\n");

            const validationInfo = this.card.validateHand14(hand);
            this.card.printValidationInfo(validationInfo);

        }

        {

            // FFFF NNNN DD SSSS (red dragon only)
            const hand = new Hand(false);

            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            


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
            
            debugPrint("FFFF NNNN DD SSSS (red dragon only)\n");

            const validationInfo = this.card.validateHand14(hand);
            this.card.printValidationInfo(validationInfo);

        }     
        
        
        {

            // FF 22 44 66 88 22 22 (3 suits, any like even pairs, concealed)
            const hand = new Hand(false);

            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));

            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.CHAR, 4));
            hand.insertHidden(new Tile(SUIT.CHAR, 4));
            hand.insertHidden(new Tile(SUIT.CHAR, 6));
            hand.insertHidden(new Tile(SUIT.CHAR, 6));
            hand.insertHidden(new Tile(SUIT.CHAR, 8));
            hand.insertHidden(new Tile(SUIT.CHAR, 8));

            hand.insertHidden(new Tile(SUIT.BAM, 4));
            hand.insertHidden(new Tile(SUIT.BAM, 4));

            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));

            debugPrint("FF 22 44 66 88 22 22 (3 suits, any like even pairs, concealed)\n");

            const validationInfo = this.card.validateHand14(hand);
            this.card.printValidationInfo(validationInfo);

        } 
    }

}

