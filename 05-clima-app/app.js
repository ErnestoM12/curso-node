require("dotenv").config();
require("colors");
const {
  leerInput,
  inquirerMenu,
  pausa,
  listarLugares,
} = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");

const main = async () => {
  //instance class
  const busquedas = new Busquedas();
  let opt; //option

  do {
    //call menu
    opt = await inquirerMenu();

    switch (opt) {
      case 1:
        //show message
        const termino = await leerInput("Ciudad: ");
        //search places
        const lugares = await busquedas.ciudad(termino);
        //select place
        const id = await listarLugares(lugares);
        //get data
        if (id === 0) continue;
        const lugarSel = lugares.find((l) => l.id === id);
        //save
        busquedas.agregarHistorial(lugarSel.name);

        const clima = await busquedas.climaLugar(lugarSel.lat, lugarSel.lng);

        //show result
        console.clear();
        console.log("\n Información del lugar\n".green);
        console.log("Ciudad:", lugarSel.name.green);
        console.log("Lat:", lugarSel.lat);
        console.log("Lng:", lugarSel.lng);
        console.log("Temperatura:", clima.temp);
        console.log("Min:", clima.min);
        console.log("Max:", clima.max);
        console.log("Como esta el clima:", clima.desc.green);
        break;

      case 2:
        busquedas.historialCapitalizado.map((lugar, i) => {
          const idx = `${i + 1}.`.green;
          console.log(`${idx} ${lugar}`);
        });
        break;

      default:
        break;
    }

    //call pause
    if (opt !== 0) await pausa();
  } while (opt !== 0);
  {
  }
};

main();
