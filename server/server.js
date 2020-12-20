const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
const dbConfig = require("./db.config.js");
const history = require("connect-history-api-fallback");
const app = express();
const port = 8085;

// Парсинг json
app.use(bodyParser.json());

app.use(history());

// Парсинг запросов по типу: application/x-www-form-urlencoded
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Настройка CORS
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, PATCH, PUT, POST, DELETE, OPTIONS"
  );
  next();
});

// Создание соединения с базой данных
let connection;
connection = mysql.createPool({
  host: dbConfig.HOST,
  user: dbConfig.USER,
  port: dbConfig.PORT,
  password: dbConfig.PASSWORD,
  database: dbConfig.DB,
  charset: "utf8_general_ci",
  connectionLimit: 10,
});

connection.getConnection((err, connect) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("Database connection was closed.");
    }
    if (err.code === "ER_CON_COUNT_ERROR") {
      console.error("Database has too many connections.");
    }
    if (err.code === "ECONNREFUSED") {
      console.error("Database connection was refused.");
    }
  } else {
    connect.query('SET NAMES "utf8"');
    connect.query('SET CHARACTER SET "utf8"');
    connect.query('SET SESSION collation_connection = "utf8_general_ci"');
    console.log("Успешно соединено с БД");
  }
  if (connect) connect.release();
});


// Получение списка категорий
app.get('/api/categories', function (req, res) {
  try {
    connection.query('SELECT * FROM `Category_mobile`', function (error, results) {
      if (error) {
        res.status(500).send('Ошибка сервера при получении списка категорий')
        console.log(error);
      }
      console.log('Результаты получения списка категорий');
      console.log(results);
      res.json(results);
    });
  } catch (error) { 
    console.log(error);
  }

});

// Получение списка вопросов одной категории
app.get('/api/questions/:id', function (req, res) {
  try {
    connection.query(`SELECT * FROM QuestionsList_mobile WHERE id_category="${req.params.id}"`, function (error, results) {
      if (error) {
        res.status(500).send('Ошибка сервера при получении списка вопросов')
        console.log(error);
      }
      console.log('Результаты получения списка вопросов');
      console.log(results);
      res.json(results);
    });
  } catch (error) { 
    console.log(error);
  }

});

// Добавление вопроса в категорию
app.post("/api/add-question/:id", (req, res) => {
  connection.query(`INSERT INTO QuestionsList_mobile (id_category, question, answer, clarification) 
  VALUES (?, ?, ?, ?);`,
  [req.params.id, req.body.question, req.body.answer, req.body.clarification],
    function (err) {
      if (err) {
        res.status(500).send('Ошибка сервера при добавлении вопроса')
        console.log(err);
      }
      console.log('Добавление прошло успешно');
      res.json("create");
    });
})

// Информирование о запуске сервера и его порте
app.listen(port, () => {
  console.log("Сервер запущен на http://localhost:" + port);
});
