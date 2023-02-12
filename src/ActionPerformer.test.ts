import ActionPerformer from './ActionPerformer'
import { Position, State, WorldDimensions } from './types'
import { CardinalDirection } from './constants'

type SimpleAction = 'up' | 'down'
interface SimpleState extends State<Position, CardinalDirection.North> {
  stateIndex: number
}
class SimpleActionPerformer extends ActionPerformer<
  WorldDimensions,
  Position,
  CardinalDirection.North,
  SimpleAction,
  SimpleState
> {
  constructor(worldDimensions: WorldDimensions) {
    super(worldDimensions)
  }
  public upActionCounter = 0
  public downActionCounter = 0
  public orderedActionsAndState: [SimpleAction, SimpleState][] = []
  performAction(state: SimpleState, action: SimpleAction): SimpleState {
    this.orderedActionsAndState.push([action, state])
    const newState: SimpleState = {
      ...state,
      stateIndex: state.stateIndex + 1,
    }
    switch (action) {
      case 'up':
        this.upActionCounter++
        return newState
      case 'down':
        this.downActionCounter++
        return newState
      default:
        throw new Error('Invalid Action')
    }
  }
}

describe('ActionPerformer', () => {
  describe('performActions', () => {
    const actionPerformer = new SimpleActionPerformer({
      maxLatitude: 4,
      maxLongitude: 8,
    })
    const initialState: SimpleState = {
      stateIndex: 0,
      position: {
        yPosition: 0,
        xPosition: 0,
      },
      orientation: CardinalDirection.North,
      isLost: false,
    }
    const finalState = actionPerformer.performActions(initialState, [
      'up',
      'up',
      'up',
      'down',
      'up',
      'up',
      'down',
    ])
    test('performs all actions, in the right order, and over the right state', () => {
      expect(actionPerformer.upActionCounter).toBe(5)
      expect(actionPerformer.downActionCounter).toBe(2)
      const [action, state] = actionPerformer.orderedActionsAndState[3] || []
      expect(action).toBe('down')
      expect(state?.stateIndex).toBe(3)
    })
    test('returns the final state', () => {
      expect(finalState.stateIndex).toBe(7)
    })
  })
})
