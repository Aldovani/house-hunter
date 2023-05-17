import Comfortable from "./Comfortable"
import Contact from "./Contact"

export interface House {
  id: number
  longitude: number
  latitude: number
  address: string
  buy_price: number
  rent_price: number
  description: string
  contact: Contact[]
  comfortable: Comfortable[]
}
