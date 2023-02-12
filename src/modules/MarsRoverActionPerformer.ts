import ActionPerformer from './ActionPerformer'
import {
  MarsRoverAction,
  MarsRoverOrientation,
  MarsRoverPosition,
  MarsRoverState,
  MarsRoverWorldDimensions,
} from '../types'
import { RobotAction, RotationDirection } from '../constants'
import { CardinalOrientationHelper } from '../utils/CardinalOrientationHelper'

export class InvalidPositionError extends RangeError {
  constructor() {
    super('Invalid position')
  }
}

/** Action performer for the Mars Rover robot */
export class MarsRoverActionPerformer extends ActionPerformer<
  MarsRoverWorldDimensions,
  MarsRoverPosition,
  MarsRoverOrientation,
  MarsRoverAction
> {
  constructor(worldDimensions: MarsRoverWorldDimensions) {
    super(worldDimensions)
  }

  /** Returns a state based on the given coordinates and orientation. Throws an InvalidPositionError if the
   * coordinates are not valid for the current World dimensions */
  state(
    x: number,
    y: number,
    orientation: MarsRoverOrientation
  ): MarsRoverState {
    const position: MarsRoverPosition = { x, y }
    if (!this.isValidPosition(position)) {
      throw new InvalidPositionError()
    }

    return {
      position,
      orientation,
      isLost: false,
    }
  }

  performAction(
    state: MarsRoverState,
    action: MarsRoverAction
  ): MarsRoverState {
    if (state.isLost) {
      return state
    }
    switch (action) {
      case RobotAction.MoveForward:
        return this.moveForward(state)
      case RobotAction.RotateLeft:
        return this.rotate(state, RotationDirection.Left)
      case RobotAction.RotateRight:
        return this.rotate(state, RotationDirection.Right)
    }
  }

  protected moveForward(state: MarsRoverState): MarsRoverState {
    const { xOffset, yOffset } =
      CardinalOrientationHelper.getMoveForwardOffsets(state.orientation, 1)
    const newPosition: MarsRoverPosition = {
      x: state.position.x + xOffset,
      y: state.position.y + yOffset,
    }

    if (this.isValidPosition(newPosition)) {
      return {
        ...state,
        position: newPosition,
      }
    } else {
      return {
        ...state,
        isLost: true,
      }
    }
  }

  protected rotate(
    state: MarsRoverState,
    direction: RotationDirection
  ): MarsRoverState {
    const currentOrientation = state.orientation
    const nextOrientation = CardinalOrientationHelper.rotate(
      currentOrientation,
      direction
    )
    return {
      ...state,
      orientation: nextOrientation,
    }
  }

  protected isValidPosition(position: MarsRoverPosition): boolean {
    const { maxLatitude, maxLongitude } = this.worldDimensions
    const { x, y } = position
    return x <= maxLatitude && x >= 0 && y <= maxLongitude && y >= 0
  }
}
