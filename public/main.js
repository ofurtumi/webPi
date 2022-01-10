const socket = io();

const user = document.querySelector("#user");
const messages = document.querySelector("#messages");
const form = document.querySelector("#form");
const input = document.querySelector("#input");
const linkForFavicon = document.querySelector(`head > link[rel='icon']`);

const rohoholegur = faviconTemplate("🤠");
const kassiOpinn = faviconTemplate("📫");
const kassiLokad = faviconTemplate("📪");
let pageOpen = true;

let username = localStorage.getItem("username");
if (username) {
  user.value = username;
}

document.addEventListener("visibilitychange", (e) => {
  if (pageOpen) pageOpen = false;
  else {
    linkForFavicon.setAttribute(`href`, `data:image/svg+xml,${rohoholegur}`);
    pageOpen = true;
  }
});

form.addEventListener("submit", function (e) {
  e.preventDefault();
  let time = nuna();
  if (input.value) {
    if (user.value) {
      socket.emit("chat message", user.value, input.value, time);
    } else {
      socket.emit("chat message", "???", input.value, time);
    }
    input.value = "";
  }
});

socket.on("chat message", function (usr, msg, time) {
  if (!pageOpen) ath()
  let item = document.createElement("li");
  item.textContent = usr + ": " + msg;
  item.classList.add("m");

  let t = document.createElement("li");
  t.textContent = time;
  t.classList.add("t");
  item.appendChild(t);

  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

function nuna() {
  let date = new Date();
  // let output = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}`
  let output = `${("00" + date.getHours()).slice(-2)}:${(
    "00" + date.getMinutes()
  ).slice(-2)}`;

  return output;
}

user.addEventListener("change", () => {
  localStorage.setItem("username", user.value);
});

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

async function ath() {
    let x = true
    while(!pageOpen) {
        if (x) {
            linkForFavicon.setAttribute(`href`, `data:image/svg+xml,${kassiLokad}`);
            x = false
        }
        else {
            linkForFavicon.setAttribute(`href`, `data:image/svg+xml,${kassiOpinn}`)
            x = true
        }
        await sleep(1000)
        if (pageOpen) {
            console.log("opið")
            return
        }
    }
}

function faviconTemplate(icon) {
    return `
      <svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22>
        <text y=%22.9em%22 font-size=%2290%22>
          ${icon}
        </text>
      </svg>
    `.trim();
  }