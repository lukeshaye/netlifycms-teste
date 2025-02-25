import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  stackbitVersion: "~0.6.0",
  nodeVersion: "18",
  devCommand: "npx serve .",
  contentSources: [
    new GitContentSource({
      rootPath: __dirname,
      contentDirs: ["content"],
      models: [
        {
          name: "Homepage",
          type: "page",
          urlPath: "/",
          filePath: "content/homepage.json",
          fields: [
            { name: "hero_title", type: "string", required: true },
            { name: "hero_subtitle", type: "string", required: false },
            { name: "hero_button_link", type: "string", required: false },
            { name: "hero_button_text", type: "string", required: false },
            { name: "primary_color", type: "string", required: false },
            { name: "background_color", type: "string", required: false },
            { name: "text_color", type: "string", required: false }
          ]
        }
      ]
    })
  ]
});
