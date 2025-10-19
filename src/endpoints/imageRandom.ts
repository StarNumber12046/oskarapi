import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Task } from "../types";

export class OskarRandom extends OpenAPIRoute {
  schema = {
    tags: ["Images"],
    summary: "Get a random image for Oskar",
    request: {},
  };
  async handle(c: AppContext) {
    const oskarImages = await c.env.OSKAR.list({});
    const randomImage =
      oskarImages.objects[
        Math.floor(Math.random() * oskarImages.objects.length)
      ];
    const oskarObject = await c.env.OSKAR.get(randomImage.key);

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
