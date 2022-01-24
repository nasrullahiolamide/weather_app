const request = require('request')

const forecast = (long, lat, callback) =>{
    const url = 'https://api.openweathermap.org/data/2.5/weather?lat=' + encodeURIComponent(lat) + '&lon=' + encodeURIComponent(long) +'&appid=88823996c3a0df1ec23a1373df215dd2&units=metric'

    request({url:url, json: true}, (error, response) =>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        } else if( response.body.cod != 200){
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,  response.body.main.temp)
        }
    })
}  



module.exports = forecast 