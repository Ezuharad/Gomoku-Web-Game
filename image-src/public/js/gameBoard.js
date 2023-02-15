export { gameBoard };
import { NUM_SIDE_EDGES } from "./abstract/constants.js";
import { validateIsPieceColor, validateIsPieceCoordinate } from 
"./abstract/validator.js";

const NUM_ADJ_TO_WIN = 5;

/** Class representing a game board. */
class gameBoard {
    #boardState = [];
    constructor() {
        for(let i = 0; i < NUM_SIDE_EDGES; i++) {  // TODO: Use fill method
            this.#boardState[i] = [];
            for(let j = 0; j < NUM_SIDE_EDGES; j++) {
                this.#boardState[i][j] = "none";
            }
        }
    }

    /**
     * Returns the color of the board at the specified position.
     * @param {number} xPosition - The x position to be accessed.
     * @param {number} yPosition - The y position to be accessed.
     * @returns {string} - The board state at the specified coordinate.
     */
    at(xPosition, yPosition) {
        if(!validateIsPieceCoordinate(xPosition)) {
            throw("gameBoard at method received malformed xPosition!");
        }
        if(!validateIsPieceCoordinate(yPosition)) {
            throw("gameBoard at method received malformed yPosition!");
        }
        return this.#boardState[xPosition][yPosition];
    }

    /**
     * Checks if a piece placed at the specified position wins the game.
     * 
     * A player has won the game if NUM_ADJ_TO_WIN or more pieces of their 
     * color are contiguous on a line on the board.
     * @author Longze Li, Steven Chiacchira
     * @param {number} xPosition - The x position to be evaluated.
     * @param {number} yPosition - The y position to be evaluated.
     * @returns {boolean} - True if the specified position wins and false 
     * otherwise.
     */
    checkWinAt(xPosition, yPosition) {
        validateIsPieceCoordinate(xPosition);
        validateIsPieceCoordinate(yPosition);
        
        // Get x y position color
        const color = this.#boardState[xPosition][yPosition];
        if(color === "none") {
            return false;
        }
        let sameColorCount = 1;

        // Check along the x axis of the board
        for(let i = 1; xPosition - i >= 0; i++) {
            if(color === this.#boardState[xPosition - i][yPosition]) {
                sameColorCount++;
            }
            else {
                break;
            }
        }
        for(let i = 1; xPosition + i < NUM_SIDE_EDGES; i++) {
            if(color === this.#boardState[xPosition + i][yPosition]) {
                sameColorCount++;
            }
            else {
                break;
            }
        }
        if(sameColorCount >= NUM_ADJ_TO_WIN) {
            return true;
        }

        // Check along the y axis of the board
        sameColorCount = 1;
        for(let j = 1; yPosition - j >= 0; j++) {
            if(color === this.#boardState[xPosition][yPosition - j]) {
                sameColorCount++;
            }
            else {
                break;
            }
        }
        for(let j = 1; yPosition + j < NUM_SIDE_EDGES; j++) {
            if(color === this.#boardState[xPosition][yPosition + j]) {
                sameColorCount++;
            }
            else {
                break;
            }
        }
        if(sameColorCount >= NUM_ADJ_TO_WIN) {
            return true;
        }

        // Check along the left-right diagonal of the board
        sameColorCount = 1;
        for(let i = 1; xPosition - i >= 0 && yPosition - i >= 0; i++) {
            if(color === this.#boardState[xPosition - i][yPosition - i]) {
                sameColorCount++;
            }
            else {
                break;
            }
        }
        for(let i = 1; xPosition + i < NUM_SIDE_EDGES && 
            yPosition + i < NUM_SIDE_EDGES; i++) {
            if(color === this.#boardState[xPosition + i][yPosition + i]) {
                sameColorCount++;
            }
            else {
                break;
            }
        }
        if(sameColorCount >= NUM_ADJ_TO_WIN) {
            return true;
        }

        // Check along the right-left diagonal of the board
        sameColorCount = 1;
        for(let i = 1; xPosition + i < NUM_SIDE_EDGES && 
            yPosition - i >= 0; i++) {
            if(color === this.#boardState[xPosition + i][yPosition - i]) {
                sameColorCount++;
            }
            else {
                break;
            }
        }
        for(let i = 1; xPosition - i >= 0 && 
            yPosition + i < NUM_SIDE_EDGES; i++) {
            if(color === this.#boardState[xPosition - i][yPosition + i]) {
                sameColorCount++;
            }
            else {
                break;
            }
        }

        return sameColorCount >= NUM_ADJ_TO_WIN;
    }

    /**
     * Places a piece of the specified color at the specified position.
     * @param {string} color - The color of the piece to be placed.
     * @param {number} xPosition - The x position of the piece to be placed.
     * @param {number} yPosition - The y position of the piece to be placed.
     * @returns {boolean} - True if the place was successfully placed and 
     * false otherwise.
     */
    placePiece(color, xPosition, yPosition) {
        if(!validateIsPieceColor(color)) {
            throw("gameBoard placePiece method received malformed color "
            + "argument!");
        }
        if(this.at(xPosition, yPosition) !== "none") {
            return false;
        }

        this.#boardState[xPosition][yPosition] = color;
        return true;
    }
}
