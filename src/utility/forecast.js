const request = require('request')
const forecast = (lat,long,callback)=>{
    const uri = 'http://api.weatherstack.com/current?access_key=17e5c83c2bd62d6f3bcc121e0fdd76a6&query='+lat+ ','+long+'&units=f'
    request({url:uri,json:true},(error,response)=>{
        if(error){
            callback('URL is not reachable',undefined)
        }else if(response.body.error){
            callback('API request failed',undefined)
        }else{
            callback(undefined,`It is cuurently ${response.body.current.temperature} degree out. There is chance of ${response.body.current.weather_descriptions}`)
        }
    })
}

module.exports = forecast