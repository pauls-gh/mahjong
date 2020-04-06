import {SUIT, WIND, DRAGON, VNUMBER} from "../../constants.js";

// Rules for describing hands
//  - put exact singles (non-virtual suit) first in components array
//      (E.g. single white dragon used as 0)

export const handsWindsDragons = {
    groupDescription: "Winds and Dragons",
    hands: [
        {
            description: "NNNN EEE WWW SSSS",
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
                    count: 3
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
                    count: 3
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
                    count: 4
                }
            ]
        },        
        {
            description: "FF DDDD NEWS DDDD (Kongs - any 2 dragons)",
            vsuitCount: 2,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
                    count: 1
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.EAST,
                    count: 1
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
                    count: 1
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
                    count: 1
                },
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
            ]
        },        
        {
            description: "NNNN 11 11 11 SSSS (Any like odd nos. in 3 suits)",
            vsuitCount: 3,
            concealed: false,
            odd: true,
            even: false,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
                    count: 4
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
                },                
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
                    count: 4
                }
            ]
        },
        {
            description: "EEEE 22 22 22 WWWW (Any like even nos. in 3 suits)",
            vsuitCount: 3,
            concealed: false,
            odd: false,
            even: true,
            components: [
                {
                    suit: SUIT.WIND,
                    number: WIND.EAST,
                    count: 4
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
                },                
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
                    count: 4
                }
            ]
        },
        {
            description: "NN EEE DDDD WWW SS (Kong any dragon)",
            vsuitCount: 1,
            concealed: false,
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
                    count: 3
                },
                {
                    suit: SUIT.VSUIT1_DRAGON,
                    number: 0,
                    count: 4
                },                
                {
                    suit: SUIT.WIND,
                    number: WIND.WEST,
                    count: 3
                },
                {
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
                    count: 2
                }
            ]
        },        
        {
            description: "FF NNNN 2020 SSSS (2s any 1 suit)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 2
                },         
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
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
                },
                {
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 2
                } 
            ]
        },         
        {
            description: "FF EEEE 2020 WWWW (2s any 1 suit)",
            vsuitCount: 1,
            concealed: false,
            odd: false,
            even: false,
            components: [
                {
                    suit: SUIT.DRAGON,
                    number: DRAGON.WHITE,
                    count: 2
                },     
                {
                    suit: SUIT.FLOWER,
                    number: 0,
                    count: 2
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
                    suit: SUIT.VSUIT1,
                    number: 2,
                    count: 2
                } 
            ]
        },                               
        {
            description: "FF NNN EEE WWW SSS",
            vsuitCount: 0,
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
                    suit: SUIT.WIND,
                    number: WIND.NORTH,
                    count: 3
                },
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
                    suit: SUIT.WIND,
                    number: WIND.SOUTH,
                    count: 3
                }
            ]
        }
    ]
};

