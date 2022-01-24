const { response } = require('express')
const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoibmFzcnVsbGFoaS1vbGFtaWRlIiwiYSI6ImNreTJ2cDk2aDBwZ3IycnFudWllbzA5bHMifQ.SQjPZGddn09rs4DR_AelpA&limit=1'

    request({url:url, json:true}, (error, response) =>{
        if (error){
            callback('Unable to connect to weather service', undefined)
        } else if(response.body.features.length === 0){
            callback('Please enter a valid location', undefined)
        } else{
            callback(undefined, {
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
              
        }
    })

}

 module.exports = geocode

geocode('!', (error, data)=>{
    if(error){
        console.log(error)
    }else{
        console.log(data)
    }
} )
