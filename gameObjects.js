import {game} from "./game.js";
import {SUIT, SPRITE_HEIGHT, SPRITE_WIDTH} from "./constants.js";

// PRIVATE CONSTANTS


// PRIVATE GLOBALS

const gTileGroups = [
    {
        suit: SUIT.CHAR,
        textArray: ["Char"],
        prefix: ["C"],
        maxNum: 9,
        count: 4
    },
    {
        suit: SUIT.BAM,
        textArray: ["Bam"],
        prefix: ["B"],
        maxNum: 9,
        count: 4
    },
    {
        suit: SUIT.DOT,
        textArray: ["Dot"],
        prefix: ["D"],
        maxNum: 9,
        count: 4
    },
    {
        suit: SUIT.WIND,
        textArray: ["North", "South", "West", "East"],
        prefix: [
            "N",
            "S",
            "W",
            "E"
        ],
        maxNum: 1,
        count: 4
    },
    {
        suit: SUIT.DRAGON,
        textArray: ["Red dragon", "Green dragon", "White dragon"],
        prefix: [
            "DC",
            "DB",
            "DD"
        ],
        maxNum: 1,
        count: 4
    },
    {
        suit: SUIT.FLOWER,
        textArray: ["Flower"],
        prefix: [
            "F1",
            "F2",
            "F3",
            "F4",
            "F1",
            "F2",
            "F3",
            "F4"
        ],
        maxNum: 1,
        count: 1
    },
    {
        suit: SUIT.JOKER,
        textArray: ["Joker"],
        prefix: "J",
        maxNum: 1,
        count: 8
    }
];

export class Tile {
    constructor(suit, number, spriteName) {
        this.suit = suit;
        this.number = number;
        this.sprite = null;
        this.spriteName = spriteName;
        this.origX = 0;
        this.origY = 0;
        this.selected = false;
        this.tween = null;
    }

    create() {
        this.sprite = game.add.sprite(0, 0, "tiles", this.spriteName);
        this.sprite.visible = false;
        this.sprite.anchor.setTo(0.5, 0.5);

        this.spriteBack = game.add.sprite(0, 0, "back");
        this.spriteBack.visible = false;
        this.spriteBack.anchor.setTo(0.5, 0.5);
    }

    get x() {
        return this.sprite.x;
    }

    get y() {
        return this.sprite.y;
    }

    get angle() {
        return this.sprite.angle;
    }

    set x(x) {        
        this.sprite.x = x;
        this.spriteBack.x = x;
    }

    set y(y) {
        this.sprite.y = y;
        this.spriteBack.y = y;
    }

    set angle(angle) {
        this.sprite.angle = angle;
        this.spriteBack.angle = angle;

    }

    set scale(scale) {
        this.sprite.scale.set(scale, scale);
        this.spriteBack.scale.set(scale, scale);
    }

    animate(x, y, angle) {
        const speed = 750;
        const distance = Math.hypot(x - this.sprite.x, y - this.sprite.y);
        const time = (distance * 1000 / speed);
        
        if (this.tween !== null) {
            // Cancel previous tween
            game.tweens.remove(this.tween);
        }

        this.sprite.bringToTop();
        this.spriteBack.bringToTop();

        this.tween = game.add.tween(this.sprite);
        
        if (this.sprite.angle === undefined) {
            this.angle = 0;
        }

        if (Phaser.Math.wrapAngle(this.sprite.angle) === Phaser.Math.wrapAngle(angle)) {
            this.angle = angle;
            this.tween.to(
                {
                    x: x,
                    y: y
                }, time, Phaser.Easing.Linear.None);       
        } else {
            this.tween.to(
                {
                    x: x,
                    y: y,
                    angle: angle
                }, time, Phaser.Easing.Linear.None);       
        }

        this.tween.onUpdateCallback(this.tweenUpdateCallback, this);
        this.tween.onComplete.add( () => {
            this.sprite.x = x;
            this.sprite.y = y;
            this.sprite.angle = angle;
            this.spriteBack.x = x;
            this.spriteBack.y = y;
            this.spriteBack.angle = angle;
        }, this);

        this.tween.start();
    }

    // Called at game update time
    tweenUpdateCallback() {
        // Make sure tile back sprite is also updated
        this.spriteBack.x = this.sprite.x;
        this.spriteBack.y = this.sprite.y;
        this.spriteBack.angle = this.sprite.angle;
    }

