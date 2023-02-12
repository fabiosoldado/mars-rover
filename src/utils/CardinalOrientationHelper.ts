import { CardinalDirection, RotationDirection } from '../constants'

/** Helper module with helper functions for rotating and moving inside a 2-dimensional world */
export module CardinalOrientationHelper {
  interface XYOffsets {
    xOffset: number
    yOffset: number
  }
  const clockwiseCardinalPoints = [
    CardinalDirection.North,
    CardinalDirection.East,
    CardinalDirection.South,
    CardinalDirection.West,
  ]

  /** Given an initial orientation, returns the orientation resulting from rotating 90 degrees in the
   * requested direction */
  export function rotate(
    orientation: CardinalDirection,
    rotateDirection: RotationDirection
  ): CardinalDirection {
    const index = clockwiseCardinalPoints.indexOf(orientation)
    const offset = rotateDirection === RotationDirection.Right ? 1 : 3
    const resultIndex = (index + offset) % 4
    const newOrientation = clockwiseCardinalPoints[resultIndex]
    if (newOrientation === undefined) {
      throw new Error('Invalid Orientation')
    }
    return newOrientation
  }

  /** Given an initial orientation, returns the X and Y offsets of taking the requested amount of steps in that
   * direction */
  export function getMoveForwardOffsets(
    orientation: CardinalDirection,
    steps: number
  ): XYOffsets {
    return {
      xOffset: steps * getXOffset(orientation),
      yOffset: steps * getYOffset(orientation),
    }
  }

  function getXOffset(orientation: CardinalDirection): number {
    switch (orientation) {
      case CardinalDirection.East:
        return 1
      case CardinalDirection.West:
        return -1
      default:
        return 0
    }
  }
  function getYOffset(orientation: CardinalDirection): number {
    switch (orientation) {
      case CardinalDirection.North:
        return 1
      case CardinalDirection.South:
        return -1
      default:
        return 0
    }
  }
}
