import {gGameLogic} from "./game.js";
import {
    STATE, PLAYER, SUIT, SPRITE_WIDTH,
    SPRITE_SCALE_X, SPRITE_SCALE_Y
} from "./constants.js";

// PRIVATE CONSTANTS


// PRIVATE GLOBALS


export class Hand {
    constructor(inputEnabled) {
        this.hiddenTileArray = [];
        this.exposedTileArray = [];
        this.inputEnabled = inputEnabled;
        this.selectCount = 0;
    }

    getLength() {
        return this.hiddenTileArray.length + this.exposedTileArray.length;
    }

    showHand(playerInfo) {
        // Calculate positions for all tiles in hand
        let offsetX = 0;
        let offsetY = 0;
        for (const tile of this.hiddenTileArray) {
            tile.sprite.x = playerInfo.x + offsetX;
            tile.sprite.y = playerInfo.y + offsetY;
            tile.sprite.angle = playerInfo.angle;
            if (playerInfo.id === PLAYER.BOTTOM) {
                tile.sprite.scale.set(1.0, 1.0);
            } else {
                tile.sprite.scale.set(SPRITE_SCALE_X, SPRITE_SCALE_Y);
            }
            tile.sprite.visible = true;

            switch (playerInfo.id) {
            case PLAYER.BOTTOM:
                offsetX += SPRITE_WIDTH;
                break;
            case PLAYER.TOP:
                offsetX += SPRITE_WIDTH * SPRITE_SCALE_X;
                break;
            case PLAYER.LEFT:
            case PLAYER.RIGHT:
            default:
                offsetY += SPRITE_WIDTH * SPRITE_SCALE_X;
                break;
            }
        }

        // Separate hidden and exposed tiles
        switch (playerInfo.id) {
        case PLAYER.BOTTOM:
            offsetX += SPRITE_WIDTH;
            break;
        case PLAYER.TOP:
            offsetX += SPRITE_WIDTH * SPRITE_SCALE_X;
            break;
        case PLAYER.LEFT:
        case PLAYER.RIGHT:
        default:
            offsetY += SPRITE_WIDTH * SPRITE_SCALE_X;
            break;
        }

        for (const tile of this.exposedTileArray) {
            tile.sprite.x = playerInfo.x + offsetX;
            tile.sprite.y = playerInfo.y + offsetY;
            tile.sprite.angle = playerInfo.angle;
            if (playerInfo.id === PLAYER.BOTTOM) {
                tile.sprite.scale.set(1.0, 1.0);
            } else {
                tile.sprite.scale.set(SPRITE_SCALE_X, SPRITE_SCALE_Y);
            }
            tile.sprite.visible = true;

            switch (playerInfo.id) {
            case PLAYER.BOTTOM:
                offsetX += SPRITE_WIDTH;
                break;
            case PLAYER.TOP:
                offsetX += SPRITE_WIDTH * SPRITE_SCALE_X;
                break;
            case PLAYER.LEFT:
            case PLAYER.RIGHT:
            default:
                offsetY += SPRITE_WIDTH * SPRITE_SCALE_X;
                break;
            }
        }
    }

    resetSelection() {
        if (this.selectCount === 0) {
            return;
        }

        window.document.getElementById("button1").disabled = true;

        for (const tile of this.hiddenTileArray) {
            if (tile.selected) {
                tile.selected = false;
                tile.sprite.y += 25;
                this.selectCount--;
            }
        }
    }

    // Return selected tiles.
    //  - will not remove from hand
    //  - will not unselect
    getSelection() {
        const tileArray = [];

        for (const tile of this.hiddenTileArray) {
            if (tile.selected) {
                tileArray.push(tile);
            }
        }

        return tileArray;
    }

