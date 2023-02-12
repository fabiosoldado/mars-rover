import {
  MarsRoverAction,
  MarsRoverOrientation,
  MarsRoverPosition,
  MarsRoverWorldDimensions,
} from '../types'
import { RobotAction, CardinalDirection } from '../constants'

export module InputOutputConverter {
  export interface MarsRoverStartAndActions {
    initialPosition: MarsRoverPosition
    initialOrientation: MarsRoverOrientation
    actions: MarsRoverAction[]
  }

  const worldDimensionsRegex = new RegExp(/^([0-9]+) ([0-9]+)$/)
  const marsPositionRegex = new RegExp(
    /^\(([0-9]+), ([0-9]+), ([NSEW])\) ([LRF]+)$/
  )

  export function parseWorldDimensions(s: string): MarsRoverWorldDimensions {
    const regexResult = worldDimensionsRegex.exec(s)
    if (regexResult === null) {
      throw new Error('Invalid world dimensions input')
    }

    const [_, maxLatitudeString, maxLongitudeString] = regexResult

    if (maxLatitudeString === undefined || maxLongitudeString === undefined) {
      throw new Error('Invalid world dimensions input')
    }

    const maxLatitude = Number.parseInt(maxLatitudeString)
    const maxLongitude = Number.parseInt(maxLongitudeString)

    /* Should never trigger since whe validate this earlier. This is here just for type validation. */
    if (
      !maxLatitude ||
      !maxLongitude ||
      Number.isNaN(maxLatitude) ||
      Number.isNaN(maxLongitude)
    ) {
      throw new Error('Invalid world dimensions input')
    }

    return { maxLatitude, maxLongitude }
  }

  export function parseStartPositionAndActions(
    s: string
  ): MarsRoverStartAndActions {
    const regexResult = marsPositionRegex.exec(s)
    if (regexResult === null) {
      throw new Error('Invalid input for Mars Rover starting position')
    }

    const [
      _,
      xPositionString,
      yPositionString,
      orientationString,
      actionsString,
    ] = regexResult

    if (
      !xPositionString ||
      !yPositionString ||
      !orientationString ||
      !actionsString
    ) {
      throw new Error('Invalid input for Mars Rover starting position')
    }

    const xPosition = Number.parseInt(xPositionString)
    const yPosition = Number.parseInt(yPositionString)

    const orientation = parseOrientation(orientationString)
    const actions = actionsString.split('').map(parseActionString)

    return {
      initialPosition: {
        xPosition,
        yPosition,
      },
      initialOrientation: orientation,
      actions,
    }
  }

  function parseActionString(s: string): MarsRoverAction {
    switch (s) {
      case 'L':
        return RobotAction.RotateLeft
      case 'R':
        return RobotAction.RotateRight
      case 'F':
        return RobotAction.MoveForward
      default:
        throw new Error('Invalid action')
    }
  }

  function parseOrientation(s: string): CardinalDirection {
    switch (s) {
      case 'N':
        return CardinalDirection.North
      case 'S':
        return CardinalDirection.South
      case 'W':
        return CardinalDirection.West
      case 'E':
        return CardinalDirection.East
      default:
        throw new Error('Invalid direction string')
    }
  }
}
