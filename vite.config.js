import { defineConfig } from "vitest/config";
import { fileURLToPath } from "url";
export default defineConfig({
  test: {
    globals: true,
  },
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        index: fileURLToPath(new URL("index.html", import.meta.url)),
        game: fileURLToPath(new URL("startGame.html", import.meta.url)),
        score: fileURLToPath(new URL("scoreboard.html", import.meta.url)),
        bird: fileURLToPath(new URL("/src/images/flappybirdv1.gif", import.meta.url)),
        pipe1: fileURLToPath(new URL("/src/images/pipe1.png", import.meta.url)),
        pipe2: fileURLToPath(new URL("/src/images/pipe1.png", import.meta.url)),
      },
    },
  },
  base: "./",
});