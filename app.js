const express = require('express')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')


const port = 3000

const app = express()

const Url = require('./models/url.js')
require('./config/mongoose')
const generateName = require('./public/javascripts/generateName.js')

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))


app.get('/', (req, res) => {
  res.render('index')
})

// Generate shorten url
app.post('/', (req, res) => {

  const inputUrl = req.body.inputUrl.trim()
  const name = generateName(5)
  const origin = req.headers.origin

  if (!inputUrl) {
    return res.redirect('/')
  }

  Url.findOne({ inputUrl: inputUrl })
    .then(url =>
      url ? url : Url.create({ inputUrl, name })
    )
    .then(url => res.render('index', { inputUrl: url.inputUrl, origin, name: url.name }))
    .catch(error => console.log('herror'))
})


app.get('/:name', (req, res) => {
  return Url.findOne({ name: req.params.name })
    .then(url => {
      if (!url) {
        return res.render('error', { errorUrl: `${req.headers.host}/${req.params.name}` })
      }
      res.redirect(url.inputUrl)
    })
    .catch(error => console.log('error'))
})



app.listen(port, () => {
  console.log(`Express server is now listening on http://localhost:${port}`)
})


// input url
// generate random code 
// save input url safe code
//output new url

// enter shorten url
//get params
//find by name
// exoport input url
// redirect ('input url')
