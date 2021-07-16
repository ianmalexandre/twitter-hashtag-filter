const axios = require('axios');

const requestCoordinates = async function (location) {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
    let coordinates = []
    const newUrl = `${url}${encodeURIComponent(location)}.json?access_token=${process.env.ACCESS_TOKEN_MAP_BOX}`
    try {
        const resp = await axios.get(newUrl);
        if(resp.status == '200') {
            coordinates = resp.data.features[0].center;
            console.log(`coordinates: ${coordinates}`);
            return coordinates;
        }
    } catch (err) {
        return [0,0];
    }
}

module.exports = requestCoordinates;