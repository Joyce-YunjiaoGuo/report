const mongoose = require('mongoose');
const Schema = mongoose.Schema;
// 基于scheme结构去定义你的数据模型

const ProfileSchema = new Schema({
    project: {
        type: String,
        required: true,
    },
    team: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    curdate: {
        type: Date,
        default: Date.now,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'users',
    },
});

module.exports = Profile = mongoose.model('profiles', ProfileSchema);