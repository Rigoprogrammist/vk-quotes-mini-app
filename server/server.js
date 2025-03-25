import express from "express";
import fs from "fs";
import cors from "cors";
import "dotenv/config.js";

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const quotes = JSON.parse(fs.readFileSync("./data/quotes.json", "utf-8"));

app.get("/generate-quote", (req, res) => {
  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
  res.json({ quote: randomQuote });
});

const userToken = "your_user_access_token";

fetch(`https://api.vk.com/method/users.get?user_ids=me&fields=status&access_token=${userToken}&v=5.131`)
  .then(response => response.json())
  .then(data => {
    const status = data.response[0].status;
    console.log('Статус пользователя:', status);
  })
  .catch(error => console.error('Ошибка:', error));

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
