const gameController = require('./gameController');

async function start(){
    try{
        console.log("WELCOME TO THE COMBAT ARENA !")
        console.log(`---------------------------------------`)

        const superheroes = await gameController.StartGame();

        console.log("LISTADO DE ATRIBUTOS");
        console.log("----------------------------------------");
        console.log(superheroes);

        const fighters = await gameController.BattleDevelopment(superheroes);
        await gameController.EndGame(fighters);

    }catch{

    }
}

start();
