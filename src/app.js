const path = require('path')
const express = require('express')
const app = express() //express is installed and thus UI is developed
const hbs = require('hbs')
const geocode = require('./util/geocode.js')
const forecast = require('./util/forecast.js')

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')

//Setup static directory to serve
//used to refer stlysheets and other data from one file to another
app.use(express.static(publicDirectoryPath)) 


// setting up handlebars view engine and view path
//hbs is handle bars used for dynamic rendering of the pages
app.set('view engine','hbs') 
app.set('views',viewPath) //will tell the application where the view i.e hbs file are present
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{

    res.render('index',{
        name:'heya',
        title:'Weather'
    }) //index is the name of the view to be rendered present inside view engine
    //rendes keyword is used to render the view from views folder
})
app.get('/help',(req,res)=>{
    res.render('help',{
        example:'Thank you! for your time.',
        title:'Help'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title: 'About'
    })
})

app.get('/weather',(req,res)=>{
    res.send({
        latitude:'7.2',
        longitude:'2.2'
    })
})

app.get('/weatherData',(req,res)=>{
    if(!req.query.address){
        return res.send({
            errorMessage : "Please enter something"
        })
    }
    // res.send({
    //     data:'heya',
    //     text: req.query.address
    // })

    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{   
        if(error){
            return res.send({
                errorMessage:error
            })
        }
        
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error)
            {
                return res.send({
                    errorMessage:error
                })
            }

            res.send({
                temperature : forecastData.temperature,
                feelsLike : forecastData.feelsLike,
                weather_descriptions: forecastData.weather_descriptions
            })
            
            //console.log(location)
            //console.log("temperature is : " +forecastData.temperature)
            //console.log("feels like it is : " +forecastData.feelsLike)
        })
    })

}

)

app.get('/help/*',(req,res)=>{
    res.render('error',{
        title:'Oh no! This article is not present'
    })

})

app.get('*',(req,res)=>{
    res.render('error',{
        title:'Error 404 :  This page is not found'
    })

})



app.listen(3000,()=>{
    console.log('boom!....server is up and running')// 3000 is the port number where application will go boom!
})
// app.get('',(req,res)=>{
//     res.send('hello page') //send is used to send the static data to static pages 
// })

// app.get('/about',(req,res)=>{
//     res.send('<h1>Welcome to about page</h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send('Help is here')
// })

