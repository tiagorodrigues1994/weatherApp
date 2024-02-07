import React, { useState } from "react"
import './weatherapp.css'

// Importa ícones para diferentes condições climáticas
import search_icon from '../assets/search.png'
import clear_icon from '../assets/clear.png'
import cloud_icon from '../assets/cloud.png'
import drizzle_icon from '../assets/drizzle.png'
import rain_icon from '../assets/rain.png'
import snow_icon from '../assets/snow.png'
import wind_icon from '../assets/wind.png'
import humidity_icon from '../assets/humidity.png'

export default function WeatherApp() {

      // Chave da API do OpenWeatherMap
    let  api_key="4d478c968feaa07754b0c9c82f34c4f1"

     // Estado para armazenar o ícone do clima e a função para atualizá-lo
    const[wicon,setWicon] =  useState (cloud_icon);

    
// Função para buscar dados do clima
    const search = async () => {
        // Obtém o elemento de entrada de texto para a cidade
        const element =document.getElementsByClassName("cityInput")
        // Verifica se o campo de entrada está vazio
        if(element[0].value==="")
        {
            return 0;
        }
        
        // Constrói a URL da API do OpenWeatherMap com base na cidade digitada
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=metric&appid=${api_key}`

        // Faz uma requisição GET para a API do OpenWeatherMap
        let response = await fetch(url);
        let data =  await response.json();

        // Obtém elementos HTML para exibir os dados do clima
        const humidity =document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temprature = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        // Atualiza os elementos da interface com os dados do clima obtidos da API
        humidity[0].innerHTML = data.main.humidity+" %";
        wind[0].innerHTML = Math.floor(data.wind.speed)+" km/h";
        temprature[0].innerHTML = Math.floor(data.main.temp)+"ºc";
        location[0].innerHTML = data.name;


        // Define o ícone do clima com base no código fornecido pela API
        if(data.weather[0].icon==="01d" || data.weather[0].icon==="01n")
        {
            setWicon(clear_icon);
        }
        else if(data.weather[0].icon==="02d" || data.weather[0].icon==="02n")
        {
            setWicon(cloud_icon);
        }
        else if(data.weather[0].icon==="03d" || data.weather[0].icon==="03n")
        {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="04d" || data.weather[0].icon==="04n")
        {
            setWicon(drizzle_icon);
        }
        else if(data.weather[0].icon==="09d" || data.weather[0].icon==="09n")
        {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="10d" || data.weather[0].icon==="10n")
        {
            setWicon(rain_icon);
        }
        else if(data.weather[0].icon==="13d" || data.weather[0].icon==="13n")
        {
            setWicon(snow_icon);
        }
        else
        {
            setWicon(clear_icon)
        }
        
    }

    return (
        <div className="container">
            {/* barra de pesquisa */}
            <div className="top-bar">
                <input type="text" className="cityInput" placeholder="Search" />
                 {/* Ícone de pesquisa que chama a função de busca ao ser clicado */}
                <div className="search-icon"  onClick={() =>{search()}}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24ºc</div>
            <div className="weather-location">London</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>

                <div className="element">
                    <img src={wind_icon} alt="" className="icon" />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}