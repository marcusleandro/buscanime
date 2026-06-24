import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "https://graphql.anilist.co",
  documents: ["src/services/AnimeService.ts"],
  generates: {
    "src/types/generated/anilist.schema.ts": {
      plugins: ["typescript"],
      config: {
        enumsAsTypes: true,
        skipTypename: true,
      },
    },
    "src/types/generated/graphql.ts": {
      plugins: ["typescript-operations"],
      config: {
        skipTypename: true,
        preResolveTypes: {
          mode: "dependency",
          dependencyTypesPath: "./anilist.schema",
        },
      },
    },
  },
};

export default config;
