const Tarea = require("./Tarea");

class Tareas {
  _listado = {};

  get listadoArr() {
    const listado = [];
    Object.keys(this._listado).forEach((key) => {
      const tarea = this._listado[key];
      listado.push(tarea);
    });

    return listado;
  }

  constructor() {
    this._listado = {};
  }

  borrarTarea(id = "") {
    if (this._listado[id]) {
      delete this._listado[id];
    }
  }

  cargarTareasFormArr(tareas = []) {
    tareas.map((tarea) => {
      this._listado[tarea.id] = tarea;
    });
  }

  crearTarea(desc = "") {
    const tarea = new Tarea(desc);
    this._listado[tarea.id] = tarea;
  }

  listarTareas(type = "2") {
    console.log();

    let array = this.listadoArr;

    switch (type) {
      case "3":
        array = array.filter((tarea) => tarea.completadoEn != null);
        break;
      case "4":
        array = array.filter((tarea) => tarea.completadoEn == null);
        break;
    }

    array.map((tarea, i) => {
      const idx = `${i + 1}`.green;
      const { desc, completadoEn } = tarea;
      let estado;
      if (type == 2) {
        estado = completadoEn ? "Completada".green : "Pendiente".red;
      } else {
        estado = completadoEn ? completadoEn.green : "Pendiente".red;
      }
      console.log(`${idx}. ${desc} :: ${estado}`);
    });
  }

  toggleCompletadas(ids = []) {
    ids.forEach((id) => {
      const tarea = this._listado[id];
      if (!tarea.completadoEn) {
        tarea.completadoEn = new Date().toISOString();
      }
    });

    this.listadoArr.forEach((tarea) => {
      if (!ids.includes(tarea.id)) {
        this._listado[tarea.id].completadoEn = null;
      }
    });
  }
}

module.exports = Tareas;
