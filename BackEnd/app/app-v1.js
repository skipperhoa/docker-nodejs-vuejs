const express = require('express')
const bodyParser = require("body-parser");
const cors = require("cors");
const { Sequelize } = require('sequelize');
const app = express()
const sequelize = new Sequelize('postgres://hoanguyencoder:12345678@postgres:5432/db_hoanguyencoder', {
  dialect: 'postgres', // Xác định PostgreSQL là database đang sử dụng
}) // Example for postgres
//const sequelize = new Sequelize(`postgres://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOSTNAME}:5432/${process.env.DB_NAME}`);

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

// Gọi hàm để kiểm tra kết nối
testConnection();

/*
var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));
*/




// Cài đặt middleware trong Node.js được sử dụng với Express 
//để cấu hình CORS (Cross-Origin Resource Sharing)
app.use(function (req, res, next) {
    // Danh sách nguồn cho phép (allowedOrigins):
    const allowedOrigins = [
        'http://127.0.0.1:8081',
        'http://localhost:5173', 
        'http://localhost:8081', 
        'http://127.0.0.1', 
        'http://localhost'];
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
         res.setHeader('Access-Control-Allow-Origin', origin);
    }
    // Các phương thức HTTP cho phép:
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Các header cho phép:
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //Cho phép gửi cookie:
    res.setHeader('Access-Control-Allow-Credentials', true);

    // hàm next() được gọi để chuyển sang middleware tiếp theo
    next();
});










app.get('/', function (req, res) {
  res.send('Hoà Nguyễn Coder')
})
app.get('/api/users', function (req, res) {
    let users = [
      {
        id: 1,
        name: 'Hoà Nguyễn Coder'
      },
      {
        id: 2,
        name: 'Hoà Nguyễn Coder 2'
      },
      
    ]
    res.send(users)
  })


const PORT = process.env.PORT || 8081;
app.listen(PORT,function(){
  console.log(`Server is running on port ${PORT}.`);
})