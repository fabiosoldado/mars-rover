import { InputOutputConverter } from './utils/InputOutputConverter'
import {
  MarsRoverStartAndActions,
  MarsRoverState,
  MarsRoverWorldDimensions,
} from './types'
import { MarsRoverActionPerformer } from './modules/MarsRoverActionPerformer'

export module App {
  export function run(lines: string[]): void {
    if (lines.length < 2) {
      throw new Error('Invalid Input')
    }
    const worldDimensionsString = lines[0]
    if (!worldDimensionsString) {
      throw new Error('Missing input for world dimensions')
    }

    const worldDimensions = InputOutputConverter.parseWorldDimensions(
      worldDimensionsString
    )

    const startPositionsAndActions = lines
      .slice(1)
      .filter(l => l.length !== 0)
      .map(InputOutputConverter.parseStartPositionAndActions)

    execute(worldDimensions, startPositionsAndActions)
  }

  function execute(
    worldDimensions: MarsRoverWorldDimensions,
    startPositionsAndActions: MarsRoverStartAndActions[]
  ): void {
    const marsRoverActionPerformer = new MarsRoverActionPerformer(
      worldDimensions
    )

    const finalStates = startPositionsAndActions.map(
      ({ initialPosition, initialOrientation, actions }) => {
        const initialState = marsRoverActionPerformer.state(
          initialPosition.x,
          initialPosition.y,
          initialOrientation
        )
        return marsRoverActionPerformer.performActions(initialState, actions)
      }
    )

    printResults(finalStates)
  }

  function printResults(results: MarsRoverState[]): void {
    results
      .map(InputOutputConverter.convertMarsRoverStateToString)
      .forEach(result => console.log(result))
  }
}
