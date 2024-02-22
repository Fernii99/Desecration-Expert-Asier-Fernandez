/**************************************************************************************
FUNCTION THAT SETS THE DATA FOR JUNKPILE 
**************************************************************************************/

async function GenerateJunkpile(superheroes) {
    const junkpileData = await superheroes.find(superhero => superhero.name === "Junkpile");
    
    let hitpoints = 0;

    if(parseInt(junkpileData.powerstats.strength * 10) > 666){
        hitpoints = 666;
    }else{
        hitpoints = parseInt(junkpileData.powerstats.strength * 10);
    }

    const junkpile = {
        name: junkpileData.name,
        INT: junkpileData.powerstats.intelligence,
        STR: junkpileData.powerstats.strength,
        DUR: junkpileData.powerstats.durability,
        SPE: junkpileData.powerstats.speed,
        POW: junkpileData.powerstats.power,
        COM: junkpileData.powerstats.combat,
        HP: hitpoints,
        leftArm: false,
        rightArm: false,
    };
    return junkpile;
}

/**************************************************************************************
FUNCTION THAT SETS THE DATA FOR THE SUPERHERO THAT IS GOING TO FIGHT JUNKPILE 
**************************************************************************************/
function GenerateSuperhero(superheroes){
    const randomHero = Math.floor(Math.random() * (((superheroes.length - 1) - 1 + 1)));
    const superheroData = superheroes.find(superhero => superhero.id === randomHero);

    let hitpoints = 0;

    if(parseInt(superheroData.powerstats.strength * 10) > 666){
        hitpoints = 666;
    }else{
        hitpoints = parseInt(superheroData.powerstats.strength * 10);
    }
    
    if(superheroData.name != 'Junkpile'){
        const superhero = {
            name: superheroData.name,
            INT: superheroData.powerstats.intelligence,
            STR: superheroData.powerstats.strength,
            DUR: superheroData.powerstats.durability,
            SPE: superheroData.powerstats.speed,
            POW: superheroData.powerstats.power,
            COM: superheroData.powerstats.combat,
            HP: hitpoints,
            leftArm: false,
            rightArm: false,
        };
        return superhero;
    }else{
        RetrieveSuperhero(superheroes);
    }
} 

/***************************************************
FUNCTION THAT SETS THE DATA FOR THE ERUDITO 
***************************************************/
function GenerateErudito() {
    const hp = Math.floor(Math.random() * 20 - 1) + 1
    const erudito = {
        name: "El Erudito X.G.",
        ANG: 0,
        HPW: 1 + hp,
        HPG: "Invincible",
        leftArm: false,
        rightArm: false,
        glases: true
    }

    return erudito
}


module.exports = {
    GenerateJunkpile,
    GenerateSuperhero,
    GenerateErudito,
}