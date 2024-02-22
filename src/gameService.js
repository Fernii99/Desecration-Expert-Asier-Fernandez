const axios = require("axios");


async function getHeroData() {
    const heroData = await axios.get("https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/all.json");
    return heroData.data
}


module.exports = {
    getHeroData,
};