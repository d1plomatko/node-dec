const path = require('node:path');
const fs = require('node:fs/promises')

class UserService {
    filePath = path.join(process.cwd(), 'users.json')

    async getUsers() {
        const users = await fs.readFile(this.filePath, {encoding: "utf8"})
        return JSON.parse(users)

    }

    async saveUsers(users){
        return fs.writeFile(this.filePath, JSON.stringify(users))
    }

    async createUser(user) {
        const users = await this.getUsers()
        const newArr = [...users, user]

        await this.saveUsers(newArr)

        return this.getUsers()
    }

    async getUserById(userId) {
        const users = await this.getUsers()
        return users[+userId]
    }

    async updateUserById(userId, user) {
        const users = await this.getUsers()
        users[+userId] = user

        await fs.writeFile(this.filePath, JSON.stringify(users))
        return user
    }

    async deleteUserById(userId){
        const users = await this.getUsers()

        users.splice(+userId, 1)
        await this.saveUsers(users)
    }
}

module.exports = new UserService()