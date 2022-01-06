// Referencias del HTML
const lblNewTicket = document.querySelector("#lblNewTicket");
const btnGenerate = document.querySelector("#btnGenerate");

const socket = io();

socket.on("connect", () => {
  btnGenerate.disabled = false;
});

socket.on("disconnect", () => {
  btnGenerate.disabled = true;
});

socket.on("last-ticket", (last) => {
  lblNewTicket.innerText = "Ticket " + last;
});

btnGenerate.addEventListener("click", () => {
  socket.emit("next-ticket", null, (ticket) => {
    lblNewTicket.innerText = ticket;
  });
});
