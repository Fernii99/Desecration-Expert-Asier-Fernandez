const gameService = require('./gameService');
const Battle = require('./Battle');
const RetrieveFighters = require('./Fighters');
const EruditeActions = require('./eruditeActions')

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
        const junkpile = await RetrieveFighters.GenerateJunkpile(superheroes)
    /*******************************************
       Find a superhero data to fight Junkpile 
    *******************************************/
       const superhero = await RetrieveFighters.GenerateSuperhero(superheroes)
    /*******************************************
       Prepare Erudito data 
    *******************************************/
       const erudito = await RetrieveFighters.GenerateErudito(superheroes)

    return [junkpile, superhero, erudito]
}


/*******************************************
       FUNTION THAT MAKES THE BATTLE UNTILL SOMEONES HP IS 0 OR LESS
       * CHECKS IF IS SUCCESSFUL OR NOT
       * THE DAMAGE THAT IS GOING TO BE DEALT, 
       * CHANGES THE TURN
********************************************/
async function BattleDevelopment(superheroes){

    let EruditoSpawn = Math.floor(Math.random() * (5 - 3 + 1)) + 3;

    let junkpile = superheroes[0];
    let superhero = superheroes[1];
    let erudito = superheroes[2];

    let turn = await Battle.Start(junkpile, superhero);
    console.log("--------------------------------");
    console.log(" El primer asalto es para " + turn.name)

    let AssaultTurn = 1;

    /*******************************************
                LOOP OF THE BATTLE
    *******************************************/
   while( junkpile.HP >= 0 && superhero.HP >= 0 ){
    /************************************************
        IF IS TURN OF THE ERUDITE TO ENTER THE FIELD
    ************************************************/
    if(AssaultTurn === EruditoSpawn){

        console.log("----------------------------------")
        console.log("Asalto numero " +  AssaultTurn)
        console.log("-------------------------------------------------------")
        console.log("-- EL ERUDITO HA APARECIDO EN EL CAMPO DE BATALLA -----")
        console.log("-------------------------------------------------------")

        erudito.ANG = EruditeActions.calculateAnger();

        console.log(erudito);



        //CALCULATE THE NEXT TIME THE ERUDITE IS GOING TO APEAR ON THE FIELD
        EruditoSpawn = AssaultTurn + Math.floor(Math.random() * (5 - 3 + 1)) + 3 ;
        AssaultTurn = AssaultTurn + 1;


    /************************************************
       NORMAL BATTLE DEVELOPMENT
    ************************************************/
    }else{
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

module.exports = {
    StartGame,
    BattleDevelopment,
    EndGame
}