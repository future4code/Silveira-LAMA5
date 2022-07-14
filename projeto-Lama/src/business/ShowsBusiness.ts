import { ShowsDatabase } from "../data/ShowsDatabase"
import { Shows, ShowsInputDTO } from "../model/Shows"
import { IdGenerator } from "../services/IdGenerator"

export class ShowsBusiness {
    constructor(
        private showsDatabase: ShowsDatabase,
        private idGenerator: IdGenerator,
    ){}

    showsCreator = async(input: ShowsInputDTO) => {
        const {week_day, start_time, end_time, band_id} = input;
        
        if(!week_day || !start_time || !end_time || !band_id){
            throw new Error("Preencha os campos: 'week_day', 'start_time', 'end_time' e 'band_id'.")
        }
        if(
            week_day.toUpperCase() !== "SEXTA" &&
            week_day.toUpperCase() !== "SABADO" && 
            week_day.toUpperCase() !== "DOMINGO"
         ){
            throw new Error("Os dias para agendamento são: 'SEXTA', 'SABADO' OU 'DOMINGO'")
        }
        if(start_time < 8 ){
            throw new Error("O horário entre 8h e 23h")
        }
        if(end_time > 23){
            throw new Error("O horário entre 8h e 23h")
        }
        if(end_time < start_time){
            throw new Error("Horário do fim precisa ser maior que o de inicio")
        }
        if(start_time === end_time){
            throw new Error("Os horários de inicio de fim precisam ser diferentes um do outro.")
        }
        if(end_time - start_time > 1){
            throw new Error("Todas as bandas só tem apenas 1hr para se apresentar")
        }
        
        const id = this.idGenerator.generate();

        const resisteredShow = await this.showsDatabase.getShows(week_day.toUpperCase(), start_time);

        if(resisteredShow){
            throw new Error("Já existe uma banda agendada para este dia e este horário.")
        }

        const shows = new Shows(
            id,
            week_day.toUpperCase(),
            start_time,
            end_time,
            band_id
        );
        
        await this.showsDatabase.insert(shows);
    }
    findShow = async(weekDay: string) => {        
        if(!weekDay){
            throw new Error("Preencha o path params 'weekDay'.")
        }

        const shows = await this.showsDatabase.getShowsByWeekDay(weekDay.toUpperCase())

        return shows;
    }
}