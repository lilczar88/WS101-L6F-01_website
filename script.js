const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apiKey = 'f00c38e0279b7bc85480c3fe775d518c';

// Weather App functionality
$(document).ready(function () {
    getWeatherForGuimba();
    displayProgrammingLanguages();
});

async function getWeatherForGuimba() {
    const lat = 15.6602;
    const lon = 120.7683;
    const apiURL = `${weatherUrl}?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

    try {
        const res = await fetch(apiURL);
        const data = await res.json();
        if (res.ok) {
            weatherShowFn(data);
        } else {
            alert('Unable to fetch weather data for Guimba.');
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
    }
}

function weatherShowFn(data) {
    $('#city-name').text(data.name);
    $('#date').text(moment().format('MMMM Do YYYY, h:mm:ss a'));
    $('#temperature').html(`${data.main.temp}°C`);
    $('#description').text(data.weather[0].description);
    $('#wind-speed').html(`Wind Speed: ${data.wind.speed} m/s`);
    $('#weather-icon').attr('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`);
    $('#weather-info').fadeIn();
}

// Programming Languages Section
function displayProgrammingLanguages() {
    const xmlData = `<?xml version="1.0" encoding="UTF-8"?>
    <ProgrammingLanguages>
        <Language>
            <Name>Python</Name>
            <Creator>Guido van Rossum</Creator>
            <YearPublished>1991</YearPublished>
        </Language>
        <Language>
            <Name>JavaScript</Name>
            <Creator>Brendan Eich</Creator>
            <YearPublished>1995</YearPublished>
        </Language>
        <Language>
            <Name>Java</Name>
            <Creator>James Gosling</Creator>
            <YearPublished>1995</YearPublished>
        </Language>
    </ProgrammingLanguages>`;

    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xmlData, "application/xml");

    const languages = xmlDoc.querySelectorAll("Language");
    let content = "";

    languages.forEach(language => {
        const name = language.querySelector("Name").textContent.trim();
        const creator = language.querySelector("Creator").textContent.trim();
        const year = language.querySelector("YearPublished").textContent.trim();

        content += `
            <div class="language">
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Creator:</strong> ${creator}</p>
                <p><strong>Year Published:</strong> ${year}</p>
            </div>
        `;
    });

    document.getElementById("languages-content").innerHTML = content;
}
