export {timer};
import { validateIsDOMArgument, 
    validateIsFunction } from "../abstract/validator.js";

const INITIAL_MINUTES = 5;
const NUMBER_LENGTH = 2;

/** Class representing a timer. */
class timer {
    #running;  // boolean
    #deciSecondsLeft = 60 * 10 * INITIAL_MINUTES;
    #interval;  // number
    #onFinished = this.#displayFinished;
    #timerElement;  // DOM object

    /**
     * Creates a new timer, drawing it in the passed DOM object.
     * @param {Object} timerElement - The DOM object for the timer to exist in.
     * @param {function} onFinished - The function to be called when the timer 
     * finishes.
     */
    constructor(timerElement, onFinished = this.#displayFinished) {
        if(!validateIsDOMArgument(timerElement))
        {
            throw("timer constructor received malformed DOM argument!");
        }
        if(!validateIsFunction(onFinished)) {
            throw("timer constructor received malformed onFinished argument!")
        }
        this.#onFinished = onFinished;
        this.#timerElement = timerElement;
        this.#displayTime();
    }

    /**
     * Displays when the timer has run to zero.
     */
    #displayFinished() {
        this.#timerElement.innerHTML = "OUT OF TIME";
    }

    /**
     * Displays the current time of the timer in its DOM element.
     */
    #displayTime() {
        const minutes = Math.floor((this.#deciSecondsLeft / 10) / 60);
        const seconds = Math.floor((this.#deciSecondsLeft / 10) % 60);
        const formattedMinutes = this.#formatNumber(minutes);
        const formattedSeconds = this.#formatNumber(seconds);

        this.#timerElement.innerHTML = `${formattedMinutes}:`
        + `${formattedSeconds}`;
    }

    /**
     * Formats a number to a length of NUMBER_LENGTH.
     * @param {number} number - The number to be formatted.
     * @returns {string} - A string representation of the number with length 
     * NUMBER_LENGTH.
     */
    #formatNumber(number) {
        return number.toString().padStart(NUMBER_LENGTH, 0);
    }

    /**
     * Returns true if the timer is out of time.
     * @returns {boolean} - True if the timer is out of time and false 
     * otherwise.
     */
    isFinished() {
        return this.#deciSecondsLeft < 1;
    }

    /**
     * Returns true if the timer is running.
     * @returns {boolean} - True if the timer is running and false otherwise.
     */
    isRunning() {
        return this.#running;
    }

    /**
     * Starts the timer.
     * @returns {boolean} - True if the timer was started and false otherwise.
     */
    start() {
        if(this.#running || this.isFinished()) {
            return false;
        }
        this.#running = true;
        
        this.#displayTime();
        this.#interval = setInterval(this.#tickDown.bind(this), 100);
        return true;
    }

    /**
     * Stops the timer.
     * @returns {boolean} - True if the timer was stopped and false otherwise.
     */
    stop() {
        if(!this.#running) {
            return false;
        }

        this.#running = false;
        clearInterval(this.#interval);
        return true;
    }

    /**
     * Decrements the deciseconds of the timer by one.
     * 
     * Decrements the deciseconds of the timer by one. Automatically stops the 
     * timer if time hits zero, then calls onFinished.
     */
    #tickDown() {
        if(this.#deciSecondsLeft < 1) {
            this.stop();
            this.#onFinished();
        }
        else {
            this.#deciSecondsLeft--;
            this.#displayTime();
        }
    }

    /**
     * Toggles the timer between on and off states.
     */
    toggle() {
        if(this.#running) {
            this.stop();
        }
        else {
            this.start();
        }
    }
}
