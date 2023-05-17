import { Request, Response } from "express";
import houseRepository from "../repositories/houseRepository";
import { HouseRequestGet, HouseRequestIndex } from "../validators/house";

class HouseController {

  async index(req: HouseRequestIndex, res: Response) {

    const { originalLat, originalLng } = req.dataValidated

    const distanceToAdd = 10;

    const latDegreesToAdd = distanceToAdd / 111.12;

    const northLat = originalLat + latDegreesToAdd;
    const southLat = originalLat - latDegreesToAdd;

    const lngDegreesToAdd = distanceToAdd / (111.12 * Math.cos(originalLat * Math.PI / 180));

    const eastLng = originalLng + lngDegreesToAdd;
    const westLng = originalLng - lngDegreesToAdd;

    const result = await houseRepository.findByRange(eastLng, westLng, northLat, southLat)


    res.json(result)
  }

  async get(req: HouseRequestGet, res: Response) {
    const { id } = req.dataValidated
    const result = await houseRepository.findById(id)
    return res.json(result)
  }

  async create(req: Request, res: Response) {

    const {
      longitude,
      latitude,
      address,
      buy_price,
      rent_price,
      description
    } = req.body

    if (!Number(latitude) || !Number(longitude)) {
      return res.sendStatus(400)
    }

    // if (!address || address)

    const house = {
      longitude,
      latitude,
      address,
      buy_price,
      rent_price,
      description
    }
    const result = await houseRepository.create(house)
    res.json(result[0])
  }

  update(req: Request, res: Response) { }
  delete(req: Request, res: Response) { }

}


export default new HouseController()