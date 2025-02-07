import { configDefaults, defineConfig, mergeConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    coverage: {
      all: true,
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
