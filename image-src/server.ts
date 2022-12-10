import {Application, send} from "./deps.ts";
import api from "./api.ts";

// Internal port used by Docker image
const PORT = 9999;

// Create app middleware
const app = new Application();

// Logger
app.use(async (Context, _next) => {
  await _next();
  const rt = Context.response.headers.get('X-Response-Time');
  const method = Context.request.method;
  console.log(`${method} requested at ${Context.request.url} took ${rt}`);
});

// Timing
app.use(async (Context, _next) => {
  const start = Date.now();
  await _next();
  const ms = Date.now() - start;
  Context.response.headers.set('X-response-Time', `${ms}ms`);
})

// Serve static files
app.use(async (Context, _next) => {
  const filePath = Context.request.url.pathname;
  
  await send(Context, filePath, {
    root: `${Deno.cwd()}/public`,
    index: 'index.html'
  });
});

// Enable routes from api
app.use(api.routes());

// 404 Page
app.use((Context) => {  // TODO: Get this to work
  Context.response.type = 'text/html';
  Context.response.status = 404;
  Context.response.body = 'error404.html';
  Context.send;
});

// Server start listener
app.addEventListener('listen', () => {
  console.log(`Listening on localhost:${PORT}`);
});

// Server error event listener
app.addEventListener('error', (err) => {
  console.log(`Caught an error: ${err.message}`);
});

// Start server
await app.listen({port: PORT});
