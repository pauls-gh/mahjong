import {gGameLogic} from "./game.js";
import {
    STATE, PLAYER, SUIT, SPRITE_WIDTH,
    SPRITE_SCALE, WINDOW_WIDTH, WINDOW_HEIGHT
} from "./constants.js";

// PRIVATE CONSTANTS


// PRIVATE GLOBALS

export class TileSet {
    constructor(inputEnabled) {
        this.tileArray = [];
        this.inputEnabled = inputEnabled;
        this.selectCount = 0;
    }

    getLength() {
        return this.tileArray.length;
    }

    // Return tileset as simple array of tiles
    getTileArray() {
        const temp = [];

        for (const tile of this.tileArray) {
            temp.push(tile);
        }

        return temp;
    }

    reset(wall) {
        // Reset tileset - return all tiles to wall
        while (this.tileArray.length) {
            const tile = this.tileArray[0];
            this.remove(tile);
            wall.insert(tile);
        }
    }

    resetSelection() {
        if (this.selectCount === 0) {
            return;
        }

        window.document.getElementById("button1").disabled = true;

        for (const tile of this.tileArray) {
            if (tile.selected) {
                tile.selected = false;
                tile.x = tile.origX;
                tile.y = tile.origY;
                this.selectCount--;
            }
        }
    }

    getSelection() {
        const temp = [];

        for (const tile of this.tileArray) {
            if (tile.selected) {
                temp.push(tile);
            }
        }

        return temp;
    }

    getSelectionCount() {
        let count = 0;
        for (const tile of this.tileArray) {
            if (tile.selected) {
                count++;
            }
        }

        return count;
    }

    sortRank() {
        this.tileArray.sort((a, b) => {
            let vala = a.number;
            let valb = b.number;

            if (a.suit > SUIT.DOT) {
                // Sort order of winds dragons is > char/bam/dot
                vala += 10 + (a.suit * 10);
            } else {
                // Add suit to number to make sure char/bam/dot are grouped together
                vala += a.suit;
            }
            if (b.suit > SUIT.DOT) {
                valb += 10 + (b.suit * 10);
            } else {
                valb += b.suit;
            }

            return vala - valb;
        });

        this.moveFlowerToFront();
        this.moveJokerToFront();
    }

    sortSuit() {
        this.tileArray.sort((a, b) => {
            const vala = a.number + (a.suit * 10);
            const valb = b.number + (b.suit * 10);

            return vala - valb;
        });

        this.moveFlowerToFront();
        this.moveJokerToFront();
    }

    moveJokerToFront() {
        let jokers = [];

        for (const tile of this.tileArray) {
            if (tile.suit == SUIT.JOKER) {
                jokers.unshift(tile);
            }
        }

        for (const tile of jokers) {
            // Remove tile
            this.tileArray.splice(this.tileArray.indexOf(tile), 1);
            // Insert in front of array
            this.tileArray.unshift(tile);
        }
    }

    moveFlowerToFront() {
        let flowers = [];

        for (const tile of this.tileArray) {
            if (tile.suit == SUIT.FLOWER) {
                flowers.unshift(tile);
            }
        }

        for (const tile of flowers) {
            // Remove tile
            this.tileArray.splice(this.tileArray.indexOf(tile), 1);
            // Insert in front of array
            this.tileArray.unshift(tile);
        }
    }

    getTileWidth(playerInfo) {
        let width = 0;

        switch (playerInfo.id) {
        case PLAYER.BOTTOM:
            width = SPRITE_WIDTH;
            break;
        case PLAYER.TOP:
        case PLAYER.LEFT:
        case PLAYER.RIGHT:
        default:
            width = SPRITE_WIDTH * SPRITE_SCALE;
            break;
        }

        return width;
    }

    getWidth(playerInfo) {
        // Width of tileset
        return this.tileArray.length * this.getTileWidth(playerInfo);

    }

    // Returns updated x, y
    showTileSet(playerInfo, posX, posY, exposed) {

        let x = posX;
        let y = posY;
        const tileWidth = this.getTileWidth(playerInfo);

        for (const tile of this.tileArray) {
            //tile.x = x;
            //tile.y = y;
            //tile.angle = playerInfo.angle;
            tile.animate(x, y, playerInfo.angle);
            if (playerInfo.id === PLAYER.BOTTOM) {
                tile.scale = 1.0;
            } else {
                tile.scale = SPRITE_SCALE;
            }

            if (playerInfo.id === PLAYER.BOTTOM) {
                tile.showTile(true, true);
            } else {
                tile.showTile(true, exposed);
            }

            switch (playerInfo.id) {
            case PLAYER.BOTTOM:
                x += tileWidth;
                break;
            case PLAYER.TOP:
                x -= tileWidth;
                break;
            case PLAYER.LEFT:
                y += tileWidth;
                break;
            case PLAYER.RIGHT:
            default:
                y -= tileWidth;
                break;
            }
        }

        return {
            x,
            y
        };
    }

