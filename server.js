const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const profiles = require('./routes/api/profiles');

// 解决这个warning: Mongoose: `findOneAndUpdate()` and `findOneAndDelete()` without the `useFindAndModify` option set to false are deprecated.
mongoose.set('useFindAndModify', false)

// 连接数据库
const mongoURI = require('./config/keys').mongoURI;

mongoose.connect(
    mongoURI,
    { useNewUrlParser: true,
      useUnifiedTopology: true},
)
.then(res => console.log('Mongoose connected'))
.catch(err => console.log(err))

app.use(passport.initialize());
require('./config/passport')(passport);

// bodyParser--解析JSON、Raw、文本、URL-encoded格式的请求体
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 请求路由
app.get('/', (req, res) => {
    res.send('hello world');
})

app.use('/api/users', users);
app.use('/api/profiles', profiles);

// 端口
const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`server is running on ${port}`);
})