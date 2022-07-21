import express from "express"
import { ShowsBusiness } from "../business/ShowsBusiness"
import { ShowsController } from "../controller/ShowsController"
import { ShowsDatabase } from "../data/ShowsDatabase"
import { IdGenerator } from "../services/IdGenerator"


export const showsRouter = express.Router()

const showsBusiness = new ShowsBusiness(
    new ShowsDatabase(),
    new IdGenerator()
);
const showsController = new ShowsController(showsBusiness)

showsRouter.post("/add", showsController.showsCreator);
showsRouter.get("/:weekDay", showsController.findShow);