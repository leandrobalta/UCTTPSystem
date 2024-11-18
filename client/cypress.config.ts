import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173", // Ajuste para o endereço correto do frontend
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
