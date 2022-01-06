require("colors");
const { guardarDB, leerBD } = require("./helpers/guardarArchivo");
const {
  inquirerMenu,
  pausa,
  leerInput,
  listadoTareasBorrar,
  confirmar,
  mostrarListadoCheckLists,
} = require("./helpers/inquirer");
const Tareas = require("./models/Tareas");

console.clear();

const main = async () => {
  let opt;

  const tareas = new Tareas();
  const tareasDB = leerBD();

  if (tareasDB) {
    tareas.cargarTareasFormArr(tareasDB);
  }

  do {
    opt = await inquirerMenu();

    switch (opt) {
      case "1":
        //crear tarea
        const desc = await leerInput("Descripción:");
        tareas.crearTarea(desc);
        break;
      case "2":
        //listar todas tareas
        tareas.listarTareas();
        break;
      case "3":
        //listar tareas completas
        tareas.listarTareas(opt);
        break;
      case "4":
        //listar tareas pendientes
        tareas.listarTareas(opt);
        break;
      case "5":
        //completdo
        const ids = await mostrarListadoCheckLists(tareas.listadoArr);
        tareas.toggleCompletadas(ids);
        break;

      case "6":
        //Borrar tareas
        const id = await listadoTareasBorrar(tareas.listadoArr);
        if (id !== "0") {
          const ok = await confirmar("¿Esta seguro?");
          if (ok) {
            tareas.borrarTarea(id);
            console.log("\nTarea borrada correctamente!".green);
          }
        }

        break;

      default:
        break;
    }
    guardarDB(tareas.listadoArr);

    await pausa();
  } while (opt !== "0");
  {
  }
};

main();
