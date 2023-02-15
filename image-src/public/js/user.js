export { user };
import { validateIsPieceColorNotNone } from "./abstract/validator.js";

const PLAYER_TYPES = ["browser", "remote", "spectator"];

/**
 * Validates that the argument is a valid playerType.
 * @param {string} playerType - The playerType to be validated.
 * @returns {Boolean} - True if the argument is a valid playertype, and false 
 * otherwise.
 */
function validateIsPlayerType(playerType) {
    return playerType in PLAYER_TYPES;
}

/** Class managing a user */
class user {
    #color;
    #myTurn;
    #playerType;

    /**
     * Creates a new user.
     * @param {string} playerType - The type of the player (browser, remote, 
     * or spectator).
     * @param {string} color - The user's color.
     * @param {Boolean} myTurn - Whether or not it is the user's turn.
     * @returns
     */
    constructor(playerType, color, myTurn) {
        validateIsPlayerType(playerType);
        this.#playerType = playerType;

        if(this.#playerType === "spectator") {
            this.#myTurn = false;
            this.#color = "none";
            return;
        }

        validateIsPieceColorNotNone(color);

        this.#playerType = playerType;
        this.#myTurn = myTurn;
        this.#color = color;
    }

    /**
     * Returns true if it is the user's turn, and false otherwise.
     * @returns {string} - True if it is the user's turn, and false otherwise.
     */
    currentTurn() {
        return this.#myTurn;
    }

    /**
     * Returns the color of the user.
     * @returns {string} - The color of the user.
     */
    getColor() {
        return this.#color;
    }

    /**
     * Swaps the current users turn.
     * @returns {Boolean} - True if the turn swap was successful, and false 
     * otherwise.
     */
    swapTurn () {
        if(this.#playerType === "spectator") {
            return false;
        }

        if(this.#myTurn) {
            this.#myTurn = false;
        }
        else {
            this.#myTurn = true;
        }
        return true;
    }
}
