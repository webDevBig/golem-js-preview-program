import { TaskExecutor } from "@golem-sdk/golem-js";

(async function main() {
  const executor = await TaskExecutor.create({
    package: "0e24cd9c3c019143fba94debce69f37353d0157ac4329050870e9ae8",
    yagnaOptions: { apiKey: "7eb7bce657144200b75f562c82088b74" },
  });
  await executor.run(async (ctx) => {

    await ctx.run(`espeak "Hello Golem" -w /golem/work/result.wav`)
    await ctx.run(`ffmpeg -i /golem/work/result.wav /golem/work/result.mp3`)
    await ctx.downloadFile('/golem/work/result.mp3', 'result.mp3');
  });
  await executor.end();
})();