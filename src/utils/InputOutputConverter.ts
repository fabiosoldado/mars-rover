import {
  MarsRoverAction,
  MarsRoverStartAndActions,
  MarsRoverState,
  MarsRoverWorldDimensions,
} from '../types'
import { RobotAction, CardinalDirection } from '../constants'

export module InputOutputConverter {
  const worldDimensionsRegex = new RegExp(/^([0-9]+) ([0-9]+)$/)
  const marsPositionRegex = new RegExp(
    /^\(([0-9]+), ([0-9]+), ([NSEW])\) ([LRF]+)$/
  )

  /** Parses the first line of the input. Throws an error if the string is invalid. Example of a valid string: "4 8",
   * where 4 is the max latitude and 8 is the max longitude. */
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

  /** Parses the robot start position and actions string. Throws and error if the string is invalid. Example of a
   * valid string: "(2, 3, E) LFRFF". */
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

    const x = Number.parseInt(xPositionString)
    const y = Number.parseInt(yPositionString)

    const orientation = parseOrientation(orientationString)
    const actions = actionsString.split('').map(parseActionString)

    return {
      initialPosition: {
        x,
        y,
      },
      initialOrientation: orientation,
      actions,
    }
  }

  /** Returns the state in its string representation. Example: "(4, 4, E)" */
  export function convertMarsRoverStateToString(state: MarsRoverState): string {
    const { position, orientation, isLost } = state
    const orientationChar = getOrientationChar(orientation)
    return `(${position.x}, ${position.y}, ${orientationChar})${isLostSuffix(
      isLost
    )}`
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

  function getOrientationChar(orientation: CardinalDirection): string {
    switch (orientation) {
      case CardinalDirection.North:
        return 'N'
      case CardinalDirection.South:
        return 'S'
      case CardinalDirection.East:
        return 'E'
      case CardinalDirection.West:
        return 'W'
    }
  }

  function isLostSuffix(isLost: boolean): string {
    return isLost ? ' LOST' : ''
  }
}
