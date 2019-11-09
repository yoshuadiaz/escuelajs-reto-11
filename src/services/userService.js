const MongoConnect = require('../lib/mongo');
const bcrypt = require('bcrypt');

class UserService {
  constructor() {
    this.mongodb = new MongoConnect()
    this.collection = 'users'
  }

  async getUser({ email }) {
    try {
      const [user] = await this.mongodb.getAll(this.collection, { email })
      return user
    } catch (error) {
      throw new Error(error);
    }
  }

  async createUser(user) {
    try {
      const { name, email, password } = user
      console.log('USER:', user)
      const hashedPassword = await bcrypt.hash(password, 10);

      const createdUser = await this.mongodb.create(this.collection, {
        name, email, password: hashedPassword
      }) 

      return createdUser
    } catch (error) {
      throw new Error(error);
    }
  }
}

module.exports = UserService;
