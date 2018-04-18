import {SUIT, VNUMBER} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsConsecutive = {
    groupDescription: "Consecutive",
    hands: [
        {
            description: "11 22 333 444 5555 (1 suit)",
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
                    number: 2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 4,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 4
                }
            ]
        },
        {
            description: "55 66 777 888 9999 (1 suit)",
            vsuitCount: 1,
            concealed: false,
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
                    number: 6,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 8,
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
            description: "111 222 3333 4444 (2 suits, 4 consecutive numbers)",
            vsuitCount: 2,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE4,
                    count: 4
                }
            ]
        },
        {
            description: "FF 1111 2222 DDDD (1 suits, 2 consecutive numbers)",
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
                    number: VNUMBER.CONSECUTIVE1,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 4
                }
            ]
        },
        {
            description: "11 22 33 4444 5555 (3 suits, 5 consecutive numbers)",
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
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE4,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: VNUMBER.CONSECUTIVE5,
                    count: 4
                }
            ]
        },

        {
            description: "FF 1111 2222 3333 (1 suits, 3 consecutive numbers)",
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
                    number: VNUMBER.CONSECUTIVE1,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 4
                }
            ]
        },
        {
            description: "FF 1111 2222 3333 (3 suits, 3 consecutive numbers)",
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
                    number: VNUMBER.CONSECUTIVE1,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 4
                }
            ]
        },
        {
            description: "1111 222 3333 DDD (2 suits, 3 consecutive numbers, pong & dragon match)",
            vsuitCount: 2,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE3,
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
            description: "FF 111 222 111 222 (2 suits, 2 consecutive numbers, concealed)",
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
                    number: VNUMBER.CONSECUTIVE1,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 3
                }
            ]
        }
    ]
};
