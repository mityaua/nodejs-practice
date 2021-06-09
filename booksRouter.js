// Отдельный файл с роутингом
const express = require("express");
const router = express.Router();

// Маршрут (при обращении на books отвечаем json файлом)
router
  .get("/books", (req, res) => {
    res.json({ books: [] });
  })

  .post("/books", (req, res) => {
    res.json({ books: [2] });
  });

// Экспорт модуля
module.exports = { router };
