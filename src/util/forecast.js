const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const weatherUrl = "http://api.weatherstack.com/current?access_key=8a2a9867b8c37ce6a78970b0d07b21a3&query=" + encodeURIComponent(latitude) + "," + encodeURIComponent(longitude);
    request({url:weatherUrl,json:true},(error,response)=>{
        if(error)
        callback("O oooh! Something went wrong. Try again",undefined)
        else
        callback(undefined,{temperature:response.body.current.temperature,feelsLike:response.body.current.feelslike,
            weather_descriptions:response.body.current.weather_descriptions
        }
        )
    })
}

module.exports=forecast