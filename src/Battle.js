
 /*******************************************
       FUNTION THAT CALCULATES WHO IS GOING TO START
********************************************/
function Start(junkpile, superhero){

    const junkpileInitiative = junkpile.INT + junkpile.COM;
    const superheroInitiative = superhero.INT + superhero.COM;
    if(junkpileInitiative > superheroInitiative ){
        return junkpile;
    }else{
        return superhero;
    }
}


 /*******************************************
       FUNTION THAT CHECKS IF THE ATTACK IS SUCCESSFUL OR NOT
********************************************/

function SuccessfullAttack(attacker){
    const randomNumber = Math.floor(Math.random() * 100 - 0) + 0;
    
    if(randomNumber <= attacker.COM ){
        console.log("--------------------------------");
        console.log( attacker.name + " Obtiene un " + randomNumber + " y ataca con exito")
        return true;
    }else{
        console.log("--------------------------------");
        console.log(attacker.name + " Obtiene un " + randomNumber + " y el ataque no es exitoso, CAMBIO DE TURNO")
        return false;
    }
}
 /*******************************************
       FUNTION THAT REDCALCULATES THE DAMAGE THAT THE ATTACKER IS GOING TO BE DEALT TO THE DEFENDER 
********************************************/
function Attack(attacker) {
    const dice = Math.floor(Math.random() * 20 - 1) + 1;
    if(dice < 3){
        return Fumble(attacker, attacker.SPE, dice);
    }else if(dice > 2 && dice < 18){
        return Normal(attacker, attacker.POW, attacker.STR, dice );
    }else{
        return Critic(attacker, attacker.INT, attacker.DUR, dice);
    }
}


 /*******************************************
       FUNTION THAT REDUCES THE HP OF THE DEFENDER HERO WITH THE VALUE OF THE ATTACKERS DAMAGE
********************************************/
function Damage(defender, damage) {

    // console.log("La vida de " + defender.name + " ha bajado " + damage + " puntos " );
    defender.HP = defender.HP - damage;
    return defender;
    
}

 /*******************************************
       IN CASE THE DICE THROW FOR THE ATTACK IS FUMBLE
********************************************/
function Fumble(attacker, spe, dice){
    let resultofdices = 0;
    if(dice = 2){
        for(let i = 1; i <= 4; i++ ){
            resultofdices = resultofdices + Math.floor((Math.random() * 4 - 1) + 1);
        }
        
        console.log("-----------------------------------");
        console.log(`FAIL!! ${attacker.name} obtiene un ${dice} y se clava el arma en su pierna izda. Recibe un daño de ${(spe / resultofdices).toFixed(0)}  `)
        attacker.HP = attacker.HP - (spe / resultofdices).toFixed(0);
        return 0;
    }else{
        console.log(`FAIL!! ${attacker.name} obtiene un ${dice} y se clava el arma en su pierna izda. Recibe un daño de ${(spe / resultofdices).toFixed(0)}  `)
        attacker.HP = Math.floor( spe / Math.floor(Math.random() * 4 - 1) + 1);
        return 0;
    }
       
       
}

 /*******************************************
    FUNCTION OF THE DICE THROW FOR ATACK IS NORMAL
    ********************************************/
function Normal(attacker, pow, str, dice){
    console.log( `${attacker.name} obtiene un ${dice}, empuña su arma y ejerce un daño de ${ Math.floor((pow + str) * dice / 100) }`)
    return  Math.floor((pow + str) * dice / 100);
}

 /*******************************************
       IN CASE THE DICE THROW FOR THE ATTACK IS CRITIC
********************************************/
function Critic(attacker, int, dur, dice){
    let resultofdices = 0;
    if(dice === 18){
        console.log(`CRITICAL HIT!! ${attacker.name} obtiene un ${dice} y ejerce un daño de ${Math.floor((int * dur) / 100) * Math.floor(Math.random() * 3 - 1) + 1}`)
        return  Math.floor((int * dur) / 100) * Math.floor(Math.random() * 3 - 1) + 1;
    }else if(dice === 19){

            for(let i = 1; i <= 2; i++ ){
               resultofdices += Math.floor(Math.random() * 3 - 1) + 1;
            }

            console.log(`CRITICAL HIT!! ${attacker.name} obtiene un ${dice} y ejerce un daño de ${Math.floor((int * dur) / 100) * resultofdices}`)
            return Math.floor((int * dur) / 100) * resultofdices;
    }else{
        for(let i = 1; i <= 2; i++ ){
            resultofdices += Math.floor(Math.random() * 3 - 1) + 1;
        }

        console.log(`CRITICAL HIT!! ${attacker.name} obtiene un ${dice} y ejerce un daño de ${Math.floor((int * dur) / 100) * resultofdices}`)
        return Math.floor((int * dur) / 100) * resultofdices;
    }
}

module.exports = {
    Start,
    SuccessfullAttack,
    Attack,
    Damage
}