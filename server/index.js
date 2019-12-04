const express = require('express')
const app = express()
const port = 3001

app.get('/morestyles/:productId', (req, res) => res.send('Hello World!'))

app.listen(port, () => console.log(`MoreStyles listening on port ${port}`))