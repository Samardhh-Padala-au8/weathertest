import React, { Component } from 'react'
import axios from "axios"


class Weather extends Component {
    state = {
        weather: null,
        city: "",
        pcity: "",
        currentDateTime: Date().toLocaleString(),
        sr: "",
        ss: "",

    }


    async componentDidMount() {

        function dc(ti) {
            var a = new Date(ti * 1000);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            return time
        }

        const res = await axios(`http://api.openweathermap.org/data/2.5/weather?q=Mumbai&units=metric&APPID=273de4cdf402354277d9a5313c3101cc`)
        console.log(res)
        const weather = res.data;
        this.setState({ weather })
        let tt = dc(this.state.weather.sys.sunrise)
        this.setState({ sr: tt })
        tt = dc(this.state.weather.sys.sunset)
        this.setState({ ss: tt })

    }
    async componentDidUpdate(prevProps, prevState) {
        function dc(ti) {
            var a = new Date(ti * 1000);
            var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            var year = a.getFullYear();
            var month = months[a.getMonth()];
            var date = a.getDate();
            var hour = a.getHours();
            var min = a.getMinutes();
            var sec = a.getSeconds();
            var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;
            return time
        }
        if (prevState.pcity !== this.state.pcity) {
            const res = await axios(`http://api.openweathermap.org/data/2.5/weather?q=${this.state.pcity}&units=metric&APPID=273de4cdf402354277d9a5313c3101cc`)
            console.log(res)
            const weather = res.data;
            this.setState({ weather })
            let tt = dc(this.state.weather.sys.sunrise)
            this.setState({ sr: tt })
            tt = dc(this.state.weather.sys.sunset)
            this.setState({ ss: tt })

        }

    }

    handleCity = (e) => {
        this.setState({ city: e.target.value })
    }
    handleButton = (e) => {
        this.setState({ pcity: this.state.city })
        this.setState({ city:"" })

    }

    render() {
        return (
            <div>
                <h1 className="head">Weather Application</h1>
                <input type="text" name="city" value={this.state.city} onChange={this.handleCity} className="in"/>
                <button onClick={this.handleButton} className="bn">search</button>

                <div>
                    {this.state.weather ? <>
                        <div className="seler">{this.state.weather.name} {this.state.weather.sys.country}</div>
                        <div className="seler">{this.state.currentDateTime}</div>
                        <div className="ele">
                            <div className="sele">Temperature : {this.state.weather.main.temp}&#176;c</div>
                            <div className="sele">{this.state.weather.weather[0].main}</div>
                            <div className="sele">Wind Speed : {this.state.weather.wind.speed}mph</div>
                            <div className="sele">{this.state.weather.main.temp_max}&#176;high</div>
                            <div className="sele">{this.state.weather.main.temp_min}&#176;low</div>
                            <div className="sele">Sunrise : {this.state.sr}</div>
                            <div className="sele">Sunset : {this.state.ss}</div>
                        </div></> : ""}
                </div>

            </div>
        )
    }
}

export default Weather