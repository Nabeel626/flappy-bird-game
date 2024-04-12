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
        bird1: fileURLToPath(new URL("**/*images/flappybirdv1.GIF", import.meta.url)),
        bird2: fileURLToPath(new URL("**/*images/flappybirdbackground.GIF", import.meta.url)),
        bird3: fileURLToPath(new URL("**/*images/loadingbar2.GIF", import.meta.url)),
        bird4: fileURLToPath(new URL("**/*images/pipe1.PNG", import.meta.url)),
        bird5: fileURLToPath(new URL("**/*images/pipe2.PNG", import.meta.url)),
      },
    },
  },
  base: "./",
});