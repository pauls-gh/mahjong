import {SUIT} from "../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const hands13579 = [
    {
        description: "11 333 5555 777 99 (1 suit)",
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
                count: 3
            },
            {
                suit: SUIT.VSUIT1,
                number: 5,
                count: 4
            },
            {
                suit: SUIT.VSUIT1,
                number: 7,
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
        description: "111 3333 333 5555 (2 suits)",
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
                count: 4
            },
            {
                suit: SUIT.VSUIT2,
                number: 3,
                count: 3
            },
            {
                suit: SUIT.VSUIT2,
                number: 5,
                count: 4
            }
        ]
    },
    {
        description: "555 7777 777 9999 (2 suits)",
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
                count: 4
            },
            {
                suit: SUIT.VSUIT2,
                number: 7,
                count: 3
            },
            {
                suit: SUIT.VSUIT2,
                number: 9,
                count: 4
            }
        ]
    },
    {
        description: "11 33 333 555 DDDD (3 suits)",
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
                number: 3,
                count: 3
            },
            {
                suit: SUIT.VSUIT2,
                number: 5,
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
        description: "55 77 777 999 DDDD (3 suits)",
        vsuitCount: 3,
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
                number: 7,
                count: 2
            },
            {
                suit: SUIT.VSUIT2,
                number: 7,
                count: 3
            },
            {
                suit: SUIT.VSUIT2,
                number: 9,
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
        description: "1111 33 55 77 9999 (2 suits)",
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
                count: 2
            },
            {
                suit: SUIT.VSUIT2,
                number: 5,
                count: 2
            },
            {
                suit: SUIT.VSUIT2,
                number: 7,
                count: 2
            },
            {
                suit: SUIT.VSUIT1,
                number: 9,
                count: 4
            }
        ]
    },
    {
        description: "11 33 111 333 5555 (3 suits)",
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
                number: 1,
                count: 3
            },
            {
                suit: SUIT.VSUIT2,
                number: 3,
                count: 3
            },
            {
                suit: SUIT.VSUIT3,
                number: 5,
                count: 4
            }
        ]
    },
    {
        description: "55 77 555 777 9999 (3 suits)",
        vsuitCount: 3,
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
                number: 7,
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
        description: "111 3 555 555 7 999 (2 suits)",
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
                count: 1
            },
            {
                suit: SUIT.VSUIT1,
                number: 5,
                count: 3
            },
            {
                suit: SUIT.VSUIT2,
                number: 5,
                count: 3
            },
            {
                suit: SUIT.VSUIT2,
                number: 7,
                count: 1
            },
            {
                suit: SUIT.VSUIT2,
                number: 9,
                count: 3
            }
        ]
    }


];

