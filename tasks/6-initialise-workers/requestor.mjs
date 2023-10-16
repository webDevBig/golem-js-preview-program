import { TaskExecutor } from "@golem-sdk/golem-js";
import * as fs from 'fs';

(async () => {
  const executor = await TaskExecutor.create({
    package: "a7db2f25445de01650a62ffcfb35219ed48f014ece83cfea15c36b0f",    
    yagnaOptions: { apiKey: '7eb7bce657144200b75f562c82088b74' },
    maxParallelTasks: 3,
  });

  const words = fs.readFileSync('test-data.txt', 'utf8').split('\n').map(word => word.trim());
  console.log("step1");

  const chunkSize = Math.ceil(words.length / 3);
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize) {
    chunks.push(words.slice(i, i + chunkSize));
  }

  for (let i = 0; i < chunks.length; i++) {
    console.log(`Частина ${i + 1}: ${chunks[i].join(', ')}`);
  }
 
  await executor.map(chunks, async (ctx, chunk) => {
    const chunkText = chunk.join('\n');

    // Заванажте базу даних та файли з словами
    await ctx.uploadFile('test-data.txt', '/golem/work/test-data.txt');
    await ctx.uploadFile('db.csv', '/golem/work/db.csv');

    // Запустіть скрипт similarities.py для валідації
    const result = await ctx.runScript({
      script: 'golem-node', // Або будь-яке інше ім'я вашого Docker-контейнера
      // Опціональні аргументи для вашої програми, передані в контейнер
      args: ['python3', 'similarities.py', '-w', chunkText, '-d', '/golem/work/db.csv'],
      // Опціональні файли, які потрібно завантажити в контейнер
      inputFiles: [
        {
          name: 'test-data.txt',
          path: '/golem/work/test-data.txt',
        },
        {
          name: 'db.csv',
          path: '/golem/work/db.csv',
        },
      ],
    });

    console.log("step2");
    return result.stdout;
  });

  await executor.end(); 
})();
