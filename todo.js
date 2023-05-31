const form = document.querySelector("form");
const forminput = document.getElementById("inputform");
const formbuton = document.getElementById("butonform");
const formcontainer = document.getElementById("formcontainer");

let localden = JSON.parse(localStorage.getItem("veri")) || [];

window.addEventListener("load", () => {
  localden.forEach((item) => {
    createli(item);
  });
});

const ul = document.createElement("ul");
formcontainer.after(ul);
// formcontainer.appendChild(ul)
ul.style.display = "flex";
ul.style.justifyContent = "center";
ul.style.alignItems = "center";

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (forminput.value.trim() === "") {
    alert("bir todo girin");
    return;
  }
  const localnesne = {
    id: new Date().getTime(),
    completed: false,
    text: forminput.value,
  };
  createli(localnesne);
  localden.push(localnesne);
  localStorage.setItem("veri", JSON.stringify(localden));
});
const createli = (localnesne) => {
  const li = document.createElement("li");
  li.innerHTML = `
  ${localnesne.text}  
  `;
  li.classList = "liler";
  li.style.listStyleType = "none";
  ul.appendChild(li);
  
  li.style.textDecoration = "none";
  const check = document.createElement("i");
  check.setAttribute("class", "fas fa-check");
  li.prepend(check);
  
  const remove = document.createElement("i");
  form.reset();
  remove.setAttribute("class", "fas fa-times");
  li.append(remove);

  
  check.addEventListener("click", () => {
    let myid = localnesne.id;
    localden.map((item)=>{
      if(item.id == myid ){
        item.completed = !item.completed
        
      }
      
      localStorage.setItem("veri", JSON.stringify(localden));
    })
    
    
    li.style.textDecoration =
      li.style.textDecoration === "line-through" ? "none" : "line-through";
      li.style.color = li.style.color === "red" ? "initial" : "red";
      
    // li.style.color = "red";
  });

  remove.addEventListener("click", (e) => {
    let myid = localnesne.id;
    e.target.closest("li").remove();
    localden = localden.filter((localnesne) => {
      return localnesne.id != myid;
    });
    localStorage.setItem("veri", JSON.stringify(localden));
  });
  if (localnesne.completed) {
    li.style.textDecoration = "line-through";
    li.style.color = "red";
  }
};
