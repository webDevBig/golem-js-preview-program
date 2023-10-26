import {
  TaskExecutor
} from "@golem-sdk/golem-js";
import {
  program
} from "commander";
import * as fs from 'fs';
import * as path from "path";

program.option("-i, --images <path>", "path to images directory");
program.parse();
const imagesPath = program.opts().images;

(async () => {
  const executor = await TaskExecutor.create({
    package: "28716c377b8484abe9fb11dfb94b97831233f18a42658d677657f88b",
    yagnaOptions: {
      apiKey: '7eb7bce657144200b75f562c82088b74'
    }
  });


  const folderName = await fs.promises.readdir(imagesPath);

  const imagesData = folderName
    .map((image) => {
      const [name, ext] = image.split(".");
      if (ext == "jpg" || ext == "png" || ext == "jpeg") {
        return {
          path: `./images/${image}`,
          name,
          ext,
        };
      } else {
        return;
      }
    })
    .filter((image) => image && !image.name.startsWith("upscaled-"));

  if (!folderName) {
    console.error("Please provide a valid path to the images directory");
    process.exit(1);
  }


  if (!imagesData.length) {
    console.error("No images to process");
    process.exit(1);
  }
  console.log(`Found ${imagesData.length} images to process`);

  for (const image of imagesData) {
    try {
      await executor.run(async (ctx) => {
        if (!fs.existsSync(image.path)) {
          console.error(`File not found: ${image.path}`);
          return;
        }

        let fileName = path.basename(image.path);

        ctx.uploadFile(image.path, `/golem/work/${fileName}`);
        const output = await ctx.run(`realesrgan-ncnn-vulkan -i /golem/work/${fileName} -o /golem/work/upscaled-${fileName} -n realesr-animevideov3-x2 -s 2 -f .jpg`);

        if (output.stderr && output.stderr.includes("decode image")) {
          console.error(`Error decoding image: ${output.stderr}`);

        } else if (output.isBatchFinished) {
          await ctx.downloadFile(`/golem/work/upscaled-${fileName}`, `${imagesPath}/upscaled/upscaled-${fileName}`);
          console.log(output);
        }
      });
    } catch (err) {
      console.error(`Task execution error: ${err}`);
    }
  }

  await executor.end();
})();