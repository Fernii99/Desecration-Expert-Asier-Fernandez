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

    let junkpile = superheroes[0];
    let superhero = superheroes[1];

    let EruditoSpawn = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
    let erudito = superheroes[2];
    erudito.glases = true;
    

    let turn = await Battle.Start(junkpile, superhero);
    console.log("--------------------------------");
    console.log(" El primer asalto es para " + turn.name)

    let AssaultTurn = 1;

    /** LOOP OF THE BATTLE **/
   while( junkpile.HP >= 0 && superhero.HP > 0 ){

    /*** IF IS TURN OF THE ERUDITE TO ENTER THE FIELD ***/
    if(AssaultTurn === EruditoSpawn && erudito.HPW > 0){

        //ERUDITE ENTERS THE ARENA MESSAGES 
        console.log("----------------------------------")
        console.log("Asalto numero " +  AssaultTurn)
        console.log("-------------------------------------------------------")
        console.log("-- EL ERUDITO HA APARECIDO EN EL CAMPO DE BATALLA -----")
        console.log("-------------------------------------------------------")

        //CALCULATE THE ANGER OF THE ERUDITE
        erudito.ANG = 1 + DiceThrow(20);
        erudito.glases = !erudito.glases;

        
        switch(erudito.ANG) {
            case 1:
            case 2:
            case 3:
                attacker = turn == 'superhero' ? superhero : junkpile;
                if(!attacker.leftArm){
                    const damage = DiceThrow(20);           
                    if(turn === 'superhero' ) {
                        superhero.leftArm = true;
                        superhero.STR = Math.floor(superhero.STR / 2);
                        superhero.HP = superhero.HP - damage;
                        console.log(superhero);
                        console.log(`PIFIA! ${attacker.name} se ha roto el brazo izquierdo y sus estadisticas han bajado! Fuerza: -${Math.floor(superhero.STR / 2)} Y Vida -${damage} `)
                    }else{
                        junkpile.leftArm = true 
                        junkpile.STR = Math.floor(junkpile.STR / 2);
                        junkpile.HP =  junkpile.HP - damage
                        console.log(`PIFIA! ${attacker.name} se ha roto el brazo izquierdo y sus estadisticas han bajado! Fuerza: -${Math.floor(junkpile.STR / 2)} Y Vida -${damage} `)
                        console.log(junkpile);
                    }   
                }else{
                    const damage = DiceThrow(20);           
                    if(turn === 'superhero' ) {
                        superhero.HP = superhero.HP - damage
                        console.log(`PIFIA! ${attacker.name} tiene el brazo roto y su vida ha bajado!  Vida -${damage} `)
                        console.log(superhero);

                    }else{
                        junkpile.HP = junkpile.HP - damage
                        console.log(`PIFIA! ${attacker.name} tiene el brazo roto y su vida ha bajado!  Vida -${damage} `)
                        console.log(junkpile);
                    } 
                }
                break;
            case 4:
            case 5:
            case 6:
                attacker = turn == 'superhero' ? superhero : junkpile;
                if(!attacker.leftArm){
                    const damage = DiceThrow(20);
                    if(turn === 'superhero' ) {
                        superhero.leftArm = true;
                        superhero.STR = Math.floor(superhero.STR / 2);
                        superhero.HP = superhero.HP - damage;
                        console.log(superhero)
                        console.log(`PIFIA! ${attacker.name} se ha roto el brazo Derecho y sus estadisticas han bajado! Fuerza: -${Math.floor(superhero.STR / 2)} Y Vida -${damage}`)
                    }else{
                        junkpile.leftArm = true 
                        junkpile.STR = Math.floor(junkpile.STR / 2);
                        junkpile.HP =  junkpile.HP - damage
                        console.log(`PIFIA! ${attacker.name} se ha roto el brazo Derecho y sus estadisticas han bajado! Fuerza: -${Math.floor(junkpile.STR / 2)} Y Vida -${damage}`)
                        console.log(junkpile);
                    }
                }else{
                    const damage = DiceThrow(20);           
                    if(turn === 'superhero' ) {
                        superhero.HP = superhero.HP - damage
                        console.log(`PIFIA! ${attacker.name} tiene el brazo roto y su vida ha bajado!  Vida -${damage}`)
                        console.log(superhero);

                    }else{
                        junkpile.HP = junkpile.HP - damage
                        console.log(`PIFIA! ${attacker.name} tiene el brazo roto y su vida ha bajado!  Vida -${damage}`)
                        console.log(junkpile);
                    } 
                }
            break;
            case 7:
            case 8:
            case 9:
                console.log("EL ERUDITO HA ENTRADO AL CAMPO DE BATALLA Y DESATA EL CAOS, CAMBIO DE TURNO")
                turn = turn === 'superhero' ? 'junkpile' : 'superhero';
            break;
            case 10:
            case 11:
            case 12:
            case 13:
                attacker = turn == 'superhero' ? superhero : junkpile;
                if(!attacker.leftArm){
                    const damage = DiceThrow(10);
                    if(turn === 'superhero' ){
                        console.log(superhero)
                        console.log(`${superhero.name} ha escuchado el grito del erudito y le ha golpedo! El erudito ha recibido un total de: ${damage}`);
                        console.log("Vida actual del erudito:");
                        console.log(erudito);
                    }else{
                        console.log(`${superhero.name} ha escuchado el grito del erudito y le ha golpedo! El erudito ha recibido un total de: ${damage} `);
                        console.log("Vida actual del erudito:");
                        console.log(erudito);
                    }
                }
            break;
            case 14:
            case 15:
            case 16:
                // No se sacar adelante esta opcion
                console.log(" La tirada de dados ha sido entre 14 y 16 ");
            break;
            case 17:
            case 18:
                console.log("El erudito al grito de tu eres tonto recupera sus gafas");
                break;
            case 19:
            case 20:   
                attacker = turn == 'superhero' ? superhero : junkpile;
                console.log(`ENDEMONIADO, ${attacker.name} desata todo el caos del rerudito persiguiendole y cortandole la cabeza`);
                erudito.HPW = 0;
            break;                      
            default:
                break;
        }

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

const DiceThrow = (max) => {
    return Math.floor(Math.random()* max - 1) + 1;
}
module.exports = {
    StartGame,
    BattleDevelopment,
    EndGame
}