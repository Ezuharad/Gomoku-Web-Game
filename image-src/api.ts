import { Router } from "./deps.ts"

const router = new Router({prefix: "/api"});

router
    .get("/:h", (Context) => {
        Context.response.body = "API Test" // TODO: Change / fix
        Context.send;
    });

export default router;
