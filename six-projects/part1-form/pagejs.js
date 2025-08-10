let passwordInputs = document.querySelectorAll("input[type='password']");
let textInputs = document.querySelectorAll("input[type='text']");
let subRegister = document.getElementById("subRegister");
let isInSubmit = false;
let register = document.getElementById("registerId");

register.addEventListener("click", (event) => {
  console.log(passwordInputs[0].value);
  console.log(passwordInputs[1].value);
  if (passwordInputs[0].value != passwordInputs[1].value) {
    subRegister.classList = [];
    subRegister.className = "";
    subRegister.classList.add("badRed");
    subRegister.value = "Make sure password much.";
  } else {
    subRegister.classList = [];
    subRegister.className = "";
    subRegister.classList.add("goodBottom");
    subRegister.value = "Don't Hesitate!";
  }

  subRegister.classList = [];
  subRegister.className = "";
  subRegister.classList.add("successfulBottom");
  subRegister.value = "Successfully Registered!";
  json = {
    name: textInputs[0].value,
    phone: textInputs[1].value,
    email: textInputs[2].value,
    website: textInputs[3].value,
    password: passwordInputs[0].value,
  };
  console.log(json);
  alert(`name:${textInputs[0].value},
    phone: ${textInputs[1].value},
    email: ${textInputs[2].value},
    website: ${textInputs[3].value},
    password: ${passwordInputs[0].value},`);
  // passwordInputs[0].value = "";
  // passwordInputs[1].value = "";
  // textInputs[0].value = "";
  // textInputs[1].value = "";
  // textInputs[2].value = "";
  // textInputs[3].value = "";
  event.preventDefault();
});

for (let i = 0; i < passwordInputs.length; i++) {
  passwordInputs[i].classList.add("inputBlack");
}
for (let i = 0; i < textInputs.length; i++) {
  textInputs[i].classList.add("inputBlack");
}
