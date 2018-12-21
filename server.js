const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

// Add middleware
hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


app.use((req, res, next) => {
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err){
      console.log('Unable to append to server log');
    }
  });
  next();
});

// app.use((req, res, next) => {
//   res.render('maintainance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', ()=> {
  return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text)=> {
  return text.toUpperCase();
});


// Setup http route handlers. Register handler using app.get()
// and give route details as first argument and 2nd argument is
// a callback function with request and response as its arguments respectively

app.get('/', (request, response) => {
  // response.send('<h1>Hello Express!</h1>');
  /* response.send({
    name: 'Aditya Wagholikar',
    age: 29,
    education: "MS - Information Systems",
    likes:['Poha', 'Samosa']
  }) */
  response.render('home.hbs', {
    pageTitle: 'Home Page',
    welcomeMessage: 'Welcome to the Home Page of my personal website'
  });
});

app.get('/about', (req, res) => {
    // res.send('<h1>About Page</h1>');
    res.render('about.hbs', {
      pageTitle: 'About Page'
    });
});


app.get('/bad', (req, res) => {
  res.send({
    errorMessage: 'Unable to handle request'
  });
});



app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
