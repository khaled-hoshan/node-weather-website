const request = require('postman-request')

const geocode = (address ,callback) =>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1Ijoia2hhbGVkLWhvc2hhbiIsImEiOiJjbDdscGI2azQxazBpNDFwMHZ6dm14YW8xIn0.ZOBec0ofHe3EZ_74g3OzBg'
    request({url, json:true}, (error,{body}) =>{
        if(error){
            callback('unable to connect to the server!')
        }else if(body.features.length === 0){
            callback('valid info')
         }else{
             callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
             })
         }
    })
}

module.exports = geocode