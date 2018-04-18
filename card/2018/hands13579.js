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
            description: "FF 1111 3333 5555 (1 suit)",
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
                    number: 1,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 4
                }
            ]
        },
        {
            description: "FF 5555 7777 9999 (1 suit)",
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
                    number: 5,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
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
            description: "1111 333 5555 DDD (2 suits)",
            vsuitCount: 2,
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
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2_DRAGON,
                    number: 0,
                    count: 3
                }
            ]
        },
        {
            description: "5555 777 9999 DDD (2 suits)",
            vsuitCount: 2,
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
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2_DRAGON,
                    number: 0,
                    count: 3
                }
            ]
        },
        {
            description: "FFF 1111 FFF 5555 (1 suit)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 3
                },
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 4
                }
            ]
        },
        {
            description: "FFF 5555 FFF 9999 (1 suit)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 3
                },
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
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
            description: "11 33 55 7777 9999 (3 suits)",
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
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 7,
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
            description: "FF 111 333 555 DDD (1 suit, concealed)",
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
                    number: 1,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 3

                }
            ]
        },
        {
            description: "FF 555 777 999 DDD (1 suit, concealed)",
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
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 3
                }
            ]
        }
    ]
};

