import {SUIT} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const hands369 = {
    groupDescription: "369",
    hands: [
        {
            description: "333 666 6666 9999 (any 2 suits)",
            vsuitCount: 2,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 6,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 9,
                    count: 4
                }
            ]
        },
        {
            description: "33 66 99 3333 3333 (any 3 suits, Kongs Like 3s, 6s, or 9s)",
            vsuitCount: 3,
            concealed: false,
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
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 3,
                    count: 4
                }                
            ]
        },
        {
            description: "33 66 99 6666 6666 (any 3 suits, Kongs Like 3s, 6s, or 9s)",
            vsuitCount: 3,
            concealed: false,
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
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 6,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 6,
                    count: 4
                }                
            ]
        },
        {
            description: "33 66 99 9999 9999 (any 3 suits, Kongs Like 3s, 6s, or 9s)",
            vsuitCount: 3,
            concealed: false,
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
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 9,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 9,
                    count: 4
                }                
            ]
        },        
        {
            description: "333 6666 999 DDDD (1 suit)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 4
                }
            ]
        },
        {
            description: "33 666 33 666 9999 (3 suits)",
            vsuitCount: 3,
            concealed: false,
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
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 6,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 9,
                    count: 4
                }                
            ]
        },
        {
            description: "FF 3333 6666 9999 (any 1 suit)",
            vsuitCount: 1,
            concealed: false,
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
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 4
                }
            ]
        },
        {
            description: "FF 3333 6666 9999 (any 3 suit)",
            vsuitCount: 3,
            concealed: false,
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
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 6,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 9,
                    count: 4
                }
            ]
        },
        {
            description: "FF 3 66 999 3 66 999 (2 suits, concealed)",
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
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 3,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 6,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 9,
                    count: 3
                },                
            ]
        }
    ]
};

