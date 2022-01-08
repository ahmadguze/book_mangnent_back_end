const express = require('express');
const router = express.Router();
const authorModel = require('../../models/authors')

router.get('/authors', (req, res) => {
    authorModel.find().then((result) => res.json(result)).catch((error) => res.status(400).send(error));
})

router.post('/author', (req, res) => {
    console.log(req.body)
    const author = authorModel(req.body)
    author.save().then((result) => res.json(result)).catch((error) => res.status(400).send(error.message))
})

router.get('/author/:id', (req, res) => {
    authorModel.findById(req.params.id).then((result) => {
        if (!result)
            return res.status(404).send('No result found');
        res.json(result)
    }
    ).catch((error) => res.status(400).send("Invalid id"));
})


router.put('/author/:id', (req, res) => {
    authorModel.findOneAndUpdate({ _id: req.params.id }, req.body, { new: true })
        .then((result) => {
            if (!result)
                return res.status(404).send('No result found');
            res.json(result)
        }
        ).catch((error) => res.status(400).send(error.message));
})

router.delete('/author/:id', async (req, res) => {
    var author = await authorModel.findById(req.params.id)
    await author.deleteOne().then((result) => {
        if (!result)
           res.status(400).json({message: 'Author not found'})
        res.json(result)
    }).catch((error) => res.status(400).send(error.message));
})

module.exports = router;