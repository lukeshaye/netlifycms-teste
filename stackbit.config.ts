// stackbit.config.ts
import { defineStackbitConfig, SiteMapEntry } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";

export default defineStackbitConfig({
  contentSources: [
    new GitContentSource({
      // O caminho raiz do seu projeto
      rootPath: __dirname,
      // Diretório onde estão os arquivos de conteúdo (por exemplo, para configurações, páginas, etc.)
      contentDirs: ["content"],
      // Definição dos modelos de conteúdo
      models: [
        {
          // Modelo para a homepage (você pode chamar de "Page" se for uma página, ou "Homepage" se preferir)
          name: "Homepage",
          type: "page", 
          // URL estática que será usada para a homepage
          urlPath: "/",
          // Caminho do arquivo que armazena os dados da homepage
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
          // Modelo para páginas genéricas (para novas páginas que o CMS pode criar)
          name: "Page",
          type: "page",
          // Define a URL com base no slug (nome) da página
          urlPath: "/pages/{slug}",
          // Define onde o arquivo da página será salvo
          filePath: "content/pages/{slug}.json",
          fields: [
            { name: "title", type: "string", required: true },
            { name: "body", type: "markdown", required: true }
          ]
        }
      ]
    })
  ],
  // Configuração opcional do sitemap para ajudar o editor a navegar nas páginas editáveis
  siteMap: ({ documents, models }) => {
    // Filtra apenas os modelos do tipo "page"
    const pageModels = models.filter((m) => m.type === "page");
    return documents
      .filter((doc) => pageModels.some((m) => m.name === doc.modelName))
      .map((document) => ({
        stableId: document.id,
        // Se for a homepage, usa "/"; se for outra página, utiliza "/pages/{slug}"
        urlPath: document.modelName === "Homepage" ? "/" : `/pages/${document.slug}`,
        document,
        isHomePage: document.modelName === "Homepage",
      })) as SiteMapEntry[];
  }
});
