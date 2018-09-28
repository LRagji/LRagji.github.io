let express = require('express')
let app = express()
let port = 5000;

app.use(express.static('./xperimental/lite-elements'))

app.listen(port, () => console.log(`Dev server listening on port ${port}!`))