const apiKey = "1cbd45d5c94b0e9c9c8cc0218dfd27d9";

const searchBtn = document.getElementById("searchBtn");

searchBtn.addEventListener("click", getWeather);

document.getElementById("cityInput")
.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        getWeather();
    }
});

function getWeather() {

    const city = document.getElementById("cityInput").value.trim();

    if (city === "") {
        document.getElementById("errorMessage").innerText = "Please enter a city name";
        return;
    }

    const apiUrl =
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {

        console.log(data);

        // ✅ FIX: proper API error handling
        if (data.cod !== 200 && data.cod !== "200") {
            document.getElementById("errorMessage").innerText =
                data.message || "City not found";
            return;
        }

        document.getElementById("errorMessage").innerText = "";

        document.getElementById("cityName").innerText = data.name;

        document.getElementById("temperature").innerText =
            `${Math.round(data.main.temp)}°C`;

        document.getElementById("description").innerText =
            data.weather[0].description;

        document.getElementById("humidity").innerText =
            `${data.main.humidity}%`;

        document.getElementById("wind").innerText =
            `${data.wind.speed} km/h`;

        const iconCode = data.weather[0].icon;

        document.getElementById("weatherIcon").src =
            `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

        document.getElementById("dateTime").innerText =
            new Date().toLocaleString();

        changeBackground(data.weather[0].main);

    })
    .catch(error => {

        console.log("Fetch error:", error);



    });
}

function changeBackground(weather) {

    if (weather == "Clouds") {
        document.body.style.background =
        "linear-gradient(135deg,#757F9A,#D7DDE8)";
    }

    else if (weather == "Rain") {
        document.body.style.background =
        "linear-gradient(135deg,#4B79A1,#283E51)";
    }

    else if (weather == "Clear") {
        document.body.style.background =
        "linear-gradient(135deg,#f7971e,#ffd200)";
    }

    else {
        document.body.style.background =
        "linear-gradient(135deg,#00c6ff,#0072ff)";
    }
}