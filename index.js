// Импорт файлового модуля (file modules) через CommonJS
// const { getCurrentDate } = require("./file-module");

// console.log(getCurrentDate());

// Импорт NPM модуля + CLI приложение с аргументами через консоль
var Calc = require("calc-js").Calc;

console.log(process.argv); // все параметры командной строки при запуске приложения (путь к ноде, пусть к файлу, параметры)

const [, , a, b] = process.argv; // деструктуризация параметров из командной строки

console.log(new Calc(parseFloat(a)).sum(parseFloat(b)).finish()); // Вывод результата в консоль
// parseInt - парсит из строки, для целых чисел (Integer)
// parseFloat - парсит из строки, для чисел с плавающей запятой (Float)
