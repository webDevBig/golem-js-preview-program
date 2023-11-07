import { TaskExecutor } from "@golem-sdk/golem-js";
import * as fs from 'fs';

(async () => {
  const executor = await TaskExecutor.create({
    package: "a7db2f25445de01650a62ffcfb35219ed48f014ece83cfea15c36b0f",
    yagnaOptions: { apiKey: '7eb7bce657144200b75f562c82088b74' },
    maxParallelTasks: 3,
    taskTimeout: 5 * 60 * 1000, 
  });

  const words = fs.readFileSync('test-data.txt', 'utf8').split('\n').map(word => word.trim());
  

  executor.beforeEach(async (ctx) => {
    console.log(ctx.provider.name + " is downloading worldcities.csv file");
    await ctx.uploadFile('worldcities.csv', '/golem/input/worldcities.csv');
  });

  await executor.forEach(words, async (ctx, word) => {
    console.log(`Sending task for word to ${ctx.provider.name}. Data: ${word}`);
    const result = await ctx.run('/usr/local/bin/python3', ['similarities.py', '-w', word, '-d', '/golem/input/worldcities.csv']);
    console.log(`Task sent for word to ${ctx.provider.name}`);
    console.log(`Result for word ${word}: ${result.stdout}`);
  });
  
  await executor.end(); 
  console.log('Executor has finished');
})();
