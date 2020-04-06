import {SUIT, DRAGON, WIND} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const hands2020 = {
    groupDescription: "2020",
    hands: [
        {
            description: "FF 2020 2222 2222 (3 suits)",
            vsuitCount: 3,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 2
                },
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
                    suit: SUIT.VSUIT2,
                    number: 2,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 2,
                    count: 4
                }
            ]
        },
        {
            description: "FF DDDD 2020 DDDD (1 suit)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 2
                },
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.RED,
                    count: 4
                },
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.GREEN,
                    count: 4
                },                
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 2
                }
            ]
        },
        {
            description: "FFFFF 22 222 2020 (3 suits)",
            vsuitCount: 3,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 2
                },
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 5
                },                
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 2,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 2,
                    count: 2
                },

            ]
        },
        {
            description: "NN EEE 2020 WWW SS (1 suit, concealed)",
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
                    count: 3
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
                    count: 3
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 2
                },
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 2
                }
            ]
        }
    ]
};
