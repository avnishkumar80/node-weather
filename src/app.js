const path = require('path')
const express = require('express')
const forecast = require('./utility/forecast')
const geocode = require('./utility/geocode')

const hbs = require('hbs')

// console.log(__dirname)
// console.log(__filename)

const app = express()
const port = process.env.PORT || 3000
const publicDirectorypath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname,'../templates/views')
const partialPath = path.join(__dirname,'../templates/partials')


app.set('view engine','hbs') //set the view engine
app.set('views',viewPath)
app.use(express.static(publicDirectorypath))  
hbs.registerPartials(partialPath)

app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Avnish Kumar'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About',
        detail:"Lookup for weather!",
        name:'Avnish Kumar'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        note:"Help is on the way !",
        name:'Avnish Kumar'
    })

})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
            if(error){
                return res.send({
                    error:"something went wrong"
                })
            }
            forecast(latitude,longitude,(error,forecastData)=>{
                if(error){
                    return res.send({
                        error:"Something went wrong"
                    })
                }
                res.send({
                    location,
                    forecast:forecastData,
                    address:req.query.address

                })
               
            })
        
    
})
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMessage:"Page not found",
        name:'Avnish kumar'
    })
})

app.listen(port,()=>{
    console.log("listening on port " + port)
})