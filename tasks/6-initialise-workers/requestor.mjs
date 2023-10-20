import { TaskExecutor } from "@golem-sdk/golem-js";
import * as fs from 'fs';

(async () => {
  const executor = await TaskExecutor.create({
    package: "a7db2f25445de01650a62ffcfb35219ed48f014ece83cfea15c36b0f",    
    yagnaOptions: { apiKey: '7eb7bce657144200b75f562c82088b74' },
    maxParallelTasks: 3,
  });

  const words = fs.readFileSync('test-data.txt', 'utf8').split('\n').map(word => word.trim());
  const chunkSize = Math.ceil(words.length / 3);
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize));
  }

  await executor.run(async (ctx) => {
    await ctx.uploadFile('db.csv', '/golem/work/db.csv');
    const results = [];

    for (const chunk of chunks) {
      const chunkText = chunk.join('\n');
      await ctx.uploadFile('db.csv', '/golem/work/db.csv');
      const result = await ctx.run('python3', 'similarities.py', '-w', chunkText, '-d', '/golem/work/db.csv');
      results.push(result);
    }

    for (const result of results) {
      
      console.log(result);
    }
  });

  await executor.end(); 
})();
