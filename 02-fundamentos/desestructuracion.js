const deadpool = {
  nombre: "wade",
  apellido: "winston",
  poder: "renegenaricón",
  edad: 50,
  getNombre() {
    return `${this.nombre} ${this.apellido} ${this.poder}`;
  },
};

// const nombre = deadpool.nombre;
// const apellido = deadpool.apellido;
// const poder = deadpool.poder;

//let { nombre, apellido, poder, edad = 0 } = deadpool;

function print({ nombre, apellido, poder, edad }) {
  nombre = "Ernesto";
  console.log(nombre, apellido, poder, edad);
}

//print(deadpool);

const heroes = ["batman", "deadpool", "flash"];

// const h1 = heroes[0];
// const h2 = heroes[1];
// const h2 = heroes[2];

const [, , h3] = heroes;

console.log(h3);
