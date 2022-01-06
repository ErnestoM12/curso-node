//html references
const lblonline = document.querySelector("#lblonline");
const lbloffline = document.querySelector("#lbloffline");
const txtMessage = document.querySelector("#txtMessage");
const btnSend = document.querySelector("#btnSend");

const socket = io();
//listener
socket.on("connect", () => {
  // console.log("server connected");

  lblonline.style.display = "";
  lbloffline.style.display = "none";
});

socket.on("disconnect", () => {
  // console.log("server disconnect");
  lblonline.style.display = "none";
  lbloffline.style.display = "";
});

//send to server
btnSend.addEventListener("click", () => {
  const menssage = txtMessage.value;
  const payload = {
    menssage,
    date: new Date().getTime(),
  };

  socket.emit("send-message", payload, (id) => {
    console.log("from", id);
  });
});

//recibe from server
socket.on("send-message", (payload) => {
  console.log(payload);
});
