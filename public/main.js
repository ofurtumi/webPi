const socket = io();

const user = document.querySelector("#user");
const messages = document.querySelector("#messages");
const form = document.querySelector("#form");
const input = document.querySelector("#input");
let open = true;

let username = localStorage.getItem("username")
if (username) {
    user.value = username
}

document.addEventListener("visibilitychange", (e) => {
  if (open) open = false;
  else {
    document.title = "innanhússpjall";
    blinkTitleStop();
    open = true;
  }
});

form.addEventListener("submit", function (e) {
    e.preventDefault();
    let time = nuna()
  if (input.value) {
    if (user.value) {
      socket.emit("chat message", user.value, input.value,time);
    } else {
      socket.emit("chat message", "???", input.value,time);
    }
    input.value = "";
  }
});

socket.on("chat message", function (usr, msg,time) {
  if (!open) blinkTitle("innanhússpjall ✉️", "innanhússpjall", 1000, true);
  let item = document.createElement("li");
  item.textContent = usr + ": " + msg;
  item.classList.add("m")

  let t = document.createElement("li")
  t.textContent = time
  t.classList.add("t")
  item.appendChild(t)

  messages.appendChild(item);
  window.scrollTo(0, document.body.scrollHeight);
});

function nuna() {
    let date = new Date();
    // let output = `${date.getDate()}/${date.getMonth()+1}/${date.getFullYear()}-${date.getHours()}:${date.getMinutes()}`
    let output = `${('00'+date.getHours()).slice(-2)}:${('00'+date.getMinutes()).slice(-2)}`

    return output
}

user.addEventListener("change",() => {
    localStorage.setItem('username', user.value)
})

var hold = "";

function blinkTitle(msg1, msg2, delay, isFocus, timeout) {
  if (isFocus == null) {
    isFocus = false;
  }

  if (timeout == null) {
    timeout = false;
  }

  if (timeout) {
    setTimeout(blinkTitleStop, timeout);
  }

  document.title = msg1;

  if (isFocus == false) {
    hold = window.setInterval(function () {
      if (document.title == msg1) {
        document.title = msg2;
      } else {
        document.title = msg1;
      }
    }, delay);
  }

  if (isFocus == true) {
    var onPage = false;
    var testflag = true;

    var initialTitle = document.title;

    window.onfocus = function () {
      onPage = true;
    };

    window.onblur = function () {
      onPage = false;
      testflag = false;
    };

    hold = window.setInterval(function () {
      if (onPage == false) {
        if (document.title == msg1) {
          document.title = msg2;
        } else {
          document.title = msg1;
        }
      }
    }, delay);
  }
}

function blinkTitleStop() {
  clearInterval(hold);
}
