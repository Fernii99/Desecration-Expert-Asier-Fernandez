const gameService = require('./gameService');
const Battle = require('./Battle');
const { Superhero } = require('./Superhero'); //Class superheroes

/*
FUNCTION THAT STARTS THE GAME, RETRIEVES THE INFORMATION AND SETS THE 2 BATTLE SUPERHEROES DATA
*/
async function StartGame(){
    /*******************************************
       Retrieve all superheroes
    ********************************************/
        const superheroes = await gameService.getHeroData();

    /*******************************************
       Find junkpile information 
    ********************************************/
        const junkpile = RetrieveJunkpile(superheroes)

    /*******************************************
       Find a superhero data to fight Junkpile 
    *******************************************/
        const superhero = RetrieveSuperhero(superheroes)
    
        console.log(`Hoy combatiran ${junkpile.name} contra ${superhero.name}`)
        console.log(`---------------------------------------`)

    return {junkpile, superhero}
}


/*******************************************
       FUNTION THAT MAKES THE BATTLE UNTILL SOMEONES HP IS 0 OR LESS
       * CHECKS IF IS SUCCESSFUL OR NOT
       * THE DAMAGE THAT IS GOING TO BE DEALT, 
       * CHANGES THE TURN
********************************************/
async function BattleDevelopment(superheroes){

    let junkpile = superheroes.junkpile;
    let superhero = superheroes.superhero;

    let turn = await Battle.Start(junkpile, superhero);
    console.log("--------------------------------");
    console.log(" El primer asalto es para " + turn.name)

    let AssaultTurn = 1;

   while( junkpile.HP >= 0 && superhero.HP >= 0 ){
    console.log("----------------------------------")
        console.log("Asalto numero " +  AssaultTurn)
        let successfullAttack =  turn === 'superhero' ? Battle.SuccessfullAttack(superhero) : Battle.SuccessfullAttack(junkpile) ;
       if(!successfullAttack){
        turn = turn === 'superhero' ? 'junkpile' : 'superhero';
        AssaultTurn = AssaultTurn + 1;

       }else{
            const damage = await Battle.Attack( turn === 'superhero' ? superhero : junkpile );
            turn = await Battle.Damage(turn === 'superhero' ? junkpile : superhero, damage );
            
            turn = turn === 'superhero' ? 'junkpile' : 'superhero';
            
            console.log("-----------------------------------");
            console.log(superhero)
            console.log(junkpile)

            AssaultTurn = AssaultTurn + 1;
       }
   }


   return {junkpile, superhero}
}
/*******************************************
       FUNTION THAT MAKES THE BATTLE UNTILL SOMEONES HP IS 0 OR LESS
       * CHECKS IF IS SUCCESSFUL OR NOT
       * THE DAMAGE THAT IS GOING TO BE DEALT, 
       * CHANGES THE TURN
********************************************/
function EndGame(fighters){
    const junkpile = fighters.junkpile;
    const superhero = fighters.superhero;
    
    if(junkpile.HP > 0){
        console.log("-------------------------------------")
        console.log(superhero.name + " Ha sido derrotado");
    }else{
        console.log("-------------------------------------")
        console.log(junkpile.name + " Ha sido derrotado");
    }
        
}


/****************************************
FUNCTION THAT SETS THE DATA FOR JUNKPILE 
****************************************/
function RetrieveJunkpile(superheroes){
    const junkpileData = superheroes.find(superhero => superhero.name === "Junkpile");
    
    let hitpoints = 0;

    if(parseInt(junkpileData.powerstats.strength * 10) > 666){
        hitpoints = 666;
    }else{
        hitpoints = parseInt(junkpileData.powerstats.strength * 10);
    }

    const junkpile = new Superhero(
        junkpileData.name,
        junkpileData.powerstats.intelligence,
        junkpileData.powerstats.strength,
        junkpileData.powerstats.speed,
        junkpileData.powerstats.durability,
        junkpileData.powerstats.combat,
        junkpileData.powerstats.power,
        hitpoints
    );
    return junkpile;
} 

/**************************************************************************************
FUNCTION THAT SETS THE DATA FOR THE SUPERHERO THAT IS GOING TO FIGHT JUNKPILE 
**************************************************************************************/
function RetrieveSuperhero(superheroes){
    const randomHero = Math.floor(Math.random() * (((superheroes.length - 1) - 1 + 1)));
    const superheroData = superheroes.find(superhero => superhero.id === randomHero);

    let hitpoints = 0;

    if(parseInt(superheroData.powerstats.strength * 10) > 666){
        hitpoints = 666;
    }else{
        hitpoints = parseInt(superheroData.powerstats.strength * 10);
    }
    
    if(superheroData.name != 'Junkpile'){
        const superhero = new Superhero(
            superheroData.name,
            superheroData.powerstats.intelligence,
            superheroData.powerstats.strength,
            superheroData.powerstats.speed,
            superheroData.powerstats.durability,
            superheroData.powerstats.combat,
            superheroData.powerstats.power,
            hitpoints
        );
        return superhero;
    }else{
        RetrieveSuperhero(superheroes);
    }
} 

module.exports = {
    StartGame,
    BattleDevelopment,
    EndGame
}