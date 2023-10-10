import { TaskExecutor } from "@golem-sdk/golem-js";
import { exec } from "child_process";

(async function main() {
  const executor = await TaskExecutor.create({
    package: "1e65223a888bd7a4521e06ba7f3f3ba648e8a09ffd18f3658efba336",
    yagnaOptions: { apiKey: "7eb7bce657144200b75f562c82088b74" },
  });
  await executor.run(async (ctx) => {
    // TODO execute fortune command

    await exec("/usr/games/fortune -i", (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return;
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
        return;
      }
      console.log(`Fortune Result: ${stdout}`);
    });

  });
  await executor.end();
})();
