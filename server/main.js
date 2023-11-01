let express = require("express")

let cors = require('cors')
let app = express()

require("dotenv").config()


app.use(express.json({ extended: false }));
app.use(express.static("./public"))
app.use(cors())

let routes = require("./src/routes")

app.use(routes)

let PORT = 8080

app.listen(PORT, function(){
    console.log("TODO app start on port", PORT)
})
