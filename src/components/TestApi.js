import React from "react";


export default class TestForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            movie: {}
        }
    }
    componentDidMount()  {
        fetch("http://www.omdbapi.com/?apikey=d6a02fcc&t=yesterdayyudf").then(res => res.json()).then(result => {
            this.setState({movie: result});
            console.log(result.Error);
        })
    }
    render() {
        const url =  this.state.movie.Poster ;
        return (
        <img src={url}></img>
    );
    }
}


// app.post("/", function(req, res) {

//     const query = req.body.cityName;
//     const apiKey = "a7fe825dde8de5265947f05818b098da";
//     const unit = "metric";
//     const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&appid=" + apiKey + "&units="+unit;
//     https.get(url, function(response) {
//       console.log(response.statusCode);
//       response.on("data", function(data) {
//         const weatherData = JSON.parse(data);
//         const temp = weatherData.main.temp;
//         const weatherDescription = weatherData.weather[0].description;
//         const icon = weatherData.weather[0].icon;
//         const imageURL = " http://openweathermap.org/img/wn/"+icon+"@2x.png"
//         res.write("<p>The weather is currently " + weatherDescription + "</p>");
//         res.write("<h1>The temperature in " + query + " is " + temp + " Celsius degrees</h1>");
//         res.write("<img src="+imageURL+">");
//         res.send();
//       });
//     });
  
//   });