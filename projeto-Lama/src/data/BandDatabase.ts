import { Band } from "../model/Band"
import { BaseDatabase } from "./BaseDatabase"

export class BandDatabase extends BaseDatabase {

  private static TABLE_NAME = "NOME_TABELA_BANDAS"

  public async createBand(
    id: string,
    name: string,
    music_genre: string,
    responsible: string
  ): Promise<void> {
    try {
      await this.connection(BandDatabase.TABLE_NAME)
        .insert({
          id,
          name,
          music_genre,
          responsible
        })
        
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
    } else {
        throw new Error("Erro do banco!")
    }
    }
  }

  public async getBandByName(name: string): Promise<Band> {
    const result = await this.connection(BandDatabase.TABLE_NAME)
      .select("*")
      .where({ name });

    return result[0];
  }

}