    insert(tile) {
        this.tileArray.push(tile);
    }

    remove(tile) {

        if (this.inputEnabled) {
            tile.selected = false;
            tile.sprite.events.onInputDown.removeAll();
            tile.sprite.inputEnabled = false;
        }
        const index = this.tileArray.indexOf(tile);
        if (index !== -1) {
            this.tileArray.splice(index, 1);
        }

        return tile;
    }
}

export class Hand {
    constructor(inputEnabled) {
        this.hiddenTileSet = new TileSet(inputEnabled);
        this.exposedTileSetArray = [];
        // When adding new variables, make sure to update dupHand()
    }

    // Duplicate hand
    // - hiddenTileSet and exposedTileSetArray can then be freely manipulated
    dupHand() {
        const newHand = new Hand(false);

        for (const tile of this.hiddenTileSet.tileArray) {
            newHand.hiddenTileSet.tileArray.push(tile);
        }

        for (const tileset of this.exposedTileSetArray) {
            const newTileSet = new TileSet(false);
            for (const tile of tileset.tileArray) {
                newTileSet.insert(tile);
            }
            newHand.exposedTileSetArray.push(newTileSet);
        }

        return newHand;
    }

    getLength() {
        let length = 0;

        length += this.hiddenTileSet.getLength();
        for (const tileset of this.exposedTileSetArray) {
            length += tileset.getLength();
        }

        return length;
    }

    // Return hand as simple array of tiles
    getTileArray() {
        let temp = [];

        temp = temp.concat(this.hiddenTileSet.getTileArray());

        for (const tileset of this.exposedTileSetArray) {
            temp = temp.concat(tileset.getTileArray());
        }

        return temp;
    }

    getHiddenTileArray() {
        return this.hiddenTileSet.getTileArray();
    }

    isAllHidden() {
        let length = 0;

        for (const tileset of this.exposedTileSetArray) {
            length += tileset.getLength();
        }

        if (length === 0) {
            return true;
        }

        return false;
    }

    // Return array of joker tiles (if any).  Does NOT remove from hidden tileset.
    getHiddenJokers() {
        const jokerArray = [];
        for (const tile of this.hiddenTileSet.tileArray) {
            if (tile.suit === SUIT.JOKER) {
                jokerArray.push(tile);
            }
        }

        return jokerArray;
    }

    reset(wall) {
        // Reset hand - return all tiles to wall
        this.hiddenTileSet.reset(wall);

        for (const tileset of this.exposedTileSetArray) {
            tileset.reset(wall);
        }
        this.exposedTileSetArray = [];
    }

    getSeperatorDistance(playerInfo) {
        let seperatorDistance = 0;
        const separatorScale = 0.2;

        // Separate hidden and exposed tiles
        switch (playerInfo.id) {
        case PLAYER.BOTTOM:
            seperatorDistance = SPRITE_WIDTH * separatorScale;
            break;
        case PLAYER.TOP:
        case PLAYER.LEFT:
        case PLAYER.RIGHT:
        default:
            seperatorDistance = SPRITE_WIDTH * SPRITE_SCALE * separatorScale;
            break;
        }

        return seperatorDistance;
    }

    getHandWidth(playerInfo) {
        let width = 0;
        const sepDist = this.getSeperatorDistance(playerInfo);

        width += this.hiddenTileSet.getWidth(playerInfo);
        for (const tileset of this.exposedTileSetArray) {
            width += sepDist;
            width += tileset.getWidth(playerInfo);
        }

        return width;
    }

