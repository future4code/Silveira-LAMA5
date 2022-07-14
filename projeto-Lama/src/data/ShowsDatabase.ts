import { Shows } from "../model/Shows"
import { BaseDatabase } from "./BaseDatabase"

export class ShowsDatabase extends BaseDatabase {
    private static TABLE_NAME = "NOME_TABELA_SHOWS"

    insert = async(
        shows: Shows
    ) => {
        try{
            await this.getConnection()
            .insert({
                id: shows.getId(),
                week_day: shows.getWeekDay(),
                start_time: shows.getStartTime(),
                end_time: shows.getEndTime(),
                band_id: shows.getBandId()
            })
            .into(ShowsDatabase.TABLE_NAME)
        }catch(error){
            if (error instanceof Error) {
                throw new Error(error.message)
            } else {
                throw new Error("Erro do banco!")
            }
        }      
    }

    public getShows = async(week_day: string, start_time: number) => {
        const result = await this.getConnection()
        .select("*")
        .from(ShowsDatabase.TABLE_NAME)
        .where({
            "week_day": week_day,
            "start_time": start_time
        });
        return result[0]
    }

    public getShowsByWeekDay = async(week_day: string)=> {
        const result = await this.getConnection()
        .select("NOME_TABELA_BANDAS.name", "NOME_TABELA_BANDAS.music_genre")
        .from(ShowsDatabase.TABLE_NAME)
        .join(
            "NOME_TABELA_BANDAS",
            "band_id",
            "=",
            "NOME_TABELA_BANDAS.id"
        )
        .where({week_day})

        return result
    }
}