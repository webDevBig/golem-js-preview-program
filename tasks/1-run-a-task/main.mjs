import { TaskExecutor } from "@golem-sdk/golem-js";

(async function main() {
  const executor = await TaskExecutor.create({
    package: "1e65223a888bd7a4521e06ba7f3f3ba648e8a09ffd18f3658efba336",
    yagnaOptions: { apiKey: "7eb7bce657144200b75f562c82088b74" },
  });
  await executor.run(async (ctx) => {

    const fortuneResult = await ctx.run("/usr/games/fortune -i");
    console.log("Fortune Result:", fortuneResult.stdout);

  });
  await executor.end();
})();
