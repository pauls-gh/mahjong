import {SUIT, WIND, DRAGON, VNUMBER} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsSinglesPairs = {
    groupDescription: "Singles and Pairs",
    hands: [
        {
            description: "NN EE WW SS 11 22 33 (1 suit, 3 consecutive numbers, concealed)",
            vsuitCount: 1,
            concealed: true,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
                    count: 2
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.EAST,
                    count: 2
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
                    count: 2
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
                    count: 2
                },

                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 2
                }
            ]
        },
        {
            description: "FF 22 44 66 88 22 22 (3 suits, any like even pairs, concealed)",
            vsuitCount: 3,
            concealed: true,
            odd: false,
            even: true,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 4,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 8,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 2,
                    count: 2
                }
            ]
        },
        {
            description: "FF 22 44 66 88 44 44 (3 suits, any like even pairs, concealed)",
            vsuitCount: 3,
            concealed: true,
            odd: false,
            even: true,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 4,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 8,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 4,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 4,
                    count: 2
                }
            ]
        },
        {
            description: "FF 22 44 66 88 66 66 (3 suits, any like even pairs, concealed)",
            vsuitCount: 3,
            concealed: true,
            odd: false,
            even: true,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 4,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 8,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 6,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 6,
                    count: 2
                }
            ]
        },
        {
            description: "FF 22 44 66 88 88 88 (3 suits, any like even pairs, concealed)",
            vsuitCount: 3,
            concealed: true,
            odd: false,
            even: true,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 4,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 8,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 8,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 8,
                    count: 2
                }
            ]
        },
        {
            description: "FF 11 33 55 55 77 99 (any 2 suits, concealed)",
            vsuitCount: 2,
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
                    number: 1,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 5,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 9,
                    count: 2
                }
            ]
        },
        {
            description: "FF 11 22 33 44 55 DD (1 suit, any 5 consecutive numbers, concealed)",
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
                    number: VNUMBER.CONSECUTIVE1,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE4,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE5,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 2
                }
            ]
        },
        {
            description: "FF 33 66 99 33 66 99 (any 2 suits, concealed)",
            vsuitCount: 2,
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
                    number: 3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 6,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 9,
                    count: 2
                }
            ]
        },
        {
            description: "998 99887 998877 (any 3 suits, concealed)",
            vsuitCount: 3,
            concealed: true,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 8,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 9,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 8,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 9,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 8,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 7,
                    count: 2
                }

            ]
        },
        {
            description: "FF 2018 DD 2018 DD (bams and craks only, concealed)",
            vsuitCount: 0,
            concealed: true,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.BAM,
                    number: 2,
                    count: 1
                },
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 1
                },
                {
                    suit: SUIT.BAM,
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.BAM,
                    number: 8,
                    count: 1
                },

                {
                    suit: SUIT.CHAR,
                    number: 2,
                    count: 1
                },
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 1
                },
                {
                    suit: SUIT.CHAR,
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.CHAR,
                    number: 8,
                    count: 1
                },
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.GREEN,
                    count: 2
                },
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.RED,
                    count: 2
                }
            ]
        }
    ]
};


