import Express from 'express'
import { houseRouter } from "./app/routes"
// import "./databases"


const app = Express()

app.use(Express.json())
app.use(houseRouter)

app.listen(3000, () => {
  console.log("🔥 server is running port 3000")
})
