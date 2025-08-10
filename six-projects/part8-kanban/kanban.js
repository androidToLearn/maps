let boards = document.getElementsByClassName("classBoard");
let contents = document.getElementsByClassName("classContent");
let btnAdd = document.getElementsByClassName("btnAdd");
let divTextAreas = document.getElementsByClassName("classForInput");
let divButtonSave = document.getElementsByClassName("save");
let classOnes = document.getElementsByClassName("classOne");
let buttonsSave = document.getElementsByClassName("classSave");
let allTextAreas = document.getElementsByClassName("classInput");

let allBoxesObject = [
  {
    title: "Backlog",
    titleColor: "rgba(160, 104, 19, 0.993)",
    backgroundColor: "rgba(34, 29, 29, 0.5)",
    items: [
      { isEdit: false, value: "Being cool" },
      { isEdit: false, value: "Getting stuff done" },
    ],
  },
  {
    title: "Progress",
    titleColor: "rgba(15, 122, 117, 0.993)",
    backgroundColor: "rgba(34, 29, 29, 0.5)",
    items: [
      { isEdit: false, value: "Release the course" },
      { isEdit: false, value: "Sit back and relax" },
    ],
  },
  {
    title: "Complete",
    titleColor: "rgba(6, 122, 15, 0.993)",
    backgroundColor: " rgba(34, 29, 29, 0.5)",
    items: [
      { isEdit: false, value: "Work on projects" },
      { isEdit: false, value: "Listen to music" },
    ],
  },

  {
    title: "On Hold",
    titleColor: " rgba(187, 62, 4, 0.993)",
    backgroundColor: " rgba(34, 29, 29, 0.5)",
    items: [{ isEdit: false, value: "Being uncool" }],
  },
];

drawAllBoxesObject(allBoxesObject);

function drawTitles(allBoxesObject) {
  for (let i = 0; i < allBoxesObject.length; i++) {
    addElementTitle(i);
  }
}

function addElementTitle(i) {
  let title = document.createElement("p");
  title.style.width = "90%";
  title.style.height = "60px";
  title.style.borderRadius = 10 + "px";
  title.style.display = "flex";
  title.style.flexDirection = "row";
  title.style.justifyContent = "center";
  title.style.alignItems = "center";
  title.style.color = "white";
  title.style.textAlign = "center";
  title.style.fontFamily = "cursive";
  title.innerText = allBoxesObject[i]["title"];
  title.style.backgroundColor = allBoxesObject[i]["titleColor"];
  boards[i].appendChild(title);
}

function drawContent(allBoxesObject) {
  for (let i = 0; i < 4; i++) {
    contents[i].style.backgroundColor = allBoxesObject[i]["backgroundColor"];
    for (let j = 0; j < allBoxesObject[i]["items"].length; j++) {
      if (allBoxesObject[i]["items"][j]["isEdit"]) {
        addEdit(i, allBoxesObject[i]["items"][j]["value"], allBoxesObject, j);
      } else {
        addItem(i, allBoxesObject[i]["items"][j]["value"], allBoxesObject, j);
      }
    }
  }
}

let myText = "";
let myEdit = null;
let myItems = null;
let isDrop = false;
let keepJ = 0;

function clearAll() {
  for (let i = 0; i < boards.length; i++) {
    boards[i].innerHTML = "";
    contents[i].innerHTML = "";
  }
}

function drawAllBoxesObject(allBoxesObject) {
  console.log("drawAllBoxesObject");
  clearAll();
  drawTitles(allBoxesObject);
  drawContent(allBoxesObject);
}

function addItem(i, text, allBoxesObject, j) {
  if (text === "") return;
  let divContainer = document.createElement("div");
  divContainer.classList.add("containerItem");
  divContainer.id = contents[i].children.length;
  let textItem = document.createElement("p");
  textItem.classList.add("itemText");
  textItem.innerText = text;
  divContainer.appendChild(textItem);
  contents[i].appendChild(divContainer);

  textItem.addEventListener("click", () => {
    for (let i = 0; i < 4; i++) {
      for (let j = 0; j < allBoxesObject[i]["items"].length; j++) {
        allBoxesObject[i]["items"][j]["isEdit"] = false;
      }
    }
    allBoxesObject[i]["items"][j]["isEdit"] = true;
    myEdit = allBoxesObject[i]["items"][j];

    drawAllBoxesObject(allBoxesObject);
  });
}

function addEdit(i, text, allBoxesObject, j) {
  let divContainer = document.createElement("div");
  divContainer.classList.add("containerEdit");
  divContainer.id = contents[i].children.length;

  contents[i].appendChild(divContainer);

  keepItemPosition = parseInt(divContainer.id);

  childIsMoveDiv = divContainer;

  divContainer.innerHTML = `<input ondragstart="drag(event , ${i})" type="text" style="width: calc(90% - 10px);height: 40px;border-radius: 10px;background-color: white;outline: none;margin-top:10px;border:none;"  class="idWhiteEdit" id="idIn"/>
`;
  document.getElementsByClassName("idWhiteEdit")[0].draggable = true;
  document.getElementsByClassName("idWhiteEdit")[0].value = text;
  myText = text;
  myItems = allBoxesObject[i]["items"];
  keepJ = j;

  document.getElementsByClassName("idWhiteEdit")[0].focus();

  document
    .getElementsByClassName("idWhiteEdit")[0]
    .addEventListener("blur", () => {
      myText = document.getElementsByClassName("idWhiteEdit")[0].value;
      myEdit["value"] = myText;
      myEdit["isEdit"] = false;
      if (!isDrop) {
        drawAllBoxesObject(allBoxesObject);
      }
    });
}

function drop(event, i) {
  console.log("drop");
  myItems.splice(keepJ, 1);
  allBoxesObject[i]["items"].push({ isEdit: false, value: myText });
  console.log(allBoxesObject[i]["items"]);
  doContentsBlackColor();

  drawAllBoxesObject(allBoxesObject);
  isDrop = true;
  setTimeout(() => {
    isDrop = false;
  }, 2000);

  event.preventDefault();
}

function doContentsBlackColor() {
  for (let i = 0; i < allBoxesObject.length; i++) {
    allBoxesObject[i]["backgroundColor"] = "rgba(34, 29, 29, 0.5)";
  }
}
function allowDrop(ev, i) {
  allBoxesObject[i]["backgroundColor"] = allBoxesObject[i]["titleColor"];
  isDrop = true;
  setTimeout(() => {
    isDrop = false;
  }, 2000);
  drawAllBoxesObject(allBoxesObject);

  ev.preventDefault();
}
function drag(ev, i) {}

for (let i = 0; i < btnAdd.length; i++) {
  btnAdd[i].addEventListener("click", () => {
    btnAdd[i].style.display = "none";
    for (let j = 0; j < 4; j++) {
      btnAdd[j].style.display = "flex";

      divTextAreas[j].style.display = "none";
    }

    divTextAreas[i].style.display = "flex";
    btnAdd[i].style.display = "none";
  });
}

for (let i = 0; i < divButtonSave.length; i++) {
  divButtonSave[i].addEventListener("click", () => {
    btnAdd[i].style.display = "flex";

    divTextAreas[i].style.display = "none";
  });
}

for (let i = 0; i < buttonsSave.length; i++) {
  buttonsSave[i].addEventListener("click", () => {
    allBoxesObject[i]["items"].push({
      isEdit: false,
      value: allTextAreas[i].value,
    });
    drawAllBoxesObject(allBoxesObject);
    for (let i = 0; i < allTextAreas.length; i++) {
      allTextAreas[i].value = "";
    }
  });
}
