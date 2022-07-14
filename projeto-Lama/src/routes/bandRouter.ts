import express from "express"
import { BandController } from "../controller/BandController"

export const bandRouter = express.Router()

const bandController = new BandController()

bandRouter.post("/signup-band", bandController.createBand)
bandRouter.get("/find", bandController.findBand)