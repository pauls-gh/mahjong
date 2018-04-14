import {game, printMessage, printInfo} from "./game.js";
import {STATE, PLAYER_OPTION, PLAYER, SUIT, DRAGON, WIND} from "./constants.js";
import {GameAI} from "./gameAI.js";
import {Card} from "./card/card.js";
import {Tile} from "./gameObjects.js";
import {Hand} from "./gameObjects_hand.js";

// PRIVATE CONSTANTS


// PRIVATE GLOBALS
// TBD


export class GameLogic {
    constructor(table) {
        this.state = STATE.INIT;
        this.table = table;
        this.card = new Card();
        this.gameAI = new GameAI(this.card, this.table);
        this.currPlayer = 0;
        this.button1Function = null;
        this.button2Function = null;
        this.button3Function = null;
        this.button4Function = null;
        this.sort1Function = null;
        this.sort2Function = null;
        this.startButtonFunction = null;
        this.wallText = null;
        this.errorText = null;
        this.errorTextArray = [];
        this.errorTextSemaphore = 0;
        this.discardTile = null;
        this.gameResult = { mahjong: false,
                            winner: 0};
    }

    create() {
        // Create Phaser.IO UI elements
        this.wallText = game.add.text(190, 160, "", {
            font: "14px Arial",
            fill: "#ffffff",
            align: "left"
        });
        this.wallText.visible = false;

        this.errorText = game.add.text(400, 400, "", {
            font: "14px Arial",
            fill: "#ff8080",
            backgroundColor: 'rgba(0,0,0,1)',
            align: "left"
        });
        this.wallText.visible = false;    
    }

    init() {

        // INIT
        this.state = STATE.INIT;
        this.updateUI();

        // Start button
        const startButton = window.document.getElementById("start");
        if (this.startButtonFunction) {
            startButton.removeEventListener("click", this.startButtonFunction);
        }
        this.startButtonFunction = function () {
            this.start();
        }.bind(this);

        // Wait for start button to be pressed. Main game logic loop executed within start button callback.
        startButton.addEventListener("click", this.startButtonFunction);        
    }

    start() {
        // START
        this.state = STATE.START;
        this.updateUI();

        this.gameResult.mahjong = false;
        this.gameResult.winner = 0;

        this.table.switchPlayer(PLAYER.BOTTOM);

        // Reset table
        this.table.reset(); 

        this.deal();
    }

