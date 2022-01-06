const socketController = (socket) => {
  //connect
  console.log("client connected", socket.id);
  //disconnected
  socket.on("disconnect", () => {
    console.log("client disconnect", socket.id);
  });
  //first event
  socket.on("send-message", (payload, callback) => {
    //send payload to all users connected
    const id = "121313";
    callback(id);
    //send all user
    socket.broadcast.emit("send-message", payload);
  });
};

module.exports = {
  socketController,
};
