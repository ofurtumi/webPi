const header = document.querySelector("header");
const root = document.documentElement
let button = document.createElement("button");
button.id = "inv"
let dark;

if (localStorage.getItem("dark")) {
    dark = JSON.parse(localStorage.getItem("dark"))
    // console.log(dark)
    if (dark) {
        root.style.setProperty("--anim","0s")
        root.style.setProperty("--body-anim","0s")
        root.style.setProperty("--text","#fff")
        root.style.setProperty("--background","#000")
        button.textContent = "☀"
    }
    else {
        root.style.setProperty("--text","#000")
        root.style.setProperty("--background","#fff")
        button.textContent = "☽"
    }
}


button.addEventListener("click",(e)=>{
    if(root.style.getPropertyValue("--anim") === "0s") {
        root.style.setProperty("--anim","ease-in-out .25s")
        root.style.setProperty("--body-anim","ease-in-out .25s")
    }
    if (dark) {
        root.style.setProperty("--text","#000")
        root.style.setProperty("--background","#fff")
        button.textContent = "☽"
        dark = false    
    }
    else {
        root.style.setProperty("--background","#000")
        root.style.setProperty("--text","#fff")
        button.textContent = "☀"
        dark = true
    }
    // console.log(dark)
    localStorage.setItem("dark",dark)
})

header.appendChild(button)