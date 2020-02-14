const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 基于scheme结构去定义你的数据模型

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

module.exports = User = mongoose.model('users', UserSchema);