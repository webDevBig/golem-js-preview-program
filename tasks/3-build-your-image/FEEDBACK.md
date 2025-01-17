# Golem JS Preview Program Feedback Form

## Introduction

Thank you for taking the time to complete this Golem JS Preview Program task!

We appreciate your valuable feedback and suggestions on how to improve the Golem Network.
Please fill out the form below:

## Task: #3 - Build a custom image

### Estimated completion time:

| Task Step                  | Completion Time (in minutes) |
| -------------------------- | ---------------------------- |
| Build custom image |                  115            |
| Create a script that uses script included in the image   |        20                      |

List any additional steps that were necessary to resolve the task (other than the steps in the README.md):

[
I added to the Dockerfile install commander. Without it was some errors

In the generator.mjs we have this line "import { program } from "commander";". So when I write Dockerfile for the first time I didn't add this. And I received an error. So I incleded this line  "RUN npm install commander" to the Dockerfile and it worked.

Error 1. I created a Dockerfile and when running `docker run golem-node` command received the following message:
Error [ERR_MODULE_NOT_FOUND]: Cannot find package 'commander' imported from /golem/work/generator.mjs
     at new NodeError (node:internal/errors:406:5)
     at packageResolve (node:internal/modules/esm/resolve:789:9)
     at moduleResolve (node:internal/modules/esm/resolve:838:20)
     at defaultResolve (node:internal/modules/esm/resolve:1043:11)
     at ModuleLoader.defaultResolve (node:internal/modules/esm/loader:383:12)
     at ModuleLoader.resolve (node:internal/modules/esm/loader:352:25)
     at ModuleLoader.getModuleJob (node:internal/modules/esm/loader:228:38)
     at ModuleWrap.<anonymous> (node:internal/modules/esm/module_job:85:39)
     at link (node:internal/modules/esm/module_job:84:36) {
   code: 'ERR_MODULE_NOT_FOUND'
}  
So I added `RUN npm install commander`.
Error 2. I kept getting the error that the file '/golem/work/generator.mjs' not found.
I tried to output the contents of the /golem/work folder to the console:
   const workDirContent = await ctx.run('ls /golem/work');
     console.log('/golem/work content:', workDirContent.stdout);

Always the answer was ` null`.

To fix those errors, I rewrote the Dockerfile from the beginning and replaced the working folder with /app. Builded a Docker image, converted it to the Golem image format, and uploaded it to the Golem registry. I checked if generator.mjs works correctly in Docker image `docker run -it golem-node`. 
Then I rewrote the main script with other paths and everything worked.
]

### Feedback:

#### JS SDK Docs

[

Could you find the necessary information? If not what topics were difficult to find? Yes, I found all I need

How would you change the structure/navigation of the docs? Recommend changes.

Specify that maybe you'll need to include additional libraries or tools to the Dockerfile.
Cause I was have some isues with adding generator.mjs to the Dockerfile and reading this script at the main.mjs

Are examples and tutorials useful? What was missing, and what was too detailed or unnecessary?
It was easy to create Docker image and convert it to the Golem image format with helpful link.

Have you noticed any errors? Please describe them or provide links to issues if you have already reported them. No

]

#### JS golem-js

[
    
Is JS SDK API intuitive and helps solve the tasks? If not, what would you change? Yes, it helps

Have you encountered any errors in the golem-js lib? Provide the link(s) to the issue(s) in `golem-js` [repository](https://github.com/golemfactory/golem-js/issues) which you had reported.
No

What additional features would you add?
Nothing
]

#### General feedback:

[

What was your general experience with Golem Network? What was difficult/frustrating? 
What was a nice surprise?
It was interesting to create Docker image.

In what projects could you utilize Golem Network?
Maybe in the future, if my projects will need it
]

#### Preview Program

[

Were the tasks and instructions adequate and clear?  Yes

Is there anything you would improve about the JS Preview program? Nothing

]


---

Thank you for your feedback and for contributing to the Golem Network!