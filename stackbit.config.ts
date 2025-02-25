// stackbit.config.ts
import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  // Comando de desenvolvimento: ajuste conforme necessário para o seu projeto
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
        },
        {
          name: "Page",
          type: "page",
          urlPath: "/pages/{slug}",
          filePath: "content/pages/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "body", type: "markdown", required: true }
          ]
        }
      ]
    })
  ],
  siteMap: ({ documents, models }) => {
    const pageModels = models.filter((m) => m.type === "page");
    return documents
      .filter((doc) => pageModels.some((m) => m.name === doc.modelName))
      .map((document) => ({
        stableId: document.id,
        urlPath: document.modelName === "Homepage" ? "/" : `/pages/${document.slug}`,
        document,
        isHomePage: document.modelName === "Homepage",
      })) as SiteMapEntry[];
  }
});
