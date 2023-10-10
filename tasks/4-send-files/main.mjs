import { TaskExecutor } from "@golem-sdk/golem-js";
import * as fs from 'fs';

(async function main() {
  const executor = await TaskExecutor.create({
    package: "99485eccb31568ef306c6e31edd5208992585fb1a1a913e102153b75",
    yagnaOptions: { apiKey: "7eb7bce657144200b75f562c82088b74" },
  });

  const imagePath = 'image.png';
  await executor.run(async (ctx) => {

    const result = await executor.run(async (ctx) => {
        await ctx.uploadFile(imagePath, '/golem/work/golem-node.png');
        const ocrResult = await ctx.run(`tesseract /golem/work/golem-node.png /golem/work/output`);
      
        await ctx.downloadFile('/golem/work/output.txt', 'output.txt');
     
        const ocrText = fs.readFileSync('output.txt', 'utf8');
        console.log('OCR Result:', ocrText);
      });
    
  });
  await executor.end();
})();
