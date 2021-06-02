// Пример файлового модуля (file modules) с экспортом через CommonJS
const getCurrentDate = () => {
  return Date.now();
};

module.exports = {
  getCurrentDate,
};
