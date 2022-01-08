const express = require('express');
const router = express.Router();
const bookModel = require('../../models/books')

router.get('/books', (req, res) => {
    bookModel.find().populate("author").then((result) => res.json(result)).catch((error) => res.status(400).send(error));
})

router.get('/books/author/:id', (req, res) => {

    bookModel.find({ author: req.params.id }).then((result) => {res.json(result)}).catch((error) => res.status(400).send(error));
})

router.post('/book', (req, res) => {
    console.log(req.body)
    const book = bookModel(req.body)
    book.save().then(async (result) => {
        result = await result.populate('author');
        console.log(result)
        res.json(result)
    })
        .catch((error) => { console.log(error); res.status(400).json({ message: error.message }) });
})

router.get('/book/:id', (req, res) => {
    bookModel.findById(req.params.id).populate("author").then((result) => {
        if (!result)
            return res.status(404).send('No result found');
        res.json(result)
    }
    ).catch((error) => res.status(400).send("Invalid id"));
})

router.put('/book/:id', (req, res) => {
    bookModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate("author")
        .then((result) => {
            if (!result)
                return res.status(404).send('No result found');
            res.json(result)

        }).catch((error) => res.status(400).json({ message: "Invalid data" }));
})

router.delete('/book/:id', (req, res) => {
    bookModel.findById(req.params.id).deleteOne().then((result) => {
        if (!result)
            return res.status(404).json({ message: "book not found" })
        res.json(result)
    }).catch((error) => res.status(400).json({ message: "Invalid data" }));
})



module.exports = router;