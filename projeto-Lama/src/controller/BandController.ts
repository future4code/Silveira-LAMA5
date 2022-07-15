import { Request, Response } from "express"
import { BandBusiness } from "../business/BandBusiness"
import { BaseDatabase } from "../data/BaseDatabase"
import { BandinputDTO, findBandInputDTO, UserAdmDTO } from "../model/Band"

export class BandController {

    async createBand(req: Request, res: Response) {

        try {

            const input: BandinputDTO = {
                name: req.body.bandName,
                responsible: req.body.responsible,
                music_genre: req.body.music_genre
            }
            const User: UserAdmDTO = {
                email: req.body.UserAdmEmail
            }   
            const bandBusiness = new BandBusiness()
            const data = await bandBusiness.Sign_upBand(input,User)

            res.status(200).send({ message: data })

        } catch (error) {
            if (error instanceof Error) {
                res.send({ message: error.message })
            } else {
                throw new Error("Erro do banco!")
            }
        }

        
    }

    async findBand(req: Request, res: Response) {

        try {

            const nameData: findBandInputDTO = {
                name: req.body.name
            };

            const userBusiness = new BandBusiness()
            const band = await userBusiness.getBand(nameData)

            res.status(200).send({ band })

        } catch (error) {
            if (error instanceof Error) {
                res.send({message: error.message})
            } else {
                throw new Error("Erro do banco!")
            }
        }

       
    }
}