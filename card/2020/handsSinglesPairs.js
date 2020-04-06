import {SUIT, WIND, DRAGON, VNUMBER} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsSinglesPairs = {
    groupDescription: "Singles and Pairs",
    hands: [
        {
            description: "NN EE WW SS 11 22 33 (1 suit, any 3 consec. nos., concealed)",
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
            description: "FF 11 22 33 44 55 DD (1 suit, any 5 consec. nos., concealed)",
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
            description: "FF 11 22 11 22 11 22 (any 3 suits, any 2 consec. pairs, concealed)",
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
                    suit: SUIT.VSUIT3,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 2
                },
            ]
        },
        {
            description: "FF 2468 DD 2468 DD (2 suits, concealed)",
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
                    count: 1
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
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 2
                },                
                {
                    suit: SUIT.VSUIT2,
                    number: 2,
                    count: 1
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
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2_DRAGON,
                    number: 0,
                    count: 2
                }                
            ]
        },
        {
            description: "336 33669 336699 (any 3 suits, concealed)",
            vsuitCount: 3,
            concealed: true,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 1
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
                    count: 1
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 6,
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
            description: "11 3 5 7 99 11 3 5 7 99 (any 2 suits, concealed)",
            vsuitCount: 2,
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
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 1,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 3,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 5,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 9,
                    count: 2
                },            
            ]
        },
        {
            description: "FF 2020 NEWS 2020 (any 2 suits, 2s match in each 2020, concealed)",
            vsuitCount: 2,
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
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 1
                },       
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
                    count: 2
                },
            ]
        }
    ]
};


