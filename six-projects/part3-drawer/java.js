let b1 = document.getElementById("b1");
let b2 = document.getElementById("b2");
let b3 = document.getElementById("b3");
let b4 = document.getElementById("b4");
let b5 = document.getElementById("b5");
let container = document.getElementById("container");
let number = document.getElementById("number");

b1.addEventListener("click", () => {
  b1.style.transform = `scale(0.8)`;
  b1.style.boxShadow = "0px 0px 5px rgb(39, 150, 158)";
  setTimeout(() => {
    b1.style.transform = ``;
    b1.style.boxShadow = "";
  }, 100);
  if (number.innerText > 0) number.innerText = parseFloat(number.innerText) - 5;
});
b2.addEventListener("click", () => {
  b2.style.transform = `scale(0.8)`;
  b2.style.boxShadow = "0px 0px 5px rgb(39, 150, 158)";
  setTimeout(() => {
    b2.style.transform = ``;
    b2.style.boxShadow = "";
  }, 100);
});
b3.addEventListener("click", () => {
  b3.style.transform = `scale(0.8)`;
  b3.style.boxShadow = "0px 0px 5px rgb(39, 150, 158)";
  setTimeout(() => {
    b3.style.transform = ``;
    b3.style.boxShadow = "";
  }, 100);
  number.innerText = parseFloat(number.innerText) + 5;
});
b4.addEventListener("click", () => {
  b4.style.transform = `scale(0.8)`;
  b4.style.boxShadow = "0px 0px 5px rgb(39, 150, 158)";
  setTimeout(() => {
    b4.style.transform = ``;
    b4.style.boxShadow = "";
  }, 100);
});
b5.addEventListener("click", () => {
  b5.style.transform = `scale(0.8)`;
  b5.style.boxShadow = "0px 0px 5px rgb(39, 150, 158)";
  setTimeout(() => {
    b5.style.transform = ``;
    b5.style.boxShadow = "";
  }, 100);
  container.innerHTML = "";
});

let color = "black";
b4.addEventListener("change", (event) => {
  color = event.target.value;
});

let isClick = false;
document.body.addEventListener("mouseup", (event) => {
  isClick = false;

  console.log(isClick);
});
document.body.addEventListener("mousedown", (event) => {
  isClick = true;
  console.log(isClick);
});

document.body.addEventListener("mousemove", (event) => {
  console.log(isClick);
  if (isClick) {
    console.log(
      (parseFloat(document.body.offsetWidth) -
        parseFloat(container.offsetWidth)) /
        2 +
        parseFloat(container.offsetWidth) / 2
    );
    console.log(event.x);
    if (
      event.x >=
        (parseFloat(document.body.offsetWidth) -
          parseFloat(container.offsetWidth)) /
          2 +
          parseFloat(number.innerText) / 2 &&
      event.x <=
        (parseFloat(document.body.offsetWidth) -
          parseFloat(container.offsetWidth)) /
          2 +
          parseFloat(container.offsetWidth) -
          parseFloat(number.innerText) / 2 &&
      event.y >=
        ((parseFloat(document.body.offsetHeight) -
          parseFloat(container.offsetHeight)) /
          2 ) + (parseFloat(number.innerText) / 2)&&
      event.y <=
        ((parseFloat(document.body.offsetHeight) -
          parseFloat(container.offsetHeight)) /
          2 +
          parseFloat(container.offsetHeight))- (parseFloat(number.innerText) / 2)
          
    ) {
      let img = document.createElement("div");
      img.style.width = parseFloat(number.innerText) + "px";
      img.style.height = parseFloat(number.innerText) + "px";
      img.style.borderRadius = "100%";
      img.style.position = "absolute";
      img.style.backgroundColor = color;
      img.style.left =
        event.x -
        (parseFloat(document.body.offsetWidth) -
          parseFloat(container.offsetWidth)) /
          2 -
        parseFloat(number.innerText) / 2 +
        "px";
      img.style.top =
        event.y -
        (parseFloat(document.body.offsetHeight) -
          parseFloat(container.offsetHeight)) /
          2 -
        parseFloat(number.innerText) / 2 +
        "px";
      container.appendChild(img);
    }
  }
});
