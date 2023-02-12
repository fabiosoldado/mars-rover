import { InputOutputConverter } from './InputOutputConverter'
import { WorldDimensions } from '../types'
import { RobotAction, CardinalDirection } from '../constants'
import MarsRoverStartAndActions = InputOutputConverter.MarsRoverStartAndActions

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
          xPosition: 2,
          yPosition: 3,
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
})
