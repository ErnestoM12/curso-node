const empleados = [
  { id: 1, nombre: "ernesto" },
  { id: 2, nombre: "juan" },
  { id: 3, nombre: "daniel" },
];

const salarios = [
  { id: 1, salario: 2000 },
  { id: 2, salario: 3000 },
];

const getEmpleado = (id) => {
  return new Promise((resolve, reject) => {
    const empleado = empleados.find((e) => e.id === id)?.nombre;
    empleado ? resolve(empleado) : reject(`Empleado con el id ${id} no existe`);
  });
};

const getSalario = (id) => {
  return new Promise((resolve, reject) => {
    const salario = salarios.find((s) => s.id === id)?.salario;
    salario
      ? resolve(salario)
      : reject(`No existe un salario para el empleado con el id ${id}`);
  });
};

const getInfoUser = async (id) => {
  try {
    const empleado = await getEmpleado(id);
    const salario = await getSalario(id);

    return `El salario del empleado: ${empleado} es de: ${salario}`;
  } catch (error) {
    //return error;
    throw error;
  }
};

const id = 3;
getInfoUser(id)
  .then((msg) => {
    console.log("Todo Bien");
    console.log(msg);
  })
  .catch((err) => {
    console.log("Todo Mal");
    console.log(err);
  });
