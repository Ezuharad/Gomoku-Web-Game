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
  await next();
  const rt = Context.response.headers.get("X-Response-Time");
  const method = Context.request.method;
  console.log(`${method} requested at ${Context.request.url} took ${rt}`);
});

// 404 Page
app.use(async (Context, next) => {
  await next();
  if(Context.response.status === 404) {
    const path = `${Deno.cwd()}/public/error404.html`
    Context.response.body = await Deno.open(path);
    Context.response.type = "text/html";
  }
});

// Enable routes from API_ROUTER
app.use(GAME_ROUTER.routes());
app.use(GAME_ROUTER.allowedMethods());

// Serve static files
app.use(async (Context) => {
  const requestUrl = Context.request.url.pathname;
  const filePath = (requestUrl === "/" ? "/index.html" : requestUrl);  // Index
  const file = `${Deno.cwd()}/public${filePath}`;
  
  try {
    const data = await Deno.stat(file);
    if(data.isFile) {
      Context.response.body = await Deno.open(file);
    }
  }
  catch(_error) {  // Always will result in 404 error
    console.error(`An unexpected error occurred: ${_error}`);
    Context.response.status = 404;
  }
});

// Server start listener
app.addEventListener("listen", () => {
  console.log(`Listening on localhost: ${PORT}`);
});

// Server error listener
app.addEventListener("error", (event) => {
  console.error(`An unexpected error occurred: ${event}`);
});

// Start server
await app.listen({port: PORT});
