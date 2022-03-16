window.addEventListener('load', ()=> {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description')
    let temperatureDegree = document.querySelector('.temperature-degree') 
    let locationTimezone = document.querySelector('.location-timezone')
    

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position)
            long = position.coords.longitude;
            lat = position.coords.latitude;
            const proxy = "https://cors-anywhere.herokuapp.com/";
            const key = `${proxy}https://api.darksky.net/forecast/fd9d9c6418c23d94745b836767721ad1/${lat},${long}`
            // console.log(key);
            fetch(key).then(response => {
                return response.json()
            }).then(data => {
                console.log(data)
                const {temperature, summary, icon} = data.currently;
                //set DOM elements from the API
                temperatureDescription.textContent = summary;
                temperatureDegree.textContent = temperature;
                locationTimezone.textContent = data.timezone;
                // console.log(temperatureDescription)
                // console.log(temperatureDescription.textContent.summary)
                setIcons(icon, document.querySelector('icon'))
            })
        })
    } 
    // else {
    //     h1.textContent = "Please enable Location of your browser"
    // }
    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
})