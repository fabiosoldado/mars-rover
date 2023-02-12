import { CardinalDirection, RotationDirection } from '../constants'
import { CardinalOrientationHelper } from './CardinalOrientationHelper'

describe('CardinalOrientationHelper', () => {
  describe('when directed North', () => {
    const orientation = CardinalDirection.North
    test('rotate left', () => {
      expect(
        CardinalOrientationHelper.rotate(orientation, RotationDirection.Left)
      ).toBe(CardinalDirection.West)
    })
    test('rotate right', () => {
      expect(
        CardinalOrientationHelper.rotate(orientation, RotationDirection.Right)
      ).toBe(CardinalDirection.East)
    })
    test('getXYMove', () => {
      const { xOffset, yOffset } =
        CardinalOrientationHelper.getMoveForwardOffsets(orientation, 1)
      expect(xOffset).toBe(0)
      expect(yOffset).toBe(1)
    })
  })
  describe('when directed South', () => {
    const orientation = CardinalDirection.South
    test('rotate left', () => {
      expect(
        CardinalOrientationHelper.rotate(orientation, RotationDirection.Left)
      ).toBe(CardinalDirection.East)
    })
    test('rotate right', () => {
      expect(
        CardinalOrientationHelper.rotate(orientation, RotationDirection.Right)
      ).toBe(CardinalDirection.West)
    })
    test('getMoveForwardOffsets', () => {
      const { xOffset, yOffset } =
        CardinalOrientationHelper.getMoveForwardOffsets(orientation, 2)
      expect(xOffset).toBe(0)
      expect(yOffset).toBe(-2)
    })
  })
  describe('when directed West', () => {
    const orientation = CardinalDirection.West
    test('rotate left', () => {
      expect(
        CardinalOrientationHelper.rotate(orientation, RotationDirection.Left)
      ).toBe(CardinalDirection.South)
    })
    test('rotate right', () => {
      expect(
        CardinalOrientationHelper.rotate(orientation, RotationDirection.Right)
      ).toBe(CardinalDirection.North)
    })
    test('getXYMove', () => {
      const { xOffset, yOffset } =
        CardinalOrientationHelper.getMoveForwardOffsets(orientation, 3)
      expect(xOffset).toBe(-3)
      expect(yOffset).toBe(0)
    })
  })
  describe('when directed East', () => {
    const orientation = CardinalDirection.East
    test('rotate left', () => {
      expect(
        CardinalOrientationHelper.rotate(orientation, RotationDirection.Left)
      ).toBe(CardinalDirection.North)
    })
    test('rotate right', () => {
      expect(
        CardinalOrientationHelper.rotate(orientation, RotationDirection.Right)
      ).toBe(CardinalDirection.South)
    })
    test('getXYMove', () => {
      const { xOffset, yOffset } =
        CardinalOrientationHelper.getMoveForwardOffsets(orientation, 4)
      expect(xOffset).toBe(4)
      expect(yOffset).toBe(0)
    })
  })
})
