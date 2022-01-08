const mongoose = require('mongoose')
const bookSchema = mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    isbn: {
        type:String,
        required:true
    },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'Author',
              required: true 
              }
},
    {
        timestamps: true
    })


module.exports = mongoose.model("Book", bookSchema);