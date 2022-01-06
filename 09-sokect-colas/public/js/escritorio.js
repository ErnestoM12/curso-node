// Referencias del HTML
const lblDesktop = document.querySelector("#lblDesktop");
const btnServe = document.querySelector("#btnServe");
const lblTicket = document.querySelector("#lblTicket");
const divAlert = document.querySelector("#divAlert");
const lblMsg = document.querySelector("#lblMsg");
const lblPendientes = document.querySelector("#lblPendientes");

const searchParams = new URLSearchParams(window.location.search);

if (!searchParams.has("desktop")) {
  window.location = "index.html";
  throw new Error("desktop is required");
}

const desktop = searchParams.get("desktop");

lblDesktop.innerText = desktop.toUpperCase();

divAlert.style.display = "none";

const socket = io();

socket.on("connect", () => {
  btnServe.disabled = false;
});

socket.on("disconnect", () => {
  btnServe.disabled = true;
});

socket.on("pending-tickets", (pending) => {
  const display = pending === 0 ? "none" : "";
  lblPendientes.style.display = display;
  lblPendientes.innerText = pending;
});

btnServe.addEventListener("click", () => {
  socket.emit("serve-ticket", { desktop }, ({ ok, ticket, msg }) => {
    if (!ok) {
      lblTicket.innerText = "nobody";
      divAlert.style.display = "";
      lblMsg.innerText = msg;
      return;
    }

    lblTicket.innerText = "Ticket " + ticket.number;
  });
});
