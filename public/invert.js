const header = document.querySelector("header");
const root = document.documentElement
let button = document.createElement("button");
button.id = "inv"
button.textContent = "☽"
button.addEventListener("click",(e)=>{
    if (root.style.getPropertyValue("--text") === "#fff") {
        root.style.setProperty("--text","#000")
        root.style.setProperty("--background","#fff")
        button.textContent = "☽"
    }
    else {
        root.style.setProperty("--text","#fff")
        root.style.setProperty("--background","#000")
        button.textContent = "☀"
    }
})

header.appendChild(button)