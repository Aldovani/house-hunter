import { NextFunction, Request, Response } from "express";
import { CustomRequest } from "./types";



class HouseValidator {

  get(req: HouseRequestGet, res: Response, next: NextFunction) {
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

  index(req: CustomRequest, res: Response, next: NextFunction) {

    const { query } = req
    const originalLat = Number(query.latitude)
    const originalLng = Number(query.longitude)

    if (isNaN(originalLat) || isNaN(originalLng)) {
      return res.status(400).json({
        error: "",
        type: "type incorrect"
      })
    }


    next()


  }

  create() { }
  update() { }
  delete() { }


}

export default new HouseValidator()