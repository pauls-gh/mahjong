import {SUIT, DRAGON, WIND} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const hands2019 = {
    groupDescription: "2019",
    hands: [
        {
            description: "FFFF 2019 111 999 (3 suits, pungs 1 and 9 only)",
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
                    number: 9,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 1,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 9,
                    count: 3
                }
            ]
        },
        {
            description: "222 0000 111 9999 (1 suit)",
            vsuitCount: 1,
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
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 4
                }
            ]
        },
        {
            description: "222 0000 111 9999 (2 suit)",
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
                    number: 9,
                    count: 4
                }
            ]
        },
        {
            description: "FF DDDD 2019 DDDD (3 suits)",
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
                    number: 9,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2_DRAGON,
                    number: 0,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3_DRAGON,
                    number: 0,
                    count: 4
                }
            ]
        },
        {
            description: "FF DDDD 2019 DDDD (2 suits)",
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
                    number: 9,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2_DRAGON,
                    number: 0,
                    count: 4
                }
            ]
        },

        {
            description: "22 000 NEWS 111 99 (1 suit, concealed)",
            vsuitCount: 1,
            concealed: true,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
                    count: 1
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.EAST,
                    count: 1
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
                    count: 1
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 2
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
                    number: 9,
                    count: 2
                }
            ]
        }
    ]
};
