FROM node:lts-alpine

# Đặt thư mục làm việc
WORKDIR /app

# Sao chép các tệp package.json và package-lock.json cần thiết
COPY /app/package*.json ./

# Chạy lệnh cài đặt các thư viện cần thiết
RUN npm install

# Sao chép mã nguồn ứng dụng vào container
COPY /app .

# Mở cổng 80 để Nginx phục vụ ứng dụng qua HTTP.
EXPOSE 8081  

CMD npm start
