import { fromHono } from "chanfana";
import { Hono } from "hono";
import { OskarRandom } from "./endpoints/imageRandom";
import { OskarList } from "./endpoints/imageList";

// Start a Hono app
const app = new Hono<{ Bindings: Env }>();

// Setup OpenAPI registry
const openapi = fromHono(app, {
  docs_url: "/",
});

// Register OpenAPI endpoints
openapi.get("/oskar", OskarRandom);
openapi.get("/oskar/list", OskarList);

// You may also register routes for non OpenAPI directly on Hono
// app.get('/test', (c) => c.text('Hono!'))

// Export the Hono app
export default app;
