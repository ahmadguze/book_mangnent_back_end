const express = require('express');
const router = express.Router();
const bookModel = require('../../models/books')
const authorModel = require('../../models/books')
router.get('/books', (req, res) => {
    bookModel.find().populate("author").then((result) => res.json(result)).
        catch((error) => res.status(400).json({ message: error.message }));
})

router.get('/books/author/:id', async (req, res) => {
    try {
        var isExists = await authorModel.exists({ id: req.params.id })
        if (!isExists) {
            return res.status(404).json([])
        }
    } catch (error) {

    }

    bookModel.find({ author: req.params.id }).then((result) => {
        res.json(result)
    }).catch((error) => res.status(400).json({ message: error.message }));
})

router.post('/book', (req, res) => {
    if (isNaN(req.body.isbn))
        return res.status(400).json({ message: 'isbn should be a number' })
    const book = bookModel(req.body)
    book.save().then(async (result) => {
        result = await result.populate('author');
        res.json(result)
    })
        .catch((error) => { res.status(400).json({ message: error.message }) });
})

router.get('/book/:id', (req, res) => {
    bookModel.findById(req.params.id).populate("author").then((result) => {
        if (!result)
            return res.status(404).json({ messagr: 'No result found' })
        res.json(result)
    }
    ).catch((error) => res.status(400).json({ message: "Invalid id" }));
})

router.put('/book/:id', (req, res) => {
    if (isNaN(req.body.isbn) && req.body.isbn)
        return res.status(400).json({ message: 'isbn should be a number' });
    bookModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true }).populate("author")
        .then((result) => {
            if (!result)
                return res.status(404).json({ message: 'No result found' });
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