    deal() {

        // DEAL
        this.state = STATE.DEAL;
        this.updateUI();

        // Create hand for debugging / testing
        const hand = new Hand(false);

        if (1) {
            // FF 1111 DDDD 1111 (3 suits, like numbers)
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.FLOWER, 0));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));
            hand.insertHidden(new Tile(SUIT.DOT, 4));

            hand.insertHidden(new Tile(SUIT.BAM, 4));
            hand.insertHidden(new Tile(SUIT.BAM, 4));
            hand.insertHidden(new Tile(SUIT.BAM, 4));
            hand.insertHidden(new Tile(SUIT.BAM, 4));

            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            //hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));
            //hand.insertHidden(new Tile(SUIT.DRAGON, DRAGON.RED));            

            hand.insertHidden(new Tile(SUIT.JOKER, 0));            
            hand.insertHidden(new Tile(SUIT.JOKER, 0));            
        } 

        this.table.deal(hand);

        this.wallText.setText("Wall tile count = " + this.table.wall.getCount());
        
        // debugging - skip charleston
        if (0) {
            this.loop();
        } else {
            this.charleston();
        }
    }

    async charleston() {
        // CHARLESTON
        this.state = STATE.CHARLESTON1;
        this.updateUI();
        
        await this.charlestonPass(PLAYER.RIGHT);
        await this.charlestonPass(PLAYER.TOP);
        await this.charlestonPass(PLAYER.LEFT);

        // Continue Charleston?
        this.state = STATE.CHARLESTON_QUERY;
        this.updateUI();
        
        const query = await this.yesNoQuery();

        this.state = STATE.CHARLESTON_QUERY_COMPLETE;
        this.updateUI();

        if (query === true) {
            this.state = STATE.CHARLESTON2;
            this.updateUI();

            await this.charlestonPass(PLAYER.LEFT);
            await this.charlestonPass(PLAYER.TOP);
            await this.charlestonPass(PLAYER.RIGHT);

        }

        this.state = STATE.COURTESY_QUERY;
        this.updateUI();

        const player0CourtesyVote = await this.courtesyQuery();
        
        this.state = STATE.COURTESY_QUERY_COMPLETE;
        this.updateUI();

        if (player0CourtesyVote) {
            this.state = STATE.COURTESY;
            this.updateUI();
            
            // Perform courtesy voting
            this.table.courtesyVote(player0CourtesyVote);

            // Wait for user to select courtesy pass tiles
            await this.courtesyPass();

            this.state = STATE.COURTESY_COMPLETE;
            this.updateUI();

            // Perform courtesy pass exchange
            this.table.courtesyPass();

        } 

        // Start main game loop
        this.loop();
    }

    // Main loop
    // For current player
    //      Pick from wall  (except dealer on first turn)
    //      Choose discard
    //      Query if other players want it (no prompt needed for dealers discard)
    async loop() {
        let skipPick = true;   // dealer doesn't get a first wall pick

        this.currPlayer = 0;

        while (1) {
            // Update table
            this.table.switchPlayer(this.currPlayer);

            this.state = STATE.LOOP_PICK_FROM_WALL;
            this.updateUI();

            // PICK TILE FROM WALL
            
            if (!skipPick) {
                const pick = this.pickFromWall();
                if (!pick) {
                    // No more tiles - wall game.
                    break;
                }
            }
            skipPick = false;

            this.state = STATE.LOOP_CHOOSE_DISCARD;
            this.updateUI();

            // CHOOSE TILE TO DISCARD (or mahjong!)
            const discardInfo = await this.chooseDiscard();
            this.table.players[this.currPlayer].showHand();

            if (discardInfo.playerOption === PLAYER_OPTION.MAHJONG) {
                this.gameResult.mahjong = true;
                this.gameResult.winner = this.currPlayer;
                break;
            }

            const discardTile = discardInfo.tileArray[0];
            
            if (discardTile.suit === SUIT.JOKER) {
                // Joker discarded - add to discard pile
                this.table.discards.insertDiscard(discardTile);
                this.table.discards.showDiscards();

                //  Move to next player
                this.currPlayer++;
                if (this.currPlayer > 3) {
                    this.currPlayer = 0;
                }                
                continue;
            }

            // CLAIM DISCARD? (for exposure/mahjong).            

            // Show tile
            discardTile.sprite.x = 350;
            discardTile.sprite.y = 475;
            discardTile.sprite.angle = 0;
            discardTile.sprite.scale.set(1.0, 1.0);
            discardTile.sprite.visible = true;

            // Ask all players if the discard is wanted  (currPlayer == i automatically returns discard)
            const claimArray = [];
            for (let i = 0; i < 4; i++) {
                claimArray[i] = await this.claimDiscard(i, discardTile);
            }

            // Process claim array for each player
            // Returns {playerOption, winningPlayer}
            const claimResult = this.table.processClaimArray(this.currPlayer, claimArray, discardTile);

            if (claimResult.playerOption === PLAYER_OPTION.MAHJONG) {
                this.gameResult.mahjong = true;
                this.gameResult.winner = claimResult.winningPlayer;
                break;
            }

            if (claimResult.playerOption === PLAYER_OPTION.EXPOSE_TILES) {
                // Tile claimed with exposure. Winning Player is next to discard.
                this.currPlayer = claimResult.winningPlayer;
                skipPick = true;

                const text = discardTile.getText();
                printMessage("Player " + this.currPlayer + " claims " + text + " \n");
            } else {
                // Tile discarded - move to next player
                this.currPlayer++;
                if (this.currPlayer > 3) {
                    this.currPlayer = 0;
                }
            }

            // Validate tile count is always 152
            let tileCount = 0;
            tileCount += this.table.wall.tileArray.length;
            tileCount += this.table.discards.tileArray.length;
            for (let i = 0; i < 4; i++) {
                tileCount += this.table.players[i].hand.getLength();
            }
            if (tileCount !== 152) {
                printMessage("ERROR - total tile count is not 152. Tile count = " + tileCount + "\n");
            }
        }

        this.end();
    }

    end() {

        // Start button will be enabled
        this.state = STATE.END;
        this.updateUI();     
    }

    pickFromWall() {

        const tile = this.table.wall.remove();

        this.wallText.setText("Wall tile count = " + this.table.wall.getCount());

        if (tile) {
            const text = tile.getText();
            printMessage("Player " + this.currPlayer + " picks " +  text + " from wall\n");
    
            this.table.players[this.currPlayer].hand.insertHidden(tile);
            this.table.players[this.currPlayer].showHand();
            
            return true;
        } else {
            return false;
        }

    }

    // Return promise with discard info
    //      discard/mahjong
    //      tileArray (if discard)
    chooseDiscard() {
        let promise = null;

        // Player i picks discard
        if (this.currPlayer === PLAYER.BOTTOM) {

            // Create promise to return the discarded tile (async operation) 
            promise = new Promise(
                (resolve) => {

                    // Human player picks own discard. Setup discard button.
                    const button1 = window.document.getElementById("button1");

                    button1.removeEventListener("click", this.button1Function);
                    this.button1Function = function () {
                        const discardedTile = this.table.players[this.currPlayer].hand.removeDiscard();
                        const text = discardedTile.getText();
                        printMessage("Player " + this.currPlayer + " discards " + text + " \n");
                        
                        let tileArray = [];
                        tileArray.push(discardedTile);

                        resolve({playerOption: PLAYER_OPTION.DISCARD_TILE,
                                 tileArray: tileArray});
                    }.bind(this);
                    button1.addEventListener("click", this.button1Function);

                    // Exchange jokers button
                    const button2 = window.document.getElementById("button2");
                    button2.removeEventListener("click", this.button2Function);
                    this.button2Function = function () {
                        this.table.exchangeUserSelectedTileForExposedJoker();
                        window.document.getElementById("button2").disabled = true;

                        // Do not resolve() - must still discard
                    }.bind(this);

                    button2.addEventListener("click", this.button2Function);                      

                    // Mahjong button
                    const button3 = window.document.getElementById("button3");
                    button3.removeEventListener("click", this.button3Function);
                    this.button3Function = function () {
                        // Unselect any tiles
                        this.table.players[this.currPlayer].hand.resetSelection();

                        resolve({playerOption: PLAYER_OPTION.MAHJONG,
                            tileArray: []});
                    }.bind(this);

                    button3.addEventListener("click", this.button3Function);                    

                });
        } else {

            // Create promise to return the discarded tile (async operation) 
            promise = new Promise(
                (resolve) =>  {
                    const resolveResult = this.gameAI.chooseDiscard(this.currPlayer );

                    if (resolveResult.playerOption === PLAYER_OPTION.DISCARD_TILE) {
                        const text = resolveResult.tileArray[0].getText();
                        printMessage("Player " + this.currPlayer + " discards " + text + " \n");
                    }
                    resolve(resolveResult);                    
                });
        }

        return promise;
    }

    // Return promise with claim info
    //      discard/expose/mahjong
    //      tileArray (if discard or exposure)
    async claimDiscard(player, discardTile) {

        // Special case
        // If current player === player, then we already know its a discard.
        //    
        if (this.currPlayer === player) {
            return  new Promise(
                (resolve) =>  {
                    let tileArray = [];
                    tileArray.push(discardTile);
                    resolve({playerOption: PLAYER_OPTION.DISCARD_TILE,
                        tileArray: tileArray});  
                });  
        }

        if (player !== PLAYER.BOTTOM) {
            // Create promise to return the claim info (async operation) 
            return  new Promise(
                (resolve) =>  {
                    // player (1-3)
                    const resolveResult = this.gameAI.claimDiscard(player, discardTile);
                    resolve(resolveResult); 
                }); 
        } else {
            // player 0  (PLAYER.BOTTOM)

            this.state = STATE.LOOP_QUERY_CLAIM_DISCARD;
            this.updateUI(); 

            // Ask user if the tile is wanted
            const claimYesNo= await this.yesNoQuery();

            this.state = STATE.LOOP_QUERY_CLAIM_DISCARD_COMPLETE;
            this.updateUI(); 

            if (claimYesNo) {
                // Tile is wanted - wait for user to expose tiles (or cancel)
                // 
                // 1. expose tiles (must select tiles/jokers to form exposure)
                // 2. return claimed discard
                // 3. mahjong

                this.state = STATE.LOOP_EXPOSE_TILES;
                this.updateUI();
                
                // Save discardTile so it can be accessed by Hand object when selecting tiles
                this.discardTile = discardTile;

                const exposeInfo = await this.exposeTiles(); 
                
                this.state = STATE.LOOP_EXPOSE_TILES_COMPLETE;
                this.updateUI();   
                
                switch (exposeInfo.playerOption) {
                    case PLAYER_OPTION.EXPOSE_TILES:  
                   // Create promise to return the exposed tiles (async operation) 
                   return new Promise(
                    (resolve) => {
                        resolve({playerOption: PLAYER_OPTION.EXPOSE_TILES,
                            tileArray: exposeInfo.tileArray});  
                    });                                         
                    break;
                    case PLAYER_OPTION.DISCARD_TILE:
                    break;
                    case PLAYER_OPTION.MAHJONG:
                    // Create promise to return mahjong! (async operation) 
                    return new Promise(
                        (resolve) => {
                            let tileArray = [];
                            tileArray.push(discardTile);
                            resolve({playerOption: PLAYER_OPTION.MAHJONG,
                                tileArray: []});  
                        });                    
                    break;
                    default:
                    printMessage("ERROR - unknown discardOption\n");   
                    break;
                }
            }

            // Create promise to return the discarded tile (async operation) 
           return new Promise(
                (resolve) => {
                    let tileArray = [];
                    tileArray.push(discardTile);
                    resolve({playerOption: PLAYER_OPTION.DISCARD_TILE,
                        tileArray: tileArray});  
                });
        }
    }

    // Query user whether yes/no
    // Promise will return 
    //      True - yes
    //      False - no
    yesNoQuery() {

        // Create promise to wait for player input (async operation) 
        // Value returned
        //      True = yes
        //      False = no
        return new Promise(
            (resolve) => {

                // No button
                const button1 = window.document.getElementById("button1");
                button1.removeEventListener("click", this.button1Function);
                this.button1Function = function () {
                    resolve(false);
                }.bind(this);

                button1.addEventListener("click", this.button1Function);
                
                // Yes button
                const button2 = window.document.getElementById("button2");
                button2.removeEventListener("click", this.button2Function);
                this.button2Function = function () {
                    resolve(true);
                }.bind(this);

                button2.addEventListener("click", this.button2Function);
            });
    }

    charlestonPass(playerId) {

        // Create promise to wait for player input (async operation) 
        // no value returned in promise
        return new Promise(
            (resolve) => {
                const playerText = ["self", "right", "across", "left"];
    
                printInfo("Choose 3 tiles to pass " + playerText[playerId]);

                //  Setup "pass tiles" button
                const button1 = window.document.getElementById("button1");

                button1.removeEventListener("click", this.button1Function);
    
                this.button1Function = function () {
                    const charlestonPassArray = [];

                    // Player 0 (human) pressed "Pass" button
                    // Get 3 tiles picked by player 0 (human)
                    charlestonPassArray[0] = this.table.players[0].hand.getSelectionHidden(); 
        
                    // Reset selectCount
                    this.table.players[0].hand.resetSelection();
        
                    // Remove from hand
                    for (const tile of charlestonPassArray[0]) {
                        this.table.players[0].hand.removeHidden(tile);
                    }

                    // Remove 3 cards for player 1, 2, 3
                    for (let i = 1; i < 4; i++) {
                        charlestonPassArray[i] = this.gameAI.charlestonPass(i);
                    }
            
                    // Exchange charleston passes among all players
                    this.table.charlestonPass(playerId, charlestonPassArray);
                    printMessage("Pass " + playerText[playerId] + " complete\n");
    
                    resolve();
                }.bind(this);
    
                button1.addEventListener("click", this.button1Function);
    
            });
    }
    
    // Wait for user to expose tiles after claiming a discarded tile
    // 1. Expose tiles
    // 2. Return tile
    // 3. Mahjong!
    // Return
    //      playerOption - expose, discard, mahjong
    //      tileArray    - valid only for expose
    exposeTiles() {

        // Create promise to wait for player input (async operation) 
        return new Promise(
            (resolve) => {

                // Expose tiles button
                const button1 = window.document.getElementById("button1");

                button1.removeEventListener("click", this.button1Function);
                this.button1Function = function () {
                    // Get selected tiles
                    const tileArray = this.table.players[PLAYER.BOTTOM].hand.getSelectionHidden();
                    // Unselect any tiles
                    this.table.players[PLAYER.BOTTOM].hand.resetSelection();
                    resolve({ 
                        playerOption: PLAYER_OPTION.EXPOSE_TILES,
                        tileArray: tileArray
                    });
                }.bind(this);

                button1.addEventListener("click", this.button1Function);
                
                // Return tile button
                const button2 = window.document.getElementById("button2");

                button2.removeEventListener("click", this.button2Function);
                this.button2Function = function () {
                   // Unselect any tiles
                   this.table.players[PLAYER.BOTTOM].hand.resetSelection();
                    resolve({ 
                        playerOption: PLAYER_OPTION.DISCARD_TILE,
                        tileArray: []
                    });
                }.bind(this);

                button2.addEventListener("click", this.button2Function);

                // Mahjong! button
                const button3 = window.document.getElementById("button3");

                button3.removeEventListener("click", this.button3Function);
                this.button3Function = function () {
                   // Unselect any tiles
                   this.table.players[PLAYER.BOTTOM].hand.resetSelection();
                    resolve({ 
                        playerOption: PLAYER_OPTION.MAHJONG,
                        tileArray: []
                    });
                }.bind(this);

                button3.addEventListener("click", this.button3Function);
    
            });
    }

    // Query user how many to pass in courtesy (0-3 tiles)
    // Promise will return value of 0-3
    courtesyQuery() {

        // Create promise to wait for player input (async operation) 
        // Value returned 0-3
        return new Promise(
            (resolve) => {

                // 0 button
                const button1 = window.document.getElementById("button1");

                button1.removeEventListener("click", this.button1Function);
                this.button1Function = function () {
                    resolve(0);
                }.bind(this);

                button1.addEventListener("click", this.button1Function);
                
                // 1 button
                const button2 = window.document.getElementById("button2");

                button2.removeEventListener("click", this.button2Function);
                this.button2Function = function () {
                    resolve(1);
                }.bind(this);

                button2.addEventListener("click", this.button2Function);

                // 2 button
                const button3 = window.document.getElementById("button3");

                button3.removeEventListener("click", this.button3Function);
                this.button3Function = function () {
                    resolve(2);
                }.bind(this);

                button3.addEventListener("click", this.button3Function);

                
                // 3 button
                const button4 = window.document.getElementById("button4");
 
                button4.removeEventListener("click", this.button4Function);
                this.button4Function = function () {
                    resolve(3);
                }.bind(this);

                button4.addEventListener("click", this.button4Function);
                
            });
    }
    
    courtesyPass(courtesyCount) {

        // Perform courtesy pass when tiles selected and "pass button" is pressed
        // Create promise to wait for player input (async operation) 
        return new Promise(
            (resolve) => {

                printInfo("Courtesy pass - select " + this.table.player02CourtesyVote + " tile(s)\n");            

                // Pass tiles button
                const button1 = window.document.getElementById("button1");

                button1.removeEventListener("click", this.button1Function);
                this.button1Function = function () {
                    resolve();
                }.bind(this);

                button1.addEventListener("click", this.button1Function);
                
            });
    }
        
    updateUI () {        
        const button1 = window.document.getElementById("button1");
        const button2 = window.document.getElementById("button2");
        const button3 = window.document.getElementById("button3");
        const button4 = window.document.getElementById("button4");
        const startButton = window.document.getElementById("start");
        const sort1 = window.document.getElementById("sort1");
        const sort2 = window.document.getElementById("sort2");

        switch (this.state) {
            case STATE.INIT:
            printMessage("American Mahjong v0.1\n");
            printMessage("Press Start Game button\n");
            sort1.style.display = "none";
            sort2.style.display = "none";
            window.document.getElementById("controldiv").style.visibility = "";            
            break;

            case STATE.START:
            printMessage("Game started\n");
            startButton.disabled = true;
            sort1.style.display = "";
            sort2.style.display = "";
            this.disableSortButtons();
            button1.style.display = "none";
            button2.style.display = "none";
            button3.style.display = "none";
            button4.style.display = "none";            
            window.document.getElementById("buttondiv").style.visibility = "";
            this.wallText.visible = true;
            break;   

            case STATE.DEAL:
            printMessage("Shuffling wall\n");
            printMessage("Dealing hands\n");            
            this.enableSortButtons();
            break;  

            case STATE.CHARLESTON1:
            printMessage("Starting Charleston #1\n");   
            button1.innerText = "Pass Tiles";
            button1.disabled = true;
            button1.style.display = "";  
            this.wallText.setText("Wall tile count = " + this.table.wall.getCount());
            break;    
            
            case STATE.CHARLESTON_QUERY:
            printMessage("Charleston #1 complete\n");
            printInfo("Continue Charleston?");
            
            button1.innerText = "No";
            button1.disabled = false;
            button1.style.display = "";
            button2.innerText = "Yes";
            button2.disabled = false;
            button2.style.display = "";
            break;    
            
            case STATE.CHARLESTON_QUERY_COMPLETE:
            break;

            case STATE.CHARLESTON2:
            printMessage("Starting Charleston #2\n");
            button1.innerText = "Pass Tiles";
            button1.disabled = true;
            button1.style.display = "";            
            button2.style.display = "none";
            break;    
            
            case STATE.COURTESY_QUERY:
            printMessage("Charleston #2 complete\n");
            printInfo("Choose number of tiles for courtesy exchange");
            
            button1.innerText = "0";
            button1.disabled = false;
            button1.style.display = "";  
            button2.innerText = "1";
            button2.disabled = false;
            button2.style.display = "";   
            button3.innerText = "2";
            button3.disabled = false;
            button3.style.display = ""; 
            button4.innerText = "3";
            button4.disabled = false;
            button4.style.display = "";                                          
            break;    
            
            case STATE.COURTESY_QUERY_COMPLETE:
            button2.style.display = "none";
            button3.style.display = "none";
            button4.style.display = "none";            
            break;

            case STATE.COURTESY:
            printMessage("Courtesy pass\n");
            button1.innerText = "Pass Tiles";
            button1.disabled = true;
            button1.style.display = "";            
            break;    
            
            case STATE.COURTESY_COMPLETE:
            printMessage("Courtesy pass complete\n");
            button1.disabled = true;
            button1.removeEventListener("click", this.button1Function);            
            break;

            case STATE.LOOP_PICK_FROM_WALL:
            break;    
            
            case STATE.LOOP_CHOOSE_DISCARD:
            printInfo("Select one tile to discard or declare Mahjong\n");  
            button1.innerText = "Discard";
            button1.disabled = true;
            button1.style.display = "";       
            button2.innerText = "Exchange joker";
            button2.disabled = true;
            button2.style.display = "";  
            button3.innerText = "Mahjong!";
            button3.disabled = false;
            button3.style.display = "";  
            break; 
            
            case STATE.LOOP_QUERY_CLAIM_DISCARD:
            printInfo("Claim discard?");
            button1.innerText = "No";
            button1.disabled = false;
            button1.style.display = "";
            button2.innerText = "Yes";
            button2.disabled = false;
            button2.style.display = "";     
            button3.style.display = "none";
            break; 

            case STATE.LOOP_QUERY_CLAIM_DISCARD_COMPLETE:
            break; 

            case STATE.LOOP_EXPOSE_TILES:
            printInfo("Form a pong/kong/quintet with claimed tile");
            button1.innerText = "Expose tiles";
            button1.disabled = true;
            button1.style.display = "";
            button2.innerText = "Return claimed discard";
            button2.disabled = false;
            button2.style.display = "";  
            button3.innerText = "Mahjong!";
            button3.disabled = false;
            button3.style.display = "";              
            break; 

            case STATE.LOOP_EXPOSE_TILES_COMPLETE:
            button2.style.display = "none";
            button3.style.display = "none";
            button4.style.display = "none";            
            break;   

            case STATE.END:
            if (this.gameResult.mahjong) {
                const validInfo = this.card.validateHand14(this.table.players[this.gameResult.winner].hand);
                if (validInfo.valid) {
                    printMessage("Game over - Mahjong by player " + this.gameResult.winner + "\n");
                    printInfo("Game over - Mahjong by player " + this.gameResult.winner);
                } else {
                    printMessage("Game over - Invalid Mahjong by player " + this.gameResult.winner + "\n");
                    printInfo("Game over - Invalid Mahjong by player " + this.gameResult.winner);
                }
            } else {
                printMessage("Game over - Wall game\n");
                printInfo("Game over - Wall game");
            }

            button1.style.display = "none";  
            button2.style.display = "none";  
            button3.style.display = "none";  
            button4.style.display = "none";  

            this.disableSortButtons();
            sort1.style.display = "none";
            sort2.style.display = "none";

            startButton.disabled = false;

            break;    
            
            
            default:
            printMessage("ERROR - updateUI - unknown state\n");            
            break;
       }
    }

    enableSortButtons() {
        const sort1 = window.document.getElementById("sort1");
        const sort2 = window.document.getElementById("sort2");

        sort1.disable = false;
        sort2.disable = false;

        if (this.sort1Function) {
            sort1.removeEventListener("click", this.sort1Function);
            this.sort1Function = null;
        }

        if (this.sort2Function) {
            sort2.removeEventListener("click", this.sort2Function);
            this.sort2Function = null;
        }      

        this.sort1Function = function () {
            this.table.players[PLAYER.BOTTOM].hand.sortSuitHidden();
            this.table.players[PLAYER.BOTTOM].showHand();
        }.bind(this);

        this.sort2Function = function () {
            this.table.players[PLAYER.BOTTOM].hand.sortRankHidden();
            this.table.players[PLAYER.BOTTOM].showHand();
        }.bind(this);        
        
        sort1.addEventListener("click", this.sort1Function);
        sort2.addEventListener("click", this.sort2Function);
    }

    disableSortButtons() {
        const sort1 = window.document.getElementById("sort1");
        const sort2 = window.document.getElementById("sort2");

        sort1.disable = true;
        sort2.disable = true;        

        if (this.sort1Function) {
            sort1.removeEventListener("click", this.sort1Function);
            this.sort1Function = null;
        }

        if (this.sort2Function) {
            sort2.removeEventListener("click", this.sort2Function);
            this.sort2Function = null;
        }         
    } 

    displayErrorText(str) {
        // Don't repeat error messages
        if (this.errorTextArray.length) {
            if (str === this.errorTextArray[this.errorTextArray.length - 1]) {
                return;
            }
        }

        if (this.errorTextSemaphore === 0) {
            this.errorTextSemaphore++;
            this.errorTextArray.push(str);
            this.displayAllError();
        } else {
            this.errorTextSemaphore++;
            this.errorTextArray.push(str);
        }
    }

    async displayAllError() {
        this.errorText.visible = true;

        while (this.errorTextSemaphore) {
            const str = this.errorTextArray.shift();
            this.errorText.setText(str);
            await this.sleep(4000);
            this.errorTextSemaphore--;
        }
        this.errorText.visible = false;
    }

    sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }    
}
