import {SUIT, WIND, DRAGON, VNUMBER} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsWindsDragons = {
    groupDescription: "Winds and Dragons",
    hands: [
        {
            description: "NNNN EEEE WWWW SS",
            vsuitCount: 0,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
                    count: 4
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.EAST,
                    count: 4
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
                    count: 4
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
                    count: 2
                }
            ]
        },        
        {
            description: "NNNN E W SSSS 2019",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 4
                },                
                {
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
                    count: 4
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
                }                
            ]
        },        
        {
            description: "NNNN DD DD DD SSSS",
            vsuitCount: 3,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2_DRAGON,
                    number: 0,
                    count: 2
                },                
                {
                    suit: SUIT.VSUIT3_DRAGON,
                    number: 0,
                    count: 2
                },                
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
                    count: 4
                }
            ]
        },
        {
            description: "EEEE DD DD DD WWWW",
            vsuitCount: 3,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.EAST,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2_DRAGON,
                    number: 0,
                    count: 2
                },                
                {
                    suit: SUIT.VSUIT3_DRAGON,
                    number: 0,
                    count: 2
                },                
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
                    count: 4
                }
            ]
        },
        {
            description: "FF NN 1111 1111 SS (2 suits, any like odds)",
            vsuitCount: 2,
            concealed: false,
            odd: true,
            even: false,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
                },                
                {
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
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
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 4
                },

            ]
        },
        {
            description: "FF EE 2222 2222 WW (2 suits, any like evens)",
            vsuitCount: 2,
            concealed: false,
            odd: false,
            even: true,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
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
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 4
                },

            ]
        },
        {
            description: "FF NNN EEE WWW SSS",
            vsuitCount: 0,
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
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
                    count: 3
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
                    count: 3
                }
            ]
        }
    ]
};

