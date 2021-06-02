// Модуль Node.js для работы с путями
const path = require("path");

// path.resolve - возвращает полный путь из относительного
console.log(path.resolve("global-vars.js"));

// path.join - сшивает и нормализирует путь
console.log(path.join("/foo", "bar", "baz/asdf", "quux", ".."));

// path.extname - возвращает расширение файла
console.log(path.extname("index.html"));

// path.normalize - нормализирует путь
console.log(path.normalize("/foo/bar//baz/asdf/quux/.."));
