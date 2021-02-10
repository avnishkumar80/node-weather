const request = require('request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + address + '.json?access_token=pk.eyJ1IjoiYXZuaXNoa3VtYXI4MCIsImEiOiJja2ttenU1dnIwenZkMm9vY21qcHRrMDBzIn0.sDAjmvy8aASJcyyzFC3FvQ'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('Unable to connect to wetaher services',undefined)
        }else if(response.body.features.length===0){
            callback('Unable to find location, try with another address',undefined)
        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode