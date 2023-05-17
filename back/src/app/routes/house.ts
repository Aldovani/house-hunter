import Express from 'express'
import HouseController from '../controllers/HouseController'
import HouseValidator from '../validators/house'

const router = Express.Router()

router.get("/house", HouseController.index)

router.get("/house/:id", HouseValidator.get, HouseController.get)

router.post("/house", HouseController.create)

router.put("/house/:id", HouseController.update)

router.delete("/house/:id", HouseController.delete)



export default router 