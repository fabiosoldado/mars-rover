# MARS ROVER

This program computes the final state of a Mars Rover (or the last known state if the robot exists the grid and gets lost).

## Description

The program was split into a couple of modules:
- `main.ts` - The entry point for the program. Reads the input and calls the `App` module.
- `App.ts` - The application runner. Receives the input as an array of lines, instantiates the `MarsRoverActionPerformer`
and runs the sequence of actions for all the robots as specified in the input.
- `modules/ActionPerformer.ts` - Generic Performer for a sequence of Actions.
- `modules/MarsRoverActionPerformer.ts` - Action Performer for the Mars Rover.
- `utils/InputOutputConverter.ts` - Helper module to parse the input and generate the output.
- `utils/CardinalOrientationHelper.ts` - Helper module to help with rotations and moving on a 2-dimensional world.

## Commands

### Run the program
The program can be executed by running:

```bash
$ npm start
```

You can then type the input in the format described in the challenge.
Finally, press `CTRL+D`. The program will execute, print out the result
and terminate.

### Run the program with input file

There are 2 example input files in the `resources` directory. You can
execute them with the following commands:

```bash
$ npm run test-input-1
$ npm run test-input-2
```
You can also run with any other input file with:
```bash
$ cat {path-to-input-file} | npm start
```

### Run the unit tests
Run all the unit tests with:
```bash
$ npm test
```

Or run a specific unit test:

```bash
$npm test {path-to-testfile}
```

