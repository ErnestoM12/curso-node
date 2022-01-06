const myForm = document.querySelector("form");

const url = window.location.hostname.includes("localhost")
  ? "http://localhost:8000/api/auth/"
  : "https://rest-ernesto.herokuapp.com/api/auth/";

myForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const formData = {};

  for (let el of myForm.elements) {
    if (el.name.length > 0) {
      formData[el.name] = el.value;
    }
  }

  fetch(url + "login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  })
    .then((r) => r.json())
    .then(({ msg, token }) => {
      if (msg) {
        return console.error(msg);
      }

      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch((err) => {
      console.log(err);
    });
});

function handleCredentialResponse(response) {
  //google token
  const body = { id_token: response.credential };

  fetch(url + "google", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  })
    .then((r) => r.json())
    .then(({ token }) => {
      localStorage.setItem("token", token);
      window.location = "chat.html";
    })
    .catch((err) => {
      console.log(err);
    });
}

const button = document.getElementById("g_id_signout");
button.onclick = async () => {
  console.log(google.accounts.id);

  google.accounts.id.disableAutoSelect();
  google.accounts.id.revoke(localStorage.getItem("token"), (done) => {
    console.log("consent revoked");
    localStorage.clear();
    location.reload();
  });
};

// button.onclick = () => {
//   localStorage.clear();
//   location.reload();
//   google.accounts.id.disableAutoSelect();
// };
