export { argParser };

const DEFAULT_DOCKER_PORT = 9999;

/** Manages arguments for deno command line. */
class argParser {
    #dockerPort : number;
    #numArgs: number;

    /**
     * Takes in an argument vector and sets itself equal to values from it.
     * @param argvector - The argument vector to be read.
     */
    constructor(argvector : string[]) {
        this.#numArgs = argvector.length;
        if(!this.hasArgs()) {
            this.#dockerPort = DEFAULT_DOCKER_PORT;
        }
        else {
            this.#dockerPort = parseInt(argvector[0]);
        }
    }

    /**
     * Returns the docker port associated with parser.
     */
    getDockerPort() {
        return this.#dockerPort;
    }

    /**
     * Returns true if there are more than zero arguments and false otherwise.
     * @returns 
     */
    hasArgs() {
        return this.#numArgs > 0;
    }
}
