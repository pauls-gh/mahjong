import {SUIT, DRAGON, WIND, VNUMBER} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsQuints = {
    groupDescription: "Quints",
    hands: [
        {
            description: "NNNNN DDDD 11111 (any wind, any # any suit, kong any dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
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
            description: "NNNNN DDDD 11111 (any wind, any # any suit, kong any dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
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
            description: "NNNNN DDDD 11111 (any wind, any # any suit, kong any dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
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
            description: "NNNNN DDDD 11111 (any wind, any # any suit, kong any dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
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
            description: "NNNNN DDDD 11111 (any wind, any # any suit, kong any dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
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
            description: "NNNNN DDDD 11111 (any wind, any # any suit, kong any dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
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
            description: "NNNNN DDDD 11111 (any wind, any # any suit, kong any dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
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
            description: "NNNNN DDDD 11111 (any wind, any # any suit, kong any dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
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
            description: "NNNNN DDDD 11111 (any wind, any # any suit, kong any dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
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
            description: "NNNNN DDDD 11111 (any wind, any # any suit, kong any dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.EAST,
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
            description: "NNNNN DDDD 11111 (any wind, any # any suit, kong any dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.EAST,
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
            description: "NNNNN DDDD 11111 (any wind, any # any suit, kong any dragon)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.EAST,
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
            description: "11111 1111 11111 (3 suits, any like numbers)",
            vsuitCount: 3,
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
                    suit: SUIT.VSUIT2,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 4
                },
                {
                    suit: SUIT.VSUIT3,
                    number: VNUMBER.CONSECUTIVE1,
                    count: 5
                }
            ]
        },
        {
            description: "FF 11111 22 33333 (1 suit, 3 consecutive numbers)",
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
                    count: 5
                }

            ]
        },
        {
            description: "111 3333 55555 DD (1 suit)",
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
                    count: 5
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 2
                }
            ]
        },
        {
            description: "555 7777 99999 DD (1 suit)",
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
                    count: 5
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

