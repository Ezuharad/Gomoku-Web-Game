import { Application, send } from "./deps.ts";
import { argParser } from "./server/components/argParser.ts";
import GAME_ROUTER from "./server/components/routes/gameRouter.ts";

// Argument parser looks at Deno argvector
const parser = new argParser(Deno.args);

// Internal port used by Docker image
const PORT = parser.getDockerPort();

// Create app middleware
const app = new Application();

// Logger
app.use(async (Context, _next) => {
  await _next();
  const rt = Context.response.headers.get("X-Response-Time");
  const method = Context.request.method;
  console.log(`${method} requested at ${Context.request.url} took ${rt}`);
});

// Enable routes from API_ROUTER
app.use(GAME_ROUTER.routes());
app.use(GAME_ROUTER.allowedMethods());

// Serve static files
app.use(async (Context, _next) => {
  const filePath = Context.request.url.pathname;
  await send(Context, filePath, {
      root: `${Deno.cwd()}/public`,
      index: "index.html"
  });
});

// Server start listener
app.addEventListener("listen", () => {
  console.log(`Listening on localhost:${PORT}`);
});

// Start server
await app.listen({port: PORT});
