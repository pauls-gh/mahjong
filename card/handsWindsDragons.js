import {SUIT, WIND, VNUMBER} from "../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsWindsDragons = [
    {
        description: "NNNN EEEE WWWW SS",
        vsuitCount: 0,
        concealed: false,
        odd: false,
        even: false,
        components: [
            {
                suit: SUIT.WIND,
                number: WIND.NORTH,
                count: 4
            },
            {
                suit: SUIT.WIND,
                number: WIND.EAST,
                count: 4
            },
            {
                suit: SUIT.WIND,
                number: WIND.WEST,
                count: 4
            },
            {
                suit: SUIT.WIND,
                number: WIND.SOUTH,
                count: 2
            }
        ]
    },
    {
        description: "NNNN DD DD DD SSSS  (3 suits)",
        vsuitCount: 3,
        concealed: false,
        odd: false,
        even: false,
        components: [
            {
                suit: SUIT.WIND,
                number: WIND.NORTH,
                count: 4
            },
            {
                suit: SUIT.WIND,
                number: WIND.SOUTH,
                count: 4
            },
            {
                suit: SUIT.VSUIT1_DRAGON,
                number: 0,
                count: 2
            },
            {
                suit: SUIT.VSUIT2_DRAGON,
                number: 0,
                count: 2
            },
            {
                suit: SUIT.VSUIT3_DRAGON,
                number: 0,
                count: 2
            }
        ]
    },
    {
        description: "EEEE DD DD DD WWWW  (3 suits)",
        vsuitCount: 3,
        concealed: false,
        odd: false,
        even: false,
        components: [
            {
                suit: SUIT.WIND,
                number: WIND.EAST,
                count: 4
            },
            {
                suit: SUIT.WIND,
                number: WIND.WEST,
                count: 4
            },
            {
                suit: SUIT.VSUIT1_DRAGON,
                number: 0,
                count: 2
            },
            {
                suit: SUIT.VSUIT2_DRAGON,
                number: 0,
                count: 2
            },
            {
                suit: SUIT.VSUIT3_DRAGON,
                number: 0,
                count: 2
            }
        ]
    },
    {
        description: "11 NNN 11 SSS 1111  (3 suits, any like odds)",
        vsuitCount: 3,
        concealed: true,
        odd: true,
        even: false,
        components: [
            {
                suit: SUIT.WIND,
                number: WIND.NORTH,
                count: 3
            },
            {
                suit: SUIT.WIND,
                number: WIND.SOUTH,
                count: 3
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
                count: 4
            }
        ]
    },
    {
        description: "22 EEE 22 WWW 2222  (3 suits, any like evens)",
        vsuitCount: 3,
        concealed: true,
        odd: false,
        even: true,
        components: [
            {
                suit: SUIT.WIND,
                number: WIND.EAST,
                count: 3
            },
            {
                suit: SUIT.WIND,
                number: WIND.WEST,
                count: 3
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
                count: 4
            }
        ]
    },
    {
        description: "FFF NNNN FFF SSSS",
        vsuitCount: 0,
        concealed: false,
        odd: false,
        even: false,
        components: [
            {
                suit: SUIT.FLOWER,
                number: 0,
                count: 6
            },
            {
                suit: SUIT.WIND,
                number: WIND.NORTH,
                count: 4
            },
            {
                suit: SUIT.WIND,
                number: WIND.SOUTH,
                count: 4
            }
        ]
    },
    {
        description: "FFF EEEE FFF WWWW",
        vsuitCount: 0,
        concealed: false,
        odd: false,
        even: false,
        components: [
            {
                suit: SUIT.FLOWER,
                number: 0,
                count: 6
            },
            {
                suit: SUIT.WIND,
                number: WIND.EAST,
                count: 4
            },
            {
                suit: SUIT.WIND,
                number: WIND.WEST,
                count: 4
            }
        ]
    },
    {
        description: "FF DDDD DDDD DDDD  (3 suits)",
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
                suit: SUIT.VSUIT1_DRAGON,
                number: 0,
                count: 4
            },
            {
                suit: SUIT.VSUIT2_DRAGON,
                number: 0,
                count: 4
            },
            {
                suit: SUIT.VSUIT3_DRAGON,
                number: 0,
                count: 4
            }
        ]
    }
];

