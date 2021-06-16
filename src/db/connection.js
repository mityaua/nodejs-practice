const MongoClient = require('mongodb').MongoClient; // Подключение MongoDB
const collection = {};

const getCollection = () => {
  return collection;
};

const connectMongo = async () => {
  const client = await MongoClient.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }); // Коннект к базе
  const db = client.db(); // Инициализация базы данных

  collection.Posts = db.collection('posts'); // Подключение к коллекции
};

module.exports = {
  connectMongo,
  getCollection,
};
