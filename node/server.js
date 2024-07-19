const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require("body-parser");
const morgan = require('morgan');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());
app.use(morgan('dev'))

app.post("/llmreq", async (req, res) => {
    res.json({
        data: req.body,
        totalChanges: 70,
        i: 1,
        tableData: ""
    })
})

let port = 5000
app.listen(port, async () => {
    console.log(`App is running on ${port}`)
})