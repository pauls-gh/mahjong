import {SUIT, VNUMBER} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsConsecutive = {
    groupDescription: "Consecutive",
    hands: [
        {
            description: "11 222 3333 444 55 (1 suit)",
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
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 4,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 5,
                    count: 2
                }
            ]
        },
        {
            description: "55 666 7777 888 99 (1 suit)",
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
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 7,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 8,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 9,
                    count: 2
                }
            ]
        },
        {
            description: "111 2222 333 4444 (2 suits, 4 consecutive numbers)",
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
                    count: 4
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE4,
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
            description: "11 22 111 222 3333 (3 suits, 3 consecutive numbers)",
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
                    number: VNUMBER.CONSECUTIVE1,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT3,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 4
                }
            ]
        },
        {
            description: "FFFF 1111 2222 DD (1 suits, 2 consecutive numbers)",
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
                    count: 2
                }
            ]
        },
        {
            description: "1111 22 22 22 3333 (3 suits, 3 consecutive numbers, like pairs middle nos)",
            vsuitCount: 3,
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
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT3,
                    number: VNUMBER.CONSECUTIVE2,
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 4
                }
            ]
        },
        {
            description: "111 22 333 DDD DDD (3 suits, 3 consecutive numbers)",
            vsuitCount: 3,
            concealed: true,
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
                    count: 2
                },
                {
                    suit: SUIT.VSUIT1,
                    number: VNUMBER.CONSECUTIVE3,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT2_DRAGON,
                    number: 0,
                    count: 3
                },
                {
                    suit: SUIT.VSUIT3_DRAGON,
                    number: 0,
                    count: 3
                }
            ]
        }
    ]
};
