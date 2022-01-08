const mongoose = require('mongoose')
const bookModel = require('./books')
const authorSchema = mongoose.Schema({
    first_name: {
        type:String,
        required:true
    },
    last_name: {
        type:String,
        required:true
    },
},
    {
        timestamps: true
    })

    authorSchema.pre('deleteOne',{ document: true }, function(next) {
        bookModel.remove({author: this._id}).exec();
        next();
    });


module.exports = mongoose.model("Author", authorSchema);