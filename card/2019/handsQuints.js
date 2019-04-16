import {SUIT, DRAGON, WIND, VNUMBER} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsQuints = {
    groupDescription: "Quints",
    hands: [
        {
            description: "11 222 3333 44444 (1 suit, 4 consecutive numbers)",
            vsuitCount: 1,
            concealed: false,
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
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE4,
                    count: 5
                }
            ]
        },        
        {
            description: "FFFF NNNNN 11111 (any wind, any no.)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 4
                },                
                {
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
                    count: 5
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 5
                }
            ]
        },
        {
            description: "FFFF NNNNN 11111 (any wind, any no.)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 4
                },                
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
                    count: 5
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 5
                }
            ]
        },
        {
            description: "FFFF NNNNN 11111 (any wind, any no.)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 4
                },                
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
                    count: 5
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 5
                }
            ]
        },
        {
            description: "FFFF NNNNN 11111 (any wind, any no.)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 4
                },                
                {
                    suit: SUIT.WIND,
                    number: WIND.EAST,
                    count: 5
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 5
                }
            ]
        },                        
        {
            description: "11111 22 33333 DD (1 suit, 3 consecutive numbers, dragons match)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 5
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 5
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 2
                }
            ]
        }, 
        {
            description: "11111 DDDD 11111 (3 suit, any like nos.)",
            vsuitCount: 3,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 5
                },
                {
                    suit: SUIT.VSUIT2_DRAGON,
                    number: 0,
                    count: 4
                },                
                {
                    suit: SUIT.VSUIT3,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 5
                }
            ]
        },         
    ]
}

