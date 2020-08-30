
require('dotenv').config();
const express = require('express');
const  app = express();

// app.get("/", (req, res) => {
//     res.json({ message: "Welcome to bezkoder application." });
// });

// khai báo sử dụng module HTTP
/**
 * NOTE: http có nhiệm vụ khởi tạo một cổng kết nối HTTP server trả về client.
 */
var http = require('http').Server(app);

//Khởi tạo server chạy cổng 8000
http.listen(process.env.PORT, () => {
    console.log(`Server is running on port.` + process.env.PORT);
});

module.exports = { http, app }