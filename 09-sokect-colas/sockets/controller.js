const TicketControl = require("../models/ticket-control");

const ticketControl = new TicketControl();

const socketController = (socket) => {
  socket.emit("last-ticket", ticketControl.last);

  socket.emit("actual-state", ticketControl.lastfourtickets);

  socket.emit("pending-tickets", ticketControl.tikects.length);

  //add new ticket
  socket.on("next-ticket", (payload, callback) => {
    const next = ticketControl.next();
    callback(next);
    // there is a new ticket notification
    socket.broadcast.emit("pending-tickets", ticketControl.tikects.length);
  });

  socket.on("serve-ticket", ({ desktop }, callback) => {
    if (!desktop) {
      return callback({
        ok: false,
        msg: "desktop is required",
      });
    }
    //get ticket to serve
    const ticket = ticketControl.serveTicket(desktop);

    //notify last four tickets change
    socket.broadcast.emit("actual-state", ticketControl.lastfourtickets);

    //notify pending tickets number
    socket.emit("pending-tickets", ticketControl.tikects.length);
    socket.broadcast.emit("pending-tickets", ticketControl.tikects.length);

    if (!ticket) {
      callback({
        ok: false,
        msg: "no tickets outstanding",
      });
    } else {
      callback({
        ok: true,
        ticket,
      });
    }
  });
};

module.exports = {
  socketController,
};
