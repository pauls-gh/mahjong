import {SUIT, WIND, DRAGON, VNUMBER} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsSinglesPairs = {
    groupDescription: "Singles and Pairs",
    hands: [
        {
            description: "NN EE WW SS 11 11 11 (any like nos., concealed)",
            vsuitCount: 3,
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
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 2
                }
            ]
        },
        {
            description: "FF 22 4 6 88 22 4 6 88 (2 suits, concealed)",
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
                    number: 2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 4,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 1
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
                    suit: SUIT.VSUIT2,
                    number: 4,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 6,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 8,
                    count: 2
                }
            ]
        },
        {
            description: "113 11335 113355 (any 3 suits, concealed)",
            vsuitCount: 3,
            concealed: true,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 1,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 5,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 1,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 5,
                    count: 2
                },
            ]
        },
        {
            description: "557 55779 557799 (any 3 suits, concealed)",
            vsuitCount: 3,
            concealed: true,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
                    count: 1
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
                    count: 1
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 5,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 7,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 9,
                    count: 2
                },
            ]
        },
        {
            description: "11 22 33 44 55 66 77 (1 suit, any 7 consecutive numbers, concealed)",
            vsuitCount: 1,
            concealed: true,
            odd: false,
            even: false,
            components: [
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
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE6,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE7,
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
            description: "FF 11 22 DD 11 22 DD (any 2 suits,  any 2 like consecutive nos., concealed)",
            vsuitCount: 3,
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
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2_DRAGON,
                    number: 0,
                    count: 2
                }             
            ]
        },
        {
            description: "FF 2019 2019 2019 (concealed)",
            vsuitCount: 0,
            concealed: true,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 1
                },
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 1
                },
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
                },                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 1
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
                },                {
                    suit: SUIT.VSUIT2,
                    number: 9,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 2,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 1,
                    count: 1
                },                {
                    suit: SUIT.VSUIT3,
                    number: 9,
                    count: 1
                },                                
            ]
        }
    ]
};


