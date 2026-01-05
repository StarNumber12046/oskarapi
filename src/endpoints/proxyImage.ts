import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Task } from "../types";

export class OskarProxy extends OpenAPIRoute {
  schema = {
    tags: ["Images"],
    summary: "Get an image given its path",
    request: {
      params: z.object({
        image: z.string(),
      }),
    },
  };
  async handle(c: AppContext) {
    const image = c.req.param("image");
    const oskarObject = await c.env.OSKAR.get(image);

    if (!oskarObject) {
      return new Response("Image not found", { status: 404 });
    }

    return new Response(oskarObject.body, {
      headers: {
        "Content-Type": oskarObject.httpMetadata?.contentType ?? "image/jpeg",
      },
    });
  }
}
