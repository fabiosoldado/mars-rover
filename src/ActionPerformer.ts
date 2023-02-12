import { Action, Orientation, Position, State, WorldDimensions } from './types'

/** Abstract class that represents an Action Performer. Can be extended with any set of Actions and supported
 * orientations. */
export default abstract class ActionPerformer<
  WD extends WorldDimensions,
  P extends Position,
  O extends Orientation,
  A extends Action,
  S = State<P, O>
> {
  protected constructor(protected readonly worldDimensions: WD) {
    const { maxLatitude, maxLongitude } = worldDimensions
    if (maxLatitude < 0 || maxLongitude < 0) {
      throw new RangeError('Invalid world dimensions')
    }
  }

  /** Performs a single action and returns the resulting state */
  abstract performAction(state: S, action: A): S

  /** Performs multiple actions, in the given order, and returns the final state */
  performActions(state: S, actions: A[]): S {
    return actions.reduce(
      (state, action) => this.performAction(state, action),
      state
    )
  }
}
