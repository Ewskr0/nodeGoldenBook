let express = require('express')
let bodyParser = require('body-parser')
let session = require('express-session')
let Message = require('./models/message')
let app = express()

// Moteur de template
app.set('view engine','ejs')

// Middleware
app.use('/assets', express.static('public'))
app.use(bodyParser.urlencoded({extended : false}))
app.use(bodyParser.json())
app.use(session({
  secret: 'super mdp',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(require('./middlewares/flash'))


// Routes
app.get('/', (request, response) =>{
  Message.all( (messages) => {
    response.render('pages/index', {messages: messages})
  })
})

app.get('/message/:id', (request, response) => {
  Message.find(request.params.id, (message) => {
    console.log(message);
    if (message.row === undefined){
      response.send(  '404 bogoss')

    }
    else{
      response.render('messages/show', {message: message})

    }
  })
})

app.post('/', (request, response) => {

  if (request.body.message === undefined || request.body.message === ''){
    //response.render('pages/index',{error : 'votre message est vide'})
    request.flash('error','votre message est vide :(')
    response.redirect('/')

  }

  else {
    Message.create(request.body.message,() => {
      request.flash('succes','Message envoye')
      response.redirect('/')
    })

  }
})
app.listen(8080)
