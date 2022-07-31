const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require('path');
const mongoose = require('mongoose');
dotenv.config();


mongoose.connect(
    process.env.MONGODB_URL

).then(
    () => {
        console.log("DB connected successfully!");
    }
).catch(
    (error) => {
        console.log(error);
    }
)


const metadataExtractor = require("./routes/metadataExtractor");
const authRoute = require("./routes/auth")
const fileRoute = require("./routes/file")

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

// app.use(express.static('./public'));

// app.use('/upload', metadataExtractor);
app.use('/auth', authRoute);
app.use('/file', fileRoute);


app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname + '/public/index.html'));
});

//ROUTE NOT FOUND
app.use((req, res, next) => {
    res.status(404).send("Sorry can't find that!");
});

//ERROR
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).send('Something broke!')
});

app.listen(PORT, () => {
    console.log(`Server up and running on PORT: ${PORT}`);
});

// For  Vercel to turn Express into a serverless function

module.exports = app;