    showHand(playerInfo, forceFaceup) {
        // Calculate starting position for all tiles in hand
        let x = playerInfo.x;
        let y = playerInfo.y;

        const handWidth = this.getHandWidth(playerInfo);
        const tileWidth = this.hiddenTileSet.getTileWidth(playerInfo);

        switch (playerInfo.id) {
        case PLAYER.BOTTOM:
            x = (WINDOW_WIDTH / 2) - (handWidth / 2) + (tileWidth / 2);
            break;
        case PLAYER.TOP:
            x = (WINDOW_WIDTH / 2) + (handWidth / 2) - (tileWidth / 2);
            break;
        case PLAYER.LEFT:
            y = (WINDOW_HEIGHT / 2) - (handWidth / 2) + (tileWidth / 2);
            break;
        case PLAYER.RIGHT:
        default:
            y = (WINDOW_HEIGHT / 2) + (handWidth / 2) - (tileWidth / 2);
            break;
        }

        // Display all tilesets
        let exposed = false;
        if (forceFaceup) {
            exposed = true;
        }
        ({x, y} = this.hiddenTileSet.showTileSet(playerInfo, x, y, exposed));

        for (const tileset of this.exposedTileSetArray) {
            const sepDist = this.getSeperatorDistance(playerInfo);

            // Separate hidden and exposed tiles
            switch (playerInfo.id) {
            case PLAYER.BOTTOM:
                x += sepDist;
                break;
            case PLAYER.TOP:
                x -= sepDist;
                break;
            case PLAYER.LEFT:
                y += sepDist;
                break;
            case PLAYER.RIGHT:
            default:
                y -= sepDist;
                break;
            }

            ({x, y} = tileset.showTileSet(playerInfo, x, y, true));
        }
    }

    resetSelection() {
        this.hiddenTileSet.resetSelection();

        for (const tileset of this.exposedTileSetArray) {
            tileset.resetSelection();
        }
    }

    // Return selected tiles from hidden group
    //  - will not remove from hand
    //  - will not unselect
    getSelectionHidden() {
        return this.hiddenTileSet.getSelection();
    }

    getSelectionHiddenCount() {
        return this.hiddenTileSet.getSelectionCount();
    }

    sortRankHidden() {
        this.resetSelection();
        this.hiddenTileSet.sortRank();
    }

    sortSuitHidden() {
        this.resetSelection();
        this.hiddenTileSet.sortSuit();
    }

    insertHidden(tile) {
        const tileSet = this.hiddenTileSet;

        if (tileSet.inputEnabled) {
            tile.sprite.inputEnabled = true;
            tile.sprite.events.onInputDown.add(
                (sprite) => {

                    let maxSelect = 3;
                    let minSelect = 3;

                    switch (gGameLogic.state) {
                    case STATE.LOOP_CHOOSE_DISCARD:
                        maxSelect = 1;
                        minSelect = 1;
                        break;
                    case STATE.CHARLESTON1:
                    case STATE.CHARLESTON2:
                        maxSelect = 3;
                        minSelect = 3;
                        break;
                    case STATE.COURTESY:
                        maxSelect = gGameLogic.table.player02CourtesyVote;
                        minSelect = gGameLogic.table.player02CourtesyVote;
                        break;

                    case STATE.LOOP_EXPOSE_TILES:
                        maxSelect = 4;
                        minSelect = 2;
                        break;

                    default:
                        maxSelect = 0;
                        minSelect = 0;
                        break;
                    }

                    if (maxSelect) {
                        if (tile.selected) {
                            tile.x = tile.origX;
                            tile.y = tile.origY;
                            tileSet.selectCount--;
                            tile.selected = !tile.selected;
                        } else if (tileSet.selectCount < maxSelect) {
                            let bSelectOk = true;

                            if (gGameLogic.state === STATE.LOOP_EXPOSE_TILES) {
                                // Selected tile must be a match for discardTile (or a joker) to form a pong/kong/quint
                                if (tile.suit !== SUIT.JOKER &&
                                    (tile.suit !== gGameLogic.discardTile.suit || tile.number !== gGameLogic.discardTile.number)) {
                                    bSelectOk = false;
                                    gGameLogic.displayErrorText(" Select same tile or joker to form pong/kong/quint ");
                                }
                            }

                            if (gGameLogic.state === STATE.CHARLESTON1 || gGameLogic.state === STATE.CHARLESTON2 ||
                                gGameLogic.state === STATE.COURTESY) {
                                if (tile.suit === SUIT.JOKER) {
                                    bSelectOk = false;
                                    gGameLogic.displayErrorText(" Joker cannot be passed during Charleston ");
                                }
                            }

                            if (bSelectOk) {
                                tile.origX = tile.x;
                                tile.origY = tile.y;
                                tile.y -= 25;
                                tileSet.selectCount++;
                                tile.selected = !tile.selected;
                            }
                        }

                        if (tileSet.selectCount > maxSelect || tileSet.selectCount < minSelect) {
                            window.document.getElementById("button1").disabled = true;
                        } else {
                            window.document.getElementById("button1").disabled = false;
                        }
                    }
                }
            );
        }

        tileSet.insert(tile);
    }

