// Модуль Node.js для работы с файловой системой (есть синхронный, и асинхронный вариант (коллбеки или промисы))
const fs = require("fs").promises;
const path = require("path");

// Чтение файла (асинхронное, через async-await)
(async () => {
  try {
    const data = await fs.readFile(path.resolve("./data.txt"), "utf8");
    console.log(data);

    // Создаем новый текст на основе прочитанного
    const newData = `${data} this is new data from old data!`;

    // Запись нового файла на основе переменной newData (путь + дата)
    await fs.writeFile("./new-data.txt", newData);

    // Переименование файла (путь + новое имя)
    // Также служит для перемещения (путь + новый путь)
    await fs.rename("./for-rename.js", "new-name.js");

    // Прочитать данные из директории (путь)
    console.log(await fs.readdir("./node_modules"));

    // Удалить файл (путь)
    await fs.unlink("./for-delete.js");

    // Дозаписать в файл (путь, дата, кодировка)
    await fs.appendFile("./new-data.txt", "Пример данных для дозаписи", "utf8");
  } catch (error) {
    console.error(error.message);
  }
})();

// Чтение файла (асинхронное, через then)
// fs.readFile(path.resolve("./data.txt"), "utf8")
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error.message);
//   });

// const fs = require("fs");

// Чтение файла (асинхронное, через коллбеки) - Error first callback
// Путь (абсолютный, через модуль path), кодировка, коллбек(error + получаемая data)
// fs.readFile(path.resolve("./data.txt"), "utf8", (error, data) => {
//   if (error) {
//     console.error(error.message);
//   }

//   console.log(data);
// });
