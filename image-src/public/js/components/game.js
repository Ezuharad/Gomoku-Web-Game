export { game };
import { gameBoard } from  "../gameBoard.js";
import { TILE_LENGTH_PX, gameCanvas } from "./gameCanvas.js";
import { timer } from "./timer.js";
import { user } from "../user.js";
import { validateIsMouseEvent, validateIsPieceCoordinate } from "../abstract/validator.js";

// Document element constants
const GAME_CANVAS_ELEMENT = document.getElementById("game_canvas");
const PLAYER_TIMER_ELEMENT = document.getElementById("player_timer_div");
const OPPONENT_TIMER_ELEMENT = document.getElementById("opponent_timer_div");

/** Class managing a Gomoku game. */
class game {
    #GB;  // Game board
    #GC;  // Game canvas
    #P1T;  // Player 1 timer
    #P2T;  // Player 2 timer
    #browserUser;
    #remoteUser;

    /**
     * Creates a new Gomoku game.
     * 
     * Calls gameBoard, gameCanvas, and timer constructors. Then adds an event 
     * listener to the gameCanvas element for placing pieces with the mouse.
     */
    constructor() {
        this.#GB = new gameBoard();
        this.#GC = new gameCanvas(GAME_CANVAS_ELEMENT);
        this.#P1T = new timer(PLAYER_TIMER_ELEMENT);
        this.#P2T = new timer(OPPONENT_TIMER_ELEMENT);
        this.#browserUser = new user("browser", "black", true);
        this.#remoteUser = new user("remote", "white", false);

        const onClickGameCanvas = this.#onClickGameCanvas.bind(this);
        GAME_CANVAS_ELEMENT.addEventListener("mousedown", onClickGameCanvas, 
        false);
    }

    /**
     * Makes a move on the game board.
     * 
     * First checks if the user can place a piece and if game board is able to 
     * accept a piece at the specified location, then places a piece if 
     * possible. Then paints the piece on the gameboard, then swaps the player 
     * turns and timers.
     * @param {number} xPosition - The xPosition for the move to be made at.
     * @param {number} yPosition - The yPosition for the move to be made at.
     * @returns {Boolean} - True if the move was successful, and false 
     * otherwise.
     */
    #makeMove(user, xPosition, yPosition) {
        if(!user.currentTurn()) {  // Check if the user can make a move
            return false;
        }
        if(!this.#GB.placePiece(xPosition, yPosition)) {  // Check board
            return false;
        }
        this.#GC.drawPiece(user.getColor(), xPosition, yPosition)  // TODO: FIXME!

        if(this.#GB.checkWinAt(xPosition, yPosition)) {
            console.log("WINNER!");  // TODO: Remove
        }
        this.#swapUser();
        this.#swapTimer();
        return true;
    }

    /**
     * Gives a piece coordinate from a mouse coordinate.
     * @param {number} mouseCoord - The mouse coordinate to be transformed.
     * @returns {number} - The mouse coordinate's corresponding piece coordinate.
     */
    #mouseCoordToPieceCoord(mouseCoord) {
        const pieceCoord = Math.floor(mouseCoord / TILE_LENGTH_PX);
        if(!validateIsPieceCoordinate(pieceCoord)) {
            raise("game mouseCoordToPieceCoord method generated malformed "
            + "pieceCoord!");
        }

        return pieceCoord;
    }

    // TODO: Add extra conditions to onClickGameCanvas docs
    /**
     * Tries to place a piece on the game board.
     * 
     * First tries to place a piece on the gameboard. If the game board is 
     * empty at the selected square, then the piece will be placed.
     * @param {MouseEvent} mouseEvent - The event generated by clicking the 
     * game canvas.
     */
    #onClickGameCanvas(mouseEvent) {
        if(!validateIsMouseEvent(mouseEvent)) {
            throw("game onClickGameCanvas method received malformed "
            + "mouseEvent!");
        }  // TODO: This method needs to be completely rewritten

        const xPosition = this.#mouseCoordToPieceCoord(mouseEvent.offsetX);
        const yPosition = this.#mouseCoordToPieceCoord(mouseEvent.offsetY);

        // Try to place the piece in the gameboard
        this.#makeMove(this.#browserUser, xPosition, yPosition);
    }

    /**
     * Swaps the current running timers.
     */
    #swapTimer() {
        if(!this.#P1T.isRunning()) {
            this.#P1T.start();
            this.#P2T.stop();
        }
        else {
            this.#P1T.stop();
            this.#P2T.start();
        }
    }

    /**
     * Swaps the current users.
     */
    #swapUser() {
        this.#browserUser.swapTurn();
        this.#remoteUser.swapTurn();
    }
}
