const express = require('express');
const cors = require('cors')
const app = express()
const config = require('./config')
app.use(cors())

const mongoose = require('mongoose')
mongoose.connect(config.DB_URL, ()=>{
    console.log("sucess")
}, e=> console.error(e)
)

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const PORT = process.env.PORT || 5000;

app.use("/api",  require("./routes/api/books"));
app.use("/api", require("./routes/api/authors"))
app.listen(PORT, () => console.log(`The app is running at port ${PORT}`) );