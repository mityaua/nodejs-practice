const app = require('./src/app');
const db = require('./src/db');

// Устанавливаем порт для приложения
const PORT = process.env.PORT || 3000;

db.then(() => {
  // Слушатель сервера на указанном портe
  app.listen(PORT, () => {
    console.log(`Server running. Use API on port ${PORT}`);
  });
}).catch(err => {
  console.log(`Server not running. Error message: ${err.message}`);
});
