const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


const app = express()

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsDirectoryPath = path.join(__dirname, '../templates/views')
const partialsDirectoryPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsDirectoryPath)
hbs.registerPartials(partialsDirectoryPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath))



app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather app',
        name: 'Khaled Hoshan'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address!'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
        if(error){
            return res.send({error})
        }
    forecast(latitude, longitude, (error, forecastData) =>{
        if(error){
            return res.send({error})
        }
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })

    })

})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Khaled Hoshan'
    })
})


app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Khaled Hoshan'
    })
})


app.get('/help/*', (req, res) => {
    res.render('404', {
        errorMessage: 'help articale not found'
    })
})


app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'page not found!',
        name: 'Khaled Hoshan'
    })
})



app.listen(3000, () =>{
    console.log('server started on port 3000')
})
