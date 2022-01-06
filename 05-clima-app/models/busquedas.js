const fs = require("fs");

const axios = require("axios");

class Busquedas {
  historial = [];
  dbPath = "./db/lugares.json";

  constructor() {
    this.readDB();
  }

  get historialCapitalizado() {
    return this.historial.map((lugar) => {
      let palabras = lugar.split(" "); //separa los palabras por el espacio
      palabras = palabras.map((p) => p[0].toUpperCase() + p.substring(1)); //tomo la primera letra de cada palabra y concateto el resto de la palabra
      return palabras.join(" "); //vuelvo unir todas la palabras
    });
  }

  get paramsMapBox() {
    return {
      access_token: process.env.MAPBOX_KEY,
      limit: 5,
      language: "es",
    };
  }

  get paramsOpenWeater() {
    return {
      appid: process.env.OPENWEATHER_KEY,
      units: "metric",
      lang: "es",
    };
  }

  async ciudad(lugar = "") {
    try {
      //http request
      const instance = axios.create({
        baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json?`,
        timeout: 1000,
        params: this.paramsMapBox,
      });
      const res = await instance.get();
      return res.data.features.map((lugar) => ({
        id: lugar.id,
        name: lugar.place_name,
        lng: lugar.center[0],
        lat: lugar.center[1],
      }));
    } catch (error) {
      return [];
    }
  }

  async climaLugar(lat, lon) {
    try {
      //http request
      const instance = axios.create({
        baseURL: "https://api.openweathermap.org/data/2.5/weather",
        timeout: 1000,
        params: { ...this.paramsOpenWeater, lat, lon },
      });
      const res = await instance.get();
      const { weather, main } = res.data;
      return {
        desc: weather[0].description,
        min: main.temp_min,
        max: main.temp_max,
        temp: main.temp,
      };
    } catch (error) {
      console.log(error);
    }
  }

  agregarHistorial(lugar = "") {
    if (this.historial.includes(lugar.toLocaleLowerCase())) {
      return;
    }

    this.historial = this.historial.splice(0, 10); //limit to ten register

    this.historial.unshift(lugar.toLocaleLowerCase());
    //save
    this.saveDB();
  }

  saveDB() {
    const payload = {
      historial: this.historial,
    };

    fs.writeFileSync(this.dbPath, JSON.stringify(payload));
  }

  readDB() {
    if (!fs.existsSync(this.dbPath)) return;

    const info = fs.readFileSync(this.dbPath, { encoding: "utf-8" });
    const data = JSON.parse(info);
    this.historial = data.historial;
  }
}

module.exports = Busquedas;
