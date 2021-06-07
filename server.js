// Поднятие сервера через встроенный модуль http

const http = require('http'); // Для работы нативного сервера
const fs = require('fs').promises; // Для работы с файлами
const url = require('url'); // Для работы с урлами
const path = require('path'); // Для работы с путями
const querystring = require('querystring'); // Парсим и форматируем строку запроса

// Контент тайпы (майм типы для отправки)
const TypeMime = {
  '.html': 'text/html',
  '.htm': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.eot': 'application/vnd.ms-fontobject',
  '.ttf': 'application/font-sfnt',
};

// Нативная функция для создания сервера (запрос клиента - ответ сервера)
http
  .createServer(async (req, res) => {
    const myURL = url.parse(req.url); // Парсим url запроса
    const pathname = myURL.pathname; // Достаем из url путь
    let filename = pathname.substring(1); // Обрезаем слеш из пути, к примеру /index.html = index.html

    // Свитч по pathname (/index.html) - выбираем по какому урлу какой файл отдавать
    switch (pathname) {
      case '/':
        filename = 'index.html';
        break;

      case '/contact':
        filename = 'contact.html';
        break;

      case '/blog':
        filename = 'blog.html';
        break;

      default:
        break;
    }

    // Обработка запросов с форм
    if (pathname === '/contact' && req.method === 'POST') {
      const body = [];

      req.on('data', chunk => {
        body.push(chunk);
      });

      req.on('end', async () => {
        const parsedBody = decodeURIComponent(Buffer.concat(body).toString());
        console.log(parsedBody);

        const parsedObj = querystring.parse(parsedBody);
        console.log(parsedObj);

        await fs.writeFile('message.json', JSON.stringify(parsedObj), null, 2);
      });

      res.statusCode = 302;
      res.setHeader('Location', '/contact');
      return res.end();
    }

    // Вытаскиваем майм тип - извлекаем расширение из filename (index.html = .html = text/html)
    const type = TypeMime[path.extname(filename)];

    // Обработка запросов на картинки
    if (type && type.includes('image')) {
      try {
        const img = await fs.readFile(filename); // читает файл по filename (mypic.jpg)
        res.writeHead(200, { 'Content-type': type }); // добавляет в ответ статусный код и набор заголовков
        res.write(img, 'hex'); // пишет в поток ответа некоторое содержимое
        res.end();
      } catch (error) {
        console.error(error.message);
        res.writeHead(404, { 'Content-type': 'text/plain' });
        res.write(img, 'hex');
        res.end();
      }
    }
    // // Обработка запросов если это не картинка
    else {
      try {
        const content = await fs.readFile(filename, 'utf-8'); // читает файл по filename (index.html)
        res.writeHead(200, { 'Content-type': type }); // добавляет в ответ статусный код и набор заголовков
        res.write(content); // пишет в поток ответа некоторое содержимое
        res.end();
      } catch (error) {
        console.error(error.message);

        // Обработка 404 ошибки
        if (!type || type === 'text/html') {
          const content = await fs.readFile('404.html', 'utf-8');
          res.writeHead(200, { 'Content-type': 'text/html' });
          res.write(content);
        } else {
          res.writeHead(404, { 'Content-type': 'text/plain' });
        }
        res.end();
      }
    }
  })
  .listen(7070, () => console.log('Listen server on port 7070'));