    showTile(visible, faceUp) {
        this.sprite.visible = false;
        this.spriteBack.visible = false;

        if (visible) {
            if (faceUp) {
                this.sprite.visible = true;
            } else {
                this.spriteBack.visible = true;
            }
        }

        // Debug - all tiles face up
        if (0) {
            this.sprite.visible = visible;
            this.spriteBack.visible = false;
        }
    }

    getText() {
        if (this.suit === SUIT.INVALID) {
            return "Invalid";
        }
        const group = gTileGroups[this.suit];
        let text = null;

        if (group.textArray.length === 1) {
            text = group.textArray[0];
        } else {
            text = group.textArray[this.number];
        }

        if (group.maxNum !== 1) {
            text = this.number + " " + text;
        }

        return text;
    }
}


export class Wall {
    constructor() {
        this.tileArray = [];
    }

    create() {
        // Create all 152 tiles
        for (const group of gTileGroups) {
            for (const prefix of group.prefix) {
                for (let num = 1; num <= group.maxNum; num++) {
                    let number = num;
                    if (group.maxNum === 1) {
                        if (group.suit === SUIT.FLOWER) {
                            // Number is irrelevant for flowers
                            number = 0;
                        } else {
                            number = group.prefix.indexOf(prefix);
                        }
                    }
                    let spriteName = prefix;
                    if (group.maxNum !== 1) {
                        spriteName = num + spriteName;
                    }
                    spriteName += ".png";

                    // Create duplicate tiles
                    for (let j = 0; j < group.count; j++) {
                        const tile = new Tile(group.suit, number, spriteName);
                        tile.create();
                        this.insert(tile);
                    }
                }
            }
        }

        console.log("Wall.create: Number of tiles = " + this.tileArray.length);
    }

    destroy() {
    }

    getCount() {
        return this.tileArray.length;
    }

    findAndRemove(findTile) {
        for (const tile of this.tileArray) {
            if (tile.suit === findTile.suit && tile.number === findTile.number) {
                // Remove tile from array
                const index = this.tileArray.indexOf(tile);
                this.tileArray.splice(index, 1);

                return tile;
            }
        }

        return null;
    }

    insert(tile) {
        tile.showTile(false, false);
        this.tileArray.push(tile);
    }

    remove() {
        const tile = this.tileArray.pop();

        return tile;
    }

    shuffle() {
        // Fisher-Yates shuffle
        const array = this.tileArray;
        for (let i = array.length - 1; i > 0; i -= 1) {
            const j = Math.floor(Math.random() * (i + 1))
            const temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    }

    showWall() {
        const DISCARD_SCALE = 0.6;

        // Calculate positions for all discarded tiles
        let offsetX = 200;
        let offsetY = 200;
        for (const tile of this.tileArray) {
            //tile.x = offsetX;
            //tile.y = offsetY;
            //tile.angle = 0;
            tile.animate(offsetX, offsetY, 0);
            tile.scale = DISCARD_SCALE;
            tile.showTile(true, false);

            offsetX += SPRITE_WIDTH * DISCARD_SCALE;

            if (offsetX > 800) {
                offsetX = 200;
                offsetY += SPRITE_HEIGHT * DISCARD_SCALE;
            }
        }

        // Return position where discarded tiles should start
        if (offsetX !== 200) {
            offsetY += SPRITE_HEIGHT * DISCARD_SCALE;
        }
        return { offsetX:200, offsetY};
    }    
}

export class Discards {
    constructor() {
        this.tileArray = [];
    }

    insertDiscard(tile) {
        this.tileArray.push(tile);
    }

    showDiscards(offsetX, offsetY) {
        // Calculate positions for all discarded tiles
        for (const tile of this.tileArray) {
            const DISCARD_SCALE = 0.6;
            //tile.x = offsetX;
            //tile.y = offsetY;
            //tile.angle = 0;
            tile.animate(offsetX, offsetY, 0);
            tile.scale = DISCARD_SCALE;
            tile.showTile(true, true);

            offsetX += SPRITE_WIDTH * DISCARD_SCALE;

            if (offsetX > 800) {
                offsetX = 200;
                offsetY += SPRITE_HEIGHT * DISCARD_SCALE;
            }
        }
    }
}
