import {SUIT} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsAdditionHands = {
    groupDescription: "Addition Hands",
    hands: [
        {
            description: "FFFF 5555 6666 11 (any 1 suits)",
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
                    number: 5,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 6,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 1
                }
            ]
        },
        {
            description: "FFFF 5555 6666 11 (any 3 suits)",
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
                    number: 6,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 1,
                    count: 1
                }
            ]
        },

        {
            description: "FFFF 5555 7777 12 (any 1 suit)",
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
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 1
                }
            ]
        },
        {
            description: "FFFF 5555 7777 12 (any 3 suits)",
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
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 2,
                    count: 1
                }
            ]
        },
        {
            description: "FFFF 5555 8888 13 (any 1 suits)",
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
                    number: 5,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 8,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 3,
                    count: 1
                }
            ]
        },
        {
            description: "FFFF 5555 8888 13 (any 3 suits)",
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
                    number: 8,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 1,
                    count: 1
                },
                {
                    suit: SUIT.VSUIT3,
                    number: 3,
                    count: 1
                }
            ]
        }
    ]
};

