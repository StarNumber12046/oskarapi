import { Bool, Num, OpenAPIRoute } from "chanfana";
import { z } from "zod";
import { type AppContext, Task } from "../types";

export class OskarList extends OpenAPIRoute {
  schema = {
    tags: ["Images"],
    summary: "Get all images for Oskar",
    response: {
      "200": {
        description: "Returns a list of images",
        content: {
          "application/json": {
            schema: z.object({
              images: z.array(z.string()),
            }),
          },
        },
      },
    },
  };
  async handle(c: AppContext) {
    const oskarImages = await c.env.OSKAR.list({});

    return Response.json({ images: [oskarImages.objects.map((i) => i.key)] });
  }
}
