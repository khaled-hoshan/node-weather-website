const request = require('postman-request')
const geocode = require('./geocode')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=5ece5380b0b855ae565999d4f8bcad7a&query='+ latitude +','+ longitude +'&units=m'

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined,body.current.weather_descriptions+". It is currently " + body.current.temperature + " degress out.")
        }
    })
}

module.exports = forecast