const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8000/api/auth/"
  : "https://rest-ernesto.herokuapp.com/api/auth/";

let user = null;
let socket = null;

//HTML References
const txtUid = document.querySelector("#txtUid");
const txtMessage = document.querySelector("#txtMessage");
const ulUsers = document.querySelector("#ulUsers");
const ulMessages = document.querySelector("#ulMessages");
const btnSignOut = document.querySelector("#btnSignOut");

//valid token from localStogare
const validJWT = async () => {
  const token = localStorage.getItem("token") || "";
  if (token.length <= 10) {
    window.location = "index.html";
    throw new Error("there is not token");
  }
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "x-token": token,
    },
  });
  const { user: userDB, token: newToken, msg } = await resp.json();
  if (msg) {
    localStorage.clear();
    window.location = "index.html";
    throw new Error(msg);
  }

  localStorage.setItem("token", newToken);
  user = userDB;
  document.title = user.user_name;
  await connectSocket();
};

const connectSocket = async () => {
  socket = io({
    extraHeaders: {
      "x-token": localStorage.getItem("token"),
    },
  });

  // session connect
  socket.on("connect", () => {
    console.log("Sockets online");
  });
  //session disconnect
  socket.on("disconnect", () => {
    console.log("Sockets offline");
  });
  //active users
  socket.on("active-users", showUsers);

  //receive messages
  socket.on("receive-messages", showMessages);
  //private-message
  socket.on("private-message", (paylod) => {
    console.log("private message:", paylod);
  });
};

//////show user/////
const showUsers = (users = []) => {
  let usersHTML = "";
  users.map(({ user_name, uid }) => {
    usersHTML += `
      <li>
         <p>
           <h5 class="text-success"> ${user_name}</h5>
           <span class="fs-6 text-muted">${uid}</span>
          </p>
       </li>`;
  });
  ulUsers.innerHTML = usersHTML;
};

//////show messages/////
const showMessages = (messages = []) => {
  let messagesHTML = "";
  messages.map(({ user_name, message }) => {
    messagesHTML += `
      <li>
         <p>
           <span class="text-primary"> ${user_name}</span>
           <span>${message}</span>
          </p>
       </li>`;
  });
  ulMessages.innerHTML = messagesHTML;
};

///send message
txtMessage.addEventListener("keyup", ({ keyCode }) => {
  const message = txtMessage.value;
  const uid = txtUid.value;
  if (keyCode !== 13) {
    return;
  }
  if (message.length === 0) {
    return;
  }
  socket.emit("send-message", { message, uid });

  txtMessage.value = "";
});

const main = async () => {
  await validJWT();
};

main();
