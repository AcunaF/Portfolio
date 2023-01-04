const {Schema, model} = require('mongoose');

const ArticleSchema = Schema({

    title: {
        type: 'string',
        required: true,
    },
    content:{
        type: 'string',
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
    image: {
        type: 'string',
        default: 'default.png',
    },

})

module.exports = model("Article", ArticleSchema,"article")