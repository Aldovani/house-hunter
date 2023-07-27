import { describe, expect, it } from 'vitest'
import { getDistanceBetweenCoordinates } from '../getDistanceBetweenCoordinates'

describe('Get distance Between Coordinates', () => {
  it('Get distance ', () => {
    const distance = getDistanceBetweenCoordinates(
      {
        latitude: -21.600369,
        longitude: -48.391894,
      },
      {
        latitude: -21.600369,
        longitude: -48.391894,
      },
    )


    expect(distance < 10).toBeTruthy()
  })
})
