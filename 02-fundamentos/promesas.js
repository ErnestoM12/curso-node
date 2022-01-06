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

const id = 3;

////////promesas separadas////
// getEmpleado(id)
//   .then((empleado) => console.log(empleado))
//   .catch((err) => console.log(err));

// getSalario(id)
//   .then((salario) => console.log(salario))
//   .catch((err) => console.log(err));

/////////promesas hell////////
// getEmpleado(id)
//   .then((empleado) => {
//     getSalario(id)
//       .then((salario) => {
//         console.log("El empleado:", empleado, " tiene un salario de:", salario);
//       })
//       .catch((err) => console.log(err));
//   })
//   .catch((err) => console.log(err));

///promesas en cadena/////

let nombre;

getEmpleado(id)
  .then((empleado) => {
    nombre = empleado;
    return getSalario(id);
  })
  .then((salario) =>
    console.log("El empleado:", nombre, " tiene un salario de:", salario)
  )
  .catch((err) => console.log(err));