    sortRank() {
        this.resetSelection();

        this.hiddenTileArray.sort((a, b) => {
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
        this.resetSelection();

        this.hiddenTileArray.sort((a, b) => {
            const vala = a.number + (a.suit * 10);
            const valb = b.number + (b.suit * 10);

            return vala - valb;
        });
    }

    insert(tile) {
        if (this.inputEnabled) {
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
                            this.selectCount--;
                            tile.selected = !tile.selected;
                        } else if (this.selectCount < maxSelect) {
                            let bSelectOk = true;

                            if (gGameLogic.state === STATE.LOOP_EXPOSE_TILES) {
                                // Selected tile must be a match for discardTile (or a joker) to form a pong/kong/quint
                                if (tile.suit !== SUIT.JOKER && 
                                    (tile.suit !== gGameLogic.discardTile.suit || tile.number !== gGameLogic.discardTile.number)) {
                                    bSelectOk = false;
                                    gGameLogic.displayErrorText(" Select same tile or joker to form pong/kong/quint ");
                                }
                            }

                            if (bSelectOk) {
                                sprite.y -= 25;
                                this.selectCount++;
                                tile.selected = !tile.selected;
                            }
                        }

                        if (this.selectCount > maxSelect || this.selectCount < minSelect) {
                            window.document.getElementById("button1").disabled = true;
                        } else {
                            window.document.getElementById("button1").disabled = false;
                        }
                    }
                }
            );
        }
        this.hiddenTileArray.push(tile);
    }

    remove(tile) {
        if (this.inputEnabled) {
            tile.selected = false;
            tile.sprite.events.onInputDown.removeAll();
            tile.sprite.inputEnabled = false;
        }

        // Remove tile from hand
        const index = this.hiddenTileArray.indexOf(tile);
        this.hiddenTileArray.splice(index, 1);

        return tile;
    }

    insertExposed(tileArray) {
        for (const tile of tileArray) {
            if (this.inputEnabled) {
                tile.selected = false;
                tile.sprite.events.onInputDown.removeAll();
                tile.sprite.inputEnabled = false;
            }
            this.exposedTileArray.push(tile);
        }
    }

    removeExposed(tile) {
        // Remove tile from hand
        const index = this.exposedTileArray.indexOf(tile);
        this.exposedTileArray.splice(index, 1);

        return tile;
    }

    insertCharlestonPass(pass) {
        for (const tile of pass) {
            this.insert(tile);
        }
    }

    removeCharlestonPass() {
        const pass = [];
        if (this.inputEnabled) {

            // Player 0 (human) pressed "Pass" button
            for (const tile of this.hiddenTileArray) {
                // Find 3 tiles picked by player 0 (human)
                if (tile.selected) {
                    pass.push(tile);
                }
            }

            // Remove from hand
            for (const tile of pass) {
                this.remove(tile);
            }

            // Reset selectCount
            this.selectCount = 0;
        } else {
            // Player 1-3
            // Todo - for now, just pick any 3 tiles. Need better logic
            pass.push(this.remove(this.hiddenTileArray[0]));
            pass.push(this.remove(this.hiddenTileArray[0]));
            pass.push(this.remove(this.hiddenTileArray[0]));
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
        const pass = [];
        if (this.inputEnabled) {

            // Player 0 (human) pressed "Pass" button
            for (const tile of this.hiddenTileArray) {
                // Find tiles picked by player 0 (human)
                if (tile.selected) {
                    pass.push(tile);
                }
            }

            // Remove from hand
            for (const tile of pass) {
                this.remove(tile);
            }

            // Reset selectCount
            this.selectCount = 0;
        } else {
            // Player 1-3
            // Todo - for now, just pick any maxCount tiles. Need better logic
            for (let i = 0; i < maxCount; i++) {
                pass.push(this.remove(this.hiddenTileArray[0]));
            }
        }

        return pass;
    }

    removeDiscard() {
        let tile = null;

        if (this.inputEnabled) {
            // Human player (0) pressed the discard button
            for (tile of this.hiddenTileArray) {
                // Find tiles picked by player 0 (human)
                if (tile.selected) {
                    break;
                }
            }
        } else {
            // Todo - for now, just return first tile.  need better algorithm
            tile = this.hiddenTileArray[0];
        }

        // Remove tile from hand
        this.remove(tile);

        // Reset selectCount
        this.selectCount = 0;

        return tile;
    }


}
