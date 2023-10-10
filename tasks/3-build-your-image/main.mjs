import { TaskExecutor } from "@golem-sdk/golem-js";

(async function main() {
  const executor = await TaskExecutor.create({
    package: "2680eddb927fab0c47b5c68b15ade6845764fdfa95e41869474a670e",
    yagnaOptions: { apiKey: "7eb7bce657144200b75f562c82088b74" }, 
  });

  const taskResult = await executor.run(async (ctx) => {
    const generatorResult = await ctx.run("node /app/generator.mjs --sample=10");
    console.log("Generator Result:", generatorResult.stdout);
  });

  await executor.end();
})();