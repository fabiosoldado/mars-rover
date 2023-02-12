import { MarsRoverState } from '../types'
import { CardinalDirection, RobotAction } from '../constants'
import { MarsRoverActionPerformer } from './MarsRoverActionPerformer'

describe('MarsRover', () => {
  describe('state', () => {
    const actionPerformer = new MarsRoverActionPerformer({
      maxLatitude: 4,
      maxLongitude: 8,
    })
    test('succeeds when called with valid start position', () => {
      expect(() =>
        actionPerformer.state(2, 3, CardinalDirection.East)
      ).not.toThrow()
      expect(actionPerformer.state(2, 3, CardinalDirection.East)).toStrictEqual(
        <MarsRoverState>{
          orientation: CardinalDirection.East,
          position: {
            x: 2,
            y: 3,
          },
          isLost: false,
        }
      )
      expect(() =>
        actionPerformer.state(0, 0, CardinalDirection.East)
      ).not.toThrow()
      expect(actionPerformer.state(0, 0, CardinalDirection.East)).toStrictEqual(
        <MarsRoverState>{
          orientation: CardinalDirection.East,
          position: {
            x: 0,
            y: 0,
          },
          isLost: false,
        }
      )
    })
    test('fails when called with invalid start position', () => {
      expect(() =>
        actionPerformer.state(4, 9, CardinalDirection.East)
      ).toThrow()
      expect(() =>
        actionPerformer.state(5, 8, CardinalDirection.East)
      ).toThrow()
    })
  })
  describe('performAction', () => {
    const actionPerformer = new MarsRoverActionPerformer({
      maxLatitude: 4,
      maxLongitude: 8,
    })
    const initialState: MarsRoverState = {
      orientation: CardinalDirection.North,
      position: {
        x: 2,
        y: 3,
      },
      isLost: false,
    }
    describe('when robot is not lost', () => {
      test('rotate left', () => {
        expect(
          actionPerformer.performAction(initialState, RobotAction.RotateLeft)
        ).toStrictEqual(<MarsRoverState>{
          ...initialState,
          orientation: CardinalDirection.West,
        })
      })
      test('rotate right', () => {
        expect(
          actionPerformer.performAction(initialState, RobotAction.RotateRight)
        ).toStrictEqual(<MarsRoverState>{
          ...initialState,
          orientation: CardinalDirection.East,
        })
      })
      test('moves forward to a valid position', () => {
        const expected: MarsRoverState = {
          ...initialState,
          position: {
            x: 2,
            y: 4,
          },
          isLost: false,
        }
        expect(
          actionPerformer.performAction(initialState, RobotAction.MoveForward)
        ).toStrictEqual(expected)
      })
      test('marks lost and keeps previous coordinates when moving forward to an invalid position', () => {
        const state: MarsRoverState = {
          ...initialState,
          position: {
            ...initialState.position,
            y: 8,
          },
        }
        expect(
          actionPerformer.performAction(state, RobotAction.MoveForward)
        ).toStrictEqual(<MarsRoverState>{
          ...state,
          isLost: true,
        })
      })
    })
    describe('when robot is lost', () => {
      test('keeps coordinates if the status is already lost', () => {
        const state: MarsRoverState = { ...initialState, isLost: true }
        expect(
          actionPerformer.performAction(state, RobotAction.MoveForward)
        ).toStrictEqual(<MarsRoverState>{
          ...state,
        })
      })
    })
  })
  describe('perform actions', () => {
    const actionPerformer = new MarsRoverActionPerformer({
      maxLatitude: 4,
      maxLongitude: 8,
    })
    test('performs all actions and returns final state', () => {
      const initialState = actionPerformer.state(2, 3, CardinalDirection.East)
      const actions = [
        RobotAction.RotateLeft,
        RobotAction.MoveForward,
        RobotAction.RotateRight,
        RobotAction.MoveForward,
        RobotAction.MoveForward,
      ]
      expect(
        actionPerformer.performActions(initialState, actions)
      ).toStrictEqual(<MarsRoverState>{
        ...initialState,
        position: {
          x: 4,
          y: 4,
        },
        orientation: CardinalDirection.East,
        isLost: false,
      })
    })
    test('performs all actions and returns final state (2)', () => {
      const initialState = actionPerformer.state(2, 3, CardinalDirection.North)
      const actions = [
        RobotAction.MoveForward,
        RobotAction.RotateLeft,
        RobotAction.RotateLeft,
        RobotAction.MoveForward,
        RobotAction.RotateRight,
      ]
      expect(
        actionPerformer.performActions(initialState, actions)
      ).toStrictEqual(<MarsRoverState>{
        ...initialState,
        position: {
          x: 2,
          y: 3,
        },
        orientation: CardinalDirection.West,
        isLost: false,
      })
    })
    describe('when the robot goes off grid', () => {
      test('returns final known state', () => {
        const initialState = actionPerformer.state(
          0,
          2,
          CardinalDirection.North
        )
        const actions = [
          RobotAction.MoveForward,
          RobotAction.MoveForward,
          RobotAction.RotateLeft,
          RobotAction.MoveForward,
          RobotAction.RotateRight,
          RobotAction.MoveForward,
          RobotAction.MoveForward,
        ]
        expect(
          actionPerformer.performActions(initialState, actions)
        ).toStrictEqual(<MarsRoverState>{
          ...initialState,
          position: {
            x: 0,
            y: 4,
          },
          orientation: CardinalDirection.West,
          isLost: true,
        })
      })
      test('returns final known state (2)', () => {
        const initialState = actionPerformer.state(
          1,
          0,
          CardinalDirection.South
        )
        const actions = [
          RobotAction.MoveForward,
          RobotAction.MoveForward,
          RobotAction.RotateRight,
          RobotAction.RotateLeft,
          RobotAction.MoveForward,
        ]
        expect(
          actionPerformer.performActions(initialState, actions)
        ).toStrictEqual(<MarsRoverState>{
          ...initialState,
          position: {
            x: 1,
            y: 0,
          },
          orientation: CardinalDirection.South,
          isLost: true,
        })
      })
    })
  })
})
