import { IdGenerator } from "../services/IdGenerator"
import { BandinputDTO, findBandInputDTO, UserAdmDTO } from "../model/Band"
import { BandDatabase } from "../data/BandDatabase"
import { UserDatabase } from "../data/UserDatabase"
import { User } from "../model/User"

export class BandBusiness {

   
    async Sign_upBand(band:BandinputDTO, user:UserAdmDTO ) {
        const aUserDatabase = new UserDatabase() 
        const userRole:User = await aUserDatabase.getUserByEmail(user.email)
        if(userRole.getRole() !== "ADMIN") {
            throw new Error("Apenas administradores adicionam bandas.")
        } 
        if(!band.name || !band.music_genre || !band.responsible){
            throw new Error("Campos name, music_genre, responsible nao preenchidos !")
        }
        if(typeof band.name !== 'string' || typeof band.music_genre !== 'string' 
        || typeof band.responsible !== 'string' 
        || typeof user.email !== 'string') {
            throw new Error("Apenas strings nos campos !")
        }
        const idGenerator = new IdGenerator()
        const id = idGenerator.generate()
         
        const bandDatabase = new BandDatabase()
        await bandDatabase.createBand(id, band.name, band.music_genre, band.responsible)

        return "Banda registrada!"
    }

    async getBand(band: findBandInputDTO) {

        if(!band.name) {
            throw new Error("Informe o nome da banda!")
        }
        if(typeof band.name === 'string') {
            throw new Error(" type error !")
        }

        const bandDatabase = new BandDatabase()
        
        const bandFromDB = await bandDatabase.getBandByName(band.name)

        return bandFromDB
    }
}