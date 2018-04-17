import {SUIT} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const hands2468 = {
    groupDescription: "2468",
    hands: [
        {
            description: "FFF 22 44 666 8888  (1 suit)",
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
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 8,
                    count: 4
                }
            ]
        },
        {
            description: "2222 44 6666 88 88 (3 suit)",
            vsuitCount: 3,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 4,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 4
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
            description: "22 44 666 888 DDDD  (3 suits)",
            vsuitCount: 3,
            concealed: false,
            odd: false,
            even: false,
            components: [
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
                    suit: SUIT.VSUIT2,
                    number: 6,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 8,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT3_DRAGON,
                    number: 0,
                    count: 4
                }
            ]
        },
        {
            description: "2222 4444 6666 88 (1 suit)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 4,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 8,
                    count: 2
                }
            ]
        },
        {
            description: "222 444 6666 8888 (2 suit)",
            vsuitCount: 2,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 4,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 6,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: 8,
                    count: 4
                }
            ]
        },
        {
            description: "222 444 666 888 DD (1 suit, concealed)",
            vsuitCount: 1,
            concealed: true,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 4,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 8,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 2
                }
            ]
        }
    ]
}
