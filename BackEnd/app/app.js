const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const os = require('os'); 
const sequelize = require('./config/database'); 
const User = require('./models/User');
const Role = require('./models/Role');
sequelize.sync({ force: false }) // force: false để không xóa bảng hiện tại
  .then(() => {
    console.log('Database synchronized');
    app.listen(3000, () => {
      console.log('Server is running on port 3000');
    });
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

const UserRole = require('./models/UserRole'); // Import UserRole để chắc chắn nó được đồng bộ
// Kết nối database
const userRoutes = require('./routes/userRoutes'); // Import user routes
const app = express();
const host = process.env.HOST || 'localhost';
const PORT = process.env.PORT || 8081;
// Cấu hình đường dẫn tĩnh để phục vụ file từ thư mục 'uploads'
app.use('/uploads', express.static('uploads'));
// Tạo thư mục 'uploads' nếu chưa tồn tại
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// Cấu hình multer để lưu file vào thư mục 'uploads'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Thư mục để lưu file
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, uniqueSuffix + path.extname(file.originalname)); // Tạo tên file không trùng lặp
    }
});

// Khởi tạo middleware multer
const upload = multer({ storage: storage });

// Đồng bộ cơ sở dữ liệu và khởi chạy server
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

app.use(express.json()); // Middleware để parse JSON
app.get('/', function (req, res) {
  res.send('Hoà Nguyễn Coder')
})
app.use('/api/users', userRoutes); // Định nghĩa route cho người dùng

// API upload nhiều hình ảnh
app.post('/api/products/upload',upload.array('files', 10), (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: 'No files uploaded' });
    }
    // Trả về danh sách file đã upload
    const fullUrl = req.protocol + '://' + req.get('host');
    res.json({ files: req.files , url:  req.files.map(file => fullUrl+`/uploads/${file.filename}`) });
  } catch (error) {
    console.error('Error uploading files:', error);
    res.status(500).json({ message: 'Server error', error });
  }
/*
    try {
      // req.files chứa thông tin về các file đã upload
      const files = req.files;
      if (!files || files.length === 0) {
          return res.status(400).send('No files were uploaded.');
      }

      // Tạo danh sách URL của các file đã upload
      const fileUrls = files.map(file => {
          return {
              url: `/uploads/${file.filename}`, // Đường dẫn truy cập file
              alt: file.originalname, // Tên file gốc
              title: file.originalname
          };
      });

      // Trả về danh sách URL file đã upload
      res.status(200).json({
          message: 'Files uploaded successfully!',
          files: fileUrls
      });
  } catch (err) {
      console.error(err);
      res.status(500).send('Error uploading files.');
  }  */
});

app.listen(PORT,function(){
  console.log(`Server is running on port ${PORT}.`);
})