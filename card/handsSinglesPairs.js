import {SUIT, WIND, DRAGON, VNUMBER} from "../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsSinglesPairs = [
    {
        description: "NN EE WW SS 11 11 11 (3 suits, any like numbers)",
        vsuitCount: 3,
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
                suit: SUIT.VSUIT2,
                number: VNUMBER.CONSECUTIVE1,
                count: 2
            },
            {
                suit: SUIT.VSUIT3,
                number: VNUMBER.CONSECUTIVE1,
                count: 2
            }
        ]
    },
    {
        description: "11 22 33 44 55 66 77 (any 7 consecutive numbers in 1 suit)",
        vsuitCount: 1,
        concealed: true,
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
                suit: SUIT.VSUIT1,
                number: VNUMBER.CONSECUTIVE6,
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: VNUMBER.CONSECUTIVE7,
                count: 2
            }

        ]
    },
    {
        description: "336 33669 336699 (any 3 suits)",
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
            }
        ]
    },
    {
        description: "FF 22 4 6 88 22 4 6 88 (any 2 suits)",
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
                count: 2
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
                count: 2
            },
            {
                suit: SUIT.VSUIT2,
                number: 2,
                count: 2
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
                count: 2
            }
        ]
    },
    {
        description: "11 33 55 77 99 11 11 (3 suits, like odd pairs in opposite 2 suits)",
        vsuitCount: 3,
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
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 5,
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 7,
                count: 2
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
                suit: SUIT.VSUIT3,
                number: 1,
                count: 2
            }
        ]
    },
    {
        description: "11 33 55 77 99 33 33 (3 suits, like odd pairs in opposite 2 suits)",
        vsuitCount: 3,
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
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 5,
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 7,
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
                count: 2
            },
            {
                suit: SUIT.VSUIT3,
                number: 3,
                count: 2
            }
        ]
    },
    {
        description: "11 33 55 77 99 55 55 (3 suits, like odd pairs in opposite 2 suits)",
        vsuitCount: 3,
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
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 5,
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 7,
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 9,
                count: 2
            },
            {
                suit: SUIT.VSUIT2,
                number: 5,
                count: 2
            },
            {
                suit: SUIT.VSUIT3,
                number: 5,
                count: 2
            }
        ]
    },
    {
        description: "11 33 55 77 99 77 77 (3 suits, like odd pairs in opposite 2 suits)",
        vsuitCount: 3,
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
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 5,
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 7,
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 9,
                count: 2
            },
            {
                suit: SUIT.VSUIT2,
                number: 7,
                count: 2
            },
            {
                suit: SUIT.VSUIT3,
                number: 7,
                count: 2
            }
        ]
    },
    {
        description: "11 33 55 77 99 99 99 (3 suits, like odd pairs in opposite 2 suits)",
        vsuitCount: 3,
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
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 5,
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 7,
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
                count: 2
            },
            {
                suit: SUIT.VSUIT3,
                number: 9,
                count: 2
            }
        ]
    },
    {
        description: "FF 11 22 11 22 11 22 (3 suits, any 2 consecutive numbers)",
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
            }

        ]
    },
    {
        description: "FF 2017 DD 2017 DD  (bams and craks only)",
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
                suit: SUIT.BAM,
                number: 2,
                count: 1
            },
            {
                suit: SUIT.DRAGON,
                number: DRAGON.WHITE,
                count: 1
            },
            {
                suit: SUIT.BAM,
                number: 1,
                count: 1
            },
            {
                suit: SUIT.BAM,
                number: 7,
                count: 1
            },
            {
                suit: SUIT.DRAGON,
                number: DRAGON.GREEN,
                count: 2
            },
            {
                suit: SUIT.CHAR,
                number: 2,
                count: 1
            },
            {
                suit: SUIT.DRAGON,
                number: DRAGON.WHITE,
                count: 1
            },
            {
                suit: SUIT.CHAR,
                number: 1,
                count: 1
            },
            {
                suit: SUIT.CHAR,
                number: 7,
                count: 1
            },
            {
                suit: SUIT.DRAGON,
                number: DRAGON.RED,
                count: 2
            }
        ]
    }
];


