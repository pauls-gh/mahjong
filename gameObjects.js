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
        this.x = 0;
        this.y = 0;
        this.selected = false;
    }

    create() {
        this.sprite = game.add.sprite(this.x, this.y, "tiles", this.spriteName);
        this.sprite.visible = false;
        this.sprite.anchor.setTo(0.5, 0.5);
    }

    getText() {
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
                        number = group.prefix.indexOf(prefix);
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

    insert(tile) {
        tile.sprite.visible = false;
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
}

export class Discards {
    constructor() {
        this.tileArray = [];
    }

    insertDiscard(tile) {
        this.tileArray.push(tile);
    }

    showDiscards() {
        // Calculate positions for all discarded tiles
        let offsetX = 200;
        let offsetY = 200;
        for (const tile of this.tileArray) {
            const DISCARD_SCALE = 0.5;
            tile.sprite.x = offsetX;
            tile.sprite.y = offsetY;
            tile.sprite.angle = 0;
            tile.sprite.scale.set(DISCARD_SCALE, DISCARD_SCALE);
            tile.sprite.visible = true;

            offsetX += SPRITE_WIDTH * DISCARD_SCALE;

            if (offsetX > 800) {
                offsetX = 200;
                offsetY += SPRITE_HEIGHT * DISCARD_SCALE;
            }
        }
    }
}
