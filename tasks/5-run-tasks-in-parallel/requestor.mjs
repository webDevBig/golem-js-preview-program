import { TaskExecutor } from "@golem-sdk/golem-js";
import { program } from "commander";
import * as fs from 'fs';
import * as path from "path";

(async () => {
  const executor = await TaskExecutor.create({
    package: "28716c377b8484abe9fb11dfb94b97831233f18a42658d677657f88b",
    yagnaOptions: {
      apiKey: '7eb7bce657144200b75f562c82088b74'
    }
  });

  program.option("-i, --images <path>", "path to images directory");
  program.parse();
  const imagesPath = program.opts().images;
  const folderName = await fs.promises.readdir(imagesPath);

  const imagesData = folderName.map((image) => {
    const [name, ext] = image.split(".");
    if (ext == "jpg" || ext == "png" || ext == "jpeg") {
      return {
        path: path.join(imagesPath, image),
        name,
      };
    } else {
      return;
    }
  });

  const results = executor.map(imagesData, async (ctx, image) => {
    const fileName = path.basename(image.path);
    console.log(image.path)
    ctx.uploadFile(image.path, `/golem/work/${fileName}`);
    const output = await ctx.run(`/realsr-ncnn-vulkan/realsr-ncnn-vulkan -i /golem/work/${fileName} -o /golem/work/upscaled-${fileName} -s 2 -f .jpg`);
    await ctx.downloadFile(`/golem/work/upscaled-${fileName}`, `${imagesPath}/upscaled-${fileName}`);
  
    return output;
  });

  for await (const result of results) console.log(result);
 
  await executor.end();
})();


