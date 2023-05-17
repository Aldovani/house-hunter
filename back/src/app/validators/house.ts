import { NextFunction, Request, Response } from "express";
import { number, z } from "zod";


export interface HouseRequestGet extends Request {
  dataValidated: {
    id: number
  }
}

export interface HouseRequestIndex extends Request {
  dataValidated: {
    originalLng: number
    originalLat: number
  }
}


class HouseValidator {

  async get(req: HouseRequestGet, res: Response, next: NextFunction) {
    const id = Number(req.params?.id)
    console.log(id)
    if (!id) {
      return res.status(400).json({
        type: ""
      })

    }

    req.dataValidated = {
      id
    }

    next()

  }

  async index(req: HouseRequestIndex, res: Response, next: NextFunction) {

    const { query } = req
    const originalLat = Number(query.latitude)
    const originalLng = Number(query.longitude)


    if (isNaN(originalLat) || isNaN(originalLng)) {
      return res.status(400).json({
        error: "",
        type:"type incorrect"
      })
    }
    req.dataValidated = {
      originalLat,
      originalLng
    }

    next()


  }

  async create() { }
  async update() { }
  async delete() { }


}

export default new HouseValidator()