const { connectToDatabase } = require('../core/service/database');

module.exports = {
  connectToMongo: async function (req, res, next) {
    console.log('=== connected')
    await connectToDatabase();
    next();
  }
} 