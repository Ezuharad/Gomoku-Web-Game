export { game };
import { gameBoard } from  "../gameBoard.js";
import { TILE_LENGTH_PX, gameCanvas } from "./gameCanvas.js";
import { timer } from "./timer.js";
import { validateIsMouseEvent, validateIsPieceCoordinate } from "../abstract/validator.js";

// Document element constants
const GAME_CANVAS_ELEMENT = document.getElementById("game_canvas");
const PLAYER_TIMER_ELEMENT = document.getElementById("player_timer_div");
const OPPONENT_TIMER_ELEMENT = document.getElementById("opponent_timer_div");

/** Class managing a Gomoku game */
class game {
    #currColor = "black";
    #GB;
    #GC;
    #P1T;
    #P2T;
    #U1;
    #U2;

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

        const onClickGameCanvas = this.#onClickGameCanvas.bind(this);
        GAME_CANVAS_ELEMENT.addEventListener("mousedown", onClickGameCanvas, 
        false);
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
     * canvas.
     */
    #onClickGameCanvas(mouseEvent) {
        if(!validateIsMouseEvent(mouseEvent)) {
            throw("game onClickGameCanvas method received malformed "
            + "mouseEvent!");
        }  // TODO: This method needs to be completely rewritten

        const xPosition = this.#mouseCoordToPieceCoord(mouseEvent.offsetX);
        const yPosition = this.#mouseCoordToPieceCoord(mouseEvent.offsetY);

        // Try to place the piece in the gameboard
        if(!this.#GB.placePiece(this.#currColor, xPosition, yPosition)) {
            return;
        }
        this.#GC.drawPiece(this.#currColor, xPosition, yPosition);

        if(this.#GB.checkWinAt(xPosition, yPosition)) {
            console.log("WINNER!");  // TODO: Remove
        }
        this.#swapColor();
        this.#swapTimer();
    }

    /**
     * Swaps the current color between black and white.
     */
    #swapColor() {
        if(this.#currColor === "white") {
            this.#currColor = "black";
        }
        else {
            this.#currColor = "white";
        }
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
}