import {SUIT, DRAGON} from "../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const hands2017 = {
    groupDescription: "2017",
    hands: [
        {
            description: "222 0000 111 7777  (any 2 suits)",
            vsuitCount: 2,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 3
                },
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 1,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
                    count: 4
                }
            ]
        },

        {
            description: "FF DDDD 2017 DDDD ( 3 suits)",
            vsuitCount: 3,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 1
                },
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 2,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT3_DRAGON,
                    number: 0,
                    count: 4
                }
            ]
        },
        {
            description: "FF DDDD 2017 DDDD (2 suits, VSUIT1, VSUIT1, VSUIT2)",
            vsuitCount: 2,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 1
                },
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2_DRAGON,
                    number: 0,
                    count: 4
                }
            ]
        },
        {
            description: "FF DDDD 2017 DDDD (2 suits, VSUIT1, VSUIT2, VSUIT1)",
            vsuitCount: 2,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 1
                },
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 2,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 4
                }
            ]
        },
        {
            description: "FF DDDD 2017 DDDD (2 suits, VSUIT1, VSUIT2, VSUIT2)",
            vsuitCount: 2,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 1
                },
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 2,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2_DRAGON,
                    number: 0,
                    count: 4
                }
            ]
        },
        {
            description: "FF 2017 7777 7777 (any 3 suits, kongs 7s only)",
            vsuitCount: 3,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 1
                },
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 7,
                    count: 4
                }

            ]
        },
        {
            description: "FF 222 000 111 777 (any 1 suit, concealed)",
            vsuitCount: 1,
            concealed: true,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 3
                },
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
                    count: 3
                }
            ]
        }
    ]
};
