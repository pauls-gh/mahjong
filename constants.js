// CONSTANTS
export const WINDOW_HEIGHT = 648,
    WINDOW_WIDTH = 1052,
    SPRITE_HEIGHT = 69,
    SPRITE_WIDTH = 52,
    SPRITE_SCALE_X = 0.75,
    SPRITE_SCALE_Y = 0.75;

// Game state
export const STATE = {
    // INIT - create wall, shuffle tiles
    INIT: 0,
    // START  - start game
    START: 1,
    // DEAL - deal tiles
    DEAL: 2,
    // CHARLESTON 1
    CHARLESTON1: 3,
    // Ask user whether to continue charleston
    CHARLESTON_QUERY: 4,
    CHARLESTON_QUERY_COMPLETE: 5,
    // CHARLSTON 2
    CHARLESTON2: 6,
    // COURTESY_QUERY
    COURTESY_QUERY: 7,
    COURTESY_QUERY_COMPLETE: 8,
    // COURTESEY
    COURTESY: 9,
    COURTESY_COMPLETE: 10,
    // LOOP - main game logic loop (remove tile from wall, discard from hand, query discard)
    LOOP_PICK_FROM_WALL: 11,
    LOOP_CHOOSE_DISCARD: 12,
    LOOP_QUERY_CLAIM_DISCARD: 13,
    LOOP_QUERY_CLAIM_DISCARD_COMPLETE: 14,
    LOOP_EXPOSE_TILES: 15,
    LOOP_EXPOSE_TILES_COMPLETE: 16,
    // END - end game (mahjong, wall game, quit, cleanup)
    END: 17
}

export const PLAYER_OPTION = {
    EXPOSE_TILES: 0,
    DISCARD_TILE: 1,
    MAHJONG: 2
}

// Player
export const PLAYER = {
    BOTTOM: 0,
    RIGHT: 1,
    TOP: 2,
    LEFT: 3
}

// Suit types
export const SUIT = {
    CHAR: 0,
    BAM: 1,
    DOT: 2,
    WIND: 3,
    DRAGON: 4,
    FLOWER: 5,
    JOKER: 6,
    // Virtual suits used to describe legal hands
    VSUIT1: 7,
    VSUIT2: 8,
    VSUIT3: 9,
    VSUIT1_DRAGON: 10,
    VSUIT2_DRAGON: 11,
    VSUIT3_DRAGON: 12
}

export const VNUMBER = {
    // 0 - not used
    // 1-9 reserved for normal numbers (char, bam, dot)
    CONSECUTIVE1: 10,
    CONSECUTIVE2: 11,
    CONSECUTIVE3: 12,
    CONSECUTIVE4: 13,
    CONSECUTIVE5: 14,
    CONSECUTIVE6: 15,
    CONSECUTIVE7: 16
}

// Winds
export const WIND = {
    NORTH: 0,
    SOUTH: 1,
    WEST: 2,
    EAST: 3
}

// Dragons
// Note - dragon ordering matches SUIT ordering.  e.g. red = char = 0
export const DRAGON = {
    // Char
    RED: 0,
    // Bamboo
    GREEN: 1,
    // Dot
    WHITE: 2
}

