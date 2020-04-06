import {debugPrint, debugTrace} from "../../game.js";
import {Tile} from "../../gameObjects.js";
import {Hand} from "../../gameObjects_hand.js";
import {Card} from "../../card/card.js";
import {SUIT, DRAGON, WIND, VNUMBER} from "../../constants.js";

// PRIVATE GLOBALS


//  2020 card

export class CardTest2020 {
    constructor(card) {
        this.card = card;
    }

    // Create various hands and test against the valid hands described in the card
    test() {

        {

            // FF 2020 2222 2222 (3 suits)
            const hand = new Hand(false);
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));

            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));

            hand.insertHidden(new Tile(SUIT.DOT, 2));
            hand.insertHidden(new Tile(SUIT.DOT, 2));
            hand.insertHidden(new Tile(SUIT.DOT, 2));
            hand.insertHidden(new Tile(SUIT.DOT, 2));

            hand.insertHidden(new Tile(SUIT.BAM, 2));
            hand.insertHidden(new Tile(SUIT.BAM, 2));
            hand.insertHidden(new Tile(SUIT.BAM, 2));
            hand.insertHidden(new Tile(SUIT.BAM, 2));

            debugPrint("FF 2020 2222 2222 (3 suits)\n");

            const validationInfo = this.card.validateHand14(hand);
            this.card.printValidationInfo(validationInfo);

        }


        {

            // FFFF 4444 6666 24 (3 suits)
            const hand = new Hand(false);

            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));

            hand.insertHidden(new Tile(SUIT.CHAR, 4));
            hand.insertHidden(new Tile(SUIT.CHAR, 4));
            hand.insertHidden(new Tile(SUIT.CHAR, 4));
            hand.insertHidden(new Tile(SUIT.CHAR, 4));

            hand.insertHidden(new Tile(SUIT.DOT, 6));
            hand.insertHidden(new Tile(SUIT.DOT, 6));
            hand.insertHidden(new Tile(SUIT.DOT, 6));
            hand.insertHidden(new Tile(SUIT.DOT, 6));

            hand.insertHidden(new Tile(SUIT.BAM, 2));
            hand.insertHidden(new Tile(SUIT.BAM, 4));

            debugPrint("FFFF 4444 6666 24 (3 suits)\n");

            const validationInfo = this.card.validateHand14(hand);
            this.card.printValidationInfo(validationInfo);

        }

        {

            // FF 2020 NEWS 2020 (any 2 suits, 2s match in each 2020, concealed)
            const hand = new Hand(false);

            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));

            hand.insertHidden(new Tile(SUIT.WIND, WIND.NORTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.SOUTH));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.EAST));
            hand.insertHidden(new Tile(SUIT.WIND, WIND.WEST));

            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.WHITE));

            hand.insertHidden(new Tile(SUIT.CHAR, 2));
            hand.insertHidden(new Tile(SUIT.CHAR, 2));

            hand.insertHidden(new Tile(SUIT.DOT, 2));
            hand.insertHidden(new Tile(SUIT.DOT, 2));

            
            debugPrint("FF 2020 NEWS 2020 (any 2 suits, 2s match in each 2020, concealed)\n");

            const validationInfo = this.card.validateHand14(hand);
            this.card.printValidationInfo(validationInfo);

        }     
      
    }

}