    removeHidden(tile) {
        // Remove tile from hidden tile set
        return this.hiddenTileSet.remove(tile);
    }

    getSelectionExposedCount() {
        let count = 0;
        for (const tileset of this.exposedTileSetArray) {
            count += tileset.getSelectionCount();
        }

        return count;
    }

    // Input - pong/kong/quint
    insertExposed(tileArray) {
        let uniqueTile = null;

        // Create new "exposed" TileSet
        const tileSet = new TileSet(true);

        for (const tile of tileArray) {
            tileSet.insert(tile);

            if (!uniqueTile && tile.suit !== SUIT.JOKER) {
                uniqueTile = tile;
            }
        }

        // Add new TileSet to "exposed" TileSet array
        this.exposedTileSetArray.push(tileSet);

        // To support swapping for exposed jokers, add tile button press handler for jokers only
        for (const tile of tileArray) {
            if (tile.suit === SUIT.JOKER) {
                tile.sprite.inputEnabled = true;
                tile.sprite.events.onInputDown.add(
                    (sprite) => {
                        let maxSelect = 1;
                        let minSelect = 1;

                        switch (gGameLogic.state) {
                        case STATE.LOOP_CHOOSE_DISCARD:
                            maxSelect = 1;
                            minSelect = 1;
                            break;
                        default:
                            maxSelect = 0;
                            minSelect = 0;
                            break;
                        }

                        if (maxSelect) {
                            if (tile.selected) {
                                tile.x = tile.origX;
                                tile.y = tile.origY;
                                tileSet.selectCount--;
                                tile.selected = !tile.selected;
                            } else if (tileSet.selectCount < maxSelect) {
                                let bSelectOk = true;

                                // Allow selection of joker (in any player's exposed tiles), if
                                // 1.  User has one hidden tile selected
                                // 2.  User's selected tile matches the non-jokers in an exposed pong/kong/quint containing this joker
                                //     Note that the exposed pong/kong/quint can be from player 0 - 3
                                if (gGameLogic.table.players[PLAYER.BOTTOM].hand.getSelectionHiddenCount() !== 1) {
                                    bSelectOk = false;
                                    gGameLogic.displayErrorText(" To swap for an exposed joker, please select a hidden tile first ");
                                } else if (this.getSelectionExposedCount() > 0) {
                                    bSelectOk = false;
                                    gGameLogic.displayErrorText(" Only one joker can be selected ");
                                } else {
                                    // One hidden tile selected - get tile
                                    const hiddenTileArray = gGameLogic.table.players[PLAYER.BOTTOM].hand.getSelectionHidden();
                                    const hiddenTile = hiddenTileArray[0];

                                    if (uniqueTile) {
                                        if (hiddenTile.suit !== uniqueTile.suit || hiddenTile.number !== uniqueTile.number) {
                                            bSelectOk = false;
                                            gGameLogic.displayErrorText(" To swap for an exposed joker, tile must match exposed pong/kong/quint ");
                                        }
                                    } else {
                                        bSelectOk = false;
                                    }
                                }

                                if (bSelectOk) {
                                    tile.origX = tile.x;
                                    tile.origY = tile.y;

                                    switch (tile.angle) {
                                    case 270:
                                        // Player 1  (right)
                                        tile.x -= 25;
                                        break;
                                    case 180:
                                        // Player 2 (top)
                                        tile.y += 25;
                                        break;
                                    case 90:
                                        // Player 3  (left)
                                        tile.x += 25;
                                        break;
                                    case 0:
                                    default:
                                        // Player 0 (bottom)
                                        tile.y -= 25;
                                        break;
                                    }
                                    tileSet.selectCount++;
                                    tile.selected = !tile.selected;
                                }
                            }

                            // Joker exchange button
                            if (tileSet.selectCount > maxSelect || tileSet.selectCount < minSelect) {
                                window.document.getElementById("button2").disabled = true;
                            } else {
                                window.document.getElementById("button2").disabled = false;
                            }
                        }
                    }
                );
            }
        }
    }

    // Remove selected tile and reset selection (hiddenTileSet only)
    // NOTE - only call for PLAYER.BOTTOM (user)
    removeDiscard() {
        let tile = null;

        if (this.hiddenTileSet.inputEnabled) {
            // Human player (0) pressed the discard button
            const selectedTiles = this.hiddenTileSet.getSelection();
            tile = selectedTiles[0];

            // Reset selectCount
            this.hiddenTileSet.resetSelection();
        }
        // Remove tile from tile set
        this.removeHidden(tile);

        return tile;
    }


}
