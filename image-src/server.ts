import { Application } from "./deps.ts";
import { argParser } from "./server/components/argParser.ts";
import GAME_ROUTER from "./server/components/routes/gameRouter.ts";

// Argument parser looks at Deno argvector
const parser = new argParser(Deno.args);

// Internal port used by Docker image
const PORT = parser.getDockerPort();

// Create app middleware
const app = new Application();

// Logger
app.use(async (Context, next) => {
  const receiveTime = Date.now();
  const url = Context.request.url;

  await next();

  const sendTime = Date.now();
  const returnTime = sendTime - receiveTime;
  const method = Context.request.method;

  console.log(`${method} requested at ${url} took ${returnTime}ms`);
});

// Enable routes from API_ROUTER
app.use(GAME_ROUTER.routes());
app.use(GAME_ROUTER.allowedMethods());

// Serve static files
app.use(async (Context) => {
  const requestUrl = Context.request.url.pathname;
  const file = `${Deno.cwd()}/public${requestUrl}`;
  
  try {
    await Deno.stat(file);
  }
  catch(error) {  // Always will result in 404 error
    console.error(`An unexpected error occurred: ${error.name}`);
    Context.request.url.pathname = "/error404.html";
    Context.response.status = 404;
  }

  await Context.send({
    root: `${Deno.cwd()}/public`,
    index: "index.html"
  })
});

// Server start listener
app.addEventListener("listen", () => {
  console.log(`Listening on localhost at Docker port ${PORT}`);
});

// Server error listener
app.addEventListener("error", (event) => {
  console.error(`An unexpected error occurred: ${event}`);
});

// Start server
await app.listen({port: PORT});
