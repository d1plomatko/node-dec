import * as fs from "node:fs/promises";
import * as path from "node:path";

import { IUser } from "../interfaces/user.interface";

class UserService {
  filePath = path.join(process.cwd(), "src", "users.json");

  async getUsers() {
    const users = await fs.readFile(this.filePath, { encoding: "utf8" });
    return JSON.parse(users);
  }

  async saveUsers(users: IUser[]) {
    return fs.writeFile(this.filePath, JSON.stringify(users));
  }

  async createUser(user: IUser) {
    const users = await this.getUsers();
    const newArr = [...users, user];

    await this.saveUsers(newArr);

    return this.getUsers();
  }

  async getUserById(userId: string) {
    const users = await this.getUsers();
    return users[+userId];
  }

  async updateUserById(userId: string, user: IUser) {
    const users = await this.getUsers();
    users[+userId] = user;

    await fs.writeFile(this.filePath, JSON.stringify(users));
    return user;
  }

  async deleteUserById(userId: string) {
    const users = await this.getUsers();

    users.splice(+userId, 1);
    await this.saveUsers(users);
  }
}

export const userService = new UserService();
