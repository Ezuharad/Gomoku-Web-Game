import { Router } from "../../../deps.ts"

const GAME_ROUTER = new Router({prefix: "/api"});

GAME_ROUTER
    .get("/:h", (Context) => {
        Context.response.body = "API Test"; // TODO: Change / fix
    });

export default GAME_ROUTER;
