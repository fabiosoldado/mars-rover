import { Action, Orientation, Position, State, WorldDimensions } from './types'

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

  abstract performAction(state: S, action: A): S

  performActions(state: S, actions: A[]): S {
    return actions.reduce(
      (state, action) => this.performAction(state, action),
      state
    )
  }
}
