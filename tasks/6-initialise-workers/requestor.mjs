import { TaskExecutor } from "@golem-sdk/golem-js";
import * as fs from 'fs';

(async () => {
  const executor = await TaskExecutor.create({
    package: "a7db2f25445de01650a62ffcfb35219ed48f014ece83cfea15c36b0f",    
    yagnaOptions: { apiKey: '7eb7bce657144200b75f562c82088b74' },
    maxParallelTasks: 3,
    taskVolume: { '/golem/input': { model: 'test/data' } },
  });

  const words = fs.readFileSync('test-data.txt', 'utf8').split('\n').map(word => word.trim());
  const chunkSize = Math.ceil(words.length / 3);
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize));
  }

  executor.beforeEach(async (ctx) => {
    console.log(ctx.provider.name + " is downloading worldcities.csv file");
    await ctx.uploadFile('worldcities.csv', '/golem/input/worldcities.csv');
  });

  await executor.forEach(chunks, async (ctx, item) => {
    const chunkText = item.join('\n');
   await ctx
      .beginBatch()
      .run('python3', ['similarities.py', '-w', chunkText, '-d', '/golem/input/worldcities.csv'])
      .end();
  });
  
  await executor.end(); 
})();
