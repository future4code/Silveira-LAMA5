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
      await this.getConnection()
        .insert({
          id,
          name,
          music_genre,
          responsible
        })
        .into(BandDatabase.TABLE_NAME)
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(error.message)
    } else {
        throw new Error("Erro do banco!")
    }
    }
  }

  public async getBandByName(name: string): Promise<Band> {
    const result = await this.getConnection()
      .select("*")
      .from(BandDatabase.TABLE_NAME)
      .where({ name });

    return result[0];
  }

}