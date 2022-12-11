export { TILE_LENGTH_PX, gameCanvas };
import { NUM_SIDE_EDGES } from "../abstract/constants.js";
import { validateIsDOMArgument, validateIsPieceColorNotNone, 
    validateIsPieceCoordinate } from "../abstract/validator.js";

const TILE_LENGTH_PX = 30;
const PIECE_RADIUS_PX = Math.ceil(TILE_LENGTH_PX / 2);
const BOARD_SIZE_PX = NUM_SIDE_EDGES * TILE_LENGTH_PX;

const PI = Math.PI;

/** Class managing a gameboard canvas */
class gameCanvas {
    #canvasElement;  // DOM object
    #context;  // context of DOM object
    #finishedDrawingBoard = false;  // boolean

    /**
     * Creates a new gameCanvas, drawing it in the passed DOM object.
     * @param {Object} canvasElement - The DOM object for the game canvas to exist in.
     */
    constructor(canvasElement) {
        if(!(validateIsDOMArgument(canvasElement))) {
            throw("canvasElement constructor received a malformed canvas element argument!")
        }

        this.#canvasElement = canvasElement;
        this.#canvasElement.width = BOARD_SIZE_PX;
        this.#canvasElement.height = BOARD_SIZE_PX;
        if(!this.#canvasElement.getContext) {
            throw("gameCanvas constructor was unable to get canvas context!");
        }
        this.#context = this.#canvasElement.getContext("2d");
        
        this.#drawBoard();
    }

    /**
     * Draws the empty gameboard.
     */
    #drawBoard() {
        if(this.#finishedDrawingBoard) {
            throw("gameCanvas drawBoard method tried to draw a board twice!");
        }
        this.#context.beginPath();
        this.#context.strokeStyle = "black";
        for(let i = 0; i < NUM_SIDE_EDGES; i++) {
            this.#context.moveTo(PIECE_RADIUS_PX + TILE_LENGTH_PX*i, 
                PIECE_RADIUS_PX);
            this.#context.lineTo(PIECE_RADIUS_PX + TILE_LENGTH_PX*i, 
                BOARD_SIZE_PX - PIECE_RADIUS_PX);
            this.#context.moveTo(PIECE_RADIUS_PX, 
                PIECE_RADIUS_PX + TILE_LENGTH_PX*i);
            this.#context.lineTo(BOARD_SIZE_PX - PIECE_RADIUS_PX, 
                PIECE_RADIUS_PX + TILE_LENGTH_PX*i);
            this.#context.stroke();
        }
    }

    /**
     * Draws a game piece of the specified color at the specified coordinate.
     * @param {string} color - The color of the piece to be drawn.
     * @param {number} xPosition - The x position of the piece to be drawn.
     * @param {number} yPosition - The y position of the piece to be drawn.
     */
    drawPiece(color, xPosition, yPosition) {
        if(!validateIsPieceColorNotNone(color)) {
            throw("gameCanvas drawPiece method received a malformed color!");
        }
        if(!validateIsPieceCoordinate(xPosition)) {
            throw("gameCanvas drawPiece method received a malformed xPosition!");
        }
        if(!validateIsPieceCoordinate(yPosition)) {
            throw("gameCanvas drawPiece method received a malfromed yPosition!");
        }

        this.#context.strokeStyle = color;
        this.#context.beginPath();
        this.#context.arc(PIECE_RADIUS_PX + TILE_LENGTH_PX*xPosition, 
            PIECE_RADIUS_PX + TILE_LENGTH_PX*yPosition, 
            Math.ceil(TILE_LENGTH_PX / 3), 0, 2*PI);
        this.#context.closePath();
        this.#context.fillStyle = color;
        this.#context.fill();
    }
}
