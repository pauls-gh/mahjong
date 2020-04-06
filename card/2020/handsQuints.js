import {SUIT, DRAGON, WIND, VNUMBER} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsQuints = {
    groupDescription: "Quints",
    hands: [
        {
            description: "FFFFF DDDD 11111 (any no. in any suit, red dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 5
                },                
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.RED,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 5
                }
            ]
        },    
        {
            description: "FFFFF DDDD 11111 (any no. in any suit, green dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 5
                },                
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.GREEN,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 5
                }
            ]
        },   
        {
            description: "FFFFF DDDD 11111 (any no. in any suit, white dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 5
                },                
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 5
                }
            ]
        },                       
        {
            description: "11 22 33333 33333 (3 suits, 3 consecutive numbers)",
            vsuitCount: 3,
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
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 5
                },
                {
                    suit: SUIT.VSUIT3,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 5
                }
            ]
        },        
        {
            description: "11111 3333 55555  (1 suit)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 5
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 5
                }
            ]
        }, 
        {
            description: "55555 7777 99999  (1 suit)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 5
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 5
                }
            ]
        }, 
        {
            description: "11111 22 33 44444 (1 suits, 4 consecutive numbers)",
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
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE4,
                    count: 5
                }
            ]
        },        
    ]
}

