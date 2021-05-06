const request = require('request');

const geocode = (address,callback)=>{
    const mapBoxURLAddress = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiYW50cml4MjkxMCIsImEiOiJja256cTlheWgwMHg0MnZxZTV2M2d6cTVzIn0.N3JuPQ8Lvbs4MFGKcXIreg" 
    request({url:mapBoxURLAddress,json:true},(error,response)=>{
        if(error)
        callback('Oh ooooo! Something went wrong',undefined)
        else if(response.body.features.length===0)
        callback('Seems like location is wrong',undefined)
        else
        callback(undefined,{ 
            latitude: response.body.features[0].center[1],
            longitude: response.body.features[0].center[0],
            location: response.body.features[0].place_name
        })
    })
}

//result is coming as longitude and latidue but, the api request accepts latitude first

module.exports = geocode