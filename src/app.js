const path = require('path')
const express = require('express')
const app = express()
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const port = process.env.PORT || 3000

// Express configuration for path
const publicDir = path.join(__dirname, '../public')
const templateDir = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials')

// Static config
app.use(express.static(publicDir))

// hbs configuration
app.set('view engine', 'hbs')
app.set('views', templateDir)
hbs.registerPartials(partialPath)


// routes
app.get('', (req, res)=>{
    res.render('index.hbs', {
        title: 'Weather',
        name: 'Primo'
    })
})

app.get('/about', (req, res)=>{
    res.render('about', {
        title: 'About',
        name: 'Primo'
    })
})

app.get('/help', (req, res)=>{
    res.render('help', {
        title: 'Help',
        name: 'Primo'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send('Provide a valid address')
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {} ) =>{
        if (error){
            return res.send({error})
        } 
        forecast(latitude, longitude, (error, forecastData) =>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
                address: req.query.address,
                location: location
            })
         })

    })

})


app.get('/help/*', (req, res) =>{
    res.render('404', {
        errorMessage: 'Help page not found'
    })
})

app.get('*', (req, res) =>{
    res.render('404', {
        errorMessage: 'Page not found'
    })
})

app.listen(port, ()=> {
    console.log(`Server is running at ${port}`)
})