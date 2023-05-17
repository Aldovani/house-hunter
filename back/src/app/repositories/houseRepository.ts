import sql from 'mssql'
import { House } from "../models/House";


class HouseRepository {

  async findByRange(east: number, west: number, north: number, south: number) {

    const result = await sql.query(`select h.* from house h
    where h.latitude between   ${west} and ${east}
    and h.longitude between ${south} and ${north}
    `)
    return result.recordset
  }

  async findById(id: number) {

    const result = await sql.query(`select h.* from house h where h.id = ${id}`,)
    return result.recordset
  }

  async create(housePayload: Omit<House, "id" | "contact" | "comfortable">) {

    const result = await sql.query(`
    insert into house(
      address,
      description,
      longitude,
      latitude,
      buy_price,
      rent_price)
      OUTPUT Inserted.*

     values(
      '${housePayload.address}',
      '${housePayload.description}',
      ${housePayload.longitude},
      ${housePayload.latitude},
      ${housePayload.buy_price},
      ${housePayload.rent_price}
)
    `)
    return result.recordset
  }

}


export default new HouseRepository()