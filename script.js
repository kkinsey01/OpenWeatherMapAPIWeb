function sendData() {
    let cityText = document.getElementById("city").value;
    let countryText = document.getElementById("country").value;
    if (cityText && countryText) {
        var data = { city: cityText, country: countryText};
        console.log('Sending POST Request', cityText, countryText);
        fetch('/weather', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            console.log(response);
            if (!response.ok) {
                throw new Error('No response');
            }
            return response.json();
        })
        .then(data => {
            getData(data)
        })
        .catch(error => {
            console.error('Error getting weather: ', error)
            alert(error);
        })

    }
}

function getData(data) {
    document.getElementById("dataPlacement").innerHTML = `<p>Temperature is ${data.main.temp}°F in ${data.name}</p>`;
    document.getElementById("dataPlacement").innerHTML += `<p>Weather is currently ${data.weather[0].main}</p>`
    console.log('Temperature', data.main.temp);
}
document.getElementById("submit").addEventListener("click", sendData);