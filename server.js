const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const request = require('request')


const apiKey = '142c14bd4cb0a6f806fef04f434c1327'


app.set('view engine','ejs')
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended : true}))

app.get('/',function(req, res){
	//res.send('Hello World !')
	res.render('index')
})

app.post('/',function(req, res){
	const city = req.body.city;
	let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`
	request(url, function(err, response, body){
		if(err){
			res.render('index',{weather: null, error : 'Error Please try again !!!'})
		}
		else{
			const weather = JSON.parse(body)
			if(weather.main == undefined){
				res.render('index',{weather: null, error : 'Error Please try again !!!'})	
			}
			else{
				const weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
				res.render('index',{weather: weatherText, error : null});

			}

		}
	});


	})

app.listen(3000,function(){
	console.log('Example app listening on port 3000!')
})