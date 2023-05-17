import { Request } from "express"


export interface HouseRequestIndex {
  latitude: string
  longitude: string
}

export type CustomRequest = Request<{}, {}, {}, HouseRequestIndex>

