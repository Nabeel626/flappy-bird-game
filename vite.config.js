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
        style: fileURLToPath(new URL("./src/style.scss", import.meta.url)),
        bird1: fileURLToPath(new URL("./images/flappybirdv1.gif", import.meta.url)),
        bird2: fileURLToPath(new URL("./images/flappy-bird-background.gif", import.meta.url)),
        bird3: fileURLToPath(new URL("./images/loadingbar2.gif", import.meta.url)),
        bird4: fileURLToPath(new URL("./images/pipe1.png", import.meta.url)),
        bird5: fileURLToPath(new URL("./images/pipe2.png", import.meta.url)),
      },
    },
  },
  base: "./",
});