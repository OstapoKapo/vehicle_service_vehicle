const express = require('express');
const app = express();

// Читаємо порт, який ми передали з docker-compose.yml
const PORT = process.env.PORT || 3001;

// ... (тут ваші app.get('/'), app.post('/') тощо) ...

// ВАЖЛИВО! Цей рядок змушує сервер працювати
app.listen(PORT, () => {
  console.log(`Vehicle service запущено на порті ${PORT}`);
});