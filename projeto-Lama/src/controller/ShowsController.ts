import { Request, Response } from "express"
import { ShowsBusiness } from "../business/ShowsBusiness"
import { BaseDatabase } from "../data/BaseDatabase"
import { ShowsInputDTO } from "../model/Shows"

export class ShowsController {
    constructor( 
        private showsBusiness: ShowsBusiness
    ){}

    showsCreator = async(
        req: Request,
        res: Response
        ) => {
        try {
            const input: ShowsInputDTO = {
                week_day: req.body.week_day,
                start_time: req.body.start_time,
                end_time: req.body.end_time,
                band_id: req.body.band_id
            }

            await this.showsBusiness.showsCreator(input)

            res.status(200).send({
                message: "Agendado com sucesso!"
            });

        } catch (error) {
            if (error instanceof Error) {
                res.send({message: error.message})
            } else {
                throw new Error("Erro do banco!")
            }
        }
        
    }
    findShow = async(
        req: Request,
        res: Response
        ) => {
        try {
            const weekDay = req.params.weekDay

            const shows = await this.showsBusiness.findShow(weekDay)

            res.status(200).send(
                shows
            );

        } catch (error) {
            if (error instanceof Error) {
                res.send({message: error.message})
            } else {
                throw new Error("Erro do banco!")
            }
        }
        
    }
}