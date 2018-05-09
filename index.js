const config = require('./config.js')
const express = require('express')
const bodyParser = require('body-parser')
const db = require('monk')(config.mongoConnString)
const showsCollection = db.get('shows')
const app = express()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS')
    res.header('Access-Control-Allow-Headers',
                'Origin, X-Requested-With, Content-Type, Accept, Authorization')
    next()
})
app.use(bodyParser.json())

app.use((req, res, next) => {
  console.log(req.body)
  next()
})

// const inMemoryDatabase = {
//     shows: [
//       {
//         name: 'Breaking Bad',
//         rating: 5,
//         previewImg: 'https://ia.media-imdb.com/images/M/MV5BZDNhNzhkNDctOTlmOS00NWNmLWEyODQtNWMxM2UzYmJiNGMyXkEyXkFqcGdeQXVyNTMxMjgxMzA@._V1_UY268_CR4,0,182,268_AL_.jpg'
//       },
//       {
//         name: 'My Name is Earl',
//         rating: 3,
//         previewImg: 'https://ia.media-imdb.com/images/M/MV5BMTc2MzQxNDIxMl5BMl5BanBnXkFtZTcwOTk1MDU1MQ@@._V1_UY268_CR4,0,182,268_AL_.jpg'
//       },
//       {
//         name: 'Stranger Things',
//         rating: 2,
//         previewImg: 'https://ia.media-imdb.com/images/M/MV5BMjUwMDgzOTg3Nl5BMl5BanBnXkFtZTgwNTI4MDk5MzI@._V1_UX182_CR0,0,182,268_AL_.jpg'
//       }
//     ]
// }


app.get('/shows', async (req, res) => {
    const shows = await showsCollection.find({})
    res.send(shows)
})

app.post('/shows', async (req, res) => {
    const newShow = req.body
    const savedShow = await showsCollection.insert(newShow)
    res.send(savedShow)
})

app.listen('3001', () => console.log('Running on port 3001'))
