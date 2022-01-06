//delete this lines on production
const { Socket } = require("socket.io"); //just for develop
//= new Socket() //just for develop

const { validJWTSocket } = require("../helpers");
const { ChatMessages } = require("../models");
//intance
const chatMessages = new ChatMessages();

const socketController = async (socket = new Socket(), io) => {
  //JTW validation
  const user = await validJWTSocket(socket.handshake.headers["x-token"]);
  if (!user) {
    return socket.disconnect();
  }

  //connect user
  chatMessages.connectUser(user);
  io.emit("active-users", chatMessages.usersArr);
  socket.emit("receive-messages", chatMessages.lastTenMessages);

  //conecct to special room
  socket.join(user.id);

  //clean up when someone disconnects
  socket.on("disconnect", () => {
    chatMessages.disconnectUser(user.id);
    io.emit("active-users", chatMessages.usersArr);
  });
  //send message
  socket.on("send-message", ({ uid, message }) => {
    if (uid) {
      //private message
      socket.to(uid).emit("private-message", { from: user.user_name, message });
    } else {
      //public message
      chatMessages.sendMessage(user.id, user.user_name, message);
      io.emit("receive-messages", chatMessages.lastTenMessages);
    }
  });
};

module.exports = {
  socketController,
};
