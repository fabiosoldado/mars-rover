import { WorldDimensions } from '../types'

const worldDimensionsRegex = new RegExp(/^([0-9]+) ([0-9]+)$/)

export module InputOutputConverter {
  export function parseWorldDimensions(s: string): WorldDimensions {
    const regexResult = worldDimensionsRegex.exec(s)
    if (regexResult === null) {
      throw new Error('Invalid world dimensions input')
    }

    const [_, maxLatitudeString, maxLongitudeString] = regexResult

    if (maxLatitudeString === undefined || maxLongitudeString === undefined) {
      throw new Error('Invalid world dimensions input')
    }

    const maxLatitude = Number.parseInt(maxLatitudeString)
    const maxLongitude = Number.parseInt(maxLongitudeString)

    /* Should never trigger since whe validate this earlier. This is here just for type validation. */
    if (
      !maxLatitude ||
      !maxLongitude ||
      Number.isNaN(maxLatitude) ||
      Number.isNaN(maxLongitude)
    ) {
      throw new Error('Invalid world dimensions input')
    }

    return { maxLatitude, maxLongitude }
  }
}
