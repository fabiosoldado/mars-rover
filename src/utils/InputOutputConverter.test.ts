import { InputOutputConverter } from './InputOutputConverter'
import {
  MarsRoverStartAndActions,
  MarsRoverState,
  WorldDimensions,
} from '../types'
import { CardinalDirection, RobotAction } from '../constants'

describe('InputOutputConverter', () => {
  describe('parseWorldDimensions', () => {
    test('succeeds with a valid string', () => {
      expect(InputOutputConverter.parseWorldDimensions('4 8')).toStrictEqual(<
        WorldDimensions
      >{
        maxLatitude: 4,
        maxLongitude: 8,
      })
    })
    test('fails with invalid string', () => {
      expect(() => InputOutputConverter.parseWorldDimensions('48')).toThrow()
      expect(() => InputOutputConverter.parseWorldDimensions('4 A')).toThrow()
    })
  })
  describe('parseStartPositionAndActions', () => {
    test('succeeds with valid string', () => {
      expect(
        InputOutputConverter.parseStartPositionAndActions('(2, 3, E) LFRFF')
      ).toStrictEqual(<MarsRoverStartAndActions>{
        initialPosition: {
          x: 2,
          y: 3,
        },
        initialOrientation: CardinalDirection.East,
        actions: [
          RobotAction.RotateLeft,
          RobotAction.MoveForward,
          RobotAction.RotateRight,
          RobotAction.MoveForward,
          RobotAction.MoveForward,
        ],
      })
    })
    test('fails with invalid string', () => {
      expect(() =>
        InputOutputConverter.parseStartPositionAndActions('(2, 3, E LFRFF')
      ).toThrow()
      expect(() =>
        InputOutputConverter.parseStartPositionAndActions('(2, 3 E) LFRFF')
      ).toThrow()
      expect(() =>
        InputOutputConverter.parseStartPositionAndActions('(2, 3, SE) LFRFF')
      ).toThrow()
      expect(() =>
        InputOutputConverter.parseStartPositionAndActions('(-1, 3, SE) LFRFF')
      ).toThrow()
      expect(() =>
        InputOutputConverter.parseStartPositionAndActions('(, 3, SE) LFRFF')
      ).toThrow()
      expect(() =>
        InputOutputConverter.parseStartPositionAndActions('(, 3, SE) LFRFB')
      ).toThrow()
    })
  })
  describe('convertMarsRoverStateToString', () => {
    test('when robot is not lost', () => {
      const state: MarsRoverState = {
        position: {
          x: 4,
          y: 4,
        },
        orientation: CardinalDirection.East,
        isLost: false,
      }
      expect(InputOutputConverter.convertMarsRoverStateToString(state)).toBe(
        '(4, 4, E)'
      )
    })
    test('when robot is lost', () => {
      const state: MarsRoverState = {
        position: {
          x: 0,
          y: 4,
        },
        orientation: CardinalDirection.West,
        isLost: true,
      }
      expect(InputOutputConverter.convertMarsRoverStateToString(state)).toBe(
        '(0, 4, W) LOST'
      )
    })
  })
})
