const path = require("path");
const fs = require("fs");
const Ticket = require("./ticket");

class TicketControl {
  constructor() {
    this.last = 0;
    this.today = new Date().getDate(); //day number
    this.tikects = [];
    this.lastfourtickets = [];

    this.init();
  }

  get toJson() {
    return {
      last: this.last,
      today: this.today,
      tikects: this.tikects,
      lastfourtickets: this.lastfourtickets,
    };
  }

  init() {
    //read json
    const {
      last,
      today,
      tikects,
      lastfourtickets,
    } = require("../db/data.json");

    if (today === this.today) {
      this.last = last;
      this.tikects = tikects;
      this.lastfourtickets = lastfourtickets;
    } else {
      //another day
      this.saveDB();
    }
  }

  saveDB() {
    const pathDB = path.join(__dirname, "../db/data.json");
    fs.writeFileSync(pathDB, JSON.stringify(this.toJson));
  }

  next() {
    this.last += 1;
    const ticket = new Ticket(this.last, null);
    this.tikects.push(ticket);
    this.saveDB();

    return "Ticket " + ticket.number;
  }

  serveTicket(desktop) {
    //if there isn't tickets
    if (this.tikects.length == 0) {
      return null;
    }
    const ticket = this.tikects.shift(); // this.tikects[0]
    ticket.desktop = desktop;

    this.lastfourtickets.unshift(ticket);

    if (this.lastfourtickets.length > 4) {
      this.lastfourtickets.splice(-1, 1);
    }

    this.saveDB();

    return ticket;
  }
}

module.exports = TicketControl;
