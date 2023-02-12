import { RobotAction, CardinalDirection } from './constants'

/** Represents the limits of a 2-dimensional world know by the robot */
export interface WorldDimensions {
  /** Max value for the latitude. Equivalent to the size of the x-axis. */
  maxLatitude: number
  /** Max value for the longitude. Equivalent to the size of the y-axis. */
  maxLongitude: number
}

/** Represents a position in a 2-dimensional world */
export type Position = {
  xPosition: number
  yPosition: number
}


export type Orientation = string
export type Action = string

export interface State<P extends Position, O extends Orientation> {
  position: P
  orientation: O
  isLost: boolean
}

export type MarsRoverWorldDimensions = WorldDimensions
/** Represents the position of the Mars Rover */
export type MarsRoverPosition = Position

/** Represents the orientation of the Mars Rover */
export type MarsRoverOrientation =
  | CardinalDirection.North
  | CardinalDirection.South
  | CardinalDirection.East
  | CardinalDirection.West

/** Represents the actions that Mars Rover can take */
export type MarsRoverAction =
  | RobotAction.MoveForward
  | RobotAction.RotateLeft
  | RobotAction.RotateRight

export type MarsRoverState = State<MarsRoverPosition, MarsRoverOrientation>
