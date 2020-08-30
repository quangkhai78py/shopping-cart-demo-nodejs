/**
 * NOTE: cookieParser optionally you may enable signed cookie support
 * by passing a secret string
 */
const cookieParser = require("cookie-parser");

/**
 * NOTE: body-parser lấy được dữ liệu nhập vào từ
 */
const bodyParser = require("body-parser");

/**
 * NOTE: cors một kĩ thuật được sinh ra để làm cho việc tương tác
 * giữa client và server được dễ dàng hơn, nó cho phép JavaScript
 * ở một trang web có thể tạo request lên một REST API được host
 * ở một domain khác.
 */
const cors = require('cors');

const { app } = require('./1app');

const blog = require('../app/Routers/Blogs');
const user = require('../app/Routers/Users');
const product = require('../app/Routers/Products');
const orders = require('../app/Routers/Orders');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());
app.use(cors());

app.use('/api/user', user);
app.use('/api/blog', blog);
app.use('/api/product', product);
app.use('/api/orders', orders);
