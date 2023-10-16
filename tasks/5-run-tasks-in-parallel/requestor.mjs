import { TaskExecutor } from "@golem-sdk/golem-js";
import * as fs from 'fs';

(async () => {
  const executor = await TaskExecutor.create({
    package: "28716c377b8484abe9fb11dfb94b97831233f18a42658d677657f88b",    
    yagnaOptions: { apiKey: '7eb7bce657144200b75f562c82088b74' }
  });
  const folderName = await fs.promises.readdir("imageFolder");

  for (const item of folderName) {
    if (/\.(jpg|jpeg|png|gif)$/i.test(item)) {

      await executor.run(async (ctx) => {
       const command = `realsr-ncnn-vulkan/build/realsr-ncnn-vulkan -i imageFolder/${item} -o imageFolder/upscaled_${item} -s 2 -f jpg`;
        
        console.log(`Running command: ${command}`);
        
        
        const { stdout, stderr } = await ctx.run(command);
        console.log(`Command output: ${stdout}`);
        console.error(`Command errors: ${stderr}`);
      });
    }
  }

  await executor.end();
})();
