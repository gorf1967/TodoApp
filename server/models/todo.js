let mongoose = require('mongoose');
let Todo = mongoose.model('Todo',{
    text:{
        type: String,
        minlength: 1,
        required: true,
        trim: true
    },
    completed:{
        type: Boolean,
        default: false
    },
    completedAt: {
        type: Number,
        default: 0
    }
});
module.exports = {Todo};