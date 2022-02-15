const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const envName = process.env.NODE_ENV === 'prod' ? 'prod' : 'dev';
const dbPassword = process.env.DB_PASSWORD;

async function connectToDatabase() {
  mongoose.connect(`mongodb+srv://${envName}-user:${dbPassword}@cluster0.zt6zn.mongodb.net/${envName}-db?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const db = mongoose.connection;
  db.on('error', (e) => console.error(e));
  db.once('open', () => console.log('📦 Connected to the database'));
}

const dailySchema = new Schema({
  project_name: {
    type: String,
    required: true,
  },
  participants: {
    type: [String],
    required: true,
  },
  last_speak_list: {
    type: [String],
    required: false,
  },
  already_played_music: {
    type: [String],
    required: false,
  },
  daily_time: {
    type: String,
    required: true,
  },
  access_url: {
    type: String,
    required: true,
  },
}, { timestamps: true });

module.exports = {
  connectToDatabase,
  Daily: model('Daily', dailySchema),
};
