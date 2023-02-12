import { Action, CardinalDirection } from './constants'

/** Represents the limits of a 2-dimensional world know by the robot */
export interface WorldDimensions {
  /** Max value for the latitude. Equivalent to the size of the x-axis. */
  maxLatitude: number
  /** Max value for the longitude. Equivalent to the size of the y-axis. */
  maxLongitude: number
}

/** Represents the position of the Mars Rover */
export type MarsRoverPosition = {
  xPosition: number
  yPosition: number
}

/** Represents the orientation of the Mars Rover */
export type MarsRoverOrientation =
  | CardinalDirection.North
  | CardinalDirection.South
  | CardinalDirection.East
  | CardinalDirection.West

/** Represents the actions that Mars Rover can take */
export type MarsRoverAction =
  | Action.MoveForward
  | Action.RotateLeft
  | Action.RotateRight
