export { validateIsDOMArgument, validateIsFunction, validateIsMouseEvent, 
    validateIsPieceColor, validateIsPieceColorNotNone, 
    validateIsPieceCoordinate };
import { NUM_SIDE_EDGES, PIECE_COLORS} from "./constants.js";

/**
 * Validates that the argument is a DOM object.
 * @param {Object} obj - The object to be validated.
 * @returns {boolean} - True if the argument is a DOM object and false 
 * otherwise.
 */
function validateIsDOMArgument(obj) {
    return obj instanceof HTMLElement;
}

/**
 * Validates that the argument is a function.
 * @param {function} obj - The object to be validated.
 * @returns - True if the argument is a function and false otherwise.
 */
function validateIsFunction(obj) {
    return typeof(obj) === "function";
}

/**
 * Validates that the argument is a mouse event.
 * @param {Object} obj - The object to be validated.
 * @returns {boolean} - True if the argument is a mouse event and false 
 * otherwise.
 */
function validateIsMouseEvent(obj) {
    return obj instanceof MouseEvent;
}

/**
 * Validates that the argument is a valid piece color.
 * @param {string} pieceColor - The piece color to be validated.
 * @returns {boolean} - True if the argument is a valid piece color and false 
 * otherwise.
 */
function validateIsPieceColor(pieceColor) {
    if(typeof(pieceColor) !== "string") {
        return false;
    }
    if(!PIECE_COLORS.includes(pieceColor)) {
        return false;
    }
    return true;
}

/**
 * Validates that the argument is a valid piece color and not none.
 * @param {string} pieceColor - The piece color to be validated.
 * @returns {boolean} - True if the argument is a valid piece color and 
 * not none, and false othrwise.
 */
function validateIsPieceColorNotNone(pieceColor) {
    return pieceColor !== "none" & validateIsPieceColor(pieceColor);
}

/**
 * Validates that the argument is a valid game coordinate.
 * 
 * Specififically checks if the argument is a nonnegative integer less than 
 * the number of edges on each side of the gameboard.
 * @param {number} coordinate - The game coordinate to be validated.
 * @returns {boolean} - True if the argument is a valid game coordinate and false 
 * otherwise.
 */
function validateIsPieceCoordinate(coordinate) {
    if(typeof(coordinate) !== "number") {
        return false;
    }
    if(coordinate < 0) {
        return false;
    }
    if(coordinate > NUM_SIDE_EDGES - 1) {
        return false;
    }
    return Number.isInteger(coordinate);
}
