import {SUIT} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const hands13579 = {
    groupDescription: "13579",
    hands: [
        {
            description: "11 33 555 777 9999 (1 suit)",
            vsuitCount: 1,
            concealed: false,
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
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
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
            description: "11 33 555 777 9999 (3 suits)",
            vsuitCount: 3,
            concealed: false,
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
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 5,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
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
            description: "FFFF 3333 5555 15 (3 suits)",
            vsuitCount: 3,
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
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 5,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 5,
                    count: 1
                }
            ]
        },        
        {
            description: "FFFF 5555 7777 35 (3 suits)",
            vsuitCount: 3,
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
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 3,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 5,
                    count: 1
                }
            ]
        },        
        {
            description: "111 333 3333 5555 (2 suits)",
            vsuitCount: 2,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 3,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 5,
                    count: 4
                }
            ]
        },
        {
            description: "555 777 7777 9999 (2 suits)",
            vsuitCount: 2,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
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
            description: "1111 33 33 33 5555 (3 suits, 1s & 5s match",
            vsuitCount: 3,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 4
                },                                
            ]
        },        
        {
            description: "5555 77 77 77 9999 (3 suits, 5s & 9s match)",
            vsuitCount: 3,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 7,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 4
                },                                
            ]
        },
        {
            description: "111 3333 555 DDDD (1 suit)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 4
                },                
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
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
            description: "555 7777 999 DDDD (1 suit)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
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
            description: "FF 1 33 555 5 77 999 (2 suits, concealed)",
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
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 5,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
                    count: 2
                },                                
                {
                    suit: SUIT.VSUIT2,
                    number: 9,
                    count: 3
                }
            ]
        }                    
    ]
};

