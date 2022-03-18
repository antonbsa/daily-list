const { connectToDatabase } = require('../core/service/database');

module.exports = {
  connectToMongo: async (req, res, next) => {
    await connectToDatabase();
    next();
  }
}
