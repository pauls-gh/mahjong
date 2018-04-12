import {gGameLogic} from "./game.js";
import {
    STATE, PLAYER, SUIT, SPRITE_WIDTH,
    SPRITE_SCALE_X, SPRITE_SCALE_Y
} from "./constants.js";

// PRIVATE CONSTANTS


// PRIVATE GLOBALS

class TileSet {
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
            wall.insert(this.remove(this.tileArray[0]));
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
                tile.sprite.y += 25;
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
    }

    sortSuit() {
        this.tileArray.sort((a, b) => {
            const vala = a.number + (a.suit * 10);
            const valb = b.number + (b.suit * 10);

            return vala - valb;
        });
    }

    // Returns updated x, y
    showTileSet(playerInfo, posX, posY) {

        let x = posX;
        let y = posY;

        for (const tile of this.tileArray) {
            tile.sprite.x = x;
            tile.sprite.y = y;
            tile.sprite.angle = playerInfo.angle;
            if (playerInfo.id === PLAYER.BOTTOM) {
                tile.sprite.scale.set(1.0, 1.0);
            } else {
                tile.sprite.scale.set(SPRITE_SCALE_X, SPRITE_SCALE_Y);
            }
            tile.sprite.visible = true;

            switch (playerInfo.id) {
            case PLAYER.BOTTOM:
                x += SPRITE_WIDTH;
                break;
            case PLAYER.TOP:
                x += SPRITE_WIDTH * SPRITE_SCALE_X;
                break;
            case PLAYER.LEFT:
            case PLAYER.RIGHT:
            default:
                y += SPRITE_WIDTH * SPRITE_SCALE_X;
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
        this.tileArray.splice(index, 1);

        return tile;
    }
}

export class Hand {
    constructor(inputEnabled) {
        this.hiddenTileSet = new TileSet(inputEnabled);
        this.exposedTileSetArray = [];
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

    reset(wall) {
        // Reset hand - return all tiles to wall
        this.hiddenTileSet.reset(wall);

        for (const tileset of this.exposedTileSetArray) {
            tileset.reset(wall);
        }
    }

    showHand(playerInfo) {
        // Calculate positions for all tiles in hand
        let x = playerInfo.x;
        let y = playerInfo.y;

        // Display all tilesets
        ({x, y} = this.hiddenTileSet.showTileSet(playerInfo, x, y));

        for (const tileset of this.exposedTileSetArray) {
            // Separate hidden and exposed tiles
            switch (playerInfo.id) {
            case PLAYER.BOTTOM:
                x += SPRITE_WIDTH;
                break;
            case PLAYER.TOP:
                x += SPRITE_WIDTH * SPRITE_SCALE_X;
                break;
            case PLAYER.LEFT:
            case PLAYER.RIGHT:
            default:
                y += SPRITE_WIDTH * SPRITE_SCALE_X;
                break;
            }

            ({x, y} = tileset.showTileSet(playerInfo, x, y));
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
                            sprite.y += 25;
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
                                sprite.y -= 25;
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
                                sprite.y += 25;
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
                                    sprite.y -= 25;
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

    insertCharlestonPass(pass) {
        for (const tile of pass) {
            this.insert(tile);
        }
    }

    removeCharlestonPass() {
        let pass = [];
        if (this.hiddenTileSet.inputEnabled) {

            // Player 0 (human) pressed "Pass" button
            // Get 3 tiles picked by player 0 (human)
            pass = this.hiddenTileSet.getSelection();

            // Reset selectCount
            this.hiddenTileSet.resetSelection();

            // Remove from tile set
            for (const tile of pass) {
                this.hiddenTileSet.remove(tile);
            }

        } else {
            // Player 1-3
            // TODO - for now, just pick any 3 tiles. Need better logic
            pass.push(this.hiddenTileSet.remove(this.hiddenTileSet.tileArray[0]));
            pass.push(this.hiddenTileSet.remove(this.hiddenTileSet.tileArray[0]));
            pass.push(this.hiddenTileSet.remove(this.hiddenTileSet.tileArray[0]));
        }

        return pass;
    }

    courtesyVote() {
        // Todo - improve algorithm
        return 3;
    }


    insertCourtesyPass(pass) {
        for (const tile of pass) {
            this.insert(tile);
        }
    }

    removeCourtesyPass(maxCount) {
        let pass = [];
        if (this.hiddenTileSet.inputEnabled) {

            // Player 0 (human) pressed "Pass" button
            pass = this.hiddenTileSet.getSelection();

            // Reset selectCount
            this.hiddenTileSet.resetSelection();

            // Remove from tile set
            for (const tile of pass) {
                this.hiddenTileSet.remove(tile);
            }

        } else {
            // Player 1-3
            // Todo - for now, just pick any maxCount tiles. Need better logic
            for (let i = 0; i < maxCount; i++) {
                pass.push(this.hiddenTileSet.remove(this.hiddenTileSet.tileArray[0]));
            }
        }

        return pass;
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
