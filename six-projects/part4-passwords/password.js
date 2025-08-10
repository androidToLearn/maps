let clipboard = document.getElementById("clipboardId");
let password = document.getElementById("passwordTxt");
let inputLength = document.getElementById("inputLength");
let cbUpper = document.getElementById("cbUpper");
let cbLower = document.getElementById("cbLower");
let cbNumber = document.getElementById("cbNumber");
let cbSymbole = document.getElementById("cbSymbole");
let btnGenerate = document.getElementById("btnGenerate");
//

clipboard.addEventListener("click", () => {
  password.select();
  password.setSelectionRange(0, 99999);
  navigator.clipboard.writeText(password.value);
  alert("Copied the text: " + password.value);
});
btnGenerate.addEventListener("click", () => {
  let length = parseInt(inputLength.value);
  let addUpper = cbUpper.checked;
  let addLower = cbLower.checked;
  let addNumber = cbNumber.checked;
  let addSymbole = cbSymbole.checked;
  let textPassword = "";
  let range = 0;
  let myIndexAndStartFrom = [];

  if (addUpper) {
    range++;
    myIndexAndStartFrom.push({ index: 0, startFrom: 65 });
  }
  if (addLower) {
    range++;
    myIndexAndStartFrom.push({ index: 1, startFrom: 97 });
  }
  if (addNumber) {
    range++;
    myIndexAndStartFrom.push({ index: 2, startFrom: 48 });
  }
  if (addSymbole) {
    range++;
    myIndexAndStartFrom.push({ index: 3, startFrom: 33 });
  }

  console.log(myIndexAndStartFrom.length);
  for (let i = 0; i < length; i++) {
    let typeChar = Math.floor(Math.random() * range);
    textPassword += addChar(
      myIndexAndStartFrom[typeChar]["index"],
      myIndexAndStartFrom[typeChar]["startFrom"]
    );
  }
  password.value = textPassword;
});

function addChar(indexA, startFrom) {
  let numCharsAccordingTypesInAscii = [
    90 - 65 + 1,
    122 - 97 + 1,
    10,
    47 - 33 + 1,
  ];
  let k =
    Math.floor(Math.random() * numCharsAccordingTypesInAscii[indexA]) +
    startFrom;
  return String.fromCharCode(k);
}
