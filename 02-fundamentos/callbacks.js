// setTimeout(() => {
//   console.log("hola mundo");
// }, 100);

const getUsuariosById = (id, callback) => {
  const usuario = {
    id,
    nombre: "Ernesto",
  };

  setTimeout(() => {
    callback(usuario);
  }, 1500);
};

getUsuariosById(10, (usuario) => {
  console.log(usuario.id);
  console.log(usuario.nombre.toUpperCase());
});
