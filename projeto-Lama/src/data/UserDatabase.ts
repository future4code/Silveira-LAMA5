import { BaseDatabase } from "./BaseDatabase"
import { User } from "../model/User"

export class UserDatabase extends BaseDatabase {

  private static TABLE_NAME = "NOME_TABELAS_USUÁRIOS"

  public async createUser(
    id: string,
    email: string,
    name: string,
    password: string,
    role: string
  ): Promise<void> {
    try {
      console.log(UserDatabase.TABLE_NAME)
      await this.connection(UserDatabase.TABLE_NAME)
        .insert({
          id,
          email,
          name,
          password,
          role
        })
    } catch (error: any) {

      throw new Error(error.sqlMessage || error.message)

    }
  }

  public async getUserByEmail(email: string): Promise<User> {
    const result = await this.connection(UserDatabase.TABLE_NAME)
      .select("*")
      .where({ email });

    return User.toUserModel(result[0]);
  }
}