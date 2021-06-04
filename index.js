// Поднятие веб-сервера через встроенный модуль http
const http = require("http");
const fs = require("fs").promises; // Импорт модуля для примера чтения файла при запросе

// Переменная для порта
const PORT = 8081;

// Обработчик запросов с условием по урл /home
const requestHandler = async (request, response) => {
  // Читаем файл, чтобы отдать при запросе
  const manifest = await fs.readFile("./package.json", "utf8");

  response.writeHead(200, { "Content-type": "text/json" }); // на любой запрос отвечаем 200 статусом и типом
  return response.end(manifest); // завершаем запрос + отдаем контент
};

// Создание инстанса сервера с обработчиком внутри
const server = http.createServer(requestHandler);

// Слушатель порта
server.listen(PORT, (error) => {
  if (error) {
    console.error("Error at server launch:", error);
  }

  console.log(`Server works at ${PORT}`);
});
