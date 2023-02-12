import { InputOutputConverter } from './InputOutputConverter'
import { WorldDimensions } from '../types'

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
})
