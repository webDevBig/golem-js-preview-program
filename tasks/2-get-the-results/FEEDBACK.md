# Golem JS Preview Program Feedback Form

## Introduction

Thank you for taking the time to complete this Golem JS Preview Program task!

We appreciate your valuable feedback and suggestions on how to improve the Golem Network.
Please fill out the form below:

## Task: #2 - Get the results

### Estimated completion time:

| Task Step                  | Completion Time (in minutes) |
| -------------------------- | ---------------------------- |
| Modify a `main.mjs` script |              65                |
| Download the output file    |               5               |

List any additional steps that were necessary to resolve the task (other than the steps in the README.md):

[
I installed espeak and ffmpeg for this task

]

### Feedback:

#### JS SDK Docs

[

Could you find the necessary information? If not what topics were difficult to find?
I didn't find any information about espeak and ffmpeg.

How would you change the structure/navigation of the docs? Recommend changes. 
No changes

Are examples and tutorials useful? What was missing, and what was too detailed or unnecessary?
Need more tutorial with command "espeak" and "ffmpeg"

Have you noticed any errors? Please describe them or provide links to issues if you have already reported them.
No
]

#### JS golem-js

[
    
Is JS SDK API intuitive and helps solve the tasks? If not, what would you change?
Yes

Have you encountered any errors in the golem-js lib? Provide the link(s) to the issue(s) in `golem-js` [repository](https://github.com/golemfactory/golem-js/issues) which you had reported.
No

What additional features would you add?
Nothing

]

#### General feedback:

[

What was your general experience with Golem Network? What was difficult/frustrating?
What was a nice surprise? 

I had errors almost every step of the way while working on this task. At first, the text was not converted to .wav, then there were problems with the .mp3 file. But when I solved the first problem, everything fell into place.
For the fist time difficult write nice and clean code. It is my first experiences with Golem Network, so I need more practice.

These were my mistakes, as I did not indicate the path correctly. Accordingly, the first mistake led to others. Since this is my first experience with Golem, it was difficult for me to immediately find my mistakes and correct them. 


Error 1. I did not install `espeak` and accordingly the .wav file was not created ;
Error 2. After text was convert to the .wav file, I tried to create the file locally. 
`writeFileSync("output.wav", espeakResult)` But I got an error: 
ERROR: ReferenceError: writeFileSync is not defined.

Error 3. I entered the path incorrectly.
const convertResult = await ctx.run(`ffmpeg -i /output.wav /output.mp3`)
And received this:
ERROR: Task 1 has been rejected! The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received null
     error: {
       "type": "Error",
       "message": "Task 1 has been rejected! The \"data\" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received null",
       "stack":
           Error: Task 1 has been rejected! The "data" argument must be of type string or an instance of Buffer, TypedArray, or DataView. Received null
               at TaskService.startTask (/Users/valeriasokol/Desktop/Golem Factory/golem-js-preview-program-master/tasks/2-get-the-results/node_modules/@golem-sdk/golem-js/dist/golem- js.cjs.js:2757:23)
               at process.processTicksAndRejections (node:internal/process/task_queues:95:5)
     }

Then I just started doing everything from the beginning. I installed `espeak` and `ffmpeg` and did everything sequentially as in the instructions and everything worked out.
My global mistake was that at beginning I chose a complicated way instead of simple.

In what projects could you utilize Golem Network?
Maybe in the project with audio player.
]

#### Preview Program

[

Were the tasks and instructions adequate and clear? Yes

Is there anything you would improve about the JS Preview program?
Nothing
]


---

Thank you for your feedback and for contributing to the Golem Network!
